/**
 * cdr-cmd-row.tsx
 *
 * Renders a single row in the standard CDR CMD table (fleet-up and direct CO
 * commands). Extracted from oracle-table.tsx to mirror the CommandRow pattern
 * used for CO-SM commands.
 *
 * Each row is a React.Fragment containing:
 *   1. The main table row (expand toggle, command info, CO, XO, P-XO, slate badge)
 *   2. An optional expanded pipeline timeline row
 */

import React from "react"
import { OracleCommand, Officer } from "@/lib/types"
import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight } from "lucide-react"
import { FleetUpChecklist } from "./fleet-up-checklist"
import { CommandPipelineTimeline } from "./command-pipeline-timeline"
import { formatToMMMyy } from "@/lib/utils"
import { getPipelineHealth, predictNextVacancyDate, getCdrCmdXoRptDate } from "@/lib/slate-logic"
import { format, parseISO, isValid } from "date-fns"

interface CdrCmdRowProps {
    cmd: OracleCommand
    expandedRows: Set<string>
    onToggleExpand: (id: string) => void
    onEditClick: (cmd: OracleCommand) => void
    onPersistUpdate: (cmd: OracleCommand, officers: Officer[], message: string) => void
    officers: Officer[]
}

/** Formats a raw date string (ISO or MMMyy) into a "MMMyy" display string. */
function fmtCoC(dateStr: string | null | undefined): string {
    if (!dateStr) return "N/A"
    const d = parseISO(dateStr)
    return isValid(d) ? format(d, "MMMyy").toUpperCase() : dateStr
}

export function CdrCmdRow({ cmd, expandedRows, onToggleExpand, onEditClick, onPersistUpdate, officers }: CdrCmdRowProps) {
    const health = getPipelineHealth(cmd)
    const rowBorder = health.status === "green"
        ? "border-l-green-500"
        : health.status === "yellow"
            ? "border-l-amber-400"
            : "border-l-red-500"
    const dotColor = health.status === "green"
        ? "bg-green-500"
        : health.status === "yellow"
            ? "bg-amber-400"
            : "bg-red-500"
    const badgeClass = health.status === "green"
        ? "border-green-500 text-green-600 bg-green-500/10"
        : health.status === "yellow"
            ? "border-amber-400 text-amber-600 bg-amber-400/10"
            : "border-red-500 text-red-600 bg-red-500/10"

    // Recompute slate live so the badge always reflects the latest data
    const liveBoard = predictNextVacancyDate(cmd)
    const cmdLive: OracleCommand = liveBoard !== "TBD"
        ? { ...cmd, nextSlateParams: { ...cmd.nextSlateParams, targetBoardDate: liveBoard } }
        : cmd

    // ── CO cell ──────────────────────────────────────────────────────────────
    const coIsNonSWO = cmd.currentCO.fillCommunity && cmd.currentCO.fillCommunity !== "1110"
    const coDisplayName = coIsNonSWO ? `${cmd.currentCO.fillCommunity} Fill` : cmd.currentCO.name
    const coCoCDate = cmd.currentCO.timelineData?.q || cmd.currentCO.prd

    // ── XO cell ──────────────────────────────────────────────────────────────
    const xoIsNonSWO = cmd.currentXO.fillCommunity && cmd.currentXO.fillCommunity !== "1110"
    const xoDisplayName = xoIsNonSWO ? `${cmd.currentXO.fillCommunity} Fill` : cmd.currentXO.name
    const xoCoCDate = cmd.currentXO.timelineData?.m || cmd.currentXO.prd

    // ── P-XO cell ────────────────────────────────────────────────────────────
    const inbound = cmd.inboundXO
    const pxoIsNonSWO = inbound?.fillCommunity && inbound.fillCommunity !== "1110"
    const pxoDisplayName = pxoIsNonSWO ? `${inbound!.fillCommunity} Fill` : inbound?.name ?? ""
    const pxoIsNoFill = inbound?.name?.toLowerCase().includes("no fill")

    return (
        <React.Fragment>
            <TableRow>
                {/* Expand toggle */}
                <TableCell className={`w-8 p-1.5 border-l-4 ${rowBorder}`}>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onToggleExpand(cmd.id)}>
                        {expandedRows.has(cmd.id)
                            ? <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                </TableCell>

                {/* Command name */}
                <TableCell className="max-w-[200px] whitespace-normal">
                    <div className="flex items-start gap-2">
                        <span
                            className={`mt-1.5 flex-shrink-0 w-2 h-2 rounded-full ${dotColor}
                                ${health.approaching ? "animate-pulse ring-2 ring-amber-400/50 ring-offset-1" : ""}
                                ${health.status === "red" && !health.approaching ? "animate-pulse ring-2 ring-red-500/50 ring-offset-1" : ""}`}
                            title={`${health.label}: ${health.detail}`}
                        />
                        <div>
                            <button
                                className="font-semibold leading-tight text-left hover:underline cursor-pointer"
                                onClick={() => onEditClick(cmd)}
                            >
                                {cmd.name}
                            </button>
                            <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground mt-0.5">
                                <span>{cmd.uic !== "N/A" ? cmd.uic : ""}</span>
                                {cmd.uic !== "N/A" && <span>•</span>}
                                <span className="whitespace-nowrap">{cmd.platform || "N/A"}</span>
                                <span>•</span>
                                <span className="whitespace-nowrap">{cmd.location}</span>
                            </div>
                        </div>
                    </div>
                </TableCell>

                {/* CO */}
                <TableCell className="max-w-[140px]">
                    <div className={`text-sm font-medium truncate ${coIsNonSWO ? "text-muted-foreground italic" : "text-blue-600"}`} title={cmd.currentCO.name}>
                        {coDisplayName}
                    </div>
                    <div className="text-xs text-muted-foreground">CoC: {fmtCoC(coCoCDate)}</div>
                </TableCell>

                {/* XO */}
                <TableCell className="max-w-[160px]">
                    <div className="flex items-start justify-between gap-1">
                        <div className="overflow-hidden">
                            <div className={`text-sm font-medium truncate ${xoIsNonSWO ? "text-muted-foreground italic" : "text-green-600"}`} title={cmd.currentXO.name}>
                                {xoDisplayName}
                            </div>
                            <div className="text-xs text-muted-foreground">CoC: {fmtCoC(xoCoCDate)}</div>
                        </div>
                        <FleetUpChecklist command={cmd} onUpdate={(c) => onPersistUpdate(c, officers, "Checklist Updated")} />
                    </div>
                </TableCell>

                {/* P-XO */}
                <TableCell className="max-w-[140px]">
                    {inbound ? (
                        <>
                            {inbound.name && (
                                <div
                                    className={`text-sm font-medium truncate ${pxoIsNonSWO ? "text-muted-foreground italic" : pxoIsNoFill ? "text-red-600" : "text-yellow-600"}`}
                                    title={inbound.name}
                                >
                                    {pxoDisplayName}
                                </div>
                            )}
                            {inbound.timelineData?.i && (
                                <div className="text-xs text-muted-foreground">RPT: {formatToMMMyy(inbound.timelineData.i)}</div>
                            )}
                        </>
                    ) : (
                        <span className="text-muted-foreground italic text-sm">-- Open --</span>
                    )}
                </TableCell>

                {/* Slated XO */}
                <TableCell className="max-w-[140px]">
                    {(() => {
                        const name = cmd.slatedXO?.name
                        const hasSlated = !!name && !/^(forecast|tbd|vacant|n\/a|unknown|)$/i.test(name.trim())
                        if (!hasSlated) return <span className="text-muted-foreground italic text-sm">-- Open --</span>
                        return (
                            <>
                                <div className="text-sm font-medium truncate text-purple-500" title={name}>{name}</div>
                                {cmd.slatedXO?.reportDate && (
                                    <div className="text-xs text-muted-foreground">RPT: {formatToMMMyy(cmd.slatedXO.reportDate)}</div>
                                )}
                            </>
                        )
                    })()}
                </TableCell>

                {/* Slate badge */}
                <TableCell className="w-[150px] min-w-[150px]">
                    <Badge
                        variant="outline"
                        className={`w-full justify-center truncate ${badgeClass}
                            ${health.approaching ? "animate-pulse ring-2 ring-amber-400/60 ring-offset-1 bg-amber-400/20 font-bold" : ""}
                            ${health.status === "red" && !health.approaching ? "animate-pulse ring-2 ring-red-500/60 ring-offset-1 font-bold" : ""}`}
                        title={health.detail}
                    >
                        {health.approaching && "⚠ "}
                        {cmdLive.nextSlateParams?.requirement} via {cmdLive.nextSlateParams?.targetBoardDate}
                    </Badge>
                    {getCdrCmdXoRptDate(cmd) && (
                        <div className="text-xs text-muted-foreground mt-1 text-center">
                            XO RPT: {formatToMMMyy(getCdrCmdXoRptDate(cmd)!)}
                        </div>
                    )}
                </TableCell>

                <TableCell className="w-[80px]" />
            </TableRow>

            {/* Expanded pipeline timeline */}
            {expandedRows.has(cmd.id) && (
                <TableRow key={cmd.id + "-timeline"} className="bg-muted/20 hover:bg-muted/20">
                    <TableCell colSpan={7} className="p-0 border-t-0">
                        <CommandPipelineTimeline command={cmd} />
                    </TableCell>
                </TableRow>
            )}
        </React.Fragment>
    )
}
