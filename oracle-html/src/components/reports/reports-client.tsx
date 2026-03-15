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
import { CommandsReport } from "@/components/reports/commands-report"
import { MissingInputsReport } from "@/components/reports/missing-inputs-report"
import { PreferenceSummaryReport } from "@/components/reports/preference-summary-report"
import { SlateSummaryReport } from "@/components/reports/slate-summary-report"

interface ReportsClientProps {
    officers: Officer[]
    slates: Slate[]
    oracleData: OracleCommand[]
}

export function ReportsClient({ officers, slates, oracleData }: ReportsClientProps) {
    const [selectedReport, setSelectedReport] = useState("preferences")
    const [selectedSlateId, setSelectedSlateId] = useState<string>("")

    const activeSlates = slates.filter(s => s.status !== "Archived")
    const slate = slates.find(s => s.id === selectedSlateId)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between print:hidden">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
                    <p className="text-muted-foreground">
                        Generate global reports across your slates and officers.
                    </p>
                </div>
                {selectedReport && (selectedReport === "missing" || selectedReport === "preferences" || slate) && (
                    <Button variant="outline" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print Report
                    </Button>
                )}
            </div>

            <div className="flex gap-4 p-4 border rounded-md bg-muted/20 items-end print:hidden">
                <div className="space-y-2 flex-1 max-w-[300px]">
                    <label className="text-sm font-medium">Report Type</label>
                    <Select value={selectedReport} onValueChange={setSelectedReport}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Report Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="preferences">Preference Summary</SelectItem>
                            <SelectItem value="alignment">Alignment Matrix</SelectItem>
                            <SelectItem value="commands">Commands on Slate</SelectItem>
                            <SelectItem value="summary">Slate Summary</SelectItem>
                            <SelectItem value="missing">Missing Inputs</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {["alignment", "commands", "summary"].includes(selectedReport) && (
                    <div className="space-y-2 flex-1 max-w-[300px]">
                        <label className="text-sm font-medium">Target Slate</label>
                        <Select value={selectedSlateId} onValueChange={setSelectedSlateId}>
                            <SelectTrigger>
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
            </div>

            {["alignment", "commands", "summary"].includes(selectedReport) && !slate && (
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
        </div>
    )
}
