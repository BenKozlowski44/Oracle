import { useMemo } from "react"
import type { Slate, Officer, OracleCommand } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, MinusCircle, XCircle } from "lucide-react"
import { formatToMMMyy } from "@/lib/utils"

interface PreferenceAlignmentReportProps {
    slate: Slate
    officers: Officer[]
    oracleData: OracleCommand[]
}

// ── Alignment logic ───────────────────────────────────────────────────────────

type AlignmentLevel = "green" | "yellow" | "red" | "none"

// ── Navy homeport abbreviation lookup ─────────────────────────────────────────
// Maps common officer-entered abbreviations to canonical city names used in
// oracle command records. Case-insensitive keys.
const HOMEPORT_ABBR: Record<string, string> = {
    nf:  'norfolk',
    ph:  'pearl harbor',
    sd:  'san diego',
    mp:  'mayport',
    ev:  'everett',
    yj:  'yokosuka',
    yk:  'yokosuka',
    br:  'bremerton',
    kb:  'kings bay',
    nl:  'new london',
    gr:  'groton',
    np:  'newport',
    gum: 'guam',
    gu:  'guam',
    rota:'rota',
    rs:  'rota',
    ba:  'bahrain',
    pas: 'pascagoula',
    cor: 'corpus christi',
    pen: 'pensacola',
    ki:  'kittery',
    bat: 'bath',
}

// ── Platform abbreviation lookup ───────────────────────────────────────────────
const PLATFORM_ABBR: Record<string, string> = {
    ddg: 'ddg',
    cg:  'cg',
    lha: 'lha',
    lhd: 'lhd',
    lpd: 'lpd',
    lsd: 'lsd',
    lcs: 'lcs',
    ssn: 'ssn',
    ssbn:'ssbn',
    ssgn:'ssgn',
    cvn: 'cvn',
    aoe: 'aoe',
    afs: 'afs',
}

function normStr(s: string): string[] {
    const lower = s.toLowerCase().trim()
    // Return the original plus any expansion via the homeport abbreviation table
    const expanded = HOMEPORT_ABBR[lower]
    return expanded ? [lower, expanded] : [lower]
}

function flexMatch(a: string, b: string): boolean {
    const aNorms = normStr(a)
    const bNorms = normStr(b)
    return aNorms.some(an => bNorms.some(bn =>
        an === bn || an.includes(bn) || bn.includes(an)
    ))
}

function computeAlignment(
    officer: Officer,
    cmd: OracleCommand
): { level: AlignmentLevel; platformMatch: boolean; locationMatch: boolean } {
    const priority = officer.preferencePriority ?? null
    const hasPrefs =
        (officer.preferredPlatforms?.length ?? 0) > 0 ||
        (officer.preferredLocations?.length ?? 0) > 0

    // Priority must be set and at least one preference list populated
    if (!priority || !hasPrefs) {
        return { level: "none", platformMatch: false, locationMatch: false }
    }

    const platforms = officer.preferredPlatforms ?? []
    const locations = officer.preferredLocations ?? []

    // Cell highlight booleans (any match anywhere in each list, for display)
    const platformMatch = !!cmd.platform && platforms.some(p => !!p && flexMatch(cmd.platform!, p))
    const locationMatch = !!cmd.location && locations.some(l => !!l && flexMatch(cmd.location, l))

    let level: AlignmentLevel

    if (priority === "Platform") {
        // Primary:   their #1 platform (index 0) must match → Partial minimum
        // Secondary: any of their top-3 locations must match → upgrades to Aligned
        const primaryMatch   = !!cmd.platform && !!platforms[0] && flexMatch(cmd.platform, platforms[0])
        const secondaryMatch = !!cmd.location && locations.slice(0, 3).some(l => !!l && flexMatch(cmd.location, l))

        if (primaryMatch && secondaryMatch) level = "green"
        else if (primaryMatch)             level = "yellow"
        else                               level = "red"

    } else {
        // priority === "Homeport"
        // Primary:   their #1 location (index 0) must match → Partial minimum
        // Secondary: any of their top-3 platforms must match → upgrades to Aligned
        const primaryMatch   = !!cmd.location && !!locations[0] && flexMatch(cmd.location, locations[0])
        const secondaryMatch = !!cmd.platform && platforms.slice(0, 3).some(p => !!p && flexMatch(cmd.platform!, p))

        if (primaryMatch && secondaryMatch) level = "green"
        else if (primaryMatch)             level = "yellow"
        else                               level = "red"
    }

    return { level, platformMatch, locationMatch }
}


// ── CO-SM alignment (preference-rank-based) ───────────────────────────────────
// Uses the officer's ranked slate-specific preferences, not platform/homeport.
// Rank 1-3 = Aligned (green), 4-6 = Partial (yellow), 7+ / not found = Unaligned (red)
function computeCosmAlignment(
    officer: Officer,
    cmd: OracleCommand,
    slate: Slate
): { level: AlignmentLevel; prefRank: number | null } {
    const profile = (slate.candidateProfiles ?? []).find(p => p.officerId === officer.id)
    if (!profile || profile.preferences.length === 0) {
        return { level: "none", prefRank: null }
    }

    // Preference key is stored as "Platform - Location" — match flexibly,
    // also try matching by command name as a fallback
    const cmdKey = `${cmd.platform || 'Unknown'} - ${cmd.location}`
    const match = profile.preferences
        .filter(p => !!p.key)
        .find(p => flexMatch(cmdKey, p.key) || flexMatch(cmd.name, p.key))

    if (!match) return { level: "red", prefRank: null }

    const rank = match.rank
    if (rank <= 3) return { level: "green", prefRank: rank }
    if (rank <= 6) return { level: "yellow", prefRank: rank }
    return { level: "red", prefRank: rank }
}

// ── Sub-components ────────────────────────────────────────────────────────────

const LEVEL_CONFIG = {
    green: {
        label: "Aligned",
        icon: CheckCircle2,
        rowClass: "bg-emerald-50/60",
        badgeClass: "bg-emerald-100 text-emerald-800",
        iconClass: "text-emerald-500",
    },
    yellow: {
        label: "Partial",
        icon: MinusCircle,
        rowClass: "bg-amber-50/60",
        badgeClass: "bg-amber-100 text-amber-800",
        iconClass: "text-amber-500",
    },
    red: {
        label: "Unaligned",
        icon: XCircle,
        rowClass: "bg-red-50/60",
        badgeClass: "bg-red-100 text-red-800",
        iconClass: "text-red-500",
    },
    none: {
        label: "No Prefs",
        icon: MinusCircle,
        rowClass: "",
        badgeClass: "bg-muted text-muted-foreground",
        iconClass: "text-muted-foreground",
    },
}

function SummaryChip({ label, count, total, colorClass }: {
    label: string; count: number; total: number; colorClass: string
}) {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0
    return (
        <div className="flex flex-col gap-1 p-3 rounded-lg border border-[#c9a227]/20 bg-[#07111f] min-w-[110px]">
            <div className="flex items-end gap-1">
                <span className="text-2xl font-bold text-white">{count}</span>
                <span className="text-sm text-white/50 mb-0.5">/ {total}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs text-white/60">{label}</span>
        </div>
    )
}

// ── Main component ─────────────────────────────────────────────────────────────

export function PreferenceAlignmentReport({ slate, officers, oracleData }: PreferenceAlignmentReportProps) {

    const { cosmRows, cdrcmdRows } = useMemo(() => {
        const filledReqs = (slate.requirements ?? []).filter(r => r.filledBy)

        const cosm: Array<{ requirement: typeof slate.requirements[0]; officer: Officer; cmd: OracleCommand; alignment: ReturnType<typeof computeCosmAlignment> }> = []
        const cdrcmd: Array<{ requirement: typeof slate.requirements[0]; officer: Officer; cmd: OracleCommand; alignment: ReturnType<typeof computeAlignment> }> = []

        for (const r of filledReqs) {
            const officer = officers.find(o => o.id === r.filledBy)
            const cmd = oracleData.find(c => c.id === r.commandId)
            if (!officer || !cmd) continue

            if (cmd.tags?.includes("CO-SM")) {
                cosm.push({ requirement: r, officer, cmd, alignment: computeCosmAlignment(officer, cmd, slate) })
            } else {
                cdrcmd.push({ requirement: r, officer, cmd, alignment: computeAlignment(officer, cmd) })
            }
        }

        return { cosmRows: cosm, cdrcmdRows: cdrcmd }
    }, [slate, officers, oracleData])

    // CO-SM totals
    const cosmTotal = cosmRows.length
    const cosmGreen  = cosmRows.filter(r => r.alignment.level === "green").length
    const cosmYellow = cosmRows.filter(r => r.alignment.level === "yellow").length
    const cosmRed    = cosmRows.filter(r => r.alignment.level === "red").length
    const cosmNone   = cosmRows.filter(r => r.alignment.level === "none").length
    const cosmPct    = cosmTotal > 0 ? Math.round(((cosmGreen + cosmYellow * 0.5) / cosmTotal) * 100) : 0

    // CDR CMD totals
    const cdrTotal = cdrcmdRows.length
    const cdrGreen  = cdrcmdRows.filter(r => r.alignment.level === "green").length
    const cdrYellow = cdrcmdRows.filter(r => r.alignment.level === "yellow").length
    const cdrRed    = cdrcmdRows.filter(r => r.alignment.level === "red").length
    const cdrNone   = cdrcmdRows.filter(r => r.alignment.level === "none").length
    const cdrPct    = cdrTotal > 0 ? Math.round(((cdrGreen + cdrYellow * 0.5) / cdrTotal) * 100) : 0

    const renderAlignBadge = (level: AlignmentLevel) => {
        const cfg = LEVEL_CONFIG[level]
        const Icon = cfg.icon
        return (
            <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded font-medium ${cfg.badgeClass}`}>
                <Icon className={`h-3.5 w-3.5 ${cfg.iconClass}`} />
                {cfg.label}
            </span>
        )
    }

    return (
        <div className="space-y-8 print:space-y-4">
            {/* ── Header ── */}
            <div>
                <h2 className="text-xl font-semibold text-[#c9a227]">Preference Alignment Report</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                    {slate.name} · Window: {slate.windowStart ? formatToMMMyy(slate.windowStart) : "—"} ·{" "}
                    Generated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
            </div>

            {/* ══════════ CDR CMD SECTION ══════════ */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-[#c9a227] uppercase tracking-wider">CDR CMD</h3>
                    <div className="h-px flex-1 bg-[#c9a227]/20" />
                    <span className="text-xs text-muted-foreground">Ranked by platform &amp; homeport priority</span>
                </div>

                {/* CDR CMD summary chips */}
                <div className="flex flex-wrap gap-3">
                    <SummaryChip label="Aligned"      count={cdrGreen}  total={cdrTotal} colorClass="bg-emerald-500" />
                    <SummaryChip label="Partial"      count={cdrYellow} total={cdrTotal} colorClass="bg-amber-400" />
                    <SummaryChip label="Unaligned"    count={cdrRed}    total={cdrTotal} colorClass="bg-red-400" />
                    {cdrNone > 0 && <SummaryChip label="No Prefs Set" count={cdrNone} total={cdrTotal} colorClass="bg-slate-300" />}
                    <div className="flex flex-col justify-center gap-1 p-3 rounded-lg border border-[#c9a227]/20 bg-[#07111f] min-w-[110px]">
                        <div className="text-2xl font-bold text-white">{cdrPct}%</div>
                        <div className="text-xs text-white/60">CDR CMD Score</div>
                        <div className="text-[10px] text-white/40">(green=1pt, partial=0.5pt)</div>
                    </div>
                </div>

                {cdrTotal === 0 && (
                    <div className="p-10 text-center text-muted-foreground border border-dashed rounded-lg">
                        No filled CDR CMD requirements on this slate yet.
                    </div>
                )}

                {/* CDR CMD table */}
                {cdrTotal > 0 && (
                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm print:text-xs">
                            <thead className="bg-[#07111f] text-white">
                                <tr>
                                    <th className="text-left px-4 py-2.5 font-semibold">Officer</th>
                                    <th className="text-left px-4 py-2.5 font-semibold">Role</th>
                                    <th className="text-left px-4 py-2.5 font-semibold">Command</th>
                                    <th className="text-left px-4 py-2.5 font-semibold">Platform</th>
                                    <th className="text-left px-4 py-2.5 font-semibold">Homeport</th>
                                    <th className="text-center px-4 py-2.5 font-semibold">Priority</th>
                                    <th className="text-center px-4 py-2.5 font-semibold">Alignment</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {cdrcmdRows.map(({ requirement: req, officer, cmd, alignment }) => {
                                    const cfg = LEVEL_CONFIG[alignment.level]
                                    return (
                                        <tr key={req.id} className={`transition-colors ${cfg.rowClass}`}>
                                            <td className="px-4 py-3">
                                                <div className="font-medium">{officer.name}</div>
                                                <div className="text-xs text-muted-foreground">{officer.rank} · {officer.designator}</div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge variant="outline" className="text-xs">{req.role}</Badge>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="font-medium text-xs">{cmd.name}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {[cmd.platform, cmd.hullNumber].filter(Boolean).join(" ")}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-xs">
                                                <div className={(alignment as ReturnType<typeof computeAlignment>).platformMatch ? "text-emerald-700 font-medium" : "text-muted-foreground"}>
                                                    {(alignment as ReturnType<typeof computeAlignment>).platformMatch ? "✓ " : ""}{cmd.platform ?? "—"}
                                                </div>
                                                {(officer.preferredPlatforms?.length ?? 0) > 0 && (
                                                    <div className="text-[10px] text-muted-foreground mt-0.5">
                                                        Wants: {officer.preferredPlatforms!.join(", ")}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-xs">
                                                <div className={(alignment as ReturnType<typeof computeAlignment>).locationMatch ? "text-emerald-700 font-medium" : "text-muted-foreground"}>
                                                    {(alignment as ReturnType<typeof computeAlignment>).locationMatch ? "✓ " : ""}{cmd.location ?? "—"}
                                                </div>
                                                {(officer.preferredLocations?.length ?? 0) > 0 && (
                                                    <div className="text-[10px] text-muted-foreground mt-0.5">
                                                        Wants: {officer.preferredLocations!.join(", ")}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className="text-xs text-muted-foreground">
                                                    {officer.preferencePriority ?? "—"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                {renderAlignBadge(alignment.level)}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* ══════════ CO-SM SECTION ══════════ */}
            {cosmTotal > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <h3 className="text-base font-semibold text-[#c9a227] uppercase tracking-wider">CO-SM</h3>
                        <div className="h-px flex-1 bg-[#c9a227]/20" />
                        <span className="text-xs text-muted-foreground">Ranked by submitted slate preferences</span>
                    </div>

                    {/* CO-SM summary chips */}
                    <div className="flex flex-wrap gap-3">
                        <SummaryChip label="Aligned (Top 3)"   count={cosmGreen}  total={cosmTotal} colorClass="bg-emerald-500" />
                        <SummaryChip label="Partial (4–6)"     count={cosmYellow} total={cosmTotal} colorClass="bg-amber-400" />
                        <SummaryChip label="Unaligned (7+)"    count={cosmRed}    total={cosmTotal} colorClass="bg-red-400" />
                        {cosmNone > 0 && <SummaryChip label="No Profile" count={cosmNone} total={cosmTotal} colorClass="bg-slate-300" />}
                        <div className="flex flex-col justify-center gap-1 p-3 rounded-lg border border-[#c9a227]/20 bg-[#07111f] min-w-[110px]">
                            <div className="text-2xl font-bold text-white">{cosmPct}%</div>
                            <div className="text-xs text-white/60">CO-SM Score</div>
                            <div className="text-[10px] text-white/40">(top3=1pt, 4-6=0.5pt)</div>
                        </div>
                    </div>

                    {/* CO-SM table */}
                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm print:text-xs">
                            <thead className="bg-[#07111f] text-white">
                                <tr>
                                    <th className="text-left px-4 py-2.5 font-semibold">Officer</th>
                                    <th className="text-left px-4 py-2.5 font-semibold">Command</th>
                                    <th className="text-center px-4 py-2.5 font-semibold">Pref Rank</th>
                                    <th className="text-center px-4 py-2.5 font-semibold">Alignment</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {cosmRows.map(({ requirement: req, officer, cmd, alignment }) => {
                                    const prefRank = (alignment as ReturnType<typeof computeCosmAlignment>).prefRank
                                    return (
                                        <tr key={req.id} className={`transition-colors ${LEVEL_CONFIG[alignment.level].rowClass}`}>
                                            <td className="px-4 py-3">
                                                <div className="font-medium">{officer.name}</div>
                                                <div className="text-xs text-muted-foreground">{officer.rank} · {officer.designator}</div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="font-medium text-xs">{cmd.name}</div>
                                                <div className="text-xs text-muted-foreground">{[cmd.platform, cmd.location].filter(Boolean).join(" · ")}</div>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                {prefRank != null
                                                    ? <span className="text-sm font-bold">#{prefRank}</span>
                                                    : <span className="text-muted-foreground text-xs">Not Listed</span>
                                                }
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                {renderAlignBadge(alignment.level)}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}


            {/* ── Legend ── */}
            <div className="space-y-2 text-xs text-muted-foreground print:hidden border-t pt-4">
                <div className="font-semibold text-foreground">Legend</div>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                    <span className="font-medium text-foreground">CDR CMD:</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> <strong>Aligned</strong> — primary #1 matches &amp; secondary top-3 matches</span>
                    <span className="flex items-center gap-1"><MinusCircle className="h-3.5 w-3.5 text-amber-500" /> <strong>Partial</strong> — primary #1 matches, secondary top-3 does not</span>
                    <span className="flex items-center gap-1"><XCircle className="h-3.5 w-3.5 text-red-500" /> <strong>Unaligned</strong> — primary #1 does not match</span>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                    <span className="font-medium text-foreground">CO-SM:</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> <strong>Aligned</strong> — command in submitted preferences #1–3</span>
                    <span className="flex items-center gap-1"><MinusCircle className="h-3.5 w-3.5 text-amber-500" /> <strong>Partial</strong> — command in submitted preferences #4–6</span>
                    <span className="flex items-center gap-1"><XCircle className="h-3.5 w-3.5 text-red-500" /> <strong>Unaligned</strong> — command ranked #7+ or not listed</span>
                </div>
            </div>
        </div>
    )
}
