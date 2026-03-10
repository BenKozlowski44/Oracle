"use client"

import type { Slate, Officer, OracleCommand } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, XCircle, AlertCircle } from "lucide-react"
import { formatToMMMyy } from "@/lib/utils"

interface SlateSummaryReportProps {
    slate: Slate
    officers: Officer[]
    oracleData: OracleCommand[]
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function ApprovalStep({ label, approved }: { label: string; approved: boolean }) {
    return (
        <div className="flex flex-col items-center gap-1.5 min-w-[80px]">
            {approved
                ? <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                : <Circle className="h-7 w-7 text-muted-foreground/40" />
            }
            <span className={`text-xs font-medium text-center leading-tight ${approved ? "text-emerald-600" : "text-muted-foreground"}`}>
                {label}
            </span>
        </div>
    )
}

function ApprovalConnector({ done }: { done: boolean }) {
    return (
        <div className={`flex-1 h-0.5 mt-3.5 mx-1 ${done ? "bg-emerald-400" : "bg-muted"}`} />
    )
}

function StatChip({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
    const pct = total > 0 ? Math.round((value / total) * 100) : 0
    return (
        <div className="flex flex-col gap-1 p-3 rounded-lg border bg-card min-w-[120px]">
            <div className="flex items-end gap-1">
                <span className="text-2xl font-bold">{value}</span>
                <span className="text-sm text-muted-foreground mb-0.5">/ {total}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs text-muted-foreground">{label}</span>
        </div>
    )
}

function ProfileCheckItem({ ok, label }: { ok: boolean; label: string }) {
    return (
        <span className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded ${ok ? "text-emerald-700 bg-emerald-50" : "text-amber-700 bg-amber-50"}`}>
            {ok ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
            {label}
        </span>
    )
}

// ── Main component ────────────────────────────────────────────────────────────

export function SlateSummaryReport({ slate, officers, oracleData }: SlateSummaryReportProps) {
    const requirements = slate.requirements || []
    const profiles = slate.candidateProfiles || []
    const approvals = slate.approvals || {}

    // Approval chain
    const approvalSteps = [
        { label: "Branch Head", key: "branchHead" },
        { label: "PERS-41", key: "pers41" },
        { label: "SWCC", key: "swcc" },
        { label: "SWOBOSS", key: "swoboss" },
    ] as const

    // Fill stats by role
    const byRole = (role: string) => requirements.filter(r => r.role === role)
    const filled = (reqs: typeof requirements) => reqs.filter(r => r.filledBy).length

    const xo = byRole("XO")
    const co = byRole("CO")
    const cosm = requirements.filter(r => r.role === "CO-SM")
    const allFilled = filled(requirements)

    // Candidates with their profiles
    type CandRow = {
        officerId: string
        name: string
        role: string
        commandName: string
        hasJpme: boolean
        hasTours: boolean
        hasNotes: boolean
        hasPrefs: boolean
    }

    const candidateRows: CandRow[] = requirements
        .filter(r => r.filledBy)
        .map(r => {
            const officer = officers.find(o => o.id === r.filledBy)
            const profile = profiles.find(p => p.officerId === r.filledBy)
            const cmd = oracleData.find(c => c.id === r.commandId)
            return {
                officerId: r.filledBy!,
                name: officer?.name ?? r.filledBy!,
                role: r.role,
                commandName: cmd?.name ?? r.commandName ?? "—",
                hasJpme: !!(profile?.jpme),
                hasTours: !!(profile?.tourHistory && profile.tourHistory.length > 0),
                hasNotes: !!(profile?.notes && profile.notes.trim().length > 0),
                hasPrefs: !!(profile?.preferences && profile.preferences.length > 0),
            }
        })

    const profilesReady = candidateRows.filter(r => r.hasJpme && r.hasTours && r.hasNotes && r.hasPrefs).length
    const approvedCount = approvalSteps.filter(s => approvals[s.key]).length

    const windowLabel = slate.windowStart ? formatToMMMyy(slate.windowStart) : "—"

    return (
        <div className="space-y-8 print:space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between print:mb-2">
                <div>
                    <h2 className="text-xl font-semibold">Slate Summary: {slate.name}</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Window: {windowLabel} &nbsp;·&nbsp; Generated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                </div>
                <Badge variant={slate.status === "Archived" ? "outline" : "secondary"} className="text-xs">
                    {slate.status ?? "Active"}
                </Badge>
            </div>

            {/* ── Approval Chain ── */}
            <section className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Approval Chain</h3>
                <div className="p-5 border rounded-lg bg-card flex items-center">
                    {approvalSteps.map((step, i) => (
                        <div key={step.key} className="contents">
                            <ApprovalStep label={step.label} approved={!!approvals[step.key]} />
                            {i < approvalSteps.length - 1 && (
                                <ApprovalConnector done={!!approvals[step.key]} />
                            )}
                        </div>
                    ))}
                    <div className="ml-auto pl-6 border-l text-center">
                        <div className="text-2xl font-bold">{approvedCount}<span className="text-muted-foreground text-base font-normal">/{approvalSteps.length}</span></div>
                        <div className="text-xs text-muted-foreground">Approvals</div>
                    </div>
                </div>
            </section>

            {/* ── Fill Stats ── */}
            <section className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Requirement Fill Status</h3>
                <div className="flex flex-wrap gap-3">
                    <StatChip label="Total Filled" value={allFilled} total={requirements.length} color="bg-blue-500" />
                    <StatChip label="XO Filled" value={filled(xo)} total={xo.length} color="bg-indigo-400" />
                    {co.length > 0 && (
                        <StatChip label="Direct CO" value={filled(co)} total={co.length} color="bg-violet-400" />
                    )}
                    {cosm.length > 0 && (
                        <StatChip label="CO-SM Filled" value={filled(cosm)} total={cosm.length} color="bg-sky-400" />
                    )}
                    <StatChip label="Profiles Ready" value={profilesReady} total={candidateRows.length} color="bg-emerald-400" />
                </div>
            </section>

            {/* ── Candidate Profile Completeness ── */}
            <section className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Candidate Profile Completeness</h3>
                {candidateRows.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground border border-dashed rounded-lg">
                        No candidates assigned yet.
                    </div>
                ) : (
                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm print:text-xs">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="text-left px-4 py-2.5 font-medium">Officer</th>
                                    <th className="text-left px-4 py-2.5 font-medium">Role</th>
                                    <th className="text-left px-4 py-2.5 font-medium">Command</th>
                                    <th className="text-left px-4 py-2.5 font-medium">Profile Fields</th>
                                    <th className="text-left px-4 py-2.5 font-medium">Ready?</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {candidateRows.map(row => {
                                    const ready = row.hasJpme && row.hasTours && row.hasNotes && row.hasPrefs
                                    return (
                                        <tr key={row.officerId} className="hover:bg-muted/30 transition-colors">
                                            <td className="px-4 py-2.5 font-medium">{row.name}</td>
                                            <td className="px-4 py-2.5">
                                                <Badge variant="outline" className="text-xs">{row.role}</Badge>
                                            </td>
                                            <td className="px-4 py-2.5 text-muted-foreground text-xs">{row.commandName}</td>
                                            <td className="px-4 py-2.5">
                                                <div className="flex flex-wrap gap-1">
                                                    <ProfileCheckItem ok={row.hasJpme} label="JPME" />
                                                    <ProfileCheckItem ok={row.hasTours} label="Tours" />
                                                    <ProfileCheckItem ok={row.hasNotes} label="Notes" />
                                                    <ProfileCheckItem ok={row.hasPrefs} label="Prefs" />
                                                </div>
                                            </td>
                                            <td className="px-4 py-2.5">
                                                {ready
                                                    ? <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                                    : <XCircle className="h-4 w-4 text-amber-400" />
                                                }
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    )
}
