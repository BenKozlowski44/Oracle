"use client"

import { useMemo } from "react"
import { parseISO, isValid, differenceInDays, format, parse } from "date-fns"
import { OracleCommand } from "@/lib/types"

// ── Date parsing ───────────────────────────────────────────────────────────────
function parseDate(str?: string | null): Date | null {
    if (!str || ["N/A", "TBD", "Unknown", "VACANT", ""].includes(str)) return null
    const iso = parseISO(str)
    if (isValid(iso)) return iso
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
interface OfficerRow {
    name: string
    isForecast: boolean
    isOnboard: boolean   // a phase bar for this officer spans today
    // Phase dates
    xoStart: Date | null  // i — start of XO tour
    fleetUp: Date | null  // k — end of XO / start of P-CO
    coc: Date | null  // m — end of P-CO / start of CO
    coPrd: Date | null  // q — end of CO tour
}

// ── Component ──────────────────────────────────────────────────────────────────
interface Props { command: OracleCommand }

export function CommandPipelineTimeline({ command: cmd }: Props) {
    const today = useMemo(() => new Date(), [])
    const isDirectCO = cmd.rotationStyle === "DirectCO"
    const isPersonName = (name: string) => /[a-zA-Z]{2,}/.test(name)

    // Build one row per officer in the pipeline
    const rows = useMemo<OfficerRow[]>(() => {
        const slots = [
            { slot: cmd.currentCO, isForecast: false },
            { slot: cmd.currentXO, isForecast: false },
            { slot: cmd.inboundXO, isForecast: true },
            { slot: cmd.slatedXO, isForecast: true },
        ]

        const now = new Date()
        return slots
            .filter(({ slot }) => !!slot?.name?.trim() && isPersonName(slot.name))
            .map(({ slot, isForecast }) => {
                const xoStart = parseDate(slot!.timelineData?.i)
                const fleetUp = parseDate(slot!.timelineData?.k)
                const coc = parseDate(slot!.timelineData?.m)
                const coPrd = parseDate(slot!.timelineData?.q)
                const isOnboard = !isForecast && (
                    (xoStart && xoStart <= now && (!fleetUp || fleetUp >= now)) ||
                    (coc && coc <= now && (!coPrd || coPrd >= now))
                )
                return { name: slot!.name, isForecast, isOnboard: !!isOnboard, xoStart, fleetUp, coc, coPrd }
            })
    }, [cmd])

    // ── Next fill anchor ─────────────────────────────────────────────────────
    // The next open XO slot begins when the last pipeline person fleets up
    const nextFillStart = useMemo<Date | null>(() => {
        const fleetUpDates = rows
            .map(r => r.fleetUp)
            .filter((d): d is Date => d !== null)
        if (fleetUpDates.length === 0) return null
        return new Date(Math.max(...fleetUpDates.map(d => d.getTime())))
    }, [rows])

    // ── Compute global time range ──────────────────────────────────────────────
    const allDates = [
        today,
        ...rows.flatMap(r => [r.xoStart, r.fleetUp, r.coc, r.coPrd]),
        nextFillStart,
    ].filter((d): d is Date => d !== null)

    if (rows.length === 0 || allDates.length <= 1) {
        return (
            <div className="px-6 py-4 text-sm text-muted-foreground italic">
                No timeline data available for this command.
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
    const NAME_W = 160  // px for name labels
    const ROW_H = 38
    const BAR_H = 22

    // Phases for each officer: [start, end, color, textColor, label]
    const getPhases = (row: OfficerRow) => {
        const phases: { start: Date | null; end: Date | null; color: string; text: string; phaseLabel: string }[] = []

        if (!isDirectCO && row.xoStart && row.fleetUp) {
            phases.push({ start: row.xoStart, end: row.fleetUp, color: "bg-green-500", text: "text-white", phaseLabel: "XO" })
        } else if (!isDirectCO && row.xoStart && !row.fleetUp) {
            // XO with no known end (current XO still serving)
            phases.push({ start: row.xoStart, end: row.fleetUp, color: "bg-green-500", text: "text-white", phaseLabel: "XO" })
        }

        if (row.fleetUp && row.coc) {
            phases.push({ start: row.fleetUp, end: row.coc, color: "bg-sky-400", text: "text-sky-900", phaseLabel: "P-CO" })
        }

        if (row.coc) {
            phases.push({ start: row.coc, end: row.coPrd, color: "bg-blue-500", text: "text-white", phaseLabel: "CO" })
        }

        return phases
    }

    // Deduplicate axis tick dates (≥ 28 days apart)
    const axisTickDates = rows
        .flatMap(r => [r.xoStart, r.fleetUp, r.coc, r.coPrd])
        .filter((d): d is Date => d !== null)
        .sort((a, b) => a.getTime() - b.getTime())
        .filter((d, i, arr) => i === 0 || differenceInDays(d, arr[i - 1]) >= 28)

    return (
        <div className="px-6 py-5 select-none">
            <div className="flex gap-0">
                {/* Name labels */}
                <div className="flex flex-col shrink-0" style={{ width: NAME_W }}>
                    {rows.map(row => (
                        <div
                            key={row.name}
                            className="flex items-center justify-end pr-3 text-[11px] font-semibold leading-tight text-right"
                            style={{ height: ROW_H }}
                        >
                            <span
                                className={
                                    row.isForecast
                                        ? "text-muted-foreground italic"
                                        : row.isOnboard
                                            // CO phase active → blue-500; XO phase active → green-600
                                            ? (row.coc && row.coc <= today)
                                                ? "text-blue-500 font-bold text-[12px]"
                                                : "text-green-600 font-bold text-[12px]"
                                            : "text-foreground"
                                }
                            >
                                {row.name}
                            </span>
                        </div>
                    ))}
                    {/* TBD next fill label */}
                    {nextFillStart && cmd.nextSlateParams && (
                        <div
                            className="flex items-center justify-end pr-3 text-[11px] font-semibold leading-tight text-right"
                            style={{ height: ROW_H }}
                        >
                            <span className="text-muted-foreground/70 italic">
                                TBD — {cmd.nextSlateParams.requirement} Slate {cmd.nextSlateParams.targetBoardDate}
                            </span>
                        </div>
                    )}
                    {/* Axis spacer */}
                    <div style={{ height: 28 }} />
                </div>

                {/* Chart area */}
                <div className="relative flex-1 min-w-0">
                    {rows.map((row, ri) => {
                        const phases = getPhases(row)
                        return (
                            <div
                                key={row.name}
                                className="relative border-b border-muted/30"
                                style={{ height: ROW_H }}
                            >
                                {/* Background track */}
                                <div className="absolute inset-x-0 top-1/2 h-px bg-muted/50" />

                                {/* Today line */}
                                <div
                                    className="absolute top-0 bottom-0 w-px bg-primary/60 z-20 pointer-events-none"
                                    style={{ left: `${todayPct}%` }}
                                />

                                {/* Phase bars */}
                                {phases.map((phase, pi) => {
                                    if (!phase.start) return null
                                    const s = pct(phase.start)
                                    const e = phase.end ? pct(phase.end) : 100
                                    const w = Math.max(e - s, 0.4)
                                    const isPast = phase.end && phase.end < today
                                    const isOpenRight = !phase.end
                                    // Segment spans today → officer is currently in this role
                                    const isActive = !!(phase.start && phase.start <= today && (!phase.end || phase.end >= today))

                                    // Show name on the ACTIVE segment (spans today); for forecast officers, show on
                                    // first segment (XO bar — where they currently are); for fully-past, show on last.
                                    const anyActive = phases.some(p => p.start && p.start <= today && (!p.end || p.end >= today))
                                    const showName = anyActive
                                        ? isActive
                                        : row.isForecast
                                            ? pi === 0               // forecast: name on green XO bar
                                            : pi === phases.length - 1 // past: name on most-recent bar

                                    return (
                                        <div
                                            key={pi}
                                            className={`absolute z-10 flex items-center overflow-hidden
                                                ${phase.color}
                                                ${row.isForecast ? "opacity-70" : ""}
                                                ${isPast ? "opacity-55" : ""}
                                                ${isActive && !row.isForecast ? "ring-2 ring-white ring-inset brightness-110" : ""}
                                            `}
                                            style={{
                                                left: `${s}%`,
                                                width: `${w}%`,
                                                height: BAR_H,
                                                top: `calc(50% - ${BAR_H / 2}px)`,
                                                borderRadius: isOpenRight
                                                    ? "4px 0 0 4px"
                                                    : pi === 0 ? 4 : "0 4px 4px 0",
                                                outline: row.isForecast
                                                    ? "2px dashed rgba(100,100,100,0.35)"
                                                    : "none",
                                                outlineOffset: "-2px",
                                            }}
                                            title={`${phase.phaseLabel}: ${fmtDate(phase.start)}${phase.end ? " → " + fmtDate(phase.end) : " → ongoing"}`}
                                        >
                                            {showName && (
                                                <span className={`px-2 text-[11px] font-semibold truncate leading-none ${phase.text}`}>
                                                    {row.name}
                                                </span>
                                            )}
                                        </div>
                                    )
                                })}

                                {/* Date boundary ticks (top/bottom alternating per row) */}
                                {[row.xoStart, row.fleetUp, row.coc, row.coPrd]
                                    .filter((d): d is Date => d !== null)
                                    .map((d, di) => (
                                        <span
                                            key={di}
                                            className="absolute text-[9px] text-muted-foreground font-mono whitespace-nowrap pointer-events-none"
                                            style={{
                                                left: `${pct(d)}%`,
                                                transform: "translateX(-50%)",
                                                ...(ri % 2 === di % 2
                                                    ? { bottom: 1 }
                                                    : { top: 1 }),
                                            }}
                                        >
                                            {fmtDate(d)}
                                        </span>
                                    ))}
                            </div>
                        )
                    })}

                    {/* TBD next fill row */}
                    {nextFillStart && cmd.nextSlateParams && (() => {
                        const s = pct(nextFillStart)
                        return (
                            <div className="relative border-b border-muted/30" style={{ height: ROW_H }}>
                                <div className="absolute inset-x-0 top-1/2 h-px bg-muted/50" />
                                <div
                                    className="absolute top-0 bottom-0 w-px bg-primary/60 z-20 pointer-events-none"
                                    style={{ left: `${todayPct}%` }}
                                />
                                {/* Open-right dashed bar */}
                                <div
                                    className="absolute z-10 flex items-center overflow-hidden bg-green-500 opacity-60"
                                    style={{
                                        left: `${s}%`,
                                        right: 0,
                                        height: BAR_H,
                                        top: `calc(50% - ${BAR_H / 2}px)`,
                                        borderRadius: "4px 0 0 4px",
                                        outline: "2px dashed rgba(100,100,100,0.35)",
                                        outlineOffset: "-2px",
                                    }}
                                    title={`Next ${cmd.nextSlateParams.requirement} needed — Slate ${cmd.nextSlateParams.targetBoardDate}`}
                                >
                                    <span className="px-2 text-[11px] text-white font-semibold truncate leading-none">
                                        Next {cmd.nextSlateParams.requirement} — Slate {cmd.nextSlateParams.targetBoardDate}
                                    </span>
                                </div>
                                {/* Start date tick */}
                                <span
                                    className="absolute bottom-1 text-[9px] text-muted-foreground font-mono whitespace-nowrap"
                                    style={{ left: `${s}%`, transform: "translateX(-50%)" }}
                                >
                                    {fmtDate(nextFillStart)}
                                </span>
                            </div>
                        )
                    })()}

                    {/* Time axis */}
                    <div className="relative h-7 border-t border-muted/60">
                        {/* Today marker */}
                        <div
                            className="absolute top-0 w-px h-2 bg-primary"
                            style={{ left: `${todayPct}%` }}
                        >
                            <span className="absolute left-1 top-0 text-[9px] font-bold text-primary whitespace-nowrap">
                                TODAY
                            </span>
                        </div>
                        {/* Date ticks */}
                        {axisTickDates.map(d => (
                            <span
                                key={d.toISOString()}
                                className="absolute top-3 text-[9px] text-muted-foreground font-mono whitespace-nowrap"
                                style={{ left: `${pct(d)}%`, transform: "translateX(-50%)" }}
                            >
                                {fmtDate(d)}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-5 mt-2 flex-wrap">
                {[
                    { color: "bg-green-500", label: "XO Tour" },
                    { color: "bg-sky-400", label: "Turnover (P-CO)" },
                    { color: "bg-blue-500", label: "CO Tour" },
                    { color: "bg-muted", label: "Next Req (TBD)" },
                ].filter(({ label }) => !isDirectCO || !label.startsWith("XO"))
                    .map(({ color, label }) => (
                        <div key={label} className="flex items-center gap-1.5">
                            <div className={`w-3 h-3 rounded-sm ${color}`} />
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
