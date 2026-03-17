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
import { Search, Plus, ChevronDown, ChevronRight } from "lucide-react"
import { saveError } from "@/lib/notify"
import { getMetrics } from "@/services/storage"
import { CommandPipelineTimeline } from "./command-pipeline-timeline"
import { Button } from "@/components/ui/button"
import { formatToMMMyy } from "@/lib/utils"
import { getPipelineHealth, predictNextVacancyDate, getCdrCmdXoRptDate } from "@/lib/slate-logic"
import { format, parseISO, isValid } from "date-fns"
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
}

export function OracleTable({ data: initialData, selectedLocation, onLocationChange, officers, setOfficers, initialMetrics }: OracleTableProps) {
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
    const [showSpecialMission, setShowSpecialMission] = useState(false)
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
                                filteredData.map((cmd) => {
                                    const rowHealth = getPipelineHealth(cmd)
                                    const rowBorder = rowHealth.status === 'green' ? 'border-l-green-500' : rowHealth.status === 'yellow' ? 'border-l-amber-400' : 'border-l-red-500'
                                    return (
                                    <React.Fragment key={cmd.id}>
                                        <TableRow key={cmd.id}>
                                            <TableCell className={`w-8 p-1.5 border-l-4 ${rowBorder}`}>
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
                                            <TableCell className="w-[150px] min-w-[150px]">
                                                {(() => {
                                                    const liveBoard = predictNextVacancyDate(cmd)
                                                    const cmdLive: OracleCommand = liveBoard !== 'TBD'
                                                        ? { ...cmd, nextSlateParams: { ...cmd.nextSlateParams, targetBoardDate: liveBoard } }
                                                        : cmd
                                                    const health = getPipelineHealth(cmdLive)
                                                    const badgeClass = health.status === 'green' ? 'border-green-500 text-green-600 bg-green-500/10' : health.status === 'yellow' ? 'border-amber-400 text-amber-600 bg-amber-400/10' : 'border-red-500 text-red-600 bg-red-500/10'
                                                    return (
                                                        <>
                                                            <Badge variant="outline" className={`w-full justify-center truncate ${badgeClass} ${health.approaching ? 'animate-pulse ring-2 ring-amber-400/60 ring-offset-1 bg-amber-400/20 font-bold' : ''} ${health.status === 'red' && !health.approaching ? 'animate-pulse ring-2 ring-red-500/60 ring-offset-1 font-bold' : ''}`} title={health.detail}>
                                                                {health.approaching && '⚠ '}{cmdLive.nextSlateParams.requirement} via {cmdLive.nextSlateParams.targetBoardDate}
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
                                    )})
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
