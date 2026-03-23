import { useState } from "react"
import type { CdrCmdBoard, BoardCandidate } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Props {
    boards: CdrCmdBoard[]
}

type BoardReportType = "eligibles" | "eligible-2d1" | "selected"

// Check for 2D1 AQD in rawData
function has2D1(c: BoardCandidate): boolean {
    const val = Object.entries(c.rawData || {})
        .find(([k]) => k.toLowerCase().includes("2d1"))?.[1]
        ?.toUpperCase()
    return val === "Y"
}

const MILESTONE_COLOR: Record<string, string> = {
    "Selected CO Afloat":  "bg-green-100 text-green-800 border-green-300",
    "Selected XO Afloat":  "bg-blue-100 text-blue-800 border-blue-300",
    "Selected XO Afloat*": "bg-blue-100 text-blue-800 border-blue-300",
    "Selected XO-SM":      "bg-purple-100 text-purple-800 border-purple-300",
    "Selected CO-SM":      "bg-indigo-100 text-indigo-800 border-indigo-300",
}

const LOOK_ORDER: Record<string, number> = {
    "1st Look": 1,
    "2nd Look": 2,
    "3rd Look": 3,
}

// ── Printable table shell ────────────────────────────────────────────────────
function PrintTable({
    title,
    subtitle,
    headers,
    rows,
}: {
    title: string
    subtitle: string
    headers: string[]
    rows: (string | React.ReactNode)[][]
}) {
    return (
        <div className="space-y-4 print:space-y-2">
            {/* Report Header */}
            <div className="border-b pb-3 print:pb-2">
                <div className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                    PERS-41 · Oracle · CDR CMD Board Report
                </div>
                <h2 className="text-2xl font-bold mt-1">{title}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-md border">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-[#07111f] text-white">
                            {headers.map((h, i) => (
                                <th
                                    key={i}
                                    className="text-left px-4 py-2.5 font-semibold whitespace-nowrap"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={headers.length}
                                    className="px-4 py-8 text-center text-muted-foreground"
                                >
                                    No records found.
                                </td>
                            </tr>
                        ) : (
                            rows.map((row, ri) => (
                                <tr
                                    key={ri}
                                    className={ri % 2 === 0 ? "bg-background" : "bg-muted/20"}
                                >
                                    {row.map((cell, ci) => (
                                        <td key={ci} className="px-4 py-2 border-t">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                    <tfoot>
                        <tr className="border-t bg-muted/30">
                            <td
                                colSpan={headers.length}
                                className="px-4 py-2 text-xs text-muted-foreground"
                            >
                                Total: {rows.length} record{rows.length !== 1 ? "s" : ""}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

// ── Report: All Eligibles ────────────────────────────────────────────────────
function EligiblesReport({ board }: { board: CdrCmdBoard }) {
    const sorted = [...board.candidates].sort(
        (a, b) => (LOOK_ORDER[a.lookTracker] ?? 9) - (LOOK_ORDER[b.lookTracker] ?? 9) || a.name.localeCompare(b.name)
    )
    const rows = sorted.map((c, i) => [
        <span className="font-medium text-xs text-muted-foreground w-6 inline-block">{i + 1}</span>,
        c.name,
        c.rank,
        c.designator,
        c.lookTracker,
        c.deferralRequested ? (
            c.deferralApproved
                ? <Badge variant="outline" className="text-xs border-green-500 text-green-700">Def Approved</Badge>
                : <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-700">Def Requested</Badge>
        ) : "—",
    ])
    return (
        <PrintTable
            title={`FY${board.fy} CDR CMD Board — Eligibles List`}
            subtitle={`All ${board.candidates.length} imported eligible candidates · Board Date: ${board.boardDate ? new Date(board.boardDate + "T12:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "TBD"}`}
            headers={["#", "Name", "Rank", "Designator", "Look", "Deferral"]}
            rows={rows}
        />
    )
}

// ── Report: 2D1 AQD Eligibles ────────────────────────────────────────────────
function Eligible2D1Report({ board }: { board: CdrCmdBoard }) {
    const eligible = board.candidates.filter(has2D1).sort(
        (a, b) => (LOOK_ORDER[a.lookTracker] ?? 9) - (LOOK_ORDER[b.lookTracker] ?? 9) || a.name.localeCompare(b.name)
    )
    const rows = eligible.map((c, i) => [
        <span className="font-medium text-xs text-muted-foreground w-6 inline-block">{i + 1}</span>,
        c.name,
        c.rank,
        c.designator,
        c.lookTracker,
    ])
    return (
        <PrintTable
            title={`FY${board.fy} CDR CMD Board — 2D1 AQD Eligible List`}
            subtitle={`${eligible.length} of ${board.candidates.length} candidates hold the 2D1 AQD · Board Date: ${board.boardDate ? new Date(board.boardDate + "T12:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "TBD"}`}
            headers={["#", "Name", "Rank", "Designator", "Look"]}
            rows={rows}
        />
    )
}

// ── Report: Selected List ────────────────────────────────────────────────────
function SelectedReport({ board }: { board: CdrCmdBoard }) {
    const selected = board.candidates
        .filter(c => c.result.startsWith("Selected"))
        .sort(
            (a, b) =>
                (LOOK_ORDER[a.lookTracker] ?? 9) - (LOOK_ORDER[b.lookTracker] ?? 9) ||
                a.result.localeCompare(b.result) ||
                a.name.localeCompare(b.name)
        )
    const rows = selected.map((c, i) => [
        <span className="font-medium text-xs text-muted-foreground w-6 inline-block">{i + 1}</span>,
        c.name,
        c.rank,
        c.lookTracker,
        <Badge
            variant="outline"
            className={`text-xs ${MILESTONE_COLOR[c.result] ?? "bg-muted text-muted-foreground"}`}
        >
            {c.result}
        </Badge>,
    ])
    return (
        <PrintTable
            title={`FY${board.fy} CDR CMD Board — Selected List`}
            subtitle={`${selected.length} officer${selected.length !== 1 ? "s" : ""} selected · Board Date: ${board.boardDate ? new Date(board.boardDate + "T12:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "TBD"}`}
            headers={["#", "Name", "Rank", "Look", "Milestone"]}
            rows={rows}
        />
    )
}

// ── Main export ──────────────────────────────────────────────────────────────
export function BoardReports({ boards }: Props) {
    const [selectedBoardId, setSelectedBoardId] = useState<string>("")
    const [reportType, setReportType] = useState<BoardReportType>("eligibles")

    const board = boards.find(b => b.id === selectedBoardId)

    return (
        <div className="space-y-4">
            {/* Board picker */}
            <div className="bg-[#07111f] border border-[#c9a227]/30 rounded-md px-4 py-2.5 flex items-center gap-4 shadow-lg print:hidden">
                <span className="text-xs font-semibold tracking-widest uppercase text-[#8a9bb0] whitespace-nowrap">
                    Board
                </span>
                <Select value={selectedBoardId} onValueChange={setSelectedBoardId}>
                    <SelectTrigger className="bg-[#07111f] border-[#c9a227]/30 text-white max-w-[280px] h-8">
                        <SelectValue placeholder="Select a Board" />
                    </SelectTrigger>
                    <SelectContent>
                        {boards.length === 0 ? (
                            <SelectItem value="__none" disabled>No boards found</SelectItem>
                        ) : (
                            boards.map(b => (
                                <SelectItem key={b.id} value={b.id}>
                                    FY{b.fy} CDR CMD Board ({b.status})
                                </SelectItem>
                            ))
                        )}
                    </SelectContent>
                </Select>

                {/* Sub-report type picker — only if board selected */}
                {board && (
                    <>
                        <span className="text-[#c9a227]/40 text-sm">|</span>
                        <span className="text-xs font-semibold tracking-widest uppercase text-[#8a9bb0] whitespace-nowrap">
                            Report
                        </span>
                        <div className="flex items-center gap-1">
                            {(
                                [
                                    ["eligibles", "Eligibles List"],
                                    ["eligible-2d1", "2D1 AQD Eligible"],
                                    ["selected", "Selected List"],
                                ] as [BoardReportType, string][]
                            ).map(([val, label]) => (
                                <button
                                    key={val}
                                    onClick={() => setReportType(val)}
                                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                                        reportType === val
                                            ? "bg-[#c9a227] text-[#07111f] border-[#c9a227]"
                                            : "border-[#c9a227]/30 text-[#8a9bb0] hover:border-[#c9a227]/60 hover:text-[#c9a227]"
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Report content */}
            {!board ? (
                <div className="p-8 text-center text-muted-foreground border border-dashed rounded-md print:hidden">
                    Select a board above to generate a report.
                </div>
            ) : (
                <div className="animate-in fade-in duration-300 pt-4">
                    {reportType === "eligibles" && <EligiblesReport board={board} />}
                    {reportType === "eligible-2d1" && <Eligible2D1Report board={board} />}
                    {reportType === "selected" && <SelectedReport board={board} />}
                </div>
            )}
        </div>
    )
}
