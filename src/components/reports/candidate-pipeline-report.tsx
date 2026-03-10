"use client"

import { useMemo, useState } from "react"
import type { Officer } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CheckCircle2, XCircle, Search, Users, Flame, Clock, ShieldCheck } from "lucide-react"
import { formatToMMMyy } from "@/lib/utils"

interface CandidatePipelineReportProps {
    officers: Officer[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Officers eligible for the pipeline (exclude PCC and Retire) */
const EXCLUDED_STATUSES = new Set(["PCC", "Retire"])

function completeness(o: Officer) {
    const hasPrefs =
        (o.preferredLocations?.length ?? 0) > 0 ||
        (o.preferredPlatforms?.length ?? 0) > 0 ||
        (o.preferences?.length ?? 0) > 0
    const hasCsr = !!(o.csr?.trim())
    // "Slate" = officer has been assigned to a slate (i.e. screened),
    // stored in assignedSlate — same field the bank's "Screened" column reads.
    const hasSlate = !!(o.assignedSlate?.trim())
    const score = [hasPrefs, hasCsr, hasSlate].filter(Boolean).length
    return { hasPrefs, hasCsr, hasSlate, score }
}

function CheckBadge({ ok, label }: { ok: boolean; label: string }) {
    return (
        <span className={`inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded font-medium
            ${ok ? "text-emerald-700 bg-emerald-50" : "text-amber-700 bg-amber-50"}`}>
            {ok
                ? <CheckCircle2 className="h-3 w-3 shrink-0" />
                : <XCircle className="h-3 w-3 shrink-0" />
            }
            {label}
        </span>
    )
}

function SummaryCard({
    icon: Icon,
    label,
    value,
    sub,
    color,
}: {
    icon: React.ComponentType<{ className?: string }>
    label: string
    value: number
    sub?: string
    color: string
}) {
    return (
        <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
            <div className={`p-2 rounded-md ${color}`}>
                <Icon className="h-4 w-4 text-white" />
            </div>
            <div>
                <div className="text-2xl font-bold leading-none">{value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                {sub && <div className="text-xs text-muted-foreground/70">{sub}</div>}
            </div>
        </div>
    )
}

const STATUS_COLORS: Record<string, string> = {
    "Available": "bg-green-500 text-white",
    "Verify PD2": "bg-green-500 text-white",
    "Slated": "bg-blue-500 text-white",
    "Ready FF": "bg-blue-500 text-white",
    "Defer": "bg-yellow-500 text-white",
    "Family Planning": "bg-yellow-500 text-white",
    "Hold": "bg-red-500 text-white",
    "List Shift": "bg-red-500 text-white",
    "Joint Lock": "bg-purple-500 text-white",
    "War College": "bg-orange-500 text-white",
}

const ALL_STATUSES = [
    "Available", "Ready FF", "Slated", "Hold", "Defer",
    "Verify PD2", "Joint Lock", "War College", "Family Planning", "List Shift",
]

// ── Main component ────────────────────────────────────────────────────────────

export function CandidatePipelineReport({ officers }: CandidatePipelineReportProps) {
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [completenessFilter, setCompletenessFilter] = useState("all")

    const eligible = useMemo(
        () => officers.filter(o => !EXCLUDED_STATUSES.has(o.status)),
        [officers]
    )

    // Summary stats
    const total = eligible.length
    const firefighters = eligible.filter(o => o.status === "Ready FF").length
    const available = eligible.filter(o => o.status === "Available").length
    const fullyReady = eligible.filter(o => completeness(o).score === 3).length

    // Filtered rows
    const rows = useMemo(() => {
        const q = search.toLowerCase()
        return eligible
            .filter(o => {
                if (statusFilter !== "all" && o.status !== statusFilter) return false
                if (completenessFilter === "complete" && completeness(o).score < 3) return false
                if (completenessFilter === "incomplete" && completeness(o).score === 3) return false
                if (q && !o.name.toLowerCase().includes(q) && !o.currentCommand.toLowerCase().includes(q)) return false
                return true
            })
            .sort((a, b) => {
                // Sort: Available first, then Ready FF, then alphabetical
                const order = ALL_STATUSES.indexOf(a.status) - ALL_STATUSES.indexOf(b.status)
                return order !== 0 ? order : a.name.localeCompare(b.name)
            })
    }, [eligible, search, statusFilter, completenessFilter])

    return (
        <div className="space-y-6 print:space-y-4">
            {/* Header */}
            <div className="print:mb-2">
                <h2 className="text-xl font-semibold">Candidate Pipeline Report</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                    Pool-wide profile readiness across all Bank officers ·{" "}
                    Generated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 print:grid-cols-4">
                <SummaryCard icon={Users} label="Total in Bank" value={total} color="bg-blue-500" />
                <SummaryCard icon={Flame} label="Firefighters" value={firefighters} sub="Ready FF" color="bg-orange-500" />
                <SummaryCard icon={Clock} label="Available" value={available} color="bg-emerald-500" />
                <SummaryCard icon={ShieldCheck} label="Fully Ready" value={fullyReady} sub="All 3 fields ✓" color="bg-violet-500" />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 print:hidden">
                <div className="relative flex-1 min-w-[180px] max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search name or command…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-44">
                        <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {ALL_STATUSES.map(s => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={completenessFilter} onValueChange={setCompletenessFilter}>
                    <SelectTrigger className="w-44">
                        <SelectValue placeholder="All Profiles" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Profiles</SelectItem>
                        <SelectItem value="complete">Complete Only</SelectItem>
                        <SelectItem value="incomplete">Incomplete Only</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex items-center text-sm text-muted-foreground ml-auto">
                    Showing {rows.length} of {total}
                </div>
            </div>

            {/* Table */}
            {rows.length === 0 ? (
                <div className="p-10 text-center text-muted-foreground border border-dashed rounded-lg">
                    No officers match the selected filters.
                </div>
            ) : (
                <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm print:text-xs">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="text-left px-4 py-2.5 font-medium">Officer</th>
                                <th className="text-left px-4 py-2.5 font-medium">Command</th>
                                <th className="text-left px-4 py-2.5 font-medium">Status</th>
                                <th className="text-center px-3 py-2.5 font-medium">PRD</th>
                                <th className="text-center px-3 py-2.5 font-medium">YG</th>
                                <th className="text-left px-4 py-2.5 font-medium">Profile Fields</th>
                                <th className="text-center px-3 py-2.5 font-medium">Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {rows.map(o => {
                                const c = completeness(o)
                                const statusColor = STATUS_COLORS[o.status] ?? "bg-muted text-muted-foreground"
                                const scoreColor =
                                    c.score === 3 ? "text-emerald-600 font-bold" :
                                        c.score >= 2 ? "text-amber-600 font-semibold" :
                                            "text-red-500 font-semibold"
                                return (
                                    <tr key={o.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-2.5">
                                            <div className="font-medium">{o.name}</div>
                                            <div className="text-xs text-muted-foreground">{o.rank} · {o.designator}</div>
                                        </td>
                                        <td className="px-4 py-2.5 text-muted-foreground text-xs">{o.currentCommand || "—"}</td>
                                        <td className="px-4 py-2.5">
                                            <Badge className={`text-[11px] ${statusColor}`} variant="outline">
                                                {o.status}
                                            </Badge>
                                        </td>
                                        <td className="px-3 py-2.5 text-center text-xs">
                                            {o.prd ? formatToMMMyy(o.prd) : "—"}
                                        </td>
                                        <td className="px-3 py-2.5 text-center text-xs text-muted-foreground">
                                            {o.yearGroup ?? "—"}
                                        </td>
                                        <td className="px-4 py-2.5">
                                            <div className="flex flex-wrap gap-1">
                                                <CheckBadge ok={c.hasPrefs} label="Prefs" />
                                                <CheckBadge ok={c.hasCsr} label="CSR" />
                                                <CheckBadge ok={c.hasSlate} label="Slate" />
                                            </div>
                                        </td>
                                        <td className={`px-3 py-2.5 text-center text-sm ${scoreColor}`}>
                                            {c.score}/3
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
