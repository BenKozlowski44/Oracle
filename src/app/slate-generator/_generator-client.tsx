"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { OracleCommand, SlateRequirement, Slate } from "@/lib/types"
import { formatToMMMyy } from "@/lib/utils"
import { addMonths, parseISO, isValid, parse } from "date-fns"
import { useRouter } from "next/navigation"
import { saveError, notifySuccess } from "@/lib/notify"

interface SlateGeneratorClientProps {
    oracleData: OracleCommand[]
}

export function SlateGeneratorClient({ oracleData }: SlateGeneratorClientProps) {
    const [slateName, setSlateName] = useState("FY26-3")
    const [startDate, setStartDate] = useState("2026-07-01")
    const [endDate, setEndDate] = useState("2026-09-30")
    const [generatedReqs, setGeneratedReqs] = useState<SlateRequirement[]>([])
    const router = useRouter()

    const handleSave = async () => {
        if (generatedReqs.length === 0) return;

        const newSlate: Slate = {
            id: `slate-${Date.now()}`,
            name: slateName,
            windowStart: startDate,
            windowEnd: endDate,
            requirements: generatedReqs,
            candidates: [],
            status: "Active",
            approvals: {
                branchHead: false,
                pers41: false,
                swcc: false,
                swoboss: false
            }
        }

        // Persist via targeted endpoint
        try {
            const response = await fetch('/api/slates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slate: newSlate }),
            });

            if (response.ok) {
                notifySuccess(`Slate "${slateName}" saved`)
                router.push('/slates');
            } else {
                saveError('Failed to save slate — server returned an error')
                console.error("Failed to save slate");
            }
        } catch (error) {
            console.error("Error saving slate:", error);
            saveError('Error saving slate — check console for details')
        }
    }

    const handleGenerate = () => {
        const start = new Date(startDate)
        const end = new Date(endDate)

        const reqs: SlateRequirement[] = []

        oracleData.forEach(cmd => {
            let fillDate: Date | null = null;
            let source = "calculated"; // debug

            // 1. Priority: Slated XO Report Date (Manual Override)
            if (cmd.slatedXO && cmd.slatedXO.reportDate) {
                const raw = cmd.slatedXO.reportDate.trim().toUpperCase();
                let parsed = parseISO(raw);
                if (!isValid(parsed) && raw.length === 5) {
                    // Try MMMyy (e.g. OCT25)
                    parsed = parse(raw, 'MMMyy', new Date());
                }

                if (isValid(parsed)) {
                    fillDate = parsed;
                    source = "slatedXO";
                }
            }

            // 2. Fallback: Calculated Fleet Up (XO Report + 18mo)
            if (!fillDate && cmd.timeline?.xoReport) {
                const report = parseISO(cmd.timeline.xoReport);
                if (isValid(report)) {
                    fillDate = addMonths(report, 18);
                    source = "fleetUp";
                }
            }

            // 3. Fallback: Current XO PRD
            if (!fillDate && cmd.currentXO?.prd && cmd.currentXO.prd !== "N/A" && cmd.currentXO.prd !== "TBD") {
                const prd = parseISO(cmd.currentXO.prd);
                if (isValid(prd)) {
                    fillDate = prd;
                    source = "prd";
                }
            }

            // 4. Check Window
            if (fillDate && fillDate >= start && fillDate <= end) {
                // Prioritize Inbound XO (P-XO) as incumbent, fall back to Current XO
                const inboundName = cmd.inboundXO?.name;
                const currentName = cmd.currentXO?.name;
                const incumbentName = (inboundName && inboundName !== "N/A" && inboundName !== "Unknown")
                    ? inboundName
                    : (currentName && currentName !== "N/A" ? currentName : "Unknown");

                reqs.push({
                    id: `req-${cmd.id}-xo`,
                    commandName: cmd.name,
                    commandId: cmd.id,
                    role: "XO",
                    incumbent: incumbentName,
                    incumbentPrd: fillDate.toISOString().split('T')[0], // Projected Fill
                    status: "Draft"
                });
            }

            // Note: The previous logic for "XO Rotation only" (non-fleet up) is implicitly covered
            // because if there is a vacancy (detected by fillDate), it's a vacancy regardless of cause.
            // The previous logic attempted to differentiate "XO -> CO" vs "XO -> Out", but
            // for a slate generator, we just need to know "Does it need an XO?".
            // The fillDate covers both cases (PRD or Fleet Up).
        })

        // Sort requirements by Rotate Date (incumbentPrd) ascending
        reqs.sort((a, b) => a.incumbentPrd.localeCompare(b.incumbentPrd));

        setGeneratedReqs(reqs)
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Slate Management</h1>
                <p className="text-muted-foreground">Generate and manage quarterly fleet requirements.</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Slate Generator</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Slate Name</Label>
                            <Input id="name" value={slateName} onChange={(e) => setSlateName(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="start">Fill Window Start</Label>
                                <Input id="start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="end">Fill Window End</Label>
                                <Input id="end" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                        </div>
                        <Button className="w-full" onClick={handleGenerate}>
                            Generate Requirements
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Draft Requirements ({generatedReqs.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border h-[300px] overflow-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Command</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Incumbent</TableHead>
                                        <TableHead>Rotate Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {generatedReqs.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center">
                                                No requirements generated.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        generatedReqs.map((req) => (
                                            <TableRow key={req.id}>
                                                <TableCell className="font-medium">{req.commandName}</TableCell>
                                                <TableCell>{req.role}</TableCell>
                                                <TableCell>{req.incumbent}</TableCell>
                                                <TableCell>{formatToMMMyy(req.incumbentPrd)}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        {generatedReqs.length > 0 && (
                            <Button className="w-full mt-4" variant="secondary" onClick={handleSave}>
                                Save Slate
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
