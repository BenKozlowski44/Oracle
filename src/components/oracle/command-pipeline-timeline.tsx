"use client"

import { useMemo } from "react"
import { parseISO, isValid, differenceInDays, format } from "date-fns"
import { OracleCommand } from "@/lib/types"

function parseDate(str?: string | null): Date | null {
    if (!str || ["N/A", "TBD", "Unknown", "VACANT", ""].includes(str)) return null
    const d = parseISO(str)
    return isValid(d) ? d : null
}

function fmtDate(d: Date): string {
    return format(d, "MMMyy").toUpperCase()
}

interface Lane {
    role: string
    officer: string
    start: Date | null   // null = extends to left edge (unknown start)
    end: Date | null     // null = extends to right edge (no end known)
    color: string
    textColor: string
    dashed?: boolean
}

const EMPTY_OFFICER = "— Open —"

interface Props { command: OracleCommand }

export function CommandPipelineTimeline({ command: cmd }: Props) {
    const today = useMemo(() => new Date(), [])

    // ── Collect key dates ──────────────────────────────────────────────────────
    const coCoc = parseDate(cmd.timeline?.coc)                         // CoC: P-CO becomes CO
    const coDeparts = parseDate(cmd.timeline?.coTurnover ?? cmd.currentCO?.prd)
    const xoFleetUp = parseDate(cmd.timeline?.xoTurnover)                  // XO → P-CO
    const xoReport = parseDate(cmd.inboundXO?.reportDate ?? cmd.timeline?.xoReport) // P-XO reports
    const slatedRpt = parseDate(cmd.slatedXO?.reportDate)                  // Slated XO reports

    // ── Build swim lanes (top → bottom) ───────────────────────────────────────
    const lanes: Lane[] = [
        // CO — starts at last CoC (if known), ends at CO departure
        {
            role: "CO",
            officer: cmd.currentCO?.name || EMPTY_OFFICER,
            start: coCoc,      // if we know when the last CoC was
            end: coDeparts,
            color: "bg-blue-600",
            textColor: "text-blue-100",
        },
        // P-CO — from XO fleet-up to CoC
        {
            role: "P-CO",
            officer: cmd.prospectiveCO?.name || (xoFleetUp ? cmd.inboundXO?.name || EMPTY_OFFICER : EMPTY_OFFICER),
            start: xoFleetUp,
            end: coCoc,
            color: "bg-blue-400",
            textColor: "text-blue-900",
        },
        // XO — unknown start, ends at XO fleet-up
        {
            role: "XO",
            officer: cmd.currentXO?.name || EMPTY_OFFICER,
            start: null,       // unknown when they took XO
            end: xoFleetUp,
            color: "bg-green-500",
            textColor: "text-green-50",
        },
        // P-XO / Inbound XO — reports to fleet-up
        {
            role: "P-XO",
            officer: cmd.inboundXO?.name || EMPTY_OFFICER,
            start: xoReport,
            end: xoFleetUp,
            color: "bg-amber-400",
            textColor: "text-amber-900",
        },
        // Slated — future (just a short forward bar)
        {
            role: "Slated",
            officer: cmd.slatedXO?.name || EMPTY_OFFICER,
            start: slatedRpt,
            end: xoReport,   // Slated reports → becomes P-XO
            color: "bg-gray-300 dark:bg-gray-600",
            textColor: "text-gray-700 dark:text-gray-200",
            dashed: true,
        },
    ].filter(l => l.officer !== EMPTY_OFFICER || l.start || l.end)

    // ── Global time range ──────────────────────────────────────────────────────
    const allDates = [
        coCoc, coDeparts, xoFleetUp, xoReport, slatedRpt, today
    ].filter((d): d is Date => d !== null)

    if (allDates.length === 0) {
        return (
            <div className="px-6 py-4 text-sm text-muted-foreground italic">
                No timeline dates available for this command.
            </div>
        )
    }

    const minDate = new Date(Math.min(...allDates.map(d => d.getTime())) - 60 * 86400000)
    const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())) + 60 * 86400000)
    const totalDays = differenceInDays(maxDate, minDate) || 1

    const pct = (d: Date) =>
        Math.max(0, Math.min(100, (differenceInDays(d, minDate) / totalDays) * 100))
    const todayPct = pct(today)

    const LANE_H = 34   // px per lane
    const LABEL_W = 52  // px for left role labels

    const svgH = lanes.length * LANE_H + 28  // extra for date axis

    return (
        <div className="px-6 py-5">
            <div className="flex gap-0" style={{ minHeight: svgH + 8 }}>
                {/* Role labels */}
                <div className="flex flex-col shrink-0" style={{ width: LABEL_W, paddingTop: 4 }}>
                    {lanes.map(l => (
                        <div
                            key={l.role}
                            className="flex items-center justify-end pr-2 text-[11px] font-semibold text-muted-foreground"
                            style={{ height: LANE_H }}
                        >
                            {l.role}
                        </div>
                    ))}
                </div>

                {/* Chart area */}
                <div className="relative flex-1 overflow-hidden" style={{ paddingTop: 4 }}>
                    {/* Horizontal grid lines + bars */}
                    {lanes.map((lane, i) => {
                        const barStart = lane.start ? pct(lane.start) : 0
                        const barEnd = lane.end ? pct(lane.end) : 100
                        const barW = Math.max(barEnd - barStart, 1)

                        const hasStart = lane.start !== null
                        const hasEnd = lane.end !== null
                        const isPast = lane.end && lane.end < today

                        return (
                            <div
                                key={lane.role}
                                className="relative flex items-center border-b border-muted/40"
                                style={{ height: LANE_H }}
                            >
                                {/* Bar */}
                                <div
                                    className={`absolute flex items-center h-6 ${lane.color} ${lane.dashed ? "opacity-60" : ""} ${isPast ? "opacity-50" : ""} rounded`}
                                    style={{
                                        left: `${barStart}%`,
                                        width: `${barW}%`,
                                        outline: lane.dashed ? "2px dashed rgba(100,100,100,0.4)" : "none",
                                        outlineOffset: "-2px",
                                    }}
                                    title={`${lane.role}: ${lane.officer}`}
                                >
                                    <span
                                        className={`px-2 text-[11px] font-semibold truncate w-full ${lane.textColor}`}
                                        title={lane.officer}
                                    >
                                        {lane.officer}
                                    </span>
                                </div>

                                {/* Start date label */}
                                {hasStart && lane.start && (
                                    <div
                                        className="absolute top-0.5 text-[9px] text-muted-foreground font-mono whitespace-nowrap"
                                        style={{ left: `${barStart}%`, transform: "translateX(-50%)" }}
                                    >
                                        {fmtDate(lane.start)}
                                    </div>
                                )}

                                {/* End date label */}
                                {hasEnd && lane.end && (
                                    <div
                                        className="absolute bottom-0.5 text-[9px] text-muted-foreground font-mono whitespace-nowrap"
                                        style={{ left: `${pct(lane.end)}%`, transform: "translateX(-50%)" }}
                                    >
                                        {fmtDate(lane.end)}
                                    </div>
                                )}
                            </div>
                        )
                    })}

                    {/* Today marker */}
                    <div
                        className="absolute top-0 bottom-6 w-px bg-primary z-20 pointer-events-none"
                        style={{ left: `${todayPct}%` }}
                    >
                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-primary bg-background px-1 rounded whitespace-nowrap">
                            TODAY
                        </span>
                    </div>

                    {/* Time axis */}
                    <div className="relative mt-1 h-6 border-t border-muted/60">
                        {[...allDates]
                            .filter((d, i, arr) => arr.findIndex(x => Math.abs(differenceInDays(x, d)) < 20) === i)
                            .map(d => (
                                <span
                                    key={d.toISOString()}
                                    className="absolute text-[9px] text-muted-foreground font-mono"
                                    style={{ left: `${pct(d)}%`, transform: "translateX(-50%)", top: 4 }}
                                >
                                    {fmtDate(d)}
                                </span>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
