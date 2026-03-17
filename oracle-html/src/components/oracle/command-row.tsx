/**
 * command-row.tsx
 *
 * Per-row rendering component for the CO-SM oracle table view.
 * Extracted from the inline `renderCmdRow` function in oracle-table.tsx.
 * Used by both DirectCO and FleetUp CO-SM sub-sections.
 */

import React from "react"
import { OracleCommand, Officer } from "@/lib/types"
import { TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FleetUpChecklist } from "./fleet-up-checklist"
import { CommandPipelineTimeline } from "./command-pipeline-timeline"
import { isPlaceholderName } from "@/lib/constants"
import { formatToMMMyy } from "@/lib/utils"
import { getPipelineHealth, predictNextVacancyDate, getCoSmRptDisplay } from "@/lib/slate-logic"
import { format, parseISO, isValid } from "date-fns"
import { ChevronDown, ChevronRight } from "lucide-react"

export interface CommandRowProps {
    cmd: OracleCommand
    expandedRows: Set<string>
    onToggleExpand: (id: string) => void
    onEditClick: (cmd: OracleCommand) => void
    onPersistUpdate: (cmd: OracleCommand, officers: Officer[], msg: string) => void
    officers: Officer[]
}

export function CommandRow({
    cmd,
    expandedRows,
    onToggleExpand,
    onEditClick,
    onPersistUpdate,
    officers,
}: CommandRowProps) {
    // Always compute the live target board — overrides any stale stored value
    const liveBoard = predictNextVacancyDate(cmd)
    const cmdLive: OracleCommand =
        liveBoard !== "TBD"
            ? { ...cmd, nextSlateParams: { ...cmd.nextSlateParams, targetBoardDate: liveBoard } }
            : cmd

    const health = getPipelineHealth(cmdLive)
    const isDirectCO = cmd.rotationStyle === "DirectCO"

    const dotColor =
        health.status === "green"
            ? "bg-green-500"
            : health.status === "yellow"
            ? "bg-amber-400"
            : "bg-red-500"

    const healthBorderClass =
        health.status === "green"
            ? "border-l-green-500"
            : health.status === "yellow"
            ? "border-l-amber-400"
            : "border-l-red-500"

    const badgeClass =
        health.status === "green"
            ? "border-green-500 text-green-600 bg-green-500/10"
            : health.status === "yellow"
            ? "border-amber-400 text-amber-600 bg-amber-400/10"
            : "border-red-500 text-red-600 bg-red-500/10"

    // ── Shared cells ──────────────────────────────────────────────────────

    const slateCell = (
        <TableCell className="w-[150px] min-w-[150px]">
            <>
                <Badge
                    variant="outline"
                    className={`w-full justify-center truncate ${badgeClass} ${
                        health.approaching
                            ? "animate-pulse ring-2 ring-amber-400/60 ring-offset-1 bg-amber-400/20 font-bold"
                            : ""
                    } ${
                        health.status === "red" && !health.approaching
                            ? "animate-pulse ring-2 ring-red-500/60 ring-offset-1 font-bold"
                            : ""
                    }`}
                    title={health.detail}
                >
                    {health.approaching && "⚠ "}
                    {isDirectCO ? "CO" : "XO"} via {cmdLive.nextSlateParams.targetBoardDate}
                </Badge>
                {(() => {
                    const rpt = getCoSmRptDisplay(cmd)
                    return rpt ? (
                        <div className="text-xs text-muted-foreground mt-1 text-center">
                            {rpt.label}: {formatToMMMyy(rpt.date)}
                        </div>
                    ) : null
                })()}
                {cmd.nextSWOFillDate && (
                    <div className="text-xs text-amber-600 mt-0.5 text-center font-medium">
                        SWO: {formatToMMMyy(cmd.nextSWOFillDate)}
                    </div>
                )}
            </>
        </TableCell>
    )

    const coCell = (
        <TableCell className="max-w-[140px]">
            {(() => {
                const isNonSWO =
                    cmd.currentCO.fillCommunity && cmd.currentCO.fillCommunity !== "1110"
                const displayName = isNonSWO
                    ? `${cmd.currentCO.fillCommunity} Fill`
                    : cmd.currentCO.name
                return (
                    <>
                        <div
                            className={`text-sm font-medium truncate ${
                                isNonSWO ? "text-muted-foreground italic" : "text-blue-600"
                            }`}
                            title={cmd.currentCO.name}
                        >
                            {displayName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            {(() => {
                                const dateStr =
                                    cmd.currentCO.timelineData?.q || cmd.currentCO.prd
                                if (!dateStr) return "CoC: N/A"
                                const date = parseISO(dateStr)
                                const formatted = isValid(date)
                                    ? format(date, "MMMyy").toUpperCase()
                                    : dateStr
                                return `CoC: ${formatted}`
                            })()}
                        </div>
                    </>
                )
            })()}
        </TableCell>
    )

    const nameCell = (
        <TableCell className="max-w-[200px] whitespace-normal">
            <div className="flex items-start gap-2">
                <span
                    className={`mt-1.5 flex-shrink-0 w-2 h-2 rounded-full ${dotColor} ${
                        health.approaching
                            ? "animate-pulse ring-2 ring-amber-400/50 ring-offset-1"
                            : ""
                    } ${
                        health.status === "red" && !health.approaching
                            ? "animate-pulse ring-2 ring-red-500/50 ring-offset-1"
                            : ""
                    }`}
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
                        <span className="whitespace-nowrap">
                            {cmd.tags?.includes("CO-SM")
                                ? `${cmd.tourLength ? `${cmd.tourLength} mos` : ""}`
                                : cmd.platform || "N/A"}
                        </span>
                        <span>•</span>
                        <span className="whitespace-nowrap">{cmd.location}</span>
                    </div>
                </div>
            </div>
        </TableCell>
    )

    const expandCell = (
        <TableCell className={`w-8 p-1.5 border-l-4 ${healthBorderClass}`}>
            <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => onToggleExpand(cmd.id)}
            >
                {expandedRows.has(cmd.id) ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
            </Button>
        </TableCell>
    )

    return (
        <React.Fragment key={cmd.id}>
            <TableRow key={cmd.id}>
                {expandCell}
                {nameCell}
                {coCell}
                {isDirectCO ? (
                    // Direct CO: P-CO and Slated CO columns
                    <>
                        <TableCell className="max-w-[150px]">
                            {cmd.prospectiveCO?.name ? (
                                <>
                                    <div
                                        className="text-sm font-medium truncate text-yellow-600"
                                        title={cmd.prospectiveCO.name}
                                    >
                                        {cmd.prospectiveCO.name}
                                    </div>
                                    {cmd.prospectiveCO.timelineData?.i && (
                                        <div className="text-xs text-muted-foreground">
                                            RPT: {formatToMMMyy(cmd.prospectiveCO.timelineData.i)}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <span className="text-muted-foreground italic text-sm">
                                    -- Open --
                                </span>
                            )}
                        </TableCell>
                        <TableCell className="max-w-[150px]">
                            {(() => {
                                const name = cmd.slatedCO?.name
                                const hasRealName = name && !isPlaceholderName(name)
                                if (hasRealName) {
                                    return (
                                        <>
                                            <div
                                                className="text-sm font-medium truncate text-muted-foreground italic"
                                                title={name}
                                            >
                                                {name}
                                            </div>
                                            {cmd.slatedCO?.timelineData?.i ? (
                                                <div className="text-xs text-muted-foreground">
                                                    RPT:{" "}
                                                    {formatToMMMyy(cmd.slatedCO.timelineData.i)}
                                                </div>
                                            ) : (
                                                <div className="text-xs text-muted-foreground">
                                                    Dates TBD
                                                </div>
                                            )}
                                        </>
                                    )
                                }
                                return (
                                    <span className="text-muted-foreground italic text-sm">
                                        -- Forecast --
                                    </span>
                                )
                            })()}
                        </TableCell>
                    </>
                ) : (
                    // Fleet-Up: XO and P-XO columns
                    <>
                        <TableCell className="max-w-[160px]">
                            <div className="flex items-start justify-between gap-1">
                                <div className="overflow-hidden">
                                    {(() => {
                                        const isNonSWO =
                                            cmd.currentXO.fillCommunity &&
                                            cmd.currentXO.fillCommunity !== "1110"
                                        const displayName = isNonSWO
                                            ? `${cmd.currentXO.fillCommunity} Fill`
                                            : cmd.currentXO.name
                                        return (
                                            <>
                                                <div
                                                    className={`text-sm font-medium truncate ${
                                                        isNonSWO
                                                            ? "text-muted-foreground italic"
                                                            : "text-green-600"
                                                    }`}
                                                    title={cmd.currentXO.name}
                                                >
                                                    {displayName}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {(() => {
                                                        const dateStr =
                                                            cmd.currentXO.timelineData?.m ||
                                                            cmd.currentXO.prd
                                                        if (!dateStr) return "CoC: N/A"
                                                        const date = parseISO(dateStr)
                                                        const formatted = isValid(date)
                                                            ? format(date, "MMMyy").toUpperCase()
                                                            : dateStr
                                                        return `CoC: ${formatted}`
                                                    })()}
                                                </div>
                                            </>
                                        )
                                    })()}
                                </div>
                                <FleetUpChecklist
                                    command={cmd}
                                    onUpdate={(c) =>
                                        onPersistUpdate(c, officers, "Checklist Updated")
                                    }
                                />
                            </div>
                        </TableCell>
                        <TableCell className="max-w-[140px]">
                            {cmd.inboundXO ? (
                                <>
                                    {(() => {
                                        const isNonSWO =
                                            cmd.inboundXO.fillCommunity &&
                                            cmd.inboundXO.fillCommunity !== "1110"
                                        const hasName = !!cmd.inboundXO.name
                                        if (isNonSWO) {
                                            const displayName = hasName
                                                ? cmd.inboundXO.name
                                                : `${cmd.inboundXO.fillCommunity} Fill`
                                            return (
                                                <div
                                                    className="text-sm font-medium truncate text-muted-foreground italic"
                                                    title={displayName}
                                                >
                                                    {displayName}
                                                </div>
                                            )
                                        }
                                        if (!hasName) return null
                                        return (
                                            <div
                                                className={`text-sm font-medium truncate ${
                                                    cmd.inboundXO.name
                                                        .toLowerCase()
                                                        .includes("no fill")
                                                        ? "text-red-600"
                                                        : "text-yellow-600"
                                                }`}
                                                title={cmd.inboundXO.name}
                                            >
                                                {cmd.inboundXO.name}
                                            </div>
                                        )
                                    })()}
                                    {cmd.inboundXO.timelineData?.i && (
                                        <div className="text-xs text-muted-foreground">
                                            RPT: {formatToMMMyy(cmd.inboundXO.timelineData.i)}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <span className="text-muted-foreground italic text-sm">
                                    -- Open --
                                </span>
                            )}
                        </TableCell>
                    </>
                )}
                {slateCell}
            </TableRow>
            {expandedRows.has(cmd.id) && (
                <TableRow
                    key={cmd.id + "-timeline"}
                    className="bg-muted/20 hover:bg-muted/20"
                >
                    <TableCell colSpan={6} className="p-0 border-t-0">
                        <CommandPipelineTimeline command={cmd} />
                    </TableCell>
                </TableRow>
            )}
        </React.Fragment>
    )
}
