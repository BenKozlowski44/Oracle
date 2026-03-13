"use client"

import { useMemo, useState, useCallback } from "react"
import { parseISO, isValid, differenceInDays, format, parse, addMonths, subMonths } from "date-fns"
import { OracleCommand } from "@/lib/types"

function parseDate(str?: string | null): Date | null {
    if (!str || ["N/A", "TBD", "Unknown", "VACANT", ""].includes(str)) return null
    const iso = parseISO(str)
    if (isValid(iso)) return iso
    for (const fmt of ["MMMyy", "MMMMyy"]) {
        try {
            const d = parse(str, fmt, new Date())
            if (isValid(d)) return d
        } catch { /* continue */ }
    }
    return null
}

function fmtDate(d: Date): string { return format(d, "MMMyy").toUpperCase() }

interface Segment {
    name: string
    phase: string
    start: Date
    end: Date | null
    color: string
    badge: string
}

interface Props { command: OracleCommand }

export function CommandMiniTimeline({ command: cmd }: Props) {
    const today = useMemo(() => new Date(), [])

    // Fixed window: 18 months before today → 54 months after (4.5 year window)
    const windowStart = useMemo(() => subMonths(today, 18), [today])
    const windowEnd = useMemo(() => addMonths(today, 54), [today])
    const totalDays = differenceInDays(windowEnd, windowStart) || 1

    const pct = (d: Date) =>
        Math.max(0, Math.min(100, (differenceInDays(d, windowStart) / totalDays) * 100))

    const todayPct = pct(today)
    const isDirectCO = cmd.rotationStyle === "DirectCO"
    const isPersonName = (n: string) => /[a-zA-Z]{2,}/.test(n)

    const segments = useMemo<Segment[]>(() => {
        const segs: Segment[] = []
        const slots = [
            { slot: cmd.currentCO, isForecast: false },
            { slot: cmd.currentXO, isForecast: false },
            { slot: cmd.inboundXO, isForecast: true },
            { slot: cmd.slatedXO, isForecast: true },
        ]
        for (const { slot } of slots) {
            if (!slot?.name || !isPersonName(slot.name)) continue
            const td = slot.timelineData
            const xoStart = parseDate(td?.i)
            const fleetUp = parseDate(td?.k)
            const coc = parseDate(td?.m)
            const coPrd = parseDate(td?.q)

            if (!isDirectCO && xoStart) {
                segs.push({ name: slot.name, phase: "XO", start: xoStart, end: fleetUp, color: "bg-green-500", badge: "XO" })
            }
            if (fleetUp && coc) {
                segs.push({ name: slot.name, phase: "P-CO", start: fleetUp, end: coc, color: "bg-sky-400", badge: "P-CO" })
            }
            if (coc) {
                segs.push({ name: slot.name, phase: "CO", start: coc, end: coPrd, color: "bg-blue-500", badge: "CO" })
            }
        }
        // Only show segments that overlap the window
        return segs.filter(s =>
            (!s.end || s.end > windowStart) && s.start < windowEnd
        )
    }, [cmd, isDirectCO, windowStart, windowEnd])

    // Tooltip
    const [tooltip, setTooltip] = useState<{
        x: number; seg: Segment
    } | null>(null)

    const onMove = useCallback((e: React.MouseEvent, seg: Segment) => {
        const rect = (e.currentTarget.closest('.mini-chart') as HTMLElement)?.getBoundingClientRect()
        if (!rect) return
        setTooltip({ x: e.clientX - rect.left, seg })
    }, [])

    if (segments.length === 0) return null

    const BAR_H = 6
    const TRACK_H = 16

    return (
        <div className="mini-chart relative w-full overflow-hidden" style={{ height: TRACK_H }}>
            {/* Subtle background */}
            <div className="absolute inset-0 bg-muted/20" />

            {/* Segments */}
            {segments.map((seg, i) => {
                const s = pct(seg.start)
                const e = seg.end ? pct(seg.end) : 100
                const w = Math.max(e - s, 0.3)
                const isActive = seg.start <= today && (!seg.end || seg.end >= today)
                return (
                    <div
                        key={i}
                        className={`absolute ${seg.color} cursor-default transition-opacity
                            ${isActive ? "opacity-100" : "opacity-40"}
                        `}
                        style={{
                            left: `${s}%`,
                            width: `${w}%`,
                            height: BAR_H,
                            top: `calc(50% - ${BAR_H / 2}px)`,
                            borderRadius: 2,
                        }}
                        onMouseMove={e => onMove(e, seg)}
                        onMouseLeave={() => setTooltip(null)}
                    />
                )
            })}

            {/* Today line */}
            <div
                className="absolute top-0 bottom-0 w-px bg-primary z-10 pointer-events-none"
                style={{ left: `${todayPct}%` }}
            />

            {/* Tooltip */}
            {tooltip && (
                <div
                    className="absolute z-50 pointer-events-none bottom-full mb-1"
                    style={{
                        left: Math.min(tooltip.x + 8, 90) + "%",
                        transform: "translateX(-50%)",
                    }}
                >
                    <div className="bg-popover border border-border rounded-md shadow-lg px-2.5 py-1.5 text-left min-w-max">
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <span className={`text-[9px] font-bold uppercase px-1 py-px rounded-sm
                                ${tooltip.seg.phase === "CO" ? "bg-blue-500 text-white"
                                    : tooltip.seg.phase === "P-CO" ? "bg-sky-400 text-sky-900"
                                        : "bg-green-500 text-white"}`}
                            >
                                {tooltip.seg.phase}
                            </span>
                        </div>
                        <p className="text-[11px] font-semibold text-foreground leading-tight">{tooltip.seg.name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">
                            {fmtDate(tooltip.seg.start)} → {tooltip.seg.end ? fmtDate(tooltip.seg.end) : "ongoing"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
