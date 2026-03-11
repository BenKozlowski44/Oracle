"use client"

import { useMemo } from "react"
import { parseISO, isValid, differenceInDays, format } from "date-fns"
import { OracleCommand } from "@/lib/types"

interface Milestone {
    key: string
    event: string
    date: Date
    dateLabel: string
    officer: string
    type: "forecast" | "xo" | "fleetup" | "coc" | "departure"
    isForecast?: boolean
}

function parseDate(str?: string | null): Date | null {
    if (!str || str === "N/A" || str === "TBD" || str === "Unknown" || str === "VACANT") return null
    const d = parseISO(str)
    return isValid(d) ? d : null
}

function fmtDate(d: Date): string {
    return format(d, "MMMyy").toUpperCase()
}

const TYPE_COLORS: Record<string, { dot: string; label: string; line: string }> = {
    forecast: { dot: "bg-muted-foreground border-2 border-dashed border-muted-foreground", label: "text-muted-foreground", line: "bg-muted-foreground/30" },
    xo: { dot: "bg-yellow-500", label: "text-yellow-600 dark:text-yellow-400", line: "bg-yellow-500/30" },
    fleetup: { dot: "bg-orange-500", label: "text-orange-600 dark:text-orange-400", line: "bg-orange-500/30" },
    coc: { dot: "bg-blue-500", label: "text-blue-600 dark:text-blue-400", line: "bg-blue-500/30" },
    departure: { dot: "bg-gray-400", label: "text-muted-foreground", line: "bg-gray-400/30" },
}

function pastColorFor(type: string) {
    return { dot: "bg-muted border border-muted-foreground/30", label: "text-muted-foreground/60", line: "bg-muted-foreground/20" }
}

interface Props {
    command: OracleCommand
}

export function CommandPipelineTimeline({ command: cmd }: Props) {
    const today = useMemo(() => new Date(), [])

    const milestones = useMemo<Milestone[]>(() => {
        const raw: (Milestone | null)[] = [
            // 1. Slated XO (forecast)
            (() => {
                const d = parseDate(cmd.slatedXO?.reportDate)
                if (!d || !cmd.slatedXO?.name) return null
                return { key: "slated-xo", event: "Slated XO Reports", date: d, dateLabel: fmtDate(d), officer: cmd.slatedXO.name, type: "forecast" as const, isForecast: true }
            })(),
            // 2. Inbound XO reports
            (() => {
                const d = parseDate(cmd.inboundXO?.reportDate ?? cmd.timeline?.xoReport)
                if (!d) return null
                const name = cmd.inboundXO?.name || "—"
                return { key: "xo-report", event: "XO Reports In", date: d, dateLabel: fmtDate(d), officer: name, type: "xo" as const }
            })(),
            // 3. XO Fleet Up → P-CO
            (() => {
                const d = parseDate(cmd.timeline?.xoTurnover)
                if (!d) return null
                const name = cmd.inboundXO?.name ?? cmd.currentXO?.name ?? "—"
                return { key: "fleetup", event: "XO Fleet Up", date: d, dateLabel: fmtDate(d), officer: name, type: "fleetup" as const }
            })(),
            // 4. Change of Command
            (() => {
                const d = parseDate(cmd.timeline?.coc ?? cmd.prospectiveCO?.prd)
                if (!d) return null
                const name = cmd.prospectiveCO?.name ?? cmd.inboundXO?.name ?? cmd.currentXO?.name ?? "—"
                return { key: "coc", event: "Change of Command", date: d, dateLabel: fmtDate(d), officer: name, type: "coc" as const }
            })(),
            // 5. CO Departs
            (() => {
                const d = parseDate(cmd.timeline?.coTurnover ?? cmd.currentCO?.prd)
                if (!d) return null
                return { key: "co-departs", event: "CO Departs", date: d, dateLabel: fmtDate(d), officer: cmd.currentCO.name, type: "departure" as const }
            })(),
        ]

        return raw
            .filter((m): m is Milestone => m !== null)
            .sort((a, b) => a.date.getTime() - b.date.getTime())
    }, [cmd, today])

    if (milestones.length === 0) {
        return (
            <div className="px-6 py-4 text-sm text-muted-foreground italic">
                No timeline dates available for this command.
            </div>
        )
    }

    // Time range: from 90 days before earliest to 60 days after latest
    const earliest = milestones[0].date
    const latest = milestones[milestones.length - 1].date
    const rangeStart = new Date(Math.min(earliest.getTime(), today.getTime()) - 90 * 86400000)
    const rangeEnd = new Date(Math.max(latest.getTime(), today.getTime()) + 60 * 86400000)
    const totalDays = differenceInDays(rangeEnd, rangeStart) || 1

    const pct = (d: Date) => Math.max(0, Math.min(100, (differenceInDays(d, rangeStart) / totalDays) * 100))
    const todayPct = pct(today)

    // Separate above/below for staggered labels to avoid overlap
    const withPos = milestones.map((m, i) => ({ ...m, pos: pct(m.date), above: i % 2 === 0 }))

    return (
        <div className="px-6 py-5 select-none">
            <div className="relative" style={{ minHeight: 140 }}>
                {/* Milestone labels above */}
                <div className="relative h-[56px] mb-1">
                    {withPos.filter(m => m.above).map(m => {
                        const isPast = m.date < today
                        const colors = isPast ? pastColorFor(m.type) : TYPE_COLORS[m.type]
                        return (
                            <div
                                key={m.key}
                                className="absolute flex flex-col items-center"
                                style={{ left: `${m.pos}%`, transform: "translateX(-50%)", bottom: 0 }}
                            >
                                <span className={`text-[10px] font-semibold whitespace-nowrap ${colors.label}`}>{m.officer}</span>
                                <span className={`text-[9px] whitespace-nowrap ${colors.label} opacity-80`}>{m.event}</span>
                            </div>
                        )
                    })}
                </div>

                {/* The track */}
                <div className="relative flex items-center" style={{ height: 24 }}>
                    {/* Track bar */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 rounded-full bg-muted" />

                    {/* Today marker */}
                    <div
                        className="absolute top-0 bottom-0 w-0.5 bg-primary/70 z-10"
                        style={{ left: `${todayPct}%` }}
                    >
                        <span
                            className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-primary whitespace-nowrap bg-background px-1 rounded"
                        >
                            TODAY
                        </span>
                    </div>

                    {/* Milestone dots */}
                    {withPos.map(m => {
                        const isPast = m.date < today
                        const colors = isPast ? pastColorFor(m.type) : TYPE_COLORS[m.type]
                        const isForecast = m.isForecast
                        return (
                            <div
                                key={m.key}
                                className="absolute z-20 flex flex-col items-center"
                                style={{ left: `${m.pos}%`, transform: "translateX(-50%)" }}
                                title={`${m.event}: ${m.officer} — ${m.dateLabel}`}
                            >
                                <div className={`w-3.5 h-3.5 rounded-full ${colors.dot} ${isForecast ? "opacity-60" : ""} shadow-sm`} />
                            </div>
                        )
                    })}
                </div>

                {/* Milestone labels below */}
                <div className="relative h-[52px] mt-1">
                    {withPos.filter(m => !m.above).map(m => {
                        const isPast = m.date < today
                        const colors = isPast ? pastColorFor(m.type) : TYPE_COLORS[m.type]
                        return (
                            <div
                                key={m.key}
                                className="absolute flex flex-col items-center"
                                style={{ left: `${m.pos}%`, transform: "translateX(-50%)", top: 0 }}
                            >
                                <span className={`text-[10px] font-semibold whitespace-nowrap ${colors.label}`}>{m.officer}</span>
                                <span className={`text-[9px] whitespace-nowrap ${colors.label} opacity-80`}>{m.event}</span>
                            </div>
                        )
                    })}
                </div>

                {/* Date labels on track */}
                <div className="relative h-4">
                    {withPos.map(m => (
                        <div
                            key={m.key + "-date"}
                            className="absolute text-[9px] text-muted-foreground font-mono whitespace-nowrap"
                            style={{ left: `${m.pos}%`, transform: "translateX(-50%)" }}
                        >
                            {m.dateLabel}
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t flex-wrap">
                {[
                    { color: "bg-yellow-500", label: "XO Reports" },
                    { color: "bg-orange-500", label: "XO Fleet Up" },
                    { color: "bg-blue-500", label: "Change of Command" },
                    { color: "bg-gray-400", label: "CO Departs" },
                    { color: "bg-muted-foreground opacity-40 border border-dashed border-muted-foreground", label: "Forecast" },
                ].map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                        <span className="text-[10px] text-muted-foreground">{label}</span>
                    </div>
                ))}
                <div className="flex items-center gap-1.5 ml-auto">
                    <div className="w-0.5 h-3 bg-primary/70" />
                    <span className="text-[10px] text-primary font-semibold">Today</span>
                </div>
            </div>
        </div>
    )
}
