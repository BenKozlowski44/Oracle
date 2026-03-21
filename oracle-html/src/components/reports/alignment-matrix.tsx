import { useState, useMemo } from "react"
import type { Officer, OracleCommand, Slate } from "@/lib/types"
import { AlertTriangle, ArrowUpDown, ArrowUp, ArrowDown, CheckCircle2, ChevronRight, MapPin, Ship } from "lucide-react"
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

const MIN_PIPELINE_MONTHS = 6       // CDR CMD standard
const COSM_PIPELINE_MONTHS = 3      // CO-SM shorter pipeline

// ── Requirement classification ────────────────────────────────────────────────
function classifyReq(r: SlateRequirement, oracleData: OracleCommand[]): 'cosm' | 'directco' | 'cdrcmd' {
    const cmd = oracleData.find(c => c.id === r.commandId)
    if (r.role === 'CO-SM' || cmd?.tags?.includes('CO-SM')) return 'cosm'
    if (cmd?.rotationStyle === 'DirectCO') return 'directco'
    return 'cdrcmd'
}

// ── prefFormat helper ─────────────────────────────────────────────────────────
function prefFmt(cmd: OracleCommand | undefined): string {
    return `${cmd?.platform || 'Unknown'} - ${cmd?.location || 'Unknown'}`
}

// ── Section header component ──────────────────────────────────────────────────
function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
        <div className="flex items-baseline gap-3 border-b-2 border-gray-700 pb-2 mb-4 print:mb-2">
            <h2 className="text-lg font-bold tracking-wide uppercase text-gray-800">{title}</h2>
            {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
        </div>
    )
}

// ── Rank badge ────────────────────────────────────────────────────────────────
function RankBadge({ rank, pipelineWarning, maxRanks }: { rank: number; pipelineWarning: boolean; maxRanks?: number }) {
    const hi = maxRanks ? Math.ceil(maxRanks / 3) : 3
    const mid = maxRanks ? Math.ceil(2 * maxRanks / 3) : 6
    const cls = rank <= hi
        ? 'bg-green-100 text-green-700 border-green-200'
        : rank <= mid
            ? 'bg-amber-100 text-amber-700 border-amber-200'
            : 'bg-rose-100 text-rose-700 border-rose-200'
    return (
        <div className="relative inline-flex items-center justify-center">
            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold border ${cls} print:w-4 print:h-4 print:text-[8px] mx-auto`}>
                {rank}
            </div>
            {pipelineWarning && <AlertTriangle className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 text-amber-500 print:hidden" />}
        </div>
    )
}

export function AlignmentMatrixReport({ slateId, slate, officers, oracleData }: AlignmentMatrixReportProps) {

    const [requirements, setRequirements] = useState<SlateRequirement[]>(() => slate?.requirements || [])
    const [sortCol, setSortCol] = useState<string | null>(null)
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
    const [assigning, setAssigning] = useState<string | null>(null)

    if (!slate) {
        return <div className="p-8 text-center text-muted-foreground border border-dashed rounded-md">Slate not found.</div>
    }

    const allCandidates = (slate.candidates || [])
        .map(cid => officers.find(o => o.id === cid))
        .filter(Boolean) as typeof officers

    // ── Classify requirements ─────────────────────────────────────────────────
    const cdrCmdReqs = requirements.filter(r => classifyReq(r, oracleData) === 'cdrcmd')
    const directCoReqs = requirements.filter(r => classifyReq(r, oracleData) === 'directco')
    const cosmReqs = requirements.filter(r => classifyReq(r, oracleData) === 'cosm')

    // ── Classify candidates ───────────────────────────────────────────────────
    const isCosmCandidate = (o: Officer) =>
        !!(o.screened?.includes('CO-SM') || o.listShift === 'CO-SM')

    const cosmCandidates = allCandidates.filter(isCosmCandidate)
    const regularCandidates = allCandidates.filter(o => !isCosmCandidate(o))

    // Direct CO candidates: non-CO-SM candidates whose profile preferences
    // include any DirectCO prefFormat
    const directCoPrefFormats = new Set(
        directCoReqs.map(r => prefFmt(oracleData.find(c => c.id === r.commandId)))
    )
    const directCoCandidates = regularCandidates.filter(o => {
        const profile = slate.candidateProfiles?.find(p => p.officerId === o.id)
        return profile?.preferences.some(p => directCoPrefFormats.has(p.key))
    })
    const cdrCmdCandidates = regularCandidates.filter(o => !directCoCandidates.includes(o))

    // ── Build grouped prefs for a given requirement set ───────────────────────
    const buildGroupedPrefs = (reqs: SlateRequirement[]) => {
        const map = new Map<string, { prefFormat: string; role: string; tags: string[]; count: number; requirementIds: string[] }>()
        reqs.forEach(r => {
            const cmd = oracleData.find(c => c.id === r.commandId)
            const pf = prefFmt(cmd)
            if (!map.has(pf)) {
                map.set(pf, { prefFormat: pf, role: r.role, tags: cmd?.tags || [], count: 1, requirementIds: [r.id] })
            } else {
                const ex = map.get(pf)!
                ex.count++
                ex.requirementIds.push(r.id)
                cmd?.tags?.forEach(t => { if (!ex.tags.includes(t)) ex.tags.push(t) })
            }
        })
        return Array.from(map.values())
    }

    // ── Build fill date map for a given requirement set ───────────────────────
    // Only OPEN (unfilled) slots drive the fill date — a filled slot is no longer
    // an open vacancy, so its incumbentPrd should not trigger pipeline warnings.
    const buildFillDates = (reqs: SlateRequirement[]) => {
        const fdMap = new Map<string, Date>()
        reqs.filter(r => !r.filledBy).forEach(r => {
            const cmd = oracleData.find(c => c.id === r.commandId)
            const pf = prefFmt(cmd)
            if (r.incumbentPrd) {
                const d = new Date(r.incumbentPrd)
                const ex = fdMap.get(pf)
                if (!ex || d < ex) fdMap.set(pf, d)
            }
        })
        return fdMap
    }

    // ── Pipeline check helper ─────────────────────────────────────────────────
    const checkPipeline = (candidateId: string, prefFormat: string, fillDates: Map<string, Date>, months: number) => {
        const profile = slate.candidateProfiles?.find(p => p.officerId === candidateId)
        if (!profile?.availabilityDate) return { pipelineWarning: false, pipelineDetail: '' }
        const fillDate = fillDates.get(prefFormat)
        if (!fillDate) return { pipelineWarning: false, pipelineDetail: '' }
        const availDate = new Date(profile.availabilityDate)
        const pipelineEnd = new Date(availDate)
        pipelineEnd.setMonth(pipelineEnd.getMonth() + months)
        if (pipelineEnd > fillDate) {
            return {
                pipelineWarning: true,
                pipelineDetail: `Avail ${formatToMMMyy(profile.availabilityDate)} + ${months}mo pipeline ends ${formatToMMMyy(pipelineEnd.toISOString())} — fill date is ${formatToMMMyy(fillDate.toISOString())}`
            }
        }
        return { pipelineWarning: false, pipelineDetail: '' }
    }

    // ── Standard pref rank lookup (SlateCandidateProfile) ────────────────────
    const getPrefRank = (candidateId: string, prefFormat: string, fillDates: Map<string, Date>) => {
        const profile = slate.candidateProfiles?.find(p => p.officerId === candidateId)
        if (!profile) return null
        const pref = profile.preferences.find(p => p.key === prefFormat)
        if (!pref) return null
        const { pipelineWarning, pipelineDetail } = checkPipeline(candidateId, prefFormat, fillDates, MIN_PIPELINE_MONTHS)
        return { rank: pref.rank, pipelineWarning, pipelineDetail }
    }

    // ── CO-SM pref rank lookup (officer.cosmPreferences[]) ───────────────────
    const getCosmRank = (candidateId: string, prefFormat: string, fillDates: Map<string, Date>) => {
        const officer = officers.find(o => o.id === candidateId)
        if (!officer?.cosmPreferences) return null
        const idx = officer.cosmPreferences.findIndex(p =>
            p === prefFormat || p.toLowerCase() === prefFormat.toLowerCase()
        )
        if (idx === -1) return null
        const rank = idx + 1
        const { pipelineWarning, pipelineDetail } = checkPipeline(candidateId, prefFormat, fillDates, COSM_PIPELINE_MONTHS)
        return { rank, pipelineWarning, pipelineDetail }
    }

    // ── Slot helpers ──────────────────────────────────────────────────────────
    const filledSlotsFor = (reqs: SlateRequirement[], prefFormat: string) =>
        reqs.filter(r => prefFmt(oracleData.find(c => c.id === r.commandId)) === prefFormat && r.filledBy).length

    const openSlotsFor = (reqs: SlateRequirement[], groupedPrefs: ReturnType<typeof buildGroupedPrefs>, prefFormat: string) => {
        const group = groupedPrefs.find(g => g.prefFormat === prefFormat)
        if (!group) return 0
        return group.count - filledSlotsFor(reqs, prefFormat)
    }

    const assignedCmdFor = (reqs: SlateRequirement[], candidateId: string) => {
        const req = reqs.find(r => r.filledBy === candidateId)
        if (!req) return null
        const cmd = oracleData.find(c => c.id === req.commandId)
        return cmd ? prefFmt(cmd) : req.commandName
    }

    const getAssignment = (reqs: SlateRequirement[], prefFormat: string) =>
        reqs.filter(r => prefFmt(oracleData.find(c => c.id === r.commandId)) === prefFormat && r.filledBy)

    const getDemand = (prefFormat: string) =>
        (slate.candidateProfiles || []).filter(prof => {
            const top = prof.preferences.find(p => p.rank === 1)
            return top?.key === prefFormat
        }).length

    const getAvailDate = (candidateId: string) =>
        slate.candidateProfiles?.find(p => p.officerId === candidateId)?.availabilityDate || null

    // ── Assign / Unassign ─────────────────────────────────────────────────────
    const handleAssign = async (candidateId: string, prefFormat: string, reqs: SlateRequirement[]) => {
        const openReq = reqs.find(r => prefFmt(oracleData.find(c => c.id === r.commandId)) === prefFormat && !r.filledBy)
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
                notifySuccess(`${officers.find(o => o.id === candidateId)?.name ?? 'Officer'} assigned to ${prefFormat}`)
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
                notifySuccess(`${officers.find(o => o.id === candidateId)?.name ?? 'Officer'} unassigned`)
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

    // ── Matrix renderer — shared by CDR CMD and CO-SM ────────────────────────
    const renderMatrix = (
        sectionCandidates: typeof allCandidates,
        sectionReqs: SlateRequirement[],
        getRank: (candidateId: string, prefFormat: string, fillDates: Map<string, Date>) => { rank: number; pipelineWarning: boolean; pipelineDetail: string } | null,
        pipelineMonths: number,
        cosmMode = false,
    ) => {
        const groupedPrefs = buildGroupedPrefs(sectionReqs)
        const fillDates = buildFillDates(sectionReqs)
        const maxRanks = cosmMode ? 15 : undefined

        // Sort
        const sortedCandidates = sortCol
            ? [...sectionCandidates].sort((a, b) => {
                const ra = getRank(a.id, sortCol, fillDates)?.rank ?? 9999
                const rb = getRank(b.id, sortCol, fillDates)?.rank ?? 9999
                return sortDir === 'asc' ? ra - rb : rb - ra
            })
            : sectionCandidates

        if (groupedPrefs.length === 0) {
            return <p className="text-sm text-gray-400 italic py-3">No requirements in this section.</p>
        }
        if (sectionCandidates.length === 0) {
            return <p className="text-sm text-gray-400 italic py-3">No candidates in this section.</p>
        }

        return (
            <div className="border rounded-md overflow-x-auto bg-white print:overflow-visible print:border-none">
                <Table className="print:table-fixed print:w-full print:text-[8px] print:leading-[1.1]">
                    <TableHeader>
                        <TableRow className="bg-[#07111f] hover:bg-[#07111f]">
                            <TableHead className="w-[250px] sticky left-0 bg-[#07111f] z-10 font-bold border-r text-white print:w-[120px] print:static print:p-1">
                                Candidate
                            </TableHead>
                            <TableHead className="w-[100px] bg-[#07111f] z-10 border-r text-xs text-white print:w-[40px] print:static print:text-[8px] print:p-1">
                                Avail
                            </TableHead>
                            {groupedPrefs.map(group => {
                                const filled = filledSlotsFor(sectionReqs, group.prefFormat)
                                const isFullyFilled = filled >= group.count
                                const demand = getDemand(group.prefFormat)
                                const isSorted = sortCol === group.prefFormat
                                return (
                                    <TableHead key={group.prefFormat} className="min-w-[160px] text-center border-l bg-[#07111f]/90 text-white print:min-w-0 print:p-0.5">
                                        <div className="flex flex-col items-center gap-1">
                                            <button
                                                className="flex flex-col items-center gap-0.5 hover:text-primary transition-colors w-full"
                                                onClick={() => {
                                                    if (sortCol === group.prefFormat) {
                                                        if (sortDir === 'asc') setSortDir('desc')
                                                        else { setSortCol(null); setSortDir('asc') }
                                                    } else {
                                                        setSortCol(group.prefFormat); setSortDir('asc')
                                                    }
                                                }}
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
                                                {group.count > 1 && <span className="text-[10px] text-muted-foreground">({group.count} Open)</span>}
                                                {group.tags?.includes('CO-SM') && <Badge variant="secondary" className="text-[8px] h-4 px-1">CO-SM</Badge>}
                                                {demand > 0 && (
                                                    <Badge className={`text-[10px] h-5 px-1.5 ${demand > openSlotsFor(sectionReqs, groupedPrefs, group.prefFormat) ? 'bg-amber-100 text-amber-800 border border-amber-200 hover:bg-amber-100' : 'bg-slate-100 text-slate-600 border hover:bg-slate-100'}`}>
                                                        ★ {demand}
                                                    </Badge>
                                                )}
                                                {isFullyFilled && (
                                                    <Badge className="text-[10px] h-5 px-1.5 bg-green-100 text-green-800 border border-green-200 hover:bg-green-100">Filled</Badge>
                                                )}
                                            </div>
                                        </div>
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedCandidates.map(candidate => {
                            const assignedCmd = assignedCmdFor(sectionReqs, candidate.id)
                            const isAssigned = !!assignedCmd
                            const assignedReq = sectionReqs.find(r => r.filledBy === candidate.id)
                            return (
                                <TableRow key={candidate.id} className={`print:break-inside-avoid ${isAssigned ? 'bg-green-50' : 'bg-white'}`}>
                                    <TableCell className="font-medium sticky left-0 bg-white z-10 border-r print:static print:p-1">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-1.5">
                                                <span className="print:text-[9px]">{candidate.name}</span>
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
                                                                        <button className="text-destructive hover:underline text-[11px]"
                                                                            onClick={() => handleUnassign(assignedReq.id, candidate.id)}>
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
                                    <TableCell className="border-r text-xs print:text-[8px] print:p-1">
                                        {(() => {
                                            const d = getAvailDate(candidate.id)
                                            return d
                                                ? <span className="text-muted-foreground">{formatToMMMyy(d)}</span>
                                                : <span className="text-muted-foreground italic">-</span>
                                        })()}
                                    </TableCell>
                                    {groupedPrefs.map(group => {
                                        const cell = getRank(candidate.id, group.prefFormat, fillDates)
                                        const openSlots = openSlotsFor(sectionReqs, groupedPrefs, group.prefFormat)
                                        const canAssign = !!cell && !isAssigned && openSlots > 0
                                        const isAssignedHere = assignedCmd === group.prefFormat
                                        return (
                                            <TableCell key={group.prefFormat}
                                                className={`text-center border-l p-2 print:p-0 print:align-middle bg-white ${isAssignedHere ? '!bg-green-50' : ''}`}>
                                                {cell ? (
                                                    canAssign ? (
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <div className="relative inline-flex items-center justify-center cursor-pointer group/cell transition-all">
                                                                    <RankBadge rank={cell.rank} pipelineWarning={cell.pipelineWarning} maxRanks={maxRanks} />
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
                                                                    <Button size="sm" className="w-full" disabled={assigning !== null}
                                                                        onClick={() => handleAssign(candidate.id, group.prefFormat, sectionReqs)}>
                                                                        <ChevronRight className="h-3.5 w-3.5 mr-1" /> Assign
                                                                    </Button>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    ) : (
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <div className={`relative inline-flex items-center justify-center ${isAssigned || openSlots === 0 ? 'opacity-50' : ''}`}>
                                                                        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold border print:w-4 print:h-4 print:text-[8px] mx-auto
                                                                            ${isAssignedHere ? 'ring-2 ring-green-400' : ''}
                                                                            ${cell.rank <= (maxRanks ? Math.ceil(maxRanks / 3) : 3) ? 'bg-green-100 text-green-700 border-green-200'
                                                                                : cell.rank <= (maxRanks ? Math.ceil(2 * maxRanks / 3) : 6) ? 'bg-amber-100 text-amber-700 border-amber-200'
                                                                                    : 'bg-rose-100 text-rose-700 border-rose-200'}`}>
                                                                            {cell.rank}
                                                                        </div>
                                                                        {cell.pipelineWarning && <AlertTriangle className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 text-amber-500 print:hidden" />}
                                                                    </div>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    {cell.pipelineWarning
                                                                        ? <p className="text-amber-600 text-xs max-w-[220px]">⚠️ {cell.pipelineDetail}</p>
                                                                        : isAssigned ? <p className="text-xs">Already assigned to {assignedCmd}</p>
                                                                            : openSlots === 0 ? <p className="text-xs">All slots filled</p>
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
                        })}
                    </TableBody>
                </Table>
            </div>
        )
    }

    // ── Direct CO section renderer ────────────────────────────────────────────
    const renderDirectCo = () => {
        if (directCoReqs.length === 0) return null
        return (
            <section className="space-y-4 print:break-before-avoid">
                <SectionHeader
                    title="Direct CO Input"
                    subtitle={`${directCoReqs.length} requirement${directCoReqs.length !== 1 ? 's' : ''} — selections use initial officer preferences, no alignment matrix`}
                />

                {/* Requirements summary */}
                <div className="border rounded-md bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#07111f] hover:bg-[#07111f]">
                                <TableHead className="text-white font-semibold">Command</TableHead>
                                <TableHead className="text-white font-semibold">Location</TableHead>
                                <TableHead className="text-white font-semibold">Incumbent</TableHead>
                                <TableHead className="text-white font-semibold">Fill Date</TableHead>
                                <TableHead className="text-white font-semibold">Status</TableHead>
                                <TableHead className="text-white font-semibold">Assigned</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {directCoReqs.map(r => {
                                const cmd = oracleData.find(c => c.id === r.commandId)
                                const assignedOfficer = r.filledBy ? officers.find(o => o.id === r.filledBy) : null
                                return (
                                    <TableRow key={r.id} className={r.filledBy ? 'bg-green-50' : 'bg-white'}>
                                        <TableCell className="font-medium">{r.commandName}</TableCell>
                                        <TableCell className="text-sm text-gray-600">{cmd?.location ?? '—'}</TableCell>
                                        <TableCell className="text-sm">{r.incumbent}</TableCell>
                                        <TableCell className="text-sm">{formatToMMMyy(r.incumbentPrd)}</TableCell>
                                        <TableCell>
                                            <span className={`text-xs font-semibold ${r.filledBy ? 'text-green-700' : 'text-amber-600'}`}>{r.status}</span>
                                        </TableCell>
                                        <TableCell>
                                            {assignedOfficer
                                                ? <span className="text-sm font-medium text-green-800">{assignedOfficer.name}</span>
                                                : <span className="text-gray-400 italic text-sm">—</span>}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>

                {/* Candidate preference cards */}
                {directCoCandidates.length > 0 && (
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Candidate Initial Preferences</p>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 print:grid-cols-2">
                            {directCoCandidates.map(candidate => {
                                const avail = getAvailDate(candidate.id)
                                return (
                                    <div key={candidate.id} className="border rounded-md p-3 bg-white space-y-2">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className="font-semibold text-sm">{candidate.name}</p>
                                                <p className="text-xs text-gray-500">{candidate.rank} • {candidate.designator}{avail ? ` • Avail ${formatToMMMyy(avail)}` : ''}</p>
                                            </div>
                                            {candidate.preferencePriority && (
                                                <Badge variant="outline" className="text-[10px] shrink-0">{candidate.preferencePriority}</Badge>
                                            )}
                                        </div>
                                        {(candidate.preferredLocations?.some(Boolean)) && (
                                            <div className="space-y-0.5">
                                                <p className="text-[10px] font-semibold text-gray-400 uppercase flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" /> Preferred Locations
                                                </p>
                                                <ol className="text-xs text-gray-700 list-decimal list-inside space-y-0.5">
                                                    {candidate.preferredLocations?.filter(Boolean).map((loc, i) => (
                                                        <li key={i}>{loc}</li>
                                                    ))}
                                                </ol>
                                            </div>
                                        )}
                                        {(candidate.preferredPlatforms?.some(Boolean)) && (
                                            <div className="space-y-0.5">
                                                <p className="text-[10px] font-semibold text-gray-400 uppercase flex items-center gap-1">
                                                    <Ship className="h-3 w-3" /> Preferred Platforms
                                                </p>
                                                <ol className="text-xs text-gray-700 list-decimal list-inside space-y-0.5">
                                                    {candidate.preferredPlatforms?.filter(Boolean).map((plat, i) => (
                                                        <li key={i}>{plat}</li>
                                                    ))}
                                                </ol>
                                            </div>
                                        )}
                                        {candidate.notes && (
                                            <p className="text-xs text-gray-500 italic border-t pt-1">{candidate.notes}</p>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </section>
        )
    }

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div className="space-y-10 print:space-y-6">

            {/* ══ SECTION 1: CDR CMD ══════════════════════════════════════════════ */}
            <section className="space-y-4">
                <SectionHeader
                    title="CDR CMD"
                    subtitle={`${cdrCmdCandidates.length} candidates • ${cdrCmdReqs.length} requirements`}
                />
                {cdrCmdReqs.length > 0 && sortCol && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-primary">Sorted by {sortCol}</p>
                        <Button variant="ghost" size="sm" onClick={() => { setSortCol(null); setSortDir('asc') }}>Reset Sort</Button>
                    </div>
                )}
                {renderMatrix(
                    cdrCmdCandidates,
                    cdrCmdReqs,
                    (cid, pf, fd) => getPrefRank(cid, pf, fd),
                    MIN_PIPELINE_MONTHS,
                    false,
                )}
            </section>

            {/* ══ SECTION 2: DIRECT CO INPUT ══════════════════════════════════════ */}
            {renderDirectCo()}

            {/* ══ SECTION 3: CO-SM ════════════════════════════════════════════════ */}
            {(cosmReqs.length > 0 || cosmCandidates.length > 0) && (
                <section className="space-y-4 print:break-before-avoid">
                    <SectionHeader
                        title="CO-SM"
                        subtitle={`${cosmCandidates.length} candidates • ${cosmReqs.length} requirements • ${COSM_PIPELINE_MONTHS}-month pipeline`}
                    />
                    {renderMatrix(
                        cosmCandidates,
                        cosmReqs,
                        (cid, pf, fd) => getCosmRank(cid, pf, fd),
                        COSM_PIPELINE_MONTHS,
                        true,
                    )}
                </section>
            )}

            {/* ── Legend ──────────────────────────────────────────────────────── */}
            <div className="p-4 bg-gray-50 rounded-lg space-y-2 print:p-2 print:mt-4 print:bg-transparent">
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
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <span>Pipeline timing conflict</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground italic text-xs">
                        Click ranked cell to assign • Click column header to sort • CO-SM uses {COSM_PIPELINE_MONTHS}-month pipeline minimum
                    </div>
                </div>
            </div>
        </div>
    )
}
