"use client"

import { useState, useMemo } from "react"
import type { Officer, OracleCommand, Slate } from "@/lib/types"
import { AlertTriangle, ArrowUpDown, ArrowUp, ArrowDown, CheckCircle2, ChevronRight } from "lucide-react"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
    Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover"
import { formatToMMMyy } from "@/lib/utils"
import { SlateRequirement } from "@/lib/types"
import { saveError, notifySuccess } from "@/lib/notify"

interface AlignmentMatrixReportProps {
    slateId: string
    slate: Slate | undefined
    officers: Officer[]
    oracleData: OracleCommand[]
}

export function AlignmentMatrixReport({ slateId, slate, officers, oracleData }: AlignmentMatrixReportProps) {

    // ── Local mutable requirements state ─────────────────────────────
    const [requirements, setRequirements] = useState<SlateRequirement[]>(
        () => slate?.requirements || []
    )

    // ── Sort state ────────────────────────────────────────────────────
    const [sortCol, setSortCol] = useState<string | null>(null)
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

    // ── Assignment in-progress ─────────────────────────────────────────
    const [assigning, setAssigning] = useState<string | null>(null) // requirementId being assigned

    if (!slate) {
        return (
            <div className="p-8 text-center text-muted-foreground border border-dashed rounded-md">
                Slate not found.
            </div>
        )
    }

    const allCandidates = (slate.candidates || [])
        .map(cid => officers.find(o => o.id === cid))
        .filter(Boolean) as typeof officers

    // ── Group requirements by preference format ────────────────────────
    const uniquePrefsMap = new Map<string, {
        prefFormat: string;
        role: string;
        tags: string[];
        count: number;
        requirementIds: string[];
    }>()

    requirements.forEach(r => {
        const cmd = oracleData.find(c => c.id === r.commandId)
        const pf = `${cmd?.platform || 'Unknown'} - ${cmd?.location || 'Unknown'}`
        if (!uniquePrefsMap.has(pf)) {
            uniquePrefsMap.set(pf, { prefFormat: pf, role: r.role, tags: cmd?.tags || [], count: 1, requirementIds: [r.id] })
        } else {
            const ex = uniquePrefsMap.get(pf)!
            ex.count += 1
            ex.requirementIds.push(r.id)
            if (cmd?.tags) cmd.tags.forEach(t => { if (!ex.tags.includes(t)) ex.tags.push(t) })
        }
    })
    const groupedPrefs = Array.from(uniquePrefsMap.values())

    // ── Fill date map ─────────────────────────────────────────────────
    const prefFillDates = new Map<string, Date>()
    requirements.forEach(r => {
        const cmd = oracleData.find(c => c.id === r.commandId)
        const pf = `${cmd?.platform || 'Unknown'} - ${cmd?.location || 'Unknown'}`
        if (r.incumbentPrd) {
            const d = new Date(r.incumbentPrd)
            const ex = prefFillDates.get(pf)
            if (!ex || d < ex) prefFillDates.set(pf, d)
        }
    })

    const MIN_PIPELINE_MONTHS = 6

    // ── Assignment helpers ─────────────────────────────────────────────
    // Which candidate is assigned to each prefFormat (returns first filled)
    const getAssignment = (prefFormat: string) => {
        const reqs = requirements.filter(r => {
            const cmd = oracleData.find(c => c.id === r.commandId)
            const pf = `${cmd?.platform || 'Unknown'} - ${cmd?.location || 'Unknown'}`
            return pf === prefFormat && r.filledBy
        })
        return reqs // return all filled reqs for this pf
    }

    const filledSlotsFor = (prefFormat: string) =>
        requirements.filter(r => {
            const cmd = oracleData.find(c => c.id === r.commandId)
            const pf = `${cmd?.platform || 'Unknown'} - ${cmd?.location || 'Unknown'}`
            return pf === prefFormat && r.filledBy
        }).length

    const openSlotsFor = (prefFormat: string) => {
        const group = groupedPrefs.find(g => g.prefFormat === prefFormat)
        if (!group) return 0
        return group.count - filledSlotsFor(prefFormat)
    }

    const assignedCommandFor = (candidateId: string) => {
        const req = requirements.find(r => r.filledBy === candidateId)
        if (!req) return null
        const cmd = oracleData.find(c => c.id === req.commandId)
        return cmd ? `${cmd.platform || ''} - ${cmd.location || ''}` : req.commandName
    }

    // ── Demand: count candidates with this command as their #1 pick ────
    const getDemand = (prefFormat: string) => {
        return (slate.candidateProfiles || []).filter(prof => {
            const top = prof.preferences.find(p => p.rank === 1)
            return top?.key === prefFormat
        }).length
    }

    // ── Preference rank + pipeline warning ────────────────────────────
    const getPreferenceRank = (candidateId: string, prefFormat: string) => {
        const profile = slate.candidateProfiles?.find(p => p.officerId === candidateId)
        if (!profile) return null
        const pref = profile.preferences.find(p => p.key === prefFormat)
        if (!pref) return null

        let pipelineWarning = false, pipelineDetail = ''
        if (profile.availabilityDate) {
            const fillDate = prefFillDates.get(prefFormat)
            if (fillDate) {
                const availDate = new Date(profile.availabilityDate)
                const pipelineEnd = new Date(availDate)
                pipelineEnd.setMonth(pipelineEnd.getMonth() + MIN_PIPELINE_MONTHS)
                if (pipelineEnd > fillDate) {
                    pipelineWarning = true
                    pipelineDetail = `Avail ${formatToMMMyy(profile.availabilityDate)} + ${MIN_PIPELINE_MONTHS}mo pipeline ends ${formatToMMMyy(pipelineEnd.toISOString())} — fill date is ${formatToMMMyy(fillDate.toISOString())}`
                }
            }
        }
        return { rank: pref.rank, pipelineWarning, pipelineDetail }
    }

    const getAvailDate = (candidateId: string) =>
        slate.candidateProfiles?.find(p => p.officerId === candidateId)?.availabilityDate || null

    // ── Sorted candidates ─────────────────────────────────────────────
    const sortedCandidates = useMemo(() => {
        if (!sortCol) return allCandidates
        return [...allCandidates].sort((a, b) => {
            const ra = slate.candidateProfiles?.find(p => p.officerId === a.id)
                ?.preferences.find(p => p.key === sortCol)?.rank ?? 9999
            const rb = slate.candidateProfiles?.find(p => p.officerId === b.id)
                ?.preferences.find(p => p.key === sortCol)?.rank ?? 9999
            return sortDir === 'asc' ? ra - rb : rb - ra
        })
    }, [allCandidates, sortCol, sortDir, slate.candidateProfiles])

    const handleSortCol = (pf: string) => {
        if (sortCol === pf) {
            if (sortDir === 'asc') setSortDir('desc')
            else { setSortCol(null); setSortDir('asc') }
        } else {
            setSortCol(pf); setSortDir('asc')
        }
    }

    // ── Assign from cell ──────────────────────────────────────────────
    const handleAssign = async (candidateId: string, prefFormat: string) => {
        // Find an open requirement for this prefFormat
        const openReq = requirements.find(r => {
            const cmd = oracleData.find(c => c.id === r.commandId)
            const pf = `${cmd?.platform || 'Unknown'} - ${cmd?.location || 'Unknown'}`
            return pf === prefFormat && !r.filledBy
        })
        if (!openReq) { saveError('No open slots for this command'); return }

        setAssigning(openReq.id)
        try {
            const res = await fetch(`/api/slates/${slateId}/assign`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ requirementId: openReq.id, officerId: candidateId }),
            })
            if (res.ok) {
                const data = await res.json()
                setRequirements(prev => prev.map(r => r.id === openReq.id ? data.requirement : r))
                const officerName = officers.find(o => o.id === candidateId)?.name ?? 'Officer'
                notifySuccess(`${officerName} assigned to ${prefFormat}`)
            } else {
                const err = await res.json()
                saveError(`Assignment failed: ${err.error}`)
            }
        } catch {
            saveError('Error saving assignment')
        } finally {
            setAssigning(null)
        }
    }

    const handleUnassign = async (requirementId: string, candidateId: string) => {
        setAssigning(requirementId)
        try {
            const res = await fetch(`/api/slates/${slateId}/assign`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ requirementId, officerId: null }),
            })
            if (res.ok) {
                const data = await res.json()
                setRequirements(prev => prev.map(r => r.id === requirementId ? data.requirement : r))
                const officerName = officers.find(o => o.id === candidateId)?.name ?? 'Officer'
                notifySuccess(`${officerName} unassigned`)
            } else {
                const err = await res.json()
                saveError(`Unassign failed: ${err.error}`)
            }
        } catch {
            saveError('Error saving change')
        } finally {
            setAssigning(null)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Alignment Matrix: {slate.name}</h2>
                    <p className="text-sm text-muted-foreground">
                        {allCandidates.length} Candidates • {requirements.length} Requirements ({groupedPrefs.length} Unique Preferences)
                        {sortCol && <span className="ml-2 text-primary">• Sorted by {sortCol}</span>}
                    </p>
                </div>
                {sortCol && (
                    <Button variant="ghost" size="sm" onClick={() => { setSortCol(null); setSortDir('asc') }}>
                        Reset Sort
                    </Button>
                )}
            </div>

            <div className="border rounded-md overflow-x-auto print:overflow-visible print:border-none print:m-0 print:p-0">
                <Table className="print:table-fixed print:w-full print:text-[8px] print:leading-[1.1]">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[250px] sticky left-0 bg-background z-10 font-bold border-r print:w-[120px] print:static print:p-1 print:break-words">
                                Candidate
                            </TableHead>
                            <TableHead className="w-[100px] bg-background z-10 border-r text-xs print:w-[40px] print:static print:text-[8px] print:p-1 print:break-all">
                                Avail
                            </TableHead>
                            {groupedPrefs.map(group => {
                                const filled = filledSlotsFor(group.prefFormat)
                                const isFullyFilled = filled >= group.count
                                const demand = getDemand(group.prefFormat)
                                const isSorted = sortCol === group.prefFormat
                                return (
                                    <TableHead
                                        key={group.prefFormat}
                                        className="min-w-[160px] text-center border-l bg-muted/20 print:min-w-0 print:w-auto print:p-0.5 print:-tracking-tighter"
                                    >
                                        <div className="flex flex-col items-center gap-1">
                                            <button
                                                className="flex flex-col items-center gap-0.5 hover:text-primary transition-colors w-full"
                                                onClick={() => handleSortCol(group.prefFormat)}
                                                title="Click to sort by this column"
                                            >
                                                <span className="font-semibold print:text-[7px] text-center">{group.prefFormat}</span>
                                                <span className="text-[10px] text-muted-foreground font-normal">{group.role}</span>
                                                <span className="text-muted-foreground">
                                                    {isSorted
                                                        ? (sortDir === 'asc' ? <ArrowUp className="h-3 w-3 text-primary" /> : <ArrowDown className="h-3 w-3 text-primary" />)
                                                        : <ArrowUpDown className="h-3 w-3 opacity-30" />}
                                                </span>
                                            </button>
                                            <div className="flex gap-1 flex-wrap justify-center">
                                                {group.count > 1 && (
                                                    <span className="text-[10px] text-muted-foreground">({group.count} Open)</span>
                                                )}
                                                {group.tags?.includes('CO-SM') && (
                                                    <Badge variant="secondary" className="text-[8px] h-4 px-1">CO-SM</Badge>
                                                )}
                                                {demand > 0 && (
                                                    <Badge className={`text-[10px] h-5 px-1.5 ${demand > openSlotsFor(group.prefFormat) ? 'bg-amber-100 text-amber-800 border border-amber-200 hover:bg-amber-100' : 'bg-slate-100 text-slate-600 border hover:bg-slate-100'}`}>
                                                        ★ {demand}
                                                    </Badge>
                                                )}
                                                {isFullyFilled && (
                                                    <Badge className="text-[10px] h-5 px-1.5 bg-green-100 text-green-800 border border-green-200 hover:bg-green-100">
                                                        Filled
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allCandidates.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={groupedPrefs.length + 2} className="h-24 text-center">
                                    No candidates on slate.
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedCandidates.map(candidate => {
                                const assignedCmd = assignedCommandFor(candidate.id)
                                const isAssigned = !!assignedCmd
                                const assignedReq = requirements.find(r => r.filledBy === candidate.id)

                                return (
                                    <TableRow
                                        key={candidate.id}
                                        className={`print:break-inside-avoid ${isAssigned ? 'bg-muted/30' : ''}`}
                                    >
                                        {/* ── Candidate column ── */}
                                        <TableCell className="font-medium sticky left-0 bg-background z-10 border-r print:static print:p-1 print:align-top">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="print:text-[9px] print:leading-tight">{candidate.name}</span>
                                                    {isAssigned && (
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <div className="flex items-center gap-1 text-green-700 print:hidden">
                                                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                                                    </div>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <div className="text-xs space-y-1">
                                                                        <p>Assigned: {assignedCmd}</p>
                                                                        {assignedReq && (
                                                                            <button
                                                                                className="text-destructive hover:underline text-[11px]"
                                                                                onClick={() => handleUnassign(assignedReq.id, candidate.id)}
                                                                            >
                                                                                Remove assignment
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    )}
                                                </div>
                                                <span className="text-xs text-muted-foreground print:text-[7px]">
                                                    {candidate.rank} • {candidate.designator}
                                                    {isAssigned && <span className="ml-1 text-green-700">• {assignedCmd}</span>}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* ── Avail column ── */}
                                        <TableCell className="border-r text-xs print:text-[8px] print:p-1 print:align-top">
                                            {(() => {
                                                const d = getAvailDate(candidate.id)
                                                return d
                                                    ? <span className="text-muted-foreground">{formatToMMMyy(d)}</span>
                                                    : <span className="text-muted-foreground italic">-</span>
                                            })()}
                                        </TableCell>

                                        {/* ── Preference cells ── */}
                                        {groupedPrefs.map(group => {
                                            const cell = getPreferenceRank(candidate.id, group.prefFormat)
                                            const openSlots = openSlotsFor(group.prefFormat)
                                            const canAssign = !!cell && !isAssigned && openSlots > 0
                                            const isAssignedHere = assignedCmd === group.prefFormat
                                            const assignedReqForCol = getAssignment(group.prefFormat)

                                            return (
                                                <TableCell
                                                    key={group.prefFormat}
                                                    className={`text-center border-l p-2 print:p-0 print:align-middle ${isAssignedHere ? 'bg-green-50' : ''}`}
                                                >
                                                    {cell ? (
                                                        canAssign ? (
                                                            /* Clickable cell → assign popover */
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <div className="relative inline-flex items-center justify-center cursor-pointer group/cell">
                                                                        <div className={`
                                                                            inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
                                                                            print:w-4 print:h-4 print:text-[8px] mx-auto transition-all group-hover/cell:ring-2
                                                                            ${cell.rank >= 1 && cell.rank <= 3 ? 'bg-green-100 text-green-700 border border-green-200 group-hover/cell:ring-green-400' :
                                                                                cell.rank >= 4 && cell.rank <= 6 ? 'bg-amber-100 text-amber-700 border border-amber-200 group-hover/cell:ring-amber-400' :
                                                                                    'bg-rose-100 text-rose-700 border border-rose-200 group-hover/cell:ring-rose-400'}
                                                                        `}>
                                                                            {cell.rank}
                                                                        </div>
                                                                        {cell.pipelineWarning && (
                                                                            <AlertTriangle className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 text-amber-500 print:hidden" />
                                                                        )}
                                                                    </div>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-64 p-3" side="top">
                                                                    <div className="space-y-3">
                                                                        <div className="text-sm font-medium">Assign to {group.prefFormat}?</div>
                                                                        <div className="text-xs text-muted-foreground">
                                                                            <span className="font-medium">{candidate.name}</span> ranked this #{cell.rank}
                                                                            {cell.pipelineWarning && (
                                                                                <p className="text-amber-600 mt-1">⚠️ {cell.pipelineDetail}</p>
                                                                            )}
                                                                        </div>
                                                                        <div className="flex gap-2">
                                                                            <Button
                                                                                size="sm"
                                                                                className="flex-1"
                                                                                disabled={assigning !== null}
                                                                                onClick={() => handleAssign(candidate.id, group.prefFormat)}
                                                                            >
                                                                                <ChevronRight className="h-3.5 w-3.5 mr-1" />
                                                                                Assign
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </PopoverContent>
                                                            </Popover>
                                                        ) : (
                                                            /* Non-clickable cell (assigned or no slots) */
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <div className={`relative inline-flex items-center justify-center ${isAssigned || openSlots === 0 ? 'opacity-50' : ''}`}>
                                                                            <div className={`
                                                                                inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
                                                                                print:w-4 print:h-4 print:text-[8px] mx-auto
                                                                                ${isAssignedHere ? 'ring-2 ring-green-400' : ''}
                                                                                ${cell.rank >= 1 && cell.rank <= 3 ? 'bg-green-100 text-green-700 border border-green-200' :
                                                                                    cell.rank >= 4 && cell.rank <= 6 ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                                                                                        'bg-rose-100 text-rose-700 border border-rose-200'}
                                                                            `}>
                                                                                {cell.rank}
                                                                            </div>
                                                                            {cell.pipelineWarning && (
                                                                                <AlertTriangle className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 text-amber-500 print:hidden" />
                                                                            )}
                                                                        </div>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        {cell.pipelineWarning
                                                                            ? <p className="text-amber-600 text-xs max-w-[220px]">⚠️ {cell.pipelineDetail}</p>
                                                                            : isAssigned
                                                                                ? <p className="text-xs">Already assigned to {assignedCmd}</p>
                                                                                : openSlots === 0
                                                                                    ? <p className="text-xs">All slots for this command are filled</p>
                                                                                    : <p>Ranked #{cell.rank}</p>}
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        )
                                                    ) : (
                                                        <div className="h-8 w-8 mx-auto print:w-4 print:h-4" />
                                                    )}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Legend */}
            <div className="p-4 bg-muted/50 rounded-lg space-y-2 print:p-2 print:mt-4 print:bg-transparent">
                <div className="flex flex-wrap gap-6 text-sm print:text-xs">
                    <div className="flex items-center gap-2">
                        <div className="px-2 h-6 min-w-[1.5rem] rounded-full bg-green-100 text-green-700 border border-green-200 flex items-center justify-center text-xs font-bold">1–3</div>
                        <span>High Preference</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="px-2 h-6 min-w-[1.5rem] rounded-full bg-amber-100 text-amber-700 border border-amber-200 flex items-center justify-center text-xs font-bold">4–6</div>
                        <span>Medium Preference</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="px-2 h-6 min-w-[1.5rem] rounded-full bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center text-xs font-bold">7+</div>
                        <span>Lower Preference</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-700" />
                        <span>Assigned</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className="text-[10px] h-5 px-1.5 bg-amber-100 text-amber-800 border border-amber-200 hover:bg-amber-100">★ N</Badge>
                        <span>N candidates ranked this #1 (contested if amber)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <span>Pipeline timing conflict</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground italic text-xs">
                        Click ranked cell to assign • Click column header to sort
                    </div>
                </div>
            </div>
        </div>
    )
}
