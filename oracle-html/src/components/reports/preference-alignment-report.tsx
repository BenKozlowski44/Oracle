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
    const rows = useMemo(() => {
        return (slate.requirements ?? [])
            .filter(r => r.filledBy)
            .map(r => {
                const officer = officers.find(o => o.id === r.filledBy)
                const cmd = oracleData.find(c => c.id === r.commandId)
                if (!officer || !cmd) return null
                const alignment = computeAlignment(officer, cmd)
                return { requirement: r, officer, cmd, alignment }
            })
            .filter(Boolean) as Array<{
                requirement: typeof slate.requirements[0]
                officer: Officer
                cmd: OracleCommand
                alignment: ReturnType<typeof computeAlignment>
            }>
    }, [slate, officers, oracleData])

    const total = rows.length
    const green = rows.filter(r => r.alignment.level === "green").length
    const yellow = rows.filter(r => r.alignment.level === "yellow").length
    const red = rows.filter(r => r.alignment.level === "red").length
    const noPrefs = rows.filter(r => r.alignment.level === "none").length

    const overallPct = total > 0 ? Math.round(((green + yellow * 0.5) / total) * 100) : 0

    return (
        <div className="space-y-6 print:space-y-4">
            {/* Header */}
            <div>
                <h2 className="text-xl font-semibold text-[#c9a227]">Preference Alignment Report</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                    {slate.name} · Window: {slate.windowStart ? formatToMMMyy(slate.windowStart) : "—"} ·{" "}
                    Generated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
            </div>

            {/* Summary chips */}
            <div className="flex flex-wrap gap-3">
                <SummaryChip label="Aligned" count={green} total={total} colorClass="bg-emerald-500" />
                <SummaryChip label="Partial Match" count={yellow} total={total} colorClass="bg-amber-400" />
                <SummaryChip label="Unaligned" count={red} total={total} colorClass="bg-red-400" />
                {noPrefs > 0 && (
                    <SummaryChip label="No Prefs Set" count={noPrefs} total={total} colorClass="bg-slate-300" />
                )}
                {/* Overall score */}
                <div className="flex flex-col justify-center gap-1 p-3 rounded-lg border border-[#c9a227]/20 bg-[#07111f] min-w-[110px]">
                    <div className="text-2xl font-bold text-white">{overallPct}%</div>
                    <div className="text-xs text-white/60">Alignment Score</div>
                    <div className="text-[10px] text-white/40">(green=1pt, partial=0.5pt)</div>
                </div>
            </div>

            {/* No filled requirements */}
            {rows.length === 0 && (
                <div className="p-10 text-center text-muted-foreground border border-dashed rounded-lg">
                    No filled requirements on this slate yet.
                </div>
            )}

            {/* Table */}
            {rows.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm print:text-xs">
                        <thead className="bg-[#07111f] text-white">
                            <tr>
                                <th className="text-left px-4 py-2.5 font-semibold text-white">Officer</th>
                                <th className="text-left px-4 py-2.5 font-semibold text-white">Role</th>
                                <th className="text-left px-4 py-2.5 font-semibold text-white">Command</th>
                                <th className="text-left px-4 py-2.5 font-semibold text-white">Platform</th>
                                <th className="text-left px-4 py-2.5 font-semibold text-white">Homeport</th>
                                <th className="text-center px-4 py-2.5 font-semibold text-white">Priority</th>
                                <th className="text-center px-4 py-2.5 font-semibold text-white">Alignment</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {rows.map(({ requirement: req, officer, cmd, alignment }) => {
                                const cfg = LEVEL_CONFIG[alignment.level]
                                const Icon = cfg.icon
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
                                            <div className={alignment.platformMatch ? "text-emerald-700 font-medium" : "text-muted-foreground"}>
                                                {alignment.platformMatch ? "✓ " : ""}{cmd.platform ?? "—"}
                                            </div>
                                            {(officer.preferredPlatforms?.length ?? 0) > 0 && (
                                                <div className="text-[10px] text-muted-foreground mt-0.5">
                                                    Wants: {officer.preferredPlatforms!.join(", ")}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-xs">
                                            <div className={alignment.locationMatch ? "text-emerald-700 font-medium" : "text-muted-foreground"}>
                                                {alignment.locationMatch ? "✓ " : ""}{cmd.location ?? "—"}
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
                                            <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded font-medium ${cfg.badgeClass}`}>
                                                <Icon className={`h-3.5 w-3.5 ${cfg.iconClass}`} />
                                                {cfg.label}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground print:hidden">
                <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <strong>Aligned</strong> — priority preference matches (or both match)
                </span>
                <span className="flex items-center gap-1.5">
                    <MinusCircle className="h-3.5 w-3.5 text-amber-500" />
                    <strong>Partial</strong> — non-priority preference matches
                </span>
                <span className="flex items-center gap-1.5">
                    <XCircle className="h-3.5 w-3.5 text-red-500" />
                    <strong>Unaligned</strong> — neither platform nor homeport matches
                </span>
            </div>
        </div>
    )
}
