"use client"

import { useState } from "react"
import { format, parse, isValid, addMonths, addYears } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Helper to parse YYMM inputs
function parseYYMM(dateStr: string): Date | null {
    if (!dateStr || dateStr.length !== 4) return null;
    const d = parse(dateStr, 'yyMM', new Date());
    return isValid(d) ? d : null;
}

export function O6TimingTool() {
    const [promoInput, setPromoInput] = useState<string>("2609")
    const [pipelineInput, setPipelineInput] = useState<string>("2610")

    const promoDate = parseYYMM(promoInput)
    const pipelineDate = parseYYMM(pipelineInput)

    const calculations = () => {
        if (!promoDate || !pipelineDate) return null

        // Pipeline Start -> XO Report (9 months)
        const xoReport = addMonths(pipelineDate, 9)
        // XO Report -> CO Report (18 months)
        const coReport = addMonths(xoReport, 18)
        // CO Report -> CO Complete (18 months)
        const coComplete = addMonths(coReport, 18)

        // O-6 Board -> JAN of the 5th year after promotion year
        // e.g., Promoted 2609 (2026). Board is JAN 2031 (26 + 5)
        const promoYear = promoDate.getFullYear()
        const o6BoardStr = `${promoYear + 5}-01-01`
        const o6Board = new Date(o6BoardStr)

        // MAJCOM -> NOV of the exact same year as the O-6 Board
        const majcomStr = `${promoYear + 5}-11-01`
        const majcom = new Date(majcomStr)

        return {
            xoReport,
            coReport,
            coComplete,
            o6Board,
            majcom
        }
    }

    const timing = calculations()
    const isBroken = timing && timing.coComplete > timing.o6Board

    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-4">
            <CardHeader>
                <CardTitle>O-6 Timing Forecaster</CardTitle>
                <CardDescription>
                    Map out the career milestones of an O-5 selectee based on their Promotion and XO Pipeline dates. All dates formatted as YYMM.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="promo">O-5 Promotion Date (YYMM)</Label>
                        <Input
                            type="text"
                            id="promo"
                            placeholder="e.g. 2609"
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="pipeline">Trial XO Pipeline Start (YYMM)</Label>
                        <Input
                            type="text"
                            id="pipeline"
                            placeholder="e.g. 2610"
                            value={pipelineInput}
                            onChange={(e) => setPipelineInput(e.target.value)}
                        />
                    </div>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>O-5 Promoted</TableHead>
                                <TableHead>XO Pipeline</TableHead>
                                <TableHead>XO Report</TableHead>
                                <TableHead>CO Report</TableHead>
                                <TableHead className={isBroken ? "text-destructive font-bold" : ""}>CO Complete</TableHead>
                                <TableHead>O-6 Board</TableHead>
                                <TableHead>MAJCOM</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">
                                    {promoDate ? format(promoDate, "yyMM") : "---"}
                                </TableCell>
                                <TableCell>
                                    {pipelineDate ? format(pipelineDate, "yyMM") : "---"}
                                </TableCell>
                                <TableCell>
                                    {timing ? format(timing.xoReport, "yyMM") : "---"}
                                </TableCell>
                                <TableCell>
                                    {timing ? format(timing.coReport, "yyMM") : "---"}
                                </TableCell>
                                <TableCell className={isBroken ? "text-destructive font-bold" : ""}>
                                    {timing ? format(timing.coComplete, "yyMM") : "---"}
                                </TableCell>
                                <TableCell>
                                    {timing ? format(timing.o6Board, "yyMM") : "---"}
                                </TableCell>
                                <TableCell>
                                    {timing ? format(timing.majcom, "yyMM") : "---"}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                {isBroken && (
                    <p className="text-sm font-medium text-destructive mt-4">
                        Warning: This timeline projects the officer finishing their CO Tour after their O-6 Board meets.
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
