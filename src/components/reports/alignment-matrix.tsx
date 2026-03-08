"use client"

import { officers, oracleData, slates } from "@/lib/data"
import { AlertTriangle } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { formatToMMMyy } from "@/lib/utils"

export function AlignmentMatrixReport({ slateId }: { slateId: string }) {
    const slate = slates.find(s => s.id === slateId)

    if (!slate) {
        return (
            <div className="p-8 text-center text-muted-foreground border border-dashed rounded-md">
                Slate not found.
            </div>
        )
    }

    const requirements = slate.requirements || [];
    const candidates = (slate.candidates || [])
        .map(cid => officers.find(o => o.id === cid))
        .filter(Boolean) as typeof officers;

    // Group requirements by preference format
    const uniquePrefsMap = new Map<string, {
        prefFormat: string,
        role: string,
        tags: string[],
        count: number
    }>();

    requirements.forEach(r => {
        const cmd = oracleData.find(c => c.id === r.commandId);
        const prefFormat = `${cmd?.platform || "Unknown"} - ${cmd?.location || "Unknown"}`;

        if (!uniquePrefsMap.has(prefFormat)) {
            uniquePrefsMap.set(prefFormat, {
                prefFormat,
                role: r.role,
                tags: cmd?.tags || [],
                count: 1
            });
        } else {
            const existing = uniquePrefsMap.get(prefFormat)!;
            existing.count += 1;
            if (cmd?.tags) {
                cmd.tags.forEach(t => {
                    if (!existing.tags.includes(t)) existing.tags.push(t);
                });
            }
        }
    });

    const groupedPrefs = Array.from(uniquePrefsMap.values());

    // Build a map of prefFormat → earliest fill date (incumbentPrd) across requirements
    const prefFillDates = new Map<string, Date>();
    requirements.forEach(r => {
        const cmd = oracleData.find(c => c.id === r.commandId);
        const pf = `${cmd?.platform || 'Unknown'} - ${cmd?.location || 'Unknown'}`;
        if (r.incumbentPrd) {
            const d = new Date(r.incumbentPrd);
            const existing = prefFillDates.get(pf);
            if (!existing || d < existing) prefFillDates.set(pf, d);
        }
    });

    const MIN_PIPELINE_MONTHS = 6; // Minimum XO pipeline duration

    const getPreferenceRank = (candidateId: string, prefFormat: string) => {
        const profile = slate.candidateProfiles?.find(p => p.officerId === candidateId);
        if (!profile) return null;

        const pref = profile.preferences.find(p => p.key === prefFormat);
        if (!pref) return null;

        // Pipeline timing check: avail date + min pipeline must reach the fill date
        let pipelineWarning = false;
        let pipelineDetail = '';
        if (profile.availabilityDate) {
            const fillDate = prefFillDates.get(prefFormat);
            if (fillDate) {
                const availDate = new Date(profile.availabilityDate);
                const pipelineEnd = new Date(availDate);
                pipelineEnd.setMonth(pipelineEnd.getMonth() + MIN_PIPELINE_MONTHS);
                if (pipelineEnd > fillDate) {
                    pipelineWarning = true;
                    pipelineDetail = `Avail ${formatToMMMyy(profile.availabilityDate)} + ${MIN_PIPELINE_MONTHS}mo pipeline ends ${formatToMMMyy(pipelineEnd.toISOString())} — fill date is ${formatToMMMyy(fillDate.toISOString())}`;
                }
            }
        }

        return { rank: pref.rank, pipelineWarning, pipelineDetail };
    }

    const getAvailDate = (candidateId: string) => {
        const profile = slate.candidateProfiles?.find(p => p.officerId === candidateId);
        return profile?.availabilityDate || null;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Alignment Matrix: {slate.name}</h2>
                    <p className="text-sm text-muted-foreground">
                        {candidates.length} Candidates • {requirements.length} Requirements ({groupedPrefs.length} Unique Preferences)
                    </p>
                </div>
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
                            {groupedPrefs.map(group => (
                                <TableHead key={group.prefFormat} className="min-w-[150px] text-center border-l bg-muted/20 print:min-w-0 print:w-auto print:p-0.5 print:-tracking-tighter">
                                    <div className="flex flex-col items-center">
                                        <span className="font-semibold print:text-[7px] print:leading-[1] print:break-words print:whitespace-pre-wrap max-w-full print:max-w-full text-center">{group.prefFormat}</span>
                                        {group.count > 1 && <span className="text-xs text-muted-foreground print:text-[6px] print:leading-none">({group.count} Open)</span>}
                                        <span className="text-[10px] text-muted-foreground font-normal mt-1 print:text-[6px] print:mt-0 print:leading-none">{group.role}</span>
                                        {group.tags?.includes("CO-SM") && (
                                            <Badge variant="secondary" className="text-[8px] h-4 px-1 mt-1 print:scale-[0.55] print:transform-gpu print:origin-top print:h-3">CO-SM</Badge>
                                        )}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {candidates.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={groupedPrefs.length + 2} className="h-24 text-center">
                                    No candidates on slate.
                                </TableCell>
                            </TableRow>
                        ) : (
                            candidates.map(candidate => {
                                return (
                                    <TableRow key={candidate.id} className="print:break-inside-avoid">
                                        <TableCell className="font-medium sticky left-0 bg-background z-10 border-r print:static print:p-1 print:align-top">
                                            <div className="flex flex-col">
                                                <span className="print:text-[9px] print:leading-tight print:break-words print:whitespace-pre-wrap max-w-full">{candidate.name}</span>
                                                <span className="text-xs text-muted-foreground print:text-[7px] print:leading-tight">{candidate.rank} • {candidate.designator}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="border-r text-xs print:text-[8px] print:p-1 print:align-top">
                                            {(() => {
                                                const availDate = getAvailDate(candidate.id);
                                                return availDate ? (
                                                    <span className="text-muted-foreground">{formatToMMMyy(availDate)}</span>
                                                ) : (
                                                    <span className="text-muted-foreground italic">-</span>
                                                );
                                            })()}
                                        </TableCell>
                                        {groupedPrefs.map(group => {
                                            const cell = getPreferenceRank(candidate.id, group.prefFormat);
                                            return (
                                                <TableCell key={group.prefFormat} className="text-center border-l p-2 print:p-0 print:align-middle">
                                                    {cell ? (
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <div className="relative inline-flex items-center justify-center">
                                                                        <div className={`
                                                                            inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
                                                                            print:w-4 print:h-4 print:text-[8px] mx-auto
                                                                            ${cell.rank >= 1 && cell.rank <= 3 ? "bg-green-100 text-green-700 border border-green-200" :
                                                                                cell.rank >= 4 && cell.rank <= 6 ? "bg-amber-100 text-amber-700 border border-amber-200" :
                                                                                    "bg-rose-100 text-rose-700 border border-rose-200"}
                                                                        `}>
                                                                            {cell.rank}
                                                                        </div>
                                                                        {cell.pipelineWarning && (
                                                                            <AlertTriangle className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 text-amber-500 print:hidden" />
                                                                        )}
                                                                    </div>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    {cell.pipelineWarning ? (
                                                                        <p className="text-amber-600 text-xs max-w-[220px]">
                                                                            ⚠️ Pipeline timing conflict — {cell.pipelineDetail}
                                                                        </p>
                                                                    ) : (
                                                                        <p>Ranked #{cell.rank}</p>
                                                                    )}
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
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

            <div className="p-4 bg-muted/50 rounded-lg space-y-2 print:p-2 print:mt-4 print:bg-transparent">
                <div className="flex gap-6 text-sm print:text-xs">
                    <div className="flex items-center gap-2">
                        <div className="px-2 h-6 min-w-[1.5rem] rounded-full bg-green-100 text-green-700 border border-green-200 flex items-center justify-center text-xs font-bold whitespace-nowrap print:h-4 print:text-[10px]">1-3</div>
                        <span className="print:font-semibold">High Preference</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="px-2 h-6 min-w-[1.5rem] rounded-full bg-amber-100 text-amber-700 border border-amber-200 flex items-center justify-center text-xs font-bold whitespace-nowrap print:h-4 print:text-[10px]">4-6</div>
                        <span className="print:font-semibold">Medium Preference</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="px-2 h-6 min-w-[1.5rem] rounded-full bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center text-xs font-bold whitespace-nowrap print:h-4 print:text-[10px]">7+</div>
                        <span className="print:font-semibold">Lower Preference</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
