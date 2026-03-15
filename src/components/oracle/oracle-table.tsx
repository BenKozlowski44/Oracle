"use client"

import React, { useState, useEffect } from "react"
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
import { Search, Plus, ChevronDown, ChevronRight } from "lucide-react"
import { saveError, notifySuccess } from "@/lib/notify"
import { CommandPipelineTimeline } from "./command-pipeline-timeline"
import { Button } from "@/components/ui/button"
import { formatToMMMyy, getPipelineHealth, predictNextVacancyDate, getCoSmRptDisplay, getCdrCmdXoRptDate } from "@/lib/utils"
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

    // Timeline expansion
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
    const toggleExpand = (id: string) => setExpandedRows(prev => {
        const next = new Set(prev)
        next.has(id) ? next.delete(id) : next.add(id)
        return next
    })

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
    const [directCOCollapsed, setDirectCOCollapsed] = useState(() => {
        try { return localStorage.getItem('cosm-directco-collapsed') === 'true' } catch { return false }
    })
    const [fleetUpCollapsed, setFleetUpCollapsed] = useState(() => {
        try { return localStorage.getItem('cosm-fleetup-collapsed') === 'true' } catch { return false }
    })
    const toggleDirectCO = () => setDirectCOCollapsed(v => { const n = !v; try { localStorage.setItem('cosm-directco-collapsed', String(n)) } catch {} return n })
    const toggleFleetUp  = () => setFleetUpCollapsed(v  => { const n = !v; try { localStorage.setItem('cosm-fleetup-collapsed',  String(n)) } catch {} return n })

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

    // CO-SM section splits
    const healthOrder = (cmd: OracleCommand) => {
        const h = getPipelineHealth(cmd)
        return h.status === 'red' ? 0 : h.status === 'yellow' ? 1 : 2
    }
    const coSMSort = (a: OracleCommand, b: OracleCommand) =>
        healthOrder(a) - healthOrder(b) || a.name.localeCompare(b.name)
    const directCOCommands = filteredData.filter(c => c.rotationStyle === 'DirectCO').sort(coSMSort)
    const fleetUpCommands  = filteredData.filter(c => c.rotationStyle !== 'DirectCO').sort(coSMSort)

    const handleEditClick = (cmd: OracleCommand) => {
        setEditingCommand(cmd)
        setIsEditOpen(true)
    }


    const handleAddClick = (type: 'CDR' | 'COSM') => {
        const isCoSM = type === 'COSM'
        const newCommand: OracleCommand = {
            id: `cmd_new_${Date.now()}`,
            name: isCoSM ? "New CO-SM Command" : "New Command",
            uic: "N/A",
            platform: isCoSM ? "CO-SM" : "DDG",
            location: "Norfolk, VA",
            tags: isCoSM ? ["CO-SM"] : [],
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
            notifySuccess('Command saved')
        } catch (error) {
            console.error("Error saving data:", error);
            saveError('Failed to save command — changes may not have persisted');
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
            notifySuccess('Command deleted')
        } catch (error) {
            console.error(error);
            saveError('Failed to delete command');
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
            notifySuccess(message)
        } catch (error) {
            console.error(error);
            saveError('Failed to save: ' + message);
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
                        {showSpecialMission ? "Show CDR CMDs" : "Show CO-SM"}
                    </Button>
                    <Button onClick={() => handleAddClick('CDR')} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add CDR CMD
                    </Button>
                    <Button onClick={() => handleAddClick('COSM')} variant="outline" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add CO-SM
                    </Button>
                </div>
            </div>

            {/* ── Shared row renderer ─────────────────────────────────────── */}
            {(() => {
                const renderCmdRow = (cmd: OracleCommand) => {
                    // Always compute the live target board — overrides any stale stored value
                    const liveBoard = predictNextVacancyDate(cmd)
                    const cmdLive: OracleCommand = liveBoard !== 'TBD'
                        ? { ...cmd, nextSlateParams: { ...cmd.nextSlateParams, targetBoardDate: liveBoard } }
                        : cmd
                    const health = getPipelineHealth(cmdLive)
                    const isDirectCO = cmd.rotationStyle === 'DirectCO'
                    const dotColor = health.status === 'green' ? 'bg-green-500' : health.status === 'yellow' ? 'bg-amber-400' : 'bg-red-500'
                    const badgeClass = health.status === 'green'
                        ? 'border-green-500 text-green-600 bg-green-500/10'
                        : health.status === 'yellow'
                            ? 'border-amber-400 text-amber-600 bg-amber-400/10'
                            : 'border-red-500 text-red-600 bg-red-500/10'

                    // Slate cell (shared between Direct CO + Fleet-Up)
                    const slateCell = (
                        <TableCell className="max-w-[140px]">
                            {(() => {
                                return (
                                    <>
                                        <Badge
                                            variant="outline"
                                            className={`w-full justify-center truncate ${badgeClass} ${health.approaching ? 'animate-pulse ring-2 ring-amber-400/60 ring-offset-1 bg-amber-400/20 font-bold' : ''} ${health.status === 'red' && !health.approaching ? 'animate-pulse ring-2 ring-red-500/60 ring-offset-1 font-bold' : ''}`}
                                            title={health.detail}
                                        >
                                            {health.approaching && '⚠ '}{isDirectCO ? 'CO' : 'XO'} via {cmdLive.nextSlateParams.targetBoardDate}
                                        </Badge>
                                        {(() => {
                                            const rpt = getCoSmRptDisplay(cmd)
                                            return rpt ? (
                                                <div className="text-xs text-muted-foreground mt-1 text-center">
                                                    {rpt.label}: {formatToMMMyy(rpt.date)}
                                                </div>
                                            ) : null
                                        })()}
                                        {cmd.nextSWOFillDate && (
                                            <div className="text-xs text-amber-600 mt-0.5 text-center font-medium">
                                                SWO: {formatToMMMyy(cmd.nextSWOFillDate)}
                                            </div>
                                        )}
                                    </>
                                )
                            })()}
                        </TableCell>
                    )

                    // CO cell
                    const coCell = (
                        <TableCell className="max-w-[140px]">
                            {(() => {
                                const isNonSWO = cmd.currentCO.fillCommunity && cmd.currentCO.fillCommunity !== '1110'
                                const displayName = isNonSWO ? `${cmd.currentCO.fillCommunity} Fill` : cmd.currentCO.name
                                return (
                                    <>
                                        <div className={`text-sm font-medium truncate ${isNonSWO ? 'text-muted-foreground italic' : 'text-blue-600'}`} title={cmd.currentCO.name}>{displayName}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {(() => {
                                                const dateStr = cmd.currentCO.timelineData?.q || cmd.currentCO.prd;
                                                if (!dateStr) return "CoC: N/A";
                                                const date = parseISO(dateStr);
                                                const formatted = isValid(date) ? format(date, "MMMyy").toUpperCase() : dateStr;
                                                return `CoC: ${formatted}`;
                                            })()}
                                        </div>
                                    </>
                                )
                            })()}
                        </TableCell>
                    )

                    // Name+health cell
                    const nameCell = (
                        <TableCell className="max-w-[200px] whitespace-normal">
                            <div className="flex items-start gap-2">
                                <span
                                    className={`mt-1.5 flex-shrink-0 w-2 h-2 rounded-full ${dotColor} ${health.approaching ? 'animate-pulse ring-2 ring-amber-400/50 ring-offset-1' : ''} ${health.status === 'red' && !health.approaching ? 'animate-pulse ring-2 ring-red-500/50 ring-offset-1' : ''}`}
                                    title={`${health.label}: ${health.detail}`}
                                />
                                <div>
                                    <button className="font-semibold leading-tight text-left hover:underline cursor-pointer" onClick={() => handleEditClick(cmd)}>
                                        {cmd.name}
                                    </button>
                                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground mt-0.5">
                                        <span>{cmd.uic !== "N/A" ? cmd.uic : ""}</span>
                                        {cmd.uic !== "N/A" && <span>•</span>}
                                        <span className="whitespace-nowrap">
                                            {cmd.tags?.includes("CO-SM")
                                                ? `${cmd.tourLength ? `${cmd.tourLength} mos` : ""}`
                                                : (cmd.platform || "N/A")
                                            }
                                        </span>
                                        <span>•</span>
                                        <span className="whitespace-nowrap">{cmd.location}</span>
                                    </div>
                                </div>
                            </div>
                        </TableCell>
                    )

                    // Expand button cell
                    const expandCell = (
                        <TableCell className="w-8 p-1.5">
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleExpand(cmd.id)}>
                                {expandedRows.has(cmd.id)
                                    ? <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                    : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                            </Button>
                        </TableCell>
                    )

                    return (
                        <React.Fragment key={cmd.id}>
                            <TableRow key={cmd.id}>
                                {expandCell}
                                {nameCell}
                                {coCell}
                                {isDirectCO ? (
                                    // Direct CO: P-CO and Slated CO columns
                                    <>
                                        <TableCell className="max-w-[150px]">
                                            {cmd.prospectiveCO?.name ? (
                                                <>
                                                    <div className="text-sm font-medium truncate text-yellow-600" title={cmd.prospectiveCO.name}>{cmd.prospectiveCO.name}</div>
                                                    {cmd.prospectiveCO.timelineData?.i && <div className="text-xs text-muted-foreground">RPT: {formatToMMMyy(cmd.prospectiveCO.timelineData.i)}</div>}
                                                </>
                                            ) : <span className="text-muted-foreground italic text-sm">-- Open --</span>}
                                        </TableCell>
                                        <TableCell className="max-w-[150px]">
                                            {(() => {
                                                const name = cmd.slatedCO?.name
                                                const hasRealName = name && name !== 'Forecast'
                                                if (hasRealName) {
                                                    return (
                                                        <>
                                                            <div className="text-sm font-medium truncate text-muted-foreground italic" title={name}>{name}</div>
                                                            {cmd.slatedCO?.timelineData?.i
                                                                ? <div className="text-xs text-muted-foreground">RPT: {formatToMMMyy(cmd.slatedCO.timelineData.i)}</div>
                                                                : <div className="text-xs text-muted-foreground">Dates TBD</div>
                                                            }
                                                        </>
                                                    )
                                                }
                                                return <span className="text-muted-foreground italic text-sm">-- Forecast --</span>
                                            })()}
                                        </TableCell>
                                    </>
                                ) : (
                                    // Fleet-Up: XO and P-XO columns
                                    <>
                                        <TableCell className="max-w-[160px]">
                                            <div className="flex items-start justify-between gap-1">
                                                <div className="overflow-hidden">
                                                    {(() => {
                                                        const isNonSWO = cmd.currentXO.fillCommunity && cmd.currentXO.fillCommunity !== '1110'
                                                        const displayName = isNonSWO ? `${cmd.currentXO.fillCommunity} Fill` : cmd.currentXO.name
                                                        return (
                                                            <>
                                                                <div className={`text-sm font-medium truncate ${isNonSWO ? 'text-muted-foreground italic' : 'text-green-600'}`} title={cmd.currentXO.name}>{displayName}</div>
                                                                <div className="text-xs text-muted-foreground">
                                                                    {(() => {
                                                                        const dateStr = cmd.currentXO.timelineData?.m || cmd.currentXO.prd;
                                                                        if (!dateStr) return "CoC: N/A";
                                                                        const date = parseISO(dateStr);
                                                                        const formatted = isValid(date) ? format(date, "MMMyy").toUpperCase() : dateStr;
                                                                        return `CoC: ${formatted}`;
                                                                    })()}
                                                                </div>
                                                            </>
                                                        )
                                                    })()}
                                                </div>
                                                <FleetUpChecklist command={cmd} onUpdate={(c) => persistUpdate(c, officers, "Checklist Updated")} />
                                            </div>
                                        </TableCell>
                                        <TableCell className="max-w-[140px]">
                                            {cmd.inboundXO ? (
                                                <>
                                                    {(() => {
                                                        const isNonSWO = cmd.inboundXO.fillCommunity && cmd.inboundXO.fillCommunity !== '1110'
                                                        const hasName = !!cmd.inboundXO.name
                                                        // Show community fill label even if no name is entered yet
                                                        if (isNonSWO) {
                                                            const displayName = hasName ? cmd.inboundXO.name : `${cmd.inboundXO.fillCommunity} Fill`
                                                            return <div className="text-sm font-medium truncate text-muted-foreground italic" title={displayName}>{displayName}</div>
                                                        }
                                                        if (!hasName) return null
                                                        return (
                                                            <div className={`text-sm font-medium truncate ${cmd.inboundXO.name.toLowerCase().includes('no fill') ? 'text-red-600' : 'text-yellow-600'}`} title={cmd.inboundXO.name}>{cmd.inboundXO.name}</div>
                                                        )
                                                    })()}
                                                    {cmd.inboundXO.timelineData?.i && <div className="text-xs text-muted-foreground">RPT: {formatToMMMyy(cmd.inboundXO.timelineData.i)}</div>}
                                                </>
                                            ) : <span className="text-muted-foreground italic text-sm">-- Open --</span>}
                                        </TableCell>
                                    </>
                                )}
                                {slateCell}
                            </TableRow>
                            {expandedRows.has(cmd.id) && (
                                <TableRow key={cmd.id + "-timeline"} className="bg-muted/20 hover:bg-muted/20">
                                    <TableCell colSpan={6} className="p-0 border-t-0">
                                        <CommandPipelineTimeline command={cmd} />
                                    </TableCell>
                                </TableRow>
                            )}
                        </React.Fragment>
                    )
                }

                if (showSpecialMission) {
                    return (
                        <div className="space-y-4">
                            {/* ── Direct Input CO section ─────────────────────────── */}
                            {directCOCommands.length > 0 && (
                                <div className="rounded-md border bg-card">
                                    {/* Section header */}
                                    <button
                                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
                                        onClick={toggleDirectCO}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />
                                            <span className="font-semibold text-sm">Direct Input CO</span>
                                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{directCOCommands.length} command{directCOCommands.length !== 1 ? 's' : ''}</span>
                                        </div>
                                        {directCOCollapsed ? <ChevronRight className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                                    </button>
                                    {!directCOCollapsed && (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-8" />
                                                    <TableHead>Command</TableHead>
                                                    <TableHead>CO</TableHead>
                                                    <TableHead>P-CO</TableHead>
                                                    <TableHead>Slated CO</TableHead>
                                                    <TableHead className="text-center">Slate</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {directCOCommands.map(renderCmdRow)}
                                            </TableBody>
                                        </Table>
                                    )}
                                </div>
                            )}

                            {/* ── Fleet-Up section ────────────────────────────────── */}
                            {fleetUpCommands.length > 0 && (
                                <div className="rounded-md border bg-card">
                                    {/* Section header */}
                                    <button
                                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
                                        onClick={toggleFleetUp}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
                                            <span className="font-semibold text-sm">Fleet-Up</span>
                                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{fleetUpCommands.length} command{fleetUpCommands.length !== 1 ? 's' : ''}</span>
                                        </div>
                                        {fleetUpCollapsed ? <ChevronRight className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                                    </button>
                                    {!fleetUpCollapsed && (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-8" />
                                                    <TableHead>Command</TableHead>
                                                    <TableHead>CO</TableHead>
                                                    <TableHead>XO</TableHead>
                                                    <TableHead>P-XO</TableHead>
                                                    <TableHead className="text-center">Slate</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {fleetUpCommands.map(renderCmdRow)}
                                            </TableBody>
                                        </Table>
                                    )}
                                </div>
                            )}

                            {directCOCommands.length === 0 && fleetUpCommands.length === 0 && (
                                <div className="rounded-md border bg-card p-8 text-center text-sm text-muted-foreground">
                                    No CO-SM commands found.
                                </div>
                            )}
                        </div>
                    )
                }

                // ── Standard commands — original single-table layout ──────────
                return (
                    <div className="rounded-md border bg-card">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-8" />
                                    <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => requestSort('name')}>
                                        Command {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                    </TableHead>
                                    <TableHead>CO</TableHead>
                                    <TableHead>XO</TableHead>
                                    <TableHead>P-XO</TableHead>
                                    <TableHead className="cursor-pointer hover:bg-muted/50 text-center" onClick={() => requestSort('slate')}>
                                        Slate {sortConfig?.key === 'slate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                    </TableHead>
                                    <TableHead className="w-[80px]" />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            No commands found in The Oracle.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredData.map((cmd) => (
                                        <React.Fragment key={cmd.id}>
                                            <TableRow key={cmd.id}>
                                                <TableCell className="w-8 p-1.5">
                                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleExpand(cmd.id)}>
                                                        {expandedRows.has(cmd.id) ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                                                    </Button>
                                                </TableCell>
                                                <TableCell className="max-w-[200px] whitespace-normal">
                                                    {(() => {
                                                        const health = getPipelineHealth(cmd)
                                                        const dotColor = health.status === 'green' ? 'bg-green-500' : health.status === 'yellow' ? 'bg-amber-400' : 'bg-red-500'
                                                        return (
                                                            <div className="flex items-start gap-2">
                                                                <span className={`mt-1.5 flex-shrink-0 w-2 h-2 rounded-full ${dotColor} ${health.approaching ? 'animate-pulse ring-2 ring-amber-400/50 ring-offset-1' : ''} ${health.status === 'red' && !health.approaching ? 'animate-pulse ring-2 ring-red-500/50 ring-offset-1' : ''}`} title={`${health.label}: ${health.detail}`} />
                                                                <div>
                                                                    <button className="font-semibold leading-tight text-left hover:underline cursor-pointer" onClick={() => handleEditClick(cmd)}>{cmd.name}</button>
                                                                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground mt-0.5">
                                                                        <span>{cmd.uic !== "N/A" ? cmd.uic : ""}</span>
                                                                        {cmd.uic !== "N/A" && <span>•</span>}
                                                                        <span className="whitespace-nowrap">{cmd.platform || "N/A"}</span>
                                                                        <span>•</span>
                                                                        <span className="whitespace-nowrap">{cmd.location}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })()}
                                                </TableCell>
                                                <TableCell className="max-w-[140px]">
                                                    {(() => {
                                                        const isNonSWO = cmd.currentCO.fillCommunity && cmd.currentCO.fillCommunity !== '1110'
                                                        const displayName = isNonSWO ? `${cmd.currentCO.fillCommunity} Fill` : cmd.currentCO.name
                                                        return (
                                                            <>
                                                                <div className={`text-sm font-medium truncate ${isNonSWO ? 'text-muted-foreground italic' : 'text-blue-600'}`} title={cmd.currentCO.name}>{displayName}</div>
                                                                <div className="text-xs text-muted-foreground">
                                                                    {(() => {
                                                                        const dateStr = cmd.currentCO.timelineData?.q || cmd.currentCO.prd;
                                                                        if (!dateStr) return "CoC: N/A";
                                                                        const date = parseISO(dateStr);
                                                                        const formatted = isValid(date) ? format(date, "MMMyy").toUpperCase() : dateStr;
                                                                        return `CoC: ${formatted}`;
                                                                    })()}
                                                                </div>
                                                            </>
                                                        )
                                                    })()}
                                                </TableCell>
                                                <TableCell className="max-w-[160px]">
                                                    <div className="flex items-start justify-between gap-1">
                                                        <div className="overflow-hidden">
                                                            {(() => {
                                                                const isNonSWO = cmd.currentXO.fillCommunity && cmd.currentXO.fillCommunity !== '1110'
                                                                const displayName = isNonSWO ? `${cmd.currentXO.fillCommunity} Fill` : cmd.currentXO.name
                                                                return (
                                                                    <>
                                                                        <div className={`text-sm font-medium truncate ${isNonSWO ? 'text-muted-foreground italic' : 'text-green-600'}`} title={cmd.currentXO.name}>{displayName}</div>
                                                                        <div className="text-xs text-muted-foreground">
                                                                            {(() => {
                                                                                const dateStr = cmd.currentXO.timelineData?.m || cmd.currentXO.prd;
                                                                                if (!dateStr) return "CoC: N/A";
                                                                                const date = parseISO(dateStr);
                                                                                const formatted = isValid(date) ? format(date, "MMMyy").toUpperCase() : dateStr;
                                                                                return `CoC: ${formatted}`;
                                                                            })()}
                                                                        </div>
                                                                    </>
                                                                )
                                                            })()}
                                                        </div>
                                                        <FleetUpChecklist command={cmd} onUpdate={(c) => persistUpdate(c, officers, "Checklist Updated")} />
                                                    </div>
                                                </TableCell>
                                                <TableCell className="max-w-[140px]">
                                                    {cmd.inboundXO ? (
                                                        <>
                                                            {(() => {
                                                                const isNonSWO = cmd.inboundXO.fillCommunity && cmd.inboundXO.fillCommunity !== '1110'
                                                                const displayName = isNonSWO ? `${cmd.inboundXO.fillCommunity} Fill` : cmd.inboundXO.name
                                                                const noName = !cmd.inboundXO.name
                                                                return noName ? null : (
                                                                    <div className={`text-sm font-medium truncate ${isNonSWO ? 'text-muted-foreground italic' : cmd.inboundXO.name.toLowerCase().includes('no fill') ? 'text-red-600' : 'text-yellow-600'}`} title={cmd.inboundXO.name}>{displayName}</div>
                                                                )
                                                            })()}
                                                            {cmd.inboundXO.timelineData?.i && <div className="text-xs text-muted-foreground">RPT: {formatToMMMyy(cmd.inboundXO.timelineData.i)}</div>}
                                                        </>
                                                    ) : <span className="text-muted-foreground italic text-sm">-- Open --</span>}
                                                </TableCell>
                                                <TableCell className="max-w-[140px]">
                                                    {(() => {
                                                        const health = getPipelineHealth(cmd)
                                                        const badgeClass = health.status === 'green' ? 'border-green-500 text-green-600 bg-green-500/10' : health.status === 'yellow' ? 'border-amber-400 text-amber-600 bg-amber-400/10' : 'border-red-500 text-red-600 bg-red-500/10'
                                                        const nextDate = cmd.inboundXO?.timelineData?.i || cmd.slatedXO?.reportDate || null
                                                        return (
                                                            <>
                                                                <Badge variant="outline" className={`w-full justify-center truncate ${badgeClass} ${health.approaching ? 'animate-pulse ring-2 ring-amber-400/60 ring-offset-1 bg-amber-400/20 font-bold' : ''} ${health.status === 'red' && !health.approaching ? 'animate-pulse ring-2 ring-red-500/60 ring-offset-1 font-bold' : ''}`} title={health.detail}>
                                                                    {health.approaching && '⚠ '}{cmd.nextSlateParams.requirement} via {cmd.nextSlateParams.targetBoardDate}
                                                                </Badge>
                                                                {getCdrCmdXoRptDate(cmd) && <div className="text-xs text-muted-foreground mt-1 text-center">XO RPT: {formatToMMMyy(getCdrCmdXoRptDate(cmd)!)}</div>}
                                                            </>
                                                        )
                                                    })()}
                                                </TableCell>
                                                <TableCell className="w-[80px]" />
                                            </TableRow>
                                            {expandedRows.has(cmd.id) && (
                                                <TableRow key={cmd.id + "-timeline"} className="bg-muted/20 hover:bg-muted/20">
                                                    <TableCell colSpan={7} className="p-0 border-t-0">
                                                        <CommandPipelineTimeline command={cmd} />
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </React.Fragment>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                )
            })()}




            <EditCommandDialog
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                command={editingCommand}
                onSave={handleSaveCommand}
                officers={officers}
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
