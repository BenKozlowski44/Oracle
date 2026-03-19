import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
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
import { CommandRow } from "./command-row"
import { CdrCmdRow } from "./cdr-cmd-row"
import { Search, Plus, ChevronDown, ChevronRight } from "lucide-react"
import { saveError } from "@/lib/notify"
import { getMetrics } from "@/services/storage"
import { CommandPipelineTimeline } from "./command-pipeline-timeline"
import { Button } from "@/components/ui/button"
import { formatToMMMyy } from "@/lib/utils"
import { getPipelineHealth } from "@/lib/slate-logic"
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
import { FleetUpChecklist } from "./fleet-up-checklist"
import { useOracleHandlers } from "./use-oracle-handlers"


interface OracleTableProps {
    data: OracleCommand[]
    selectedLocation: string
    onLocationChange: (location: string) => void
    officers: Officer[]
    setOfficers: (officers: Officer[]) => void
    initialMetrics?: Metrics
    showCoSM?: boolean
    onToggleView?: (showCoSM: boolean) => void
}

export function OracleTable({ data: initialData, selectedLocation, onLocationChange, officers, setOfficers, initialMetrics, showCoSM, onToggleView }: OracleTableProps) {
    const [data, setData] = useState<OracleCommand[]>(initialData)
    const [metrics, setMetrics] = useState<Metrics>(initialMetrics || { resolvedConflicts: 0 })
    const [searchParams] = useSearchParams()
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

    useEffect(() => {
        try {
            const stored = getMetrics()
            if (stored) setMetrics(stored)
        } catch (err) {
            console.error("Failed to load metrics", err)
        }
    }, []);

    // Extract unique locations for filter
    const locations = Array.from(new Set(data.map(d => d.location))).sort()
    // showSpecialMission — controlled by parent if props provided, otherwise local fallback
    const [localShowCoSM, setLocalShowCoSM] = useState(false)
    const showSpecialMission = showCoSM ?? localShowCoSM
    const setShowSpecialMission = (val: boolean) => {
        setLocalShowCoSM(val)
        onToggleView?.(val)
    }
    const [directCOCollapsed, setDirectCOCollapsed] = useState(() => {
        try { return localStorage.getItem('cosm-directco-collapsed') === 'true' } catch { return false }
    })
    const [fleetUpCollapsed, setFleetUpCollapsed] = useState(() => {
        try { return localStorage.getItem('cosm-fleetup-collapsed') === 'true' } catch { return false }
    })
    const toggleDirectCO = () => setDirectCOCollapsed(v => { const n = !v; try { localStorage.setItem('cosm-directco-collapsed', String(n)) } catch {} return n })
    const toggleFleetUp  = () => setFleetUpCollapsed(v  => { const n = !v; try { localStorage.setItem('cosm-fleetup-collapsed',  String(n)) } catch {} return n })

    // ── Handlers (extracted to hook) ─────────────────────────────────────
    const {
        handleEditClick,
        handleAddClick,
        handleSaveCommand,
        handleDeleteCommand,
        persistUpdate,
        handleCOTurnover,
        handleXOFleetUp,
        handlePCOFleetUp,
    } = useOracleHandlers({
        data,
        setData,
        metrics,
        setMetrics,
        officers,
        setOfficers,
        setIsEditOpen,
        setEditingCommand,
    })

    // ── Filter Logic ──────────────────────────────────────────────────────
    const filteredData = data.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.uic.includes(search) ||
            item.currentCO.name.toLowerCase().includes(search.toLowerCase()) ||
            item.currentXO.name.toLowerCase().includes(search.toLowerCase())

        const matchesLocation = selectedLocation === "All" || item.location === selectedLocation

        const isSpecialMission = item.tags?.includes("CO-SM");
        const matchesType = showSpecialMission ? isSpecialMission : !isSpecialMission;

        return matchesSearch && matchesLocation && matchesType
    })

    // ── Sort Logic ────────────────────────────────────────────────────────
    if (sortConfig !== null) {
        filteredData.sort((a, b) => {
            let aValue: any = a[sortConfig.key as keyof OracleCommand];
            let bValue: any = b[sortConfig.key as keyof OracleCommand];

            if (sortConfig.key === 'platform') {
                aValue = a.platform || "";
                bValue = b.platform || "";
                const comparison = aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
                return sortConfig.direction === 'asc' ? comparison : -comparison;
            }
            if (sortConfig.key === 'slate') {
                aValue = a.nextSlateParams?.targetBoardDate || "TBD";
                bValue = b.nextSlateParams?.targetBoardDate || "TBD";
                const comparison = aValue.localeCompare(bValue);
                return sortConfig.direction === 'asc' ? comparison : -comparison;
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    } else {
        filteredData.sort((a, b) => {
            if (a.location < b.location) return -1;
            if (a.location > b.location) return 1;
            return a.name.localeCompare(b.name);
        })
    }

    const requestSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    // ── CO-SM section splits ──────────────────────────────────────────────
    const healthOrder = (cmd: OracleCommand) => {
        const h = getPipelineHealth(cmd)
        return h.status === 'red' ? 0 : h.status === 'yellow' ? 1 : 2
    }
    const coSMSort = (a: OracleCommand, b: OracleCommand) =>
        healthOrder(a) - healthOrder(b) || a.name.localeCompare(b.name)
    const directCOCommands = filteredData.filter(c => c.rotationStyle === 'DirectCO').sort(coSMSort)
    const fleetUpCommands  = filteredData.filter(c => c.rotationStyle !== 'DirectCO').sort(coSMSort)

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#c9a227]/50" />
                    <Input
                        placeholder="Search The Oracle (Ship, CO)..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 bg-[#07111f] border-[#c9a227]/30 text-[#c9a227] placeholder:text-[#8a9bb0] text-xs font-semibold tracking-widest uppercase focus-visible:ring-[#c9a227]/30 focus-visible:border-[#c9a227]/60"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Select value={selectedLocation} onValueChange={onLocationChange}>
                        <SelectTrigger className="w-[180px] bg-[#07111f] border-[#c9a227]/30 text-[#8a9bb0] text-xs font-semibold tracking-widest uppercase">
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
                        variant="outline"
                        onClick={() => setShowSpecialMission(!showSpecialMission)}
                        className={showSpecialMission
                            ? 'bg-[#c9a227] text-[#07111f] text-xs font-semibold tracking-widest uppercase hover:bg-[#f0c040] border-transparent transition-all duration-150'
                            : 'bg-[#07111f] border-[#c9a227]/30 text-[#c9a227] text-xs font-semibold tracking-widest uppercase hover:bg-[#c9a227]/10 hover:text-[#f0c040] transition-all duration-150'}
                    >
                        {showSpecialMission ? "Show CDR CMDs" : "Show CO-SM"}
                    </Button>
                    <Button onClick={() => handleAddClick('CDR')} className="gap-2 bg-[#c9a227] text-[#07111f] text-xs font-semibold tracking-widest uppercase hover:bg-[#f0c040] border-transparent transition-all duration-150">
                        <Plus className="h-4 w-4" />
                        Add CDR CMD
                    </Button>
                    <Button onClick={() => handleAddClick('COSM')} variant="outline" className="gap-2 bg-[#07111f] border-[#c9a227]/30 text-[#c9a227] text-xs font-semibold tracking-widest uppercase hover:bg-[#c9a227]/10 hover:text-[#f0c040] transition-all duration-150">
                        <Plus className="h-4 w-4" />
                        Add CO-SM
                    </Button>
                </div>
            </div>

            {/* ── CO-SM view ─────────────────────────────────────────────── */}
            {showSpecialMission ? (
                <div className="space-y-4">
                    {/* Direct Input CO section */}
                    {directCOCommands.length > 0 && (
                        <div className="rounded-md border bg-card">
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
                                            <TableHead className="text-center w-[150px]">Slate</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {directCOCommands.map(cmd => (
                                            <CommandRow
                                                key={cmd.id}
                                                cmd={cmd}
                                                expandedRows={expandedRows}
                                                onToggleExpand={toggleExpand}
                                                onEditClick={handleEditClick}
                                                onPersistUpdate={persistUpdate}
                                                officers={officers}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </div>
                    )}

                    {/* Fleet-Up section */}
                    {fleetUpCommands.length > 0 && (
                        <div className="rounded-md border bg-card">
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
                                            <TableHead className="text-center w-[150px]">Slate</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {fleetUpCommands.map(cmd => (
                                            <CommandRow
                                                key={cmd.id}
                                                cmd={cmd}
                                                expandedRows={expandedRows}
                                                onToggleExpand={toggleExpand}
                                                onEditClick={handleEditClick}
                                                onPersistUpdate={persistUpdate}
                                                officers={officers}
                                            />
                                        ))}
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
            ) : (
                /* ── Standard CDR CMD view ─────────────────────────────── */
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
                                <TableHead className="cursor-pointer hover:bg-muted/50 text-center w-[150px]" onClick={() => requestSort('slate')}>
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
                                    <CdrCmdRow
                                        key={cmd.id}
                                        cmd={cmd}
                                        expandedRows={expandedRows}
                                        onToggleExpand={toggleExpand}
                                        onEditClick={handleEditClick}
                                        onPersistUpdate={persistUpdate}
                                        officers={officers}
                                    />
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}

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
                onPCOFleetUp={handlePCOFleetUp}
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
