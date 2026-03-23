import { PageHeader } from '@/components/PageHeader'
import { useState } from "react"
import { formatToMMMyy } from "@/lib/utils"
import { Officer, OracleCommand, Slate } from "@/lib/types"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"
import { AlignmentMatrixReport } from "@/components/reports/alignment-matrix"
import { CandidatePipelineReport } from "@/components/reports/candidate-pipeline-report"
import { CommandsReport } from "@/components/reports/commands-report"
import { MissingInputsReport } from "@/components/reports/missing-inputs-report"
import { PreferenceAlignmentReport } from "@/components/reports/preference-alignment-report"
import { PreferenceSummaryReport } from "@/components/reports/preference-summary-report"
import { SlateSummaryReport } from "@/components/reports/slate-summary-report"
import { PipelineGapsReport } from "@/components/reports/pipeline-gaps-report"
import { BoardReports } from "@/components/reports/board-reports"
import type { CdrCmdBoard } from "@/lib/types"

interface ReportsClientProps {
    officers: Officer[]
    slates: Slate[]
    oracleData: OracleCommand[]
    boards: CdrCmdBoard[]
}


export function ReportsClient({ officers, slates, oracleData, boards }: ReportsClientProps) {

    const [selectedReport, setSelectedReport] = useState("preferences")
    const [selectedSlateId, setSelectedSlateId] = useState<string>("")

    const activeSlates = slates.filter(s => s.status !== "Archived")
    const slate = slates.find(s => s.id === selectedSlateId)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between print:hidden">
                <div>
                    <PageHeader label="PERS-41 · Oracle" title="Reports" />
                    <p className="text-muted-foreground">
                        Generate global reports across your slates and officers.
                    </p>
                </div>
                {selectedReport && (selectedReport === "missing" || selectedReport === "preferences" || selectedReport === "pipeline" || selectedReport === "pref-alignment" || selectedReport === "gaps" || selectedReport === "board-reports" || slate) && (

                    <Button variant="outline" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print Report
                    </Button>
                )}
            </div>

            {/* Report-type nav bar — matches main app nav styling */}
            <nav className="bg-[#07111f] border border-[#c9a227]/30 rounded-md px-2 flex items-center gap-0 text-xs font-semibold tracking-widest uppercase shadow-lg overflow-x-auto print:hidden">
                {([
                    ['preferences',    'Preference Summary'],
                    ['alignment',      'Alignment Matrix'],
                    ['pref-alignment', 'Pref Alignment'],
                    ['commands',       'Commands on Slate'],
                    ['summary',        'Slate Summary'],
                    ['missing',        'Missing Inputs'],
                    ['pipeline',       'Candidate Pipeline'],
                    ['gaps',           'Pipeline Gaps'],
                    ['board-reports',  'Board Reports'],
                ] as [string, string][]).map(([value, label]) => (
                    <button
                        key={value}
                        onClick={() => setSelectedReport(value)}
                        className={
                            selectedReport === value
                                ? 'relative px-3 py-3.5 text-[#c9a227] border-b-2 border-[#c9a227] transition-colors duration-150 whitespace-nowrap'
                                : 'relative px-3 py-3.5 text-[#8a9bb0] hover:text-[#c9a227] border-b-2 border-transparent transition-colors duration-150 whitespace-nowrap'
                        }
                    >
                        {label}
                    </button>
                ))}
            </nav>

            {/* Slate picker — same navy bar style as the report-type nav */}
            {["alignment", "commands", "summary", "pref-alignment"].includes(selectedReport) && (
                <div className="bg-[#07111f] border border-[#c9a227]/30 rounded-md px-4 py-2.5 flex items-center gap-4 shadow-lg print:hidden">
                    <span className="text-xs font-semibold tracking-widest uppercase text-[#8a9bb0] whitespace-nowrap">Target Slate</span>
                    <Select value={selectedSlateId} onValueChange={setSelectedSlateId}>
                        <SelectTrigger className="bg-[#07111f] border-[#c9a227]/30 text-white max-w-[320px] h-8">
                            <SelectValue placeholder="Select an Active Slate" />
                        </SelectTrigger>
                        <SelectContent>
                            {activeSlates.map(s => (
                                <SelectItem key={s.id} value={s.id}>{s.name} ({formatToMMMyy(s.windowStart)})</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* Report content — navy theme */}
            <div>

                {["alignment", "commands", "summary", "pref-alignment"].includes(selectedReport) && !slate && (
                    <div className="p-8 text-center text-muted-foreground border border-dashed rounded-md print:hidden">
                        Please select a Slate to generate the report.
                    </div>
                )}

                {selectedReport === "summary" && slate && (
                    <div className="animate-in fade-in duration-300">
                        <SlateSummaryReport slate={slate} officers={officers} oracleData={oracleData} />
                    </div>
                )}

                {selectedReport === "alignment" && slate && (
                    <div className="animate-in fade-in duration-300">
                        <AlignmentMatrixReport slateId={slate.id} slate={slate} officers={officers} oracleData={oracleData} />
                    </div>
                )}

                {selectedReport === "commands" && slate && (
                    <div className="animate-in fade-in duration-300">
                        <CommandsReport slate={slate} oracleData={oracleData} />
                    </div>
                )}

                {selectedReport === "missing" && (
                    <div className="animate-in fade-in duration-300 pt-6">
                        <MissingInputsReport officers={officers} />
                    </div>
                )}

                {selectedReport === "preferences" && (
                    <div className="animate-in fade-in duration-300 pt-6">
                        <PreferenceSummaryReport officers={officers} />
                    </div>
                )}

                {selectedReport === "pref-alignment" && slate && (
                    <div className="animate-in fade-in duration-300 pt-6">
                        <PreferenceAlignmentReport slate={slate} officers={officers} oracleData={oracleData} />
                    </div>
                )}

                {selectedReport === "pipeline" && (
                    <div className="animate-in fade-in duration-300 pt-6">
                        <CandidatePipelineReport officers={officers} />
                    </div>
                )}

                {selectedReport === "gaps" && (
                    <div className="animate-in fade-in duration-300 pt-6">
                        <PipelineGapsReport oracleData={oracleData} />
                    </div>
                )}

                {selectedReport === "board-reports" && (
                    <div className="animate-in fade-in duration-300 pt-6">
                        <BoardReports boards={boards} />
                    </div>
                )}

            </div>
        </div>
    )
}
