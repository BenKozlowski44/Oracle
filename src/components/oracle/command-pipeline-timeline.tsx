"use client"

import { useMemo } from "react"
import { parseISO, isValid, differenceInDays, format, parse } from "date-fns"
import { OracleCommand } from "@/lib/types"

// ── Date parsing ───────────────────────────────────────────────────────────────
function parseDate(str?: string | null): Date | null {
    if (!str || ["N/A", "TBD", "Unknown", "VACANT", ""].includes(str)) return null
    // Try ISO first (2024-09-01)
    const iso = parseISO(str)
    if (isValid(iso)) return iso
    // Try MMMyy (JUN26) or MMMMyy
    for (const fmt of ["MMMyy", "MMMMyy", "MMM yy", "MMM yyyy"]) {
        try {
            const d = parse(str, fmt, new Date())
            if (isValid(d)) return d
        } catch { /* continue */ }
    }
    return null
}

function fmtDate(d: Date): string {
    return format(d, "MMMyy").toUpperCase()
}

// ── Types ──────────────────────────────────────────────────────────────────────
interface OfficerSpan {
    name: string
    start: Date | null
    end: Date | null
    isPast: boolean
    isForecast: boolean
}

interface Lane {
    role: string
    color: string        // Tailwind bg class
    textColor: string    // Tailwind text class
    spans: OfficerSpan[]
}

interface PersonSlot {
    name: string
    reportDate?: string
    timelineData?: {
        i?: string | null  // XO Report date
        k?: string | null  // XO Fleet-Up date
        m?: string | null  // CoC date
        q?: string | null  // CO PRD
    }
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function makeSpan(
    name: string,
    start: Date | null,
    end: Date | null,
    today: Date,
    isForecast = false
): OfficerSpan | null {
    // Need at least one anchor date and a real name
    if (!name?.trim() || name === "— Open —") return null
    return {
        name,
        start,
        end,
        isPast: !!(end && end < today),
        isForecast,
    }
}

// ── Component ──────────────────────────────────────────────────────────────────
interface Props { command: OracleCommand }

export function CommandPipelineTimeline({ command: cmd }: Props) {
    const today = useMemo(() => new Date(), [])
    const isDirectCO = cmd.rotationStyle === "DirectCO"

    // Build the slot list
    const slots: PersonSlot[] = [
        cmd.currentCO,
        cmd.currentXO,
        cmd.inboundXO,
        cmd.slatedXO,
    ].filter((s): s is NonNullable<typeof s> => !!s && !!s.name?.trim()) as PersonSlot[]

    // Check for names that are really slate labels not persons (e.g., "26-3")
    const isPersonName = (name: string) => /[a-zA-Z]{2,}/.test(name)

    // ── Build lanes ────────────────────────────────────────────────────────────
    const coLane: Lane = {
        role: "CO",
        color: "bg-blue-600",
        textColor: "text-white",
        spans: slots
            .filter(s => isPersonName(s.name))
            .map(s => makeSpan(
                s.name,
                parseDate(s.timelineData?.m),
                parseDate(s.timelineData?.q),
                today,
            ))
            .filter((s): s is OfficerSpan => s !== null),
    }

    const pceLane: Lane = {
        role: "P-CO",
        color: "bg-sky-400",
        textColor: "text-sky-900",
        spans: slots
            .filter(s => isPersonName(s.name))
            .map(s => makeSpan(
                s.name,
                parseDate(s.timelineData?.k),
                parseDate(s.timelineData?.m),
                today,
            ))
            .filter((s): s is OfficerSpan => s !== null),
    }

    const xoLane: Lane = {
        role: "XO",
        color: "bg-green-500",
        textColor: "text-white",
        spans: slots
            .filter(s => isPersonName(s.name))
            .map(s => makeSpan(
                s.name,
                parseDate(s.timelineData?.i ?? (s as any).reportDate),
                parseDate(s.timelineData?.k),
                today,
            ))
            .filter((s): s is OfficerSpan => s !== null),
    }

    // P-XO: only the inboundXO slot (report date → XO start)
    const inboundReport = parseDate((cmd.inboundXO as any)?.reportDate)
    const inboundXOStart = parseDate(cmd.inboundXO?.timelineData?.i)
    const pxoLane: Lane = {
        role: "P-XO",
        color: "bg-amber-400",
        textColor: "text-amber-900",
        spans: cmd.inboundXO?.name && isPersonName(cmd.inboundXO.name)
            ? [makeSpan(
                cmd.inboundXO.name,
                inboundReport,
                inboundXOStart && inboundReport && differenceInDays(inboundXOStart, inboundReport) > 7
                    ? inboundXOStart
                    : null,   // same date → no visible P-XO bar
                today,
                true,
            )].filter((s): s is OfficerSpan => s !== null)
            : [],
    }

    // Slated: slate name (may be a label like "26-3" or a real person)
    const slatedLane: Lane = {
        role: "Slated",
        color: "bg-gray-300 dark:bg-gray-600",
        textColor: "text-gray-700 dark:text-gray-100",
        spans: cmd.slatedXO?.name
            ? [makeSpan(
                cmd.slatedXO.name,
                parseDate((cmd.slatedXO as any).reportDate),
                null,
                today,
                true,
            )].filter((s): s is OfficerSpan => s !== null)
            : [],
    }

    // DirectCO only shows CO + P-CO
    const lanes = isDirectCO
        ? [coLane, pceLane]
        : [coLane, pceLane, xoLane, pxoLane, slatedLane]
            .filter(l => l.spans.length > 0)

    // ── Compute time range ─────────────────────────────────────────────────────
    const allDates = lanes.flatMap(l => l.spans.flatMap(s => [s.start, s.end]))
        .filter((d): d is Date => d !== null)
    allDates.push(today)

    if (allDates.length === 1) {
        return (
            <div className="px-6 py-4 text-sm text-muted-foreground italic">
                No timeline date data available for this command.
            </div>
        )
    }

    const minMs = Math.min(...allDates.map(d => d.getTime()))
    const maxMs = Math.max(...allDates.map(d => d.getTime()))
    const rangeStart = new Date(minMs - 45 * 86400000)
    const rangeEnd = new Date(maxMs + 60 * 86400000)
    const totalDays = differenceInDays(rangeEnd, rangeStart) || 1

    const pct = (d: Date) =>
        Math.max(0, Math.min(100, (differenceInDays(d, rangeStart) / totalDays) * 100))

    const todayPct = pct(today)
    const LANE_H = 36
    const LABEL_W = 58

    return (
        <div className="px-6 py-5">
            <div className="flex gap-0">
                {/* Role labels */}
                <div className="flex flex-col shrink-0" style={{ width: LABEL_W }}>
                    {lanes.map(l => (
                        <div
                            key={l.role}
                            className="flex items-center justify-end pr-2.5 text-[11px] font-bold text-muted-foreground"
                            style={{ height: LANE_H }}
                        >
                            {l.role}
                        </div>
                    ))}
                    {/* Axis spacer */}
                    <div style={{ height: 24 }} />
                </div>

                {/* Chart */}
                <div className="relative flex-1 overflow-hidden">
                    {lanes.map((lane, li) => (
                        <div
                            key={lane.role}
                            className="relative border-b border-muted/30"
                            style={{ height: LANE_H }}
                        >
                            {/* Track */}
                            <div className="absolute inset-x-0 top-1/2 h-px bg-muted/60" />

                            {lane.spans.map((span, si) => {
                                const s = span.start ? pct(span.start) : 0
                                const e = span.end ? pct(span.end) : 100
                                const w = Math.max(e - s, 0.5)
                                const openLeft = span.start === null
                                const openRight = span.end === null

                                const opacity = span.isPast ? "opacity-60" : ""
                                const outline = span.isForecast
                                    ? "outline outline-2 outline-dashed outline-offset-[-2px] outline-gray-400/60"
                                    : ""

                                return (
                                    <div
                                        key={si}
                                        className={`absolute flex items-center h-6 top-1/2 -translate-y-1/2 ${lane.color} ${opacity} ${outline}`}
                                        style={{
                                            left: `${s}%`,
                                            width: `${w}%`,
                                            borderRadius: openLeft && openRight ? 4
                                                : openLeft ? "0 4px 4px 0"
                                                    : openRight ? "4px 0 0 4px"
                                                        : 4,
                                        }}
                                        title={`${span.name}: ${span.start ? fmtDate(span.start) : "?"} → ${span.end ? fmtDate(span.end) : "ongoing"}`}
                                    >
                                        <span className={`px-1.5 text-[11px] font-semibold truncate w-full leading-none ${lane.textColor}`}>
                                            {span.name}
                                        </span>

                                        {/* Start endpoint tick */}
                                        {span.start && (
                                            <span
                                                className="absolute -bottom-4 text-[9px] text-muted-foreground font-mono whitespace-nowrap"
                                                style={{ left: 0, transform: "translateX(-50%)" }}
                                            >
                                                {fmtDate(span.start)}
                                            </span>
                                        )}
                                        {/* End endpoint tick */}
                                        {span.end && (
                                            <span
                                                className="absolute -top-3.5 text-[9px] text-muted-foreground font-mono whitespace-nowrap"
                                                style={{ right: 0, transform: "translateX(50%)" }}
                                            >
                                                {fmtDate(span.end)}
                                            </span>
                                        )}
                                    </div>
                                )
                            })}

                            {/* Today line through this lane */}
                            <div
                                className="absolute top-0 bottom-0 w-px bg-primary/60 z-20 pointer-events-none"
                                style={{ left: `${todayPct}%` }}
                            />
                        </div>
                    ))}

                    {/* Time axis */}
                    <div className="relative h-6 border-t border-muted/60 mt-0">
                        {/* always show today label */}
                        <div
                            className="absolute top-0.5 w-px bg-primary"
                            style={{ left: `${todayPct}%` }}
                        >
                            <span className="absolute top-0.5 left-1 text-[9px] font-bold text-primary whitespace-nowrap">
                                TODAY
                            </span>
                        </div>

                        {/* Key date ticks on axis (deduplicated, ≥28 days apart) */}
                        {(() => {
                            const tickDates: Date[] = []
                            for (const lane of lanes) {
                                for (const span of lane.spans) {
                                    if (span.start) tickDates.push(span.start)
                                    if (span.end) tickDates.push(span.end)
                                }
                            }
                            const unique = tickDates
                                .sort((a, b) => a.getTime() - b.getTime())
                                .filter((d, i, arr) =>
                                    i === 0 || differenceInDays(d, arr[i - 1]) >= 28
                                )
                            return unique.map(d => (
                                <span
                                    key={d.toISOString()}
                                    className="absolute top-2.5 text-[9px] text-muted-foreground font-mono whitespace-nowrap"
                                    style={{ left: `${pct(d)}%`, transform: "translateX(-50%)" }}
                                >
                                    {fmtDate(d)}
                                </span>
                            ))
                        })()}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-2 flex-wrap">
                {[
                    { color: "bg-blue-600", label: "CO" },
                    { color: "bg-sky-400", label: "P-CO" },
                    { color: "bg-green-500", label: "XO" },
                    { color: "bg-amber-400", label: "P-XO" },
                    { color: "bg-gray-300", label: "Slated (forecast)" },
                ].filter(({ label }) =>
                    !isDirectCO || label === "CO" || label === "P-CO"
                ).map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <div className={`w-2.5 h-2.5 rounded-sm ${color}`} />
                        <span className="text-[10px] text-muted-foreground">{label}</span>
                    </div>
                ))}
                <div className="ml-auto flex items-center gap-1.5">
                    <div className="w-px h-3.5 bg-primary" />
                    <span className="text-[10px] font-semibold text-primary">Today</span>
                </div>
            </div>
        </div>
    )
}
