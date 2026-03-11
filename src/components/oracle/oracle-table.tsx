"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { OracleCommand, Officer, Metrics } from "@/lib/types"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { EditCommandDialog } from "./edit-command-dialog"
import { FleetUpChecklist } from "./fleet-up-checklist"
import { Pencil, Search, Plus } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { formatToMMMyy } from "@/lib/utils"
import { format, parseISO, isValid } from "date-fns"
import { getCommandAlerts } from "@/lib/alerts"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface OracleTableProps {
    data: OracleCommand[]
    selectedLocation: string
    onLocationChange: (location: string) => void
    officers: Officer[]
    setOfficers: (officers: Officer[]) => void
    initialMetrics?: Metrics
}

export function OracleTable({ data: initialData, selectedLocation, onLocationChange, officers, setOfficers, initialMetrics }: OracleTableProps) {
    const [data, setData] = useState<OracleCommand[]>(initialData)
    const [metrics, setMetrics] = useState<Metrics>(initialMetrics || { resolvedConflicts: 0 })
    const searchParams = useSearchParams()
    const [search, setSearch] = useState(searchParams.get("search") || "")

    // Sorting State
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)

    // Edit State
    const [editingCommand, setEditingCommand] = useState<OracleCommand | null>(null)
    const [isEditOpen, setIsEditOpen] = useState(false)

    // CoC Date Dialog State
    const [pendingTurnoverCommandId, setPendingTurnoverCommandId] = useState<string | null>(null)
    const [cocDateInput, setCocDateInput] = useState(new Date().toISOString().split('T')[0])
    const [isCocDialogOpen, setIsCocDialogOpen] = useState(false)

    // Hydrate metrics from API on mount
    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await fetch('/api/metrics');
                if (res.ok) {
                    const data = await res.json();
                    setMetrics(data);
                }
            } catch (err) {
                console.error("Failed to fetch metrics", err);
            }
        };
        fetchMetrics();
    }, []);

    // Extract unique locations for filter
    const locations = Array.from(new Set(data.map(d => d.location))).sort()
    const [showSpecialMission, setShowSpecialMission] = useState(false)

    // Filter Logic
    const filteredData = data.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.uic.includes(search) ||
            item.currentCO.name.toLowerCase().includes(search.toLowerCase()) ||
            item.currentXO.name.toLowerCase().includes(search.toLowerCase())

        const matchesLocation = selectedLocation === "All" || item.location === selectedLocation

        // CO-SM Logic:
        // If toggle is ON, show ONLY Special Mission items (tagged with CO-SM)
        // If toggle is OFF, show ONLY Standard items (NOT tagged with CO-SM)
        const isSpecialMission = item.tags?.includes("CO-SM");
        const matchesType = showSpecialMission ? isSpecialMission : !isSpecialMission;

        return matchesSearch && matchesLocation && matchesType
    })

    // Sort Data
    if (sortConfig !== null) {
        filteredData.sort((a, b) => {
            let aValue: any = a[sortConfig.key as keyof OracleCommand];
            let bValue: any = b[sortConfig.key as keyof OracleCommand];

            // Handle nested properties or fallback
            if (sortConfig.key === 'platform') {
                aValue = a.platform || "";
                bValue = b.platform || "";
                const comparison = aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
                return sortConfig.direction === 'asc' ? comparison : -comparison;
            }
            if (sortConfig.key === 'slate') {
                // targetBoardDate format is YY-Q (e.g., 26-2). String comparison works perfectly
                // since '26-2' < '27-1' natively.
                aValue = a.nextSlateParams?.targetBoardDate || "TBD";
                bValue = b.nextSlateParams?.targetBoardDate || "TBD";
                const comparison = aValue.localeCompare(bValue);
                return sortConfig.direction === 'asc' ? comparison : -comparison;
            }

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    } else {
        // Default sort: Location then Name
        filteredData.sort((a, b) => {
            if (a.location < b.location) return -1;
            if (a.location > b.location) return 1;
            return a.name.localeCompare(b.name);
        })
    }

    const requestSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleEditClick = (cmd: OracleCommand) => {
        setEditingCommand(cmd)
        setIsEditOpen(true)
    }

    const handleAddClick = () => {
        const newCommand: OracleCommand = {
            id: `cmd_new_${Date.now()}`,
            name: "New Command",
            uic: "N/A",
            platform: "DDG",
            location: "Norfolk, VA",
            currentCO: { name: "", prd: "" },
            currentXO: { name: "", prd: "" },
            nextSlateParams: { requirement: "CO", targetBoardDate: "TBD" },
            timeline: {}
        }
        setEditingCommand(newCommand)
        setIsEditOpen(true)
    }

    const handleSaveCommand = async (updatedCommand: OracleCommand) => {
        // 1. Check for Conflict Resolution
        const originalCommand = data.find(c => c.id === updatedCommand.id)
        let newMetrics = { ...metrics }

        if (originalCommand) {
            const originalAlerts = getCommandAlerts(originalCommand)
            const newAlerts = getCommandAlerts(updatedCommand)

            // If we had alerts and now we don't (or have fewer? strict resolution preferred)
            // Let's go with: if we had alerts and now we have FEWER or ZERO.
            // Simple approach: if original > 0 and new == 0 -> Resolved.
            // More granular: if original > new -> Resolved (original - new) issues?
            // "How many conflicts have been resolved" -> usually means total fixed issues.
            // Let's track: (original - new) if positive.

            if (originalAlerts.length > newAlerts.length) {
                const diff = originalAlerts.length - newAlerts.length
                newMetrics.resolvedConflicts += diff
            }
        }

        setMetrics(newMetrics)

        let newData;
        const exists = data.some(c => c.id === updatedCommand.id);

        if (exists) {
            newData = data.map((cmd) => (cmd.id === updatedCommand.id ? updatedCommand : cmd))
        } else {
            newData = [...data, updatedCommand]
        }

        setData(newData)

        try {
            const res = await fetch(`/api/oracle/${updatedCommand.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ updatedCommand, metrics: newMetrics }),
            });
            if (!res.ok) throw new Error()
            toast.success('Command saved')
        } catch (error) {
            console.error("Error saving data:", error);
            toast.error('Failed to save command — changes may not have persisted');
        }
    }

    const handleDeleteCommand = async (commandId: string) => {
        const commandToDelete = data.find(c => c.id === commandId)
        const newData = data.filter(c => c.id !== commandId)
        setData(newData)
        setIsEditOpen(false)

        try {
            const res = await fetch(`/api/oracle/${commandId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error()
            toast.success('Command deleted')
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete command');
        }
    }

    const persistUpdate = async (updatedCommand: OracleCommand, currentOfficers: Officer[], message: string) => {
        const newData = data.map((c) => (c.id === updatedCommand.id ? updatedCommand : c));
        setData(newData);
        setIsEditOpen(false);

        try {
            const res = await fetch(`/api/oracle/${updatedCommand.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ updatedCommand, officers: currentOfficers }),
            });
            if (!res.ok) throw new Error()
            toast.success(message)
        } catch (error) {
            console.error(error);
            toast.error('Failed to save: ' + message);
        }
    }

    const handleCOTurnover = async (commandId: string, cocDate: string) => {
        const cmd = data.find(c => c.id === commandId);
        if (!cmd) return;

        // 1. Archive Current CO to "PCC" in Bank
        const newPCC: Officer = {
            id: `pcc-${Date.now()}`,
            name: cmd.currentCO.name,
            rank: "CDR",
            designator: "1110",
            currentCommand: "PCC (Post-Command)",
            prd: "N/A",
            preferences: [],
            status: "PCC",
            notes: `CMD Tour: ${cmd.name}`,
            yearGroup: 0,
            cocDate: cocDate || undefined
        };

        const newOfficers = [...(officers || []), newPCC];
        setOfficers(newOfficers);

        // 2. Identify New CO
        let newCO;
        let newXO = cmd.currentXO;
        let newProspectiveCO = cmd.prospectiveCO;

        if (cmd.prospectiveCO && cmd.prospectiveCO.name !== "") {
            // Priority: P-CO fleets up
            newCO = {
                name: cmd.prospectiveCO.name,
                prd: cmd.prospectiveCO.prd,
                timelineData: (cmd.prospectiveCO as any).timelineData // Preserve timeline data if it exists (might need type update)
            };
            newProspectiveCO = undefined; // Clear P-CO slot
        } else {
            // Fallback: XO fleets up (Direct Fleet Up)
            newCO = {
                name: cmd.currentXO.name,
                prd: cmd.currentXO.prd,
                timelineData: cmd.currentXO.timelineData // Preserve XO's timeline data so CoC date travels with them
            };
            newXO = {
                name: "VACANT",
                prd: "TBD"
            };
        }

        const updatedCommand: OracleCommand = {
            ...cmd,
            currentCO: newCO,
            currentXO: newXO,
            prospectiveCO: newProspectiveCO
        };

        await persistUpdate(updatedCommand, newOfficers, "CO Turnover Executed (PCC Archived)");
    };

    const handleXOFleetUp = async (commandId: string) => {
        const cmd = data.find(c => c.id === commandId);
        if (!cmd) return;

        if (!cmd.inboundXO) {
            alert("No Inbound XO (P-XO) to fleet up.");
            return;
        }

        // 1. Move Current XO to Prospective CO (P-CO)
        const newProspectiveCO = {
            name: cmd.currentXO.name,
            prd: cmd.currentXO.prd
        };

        // 2. Fleet Up P-XO to Current XO
        const newXO = {
            name: cmd.inboundXO.name,
            prd: "TBD",
            timelineData: cmd.inboundXO.timelineData // Preserve P-XO timeline data
        };

        const updatedCommand: OracleCommand = {
            ...cmd,
            currentXO: newXO,
            inboundXO: undefined,
            prospectiveCO: newProspectiveCO,
            fleetUpProgress: { isic: false, tycom: false, pco: false, orders: false, coc: false }
        };

        await persistUpdate(updatedCommand, officers, "XO Fleet Up / P-CO Stashed");
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search The Oracle (Ship, CO)..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Select value={selectedLocation} onValueChange={onLocationChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by Location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Locations</SelectItem>
                            {locations.map(loc => (
                                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button
                        variant={showSpecialMission ? "default" : "outline"}
                        onClick={() => setShowSpecialMission(!showSpecialMission)}
                    >
                        {showSpecialMission ? "Show Standard Commands" : "Show CO-SM"}
                    </Button>
                    <Button onClick={handleAddClick} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Command
                    </Button>
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => requestSort('name')}>
                                Command {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                            </TableHead>
                            <TableHead>CO</TableHead>
                            <TableHead>XO</TableHead>
                            <TableHead>P-XO</TableHead>
                            <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => requestSort('slate')}>
                                Slate {sortConfig?.key === 'slate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                            </TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No commands found in The Oracle.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredData.map((cmd) => (
                                <TableRow key={cmd.id}>
                                    <TableCell className="max-w-[200px] whitespace-normal">
                                        <div className="font-semibold leading-tight">{cmd.name}</div>
                                        <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground mt-0.5">
                                            <span>{cmd.uic !== "N/A" ? cmd.uic : ""}</span>
                                            {cmd.uic !== "N/A" && <span>•</span>}
                                            <span className="whitespace-nowrap">
                                                {cmd.tags?.includes("CO-SM")
                                                    ? `${cmd.rotationStyle === "DirectCO" ? "Direct Input" : "Fleet Up"} ${cmd.tourLength ? `• ${cmd.tourLength} mos` : ""}`
                                                    : (cmd.platform || "N/A")
                                                }
                                            </span>
                                            <span>•</span>
                                            <span className="whitespace-nowrap">{cmd.location}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-[140px]">
                                        <div className="text-sm font-medium truncate text-blue-600" title={cmd.currentCO.name}>{cmd.currentCO.name}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {(() => {
                                                const dateStr = cmd.currentCO.timelineData?.q || cmd.currentCO.prd;
                                                if (!dateStr) return "CoC: N/A";
                                                const date = parseISO(dateStr);
                                                const formatted = isValid(date) ? format(date, "MMMyy").toUpperCase() : dateStr;
                                                return `CoC: ${formatted}`;
                                            })()}
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-[160px]">
                                        <div className="flex items-start justify-between gap-1">
                                            <div className="overflow-hidden">
                                                <div className="text-sm font-medium truncate text-green-600" title={cmd.currentXO.name}>{cmd.currentXO.name}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {(() => {
                                                        const dateStr = cmd.currentXO.timelineData?.m || cmd.currentXO.prd;
                                                        if (!dateStr) return "CoC: N/A";
                                                        const date = parseISO(dateStr);
                                                        const formatted = isValid(date) ? format(date, "MMMyy").toUpperCase() : dateStr;
                                                        return `CoC: ${formatted}`;
                                                    })()}
                                                </div>
                                            </div>
                                            <FleetUpChecklist command={cmd} onUpdate={(c) => persistUpdate(c, officers, "Checklist Updated")} />
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-[140px]">
                                        {cmd.inboundXO ? (
                                            <>
                                                <div className={`text-sm font-medium truncate ${cmd.inboundXO.name.toLowerCase().includes("no fill") ? "text-red-600" : "text-yellow-600"}`} title={cmd.inboundXO.name}>{cmd.inboundXO.name}</div>
                                                <div className="text-xs text-muted-foreground">RPT: {formatToMMMyy(cmd.inboundXO.reportDate)}</div>
                                            </>
                                        ) : (
                                            <span className="text-muted-foreground italic text-sm">-- Open --</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="max-w-[140px]">
                                        <Badge variant="outline" className="border-primary text-primary w-full justify-center truncate">
                                            {cmd.nextSlateParams.requirement} via {cmd.nextSlateParams.targetBoardDate}
                                        </Badge>
                                        {cmd.slatedXO && cmd.slatedXO.reportDate && (
                                            <div className="text-xs text-muted-foreground mt-1 text-center">
                                                XO RPT: {formatToMMMyy(cmd.slatedXO.reportDate)}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(cmd)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <EditCommandDialog
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                command={editingCommand}
                onSave={handleSaveCommand}
                onCOTurnover={(commandId) => {
                    setPendingTurnoverCommandId(commandId)
                    setCocDateInput(new Date().toISOString().split('T')[0])
                    setIsCocDialogOpen(true)
                }}
                onXOFleetUp={handleXOFleetUp}
                onDelete={handleDeleteCommand}
            />

            {/* CoC Date Dialog */}
            <Dialog open={isCocDialogOpen} onOpenChange={setIsCocDialogOpen}>
                <DialogContent className="sm:max-w-[400px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>Execute CO Turnover</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="coc-date">Change of Command Date</Label>
                            <p className="text-xs text-muted-foreground">
                                Enter the actual date the CoC took place. This may differ from today if you are recording it after the fact.
                            </p>
                            <input
                                id="coc-date"
                                type="date"
                                value={cocDateInput}
                                onChange={(e) => setCocDateInput(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <button
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                            onClick={() => setIsCocDialogOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                            onClick={() => {
                                if (pendingTurnoverCommandId) {
                                    handleCOTurnover(pendingTurnoverCommandId, cocDateInput)
                                }
                                setIsCocDialogOpen(false)
                                setPendingTurnoverCommandId(null)
                            }}
                        >
                            Execute Turnover
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
