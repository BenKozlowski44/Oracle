import { PageHeader } from '@/components/PageHeader'
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
import { addMonths, parseISO, isValid, parse, format } from "date-fns"
import { calculateTargetBoard, predictNextVacancyDate } from '@/lib/slate-logic'
import { useNavigate } from 'react-router-dom'
import { saveSlate } from '@/services/storage'
import { notifySuccess, saveError } from '@/lib/notify'

interface SlateGeneratorClientProps {
    oracleData: OracleCommand[]
}

export function SlateGeneratorClient({ oracleData }: SlateGeneratorClientProps) {
    const [slateName, setSlateName] = useState("FY26-3")
    const [startDate, setStartDate] = useState("2026-07-01")
    const [endDate, setEndDate] = useState("2026-09-30")
    const [generatedReqs, setGeneratedReqs] = useState<SlateRequirement[]>([])
    const navigate = useNavigate()

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

        // Save directly to localStorage storage
        try {
            saveSlate(newSlate)
            notifySuccess(`Slate "${slateName}" saved successfully`)
            navigate('/slates')
        } catch (error) {
            console.error('Error saving slate:', error)
            saveError('Failed to save slate — please try again')
        }
    }

    const handleGenerate = () => {
        // Extract the "YY-Q" code from the slate name (e.g. "FY26-3" → "26-3")
        const slateCode = slateName.replace(/[^\d-]/g, '').replace(/^-/, '')

        const reqs: SlateRequirement[] = []

        oracleData.forEach(cmd => {
            const isCOSM = cmd.tags?.includes('CO-SM')
            let fillDate: Date | null = null;
            let source = "calculated";

            if (isCOSM) {
                // ── CO-SM pipeline ────────────────────────────────────────────
                // Helper: try ISO then MMMyy (CO-SM dates may be in either format)
                const flexParse = (s?: string | null): Date | null => {
                    if (!s) return null
                    const r = s.trim().toUpperCase()
                    if (['N/A','TBD','UNKNOWN','VACANT',''].includes(r)) return null
                    let d = parseISO(r)
                    if (isValid(d)) return d
                    d = parse(r, 'MMMyy', new Date())
                    if (isValid(d)) return d
                    d = parse(r, 'MMMyyyy', new Date())
                    return isValid(d) ? d : null
                }
                // Try all date fields in priority order
                const candidates: [string, string | null | undefined][] = [
                    ['nextSWOFillDate', cmd.nextSWOFillDate],
                    ['xo.fleetUp',     cmd.currentXO?.timelineData?.k],
                    ['xo.prd',         cmd.currentXO?.prd],
                    ['co.departure',   cmd.currentCO?.timelineData?.q],
                    ['co.prd',         cmd.currentCO?.prd],
                ]
                for (const [src, val] of candidates) {
                    const d = flexParse(val)
                    if (d) { fillDate = d; source = src; break }
                }
            } else {
                // ── Standard fleet-up pipeline ────────────────────────────────
                // Priority 1: Slated XO Report Date (Manual Override)
                if (cmd.slatedXO && cmd.slatedXO.reportDate) {
                    const raw = cmd.slatedXO.reportDate.trim().toUpperCase();
                    let parsed = parseISO(raw);
                    if (!isValid(parsed) && raw.length === 5) {
                        parsed = parse(raw, 'MMMyy', new Date());
                    }
                    if (isValid(parsed)) {
                        fillDate = parsed;
                        source = "slatedXO";
                    }
                }
                // Priority 2: Calculated Fleet Up (XO Report + 18mo)
                if (!fillDate && cmd.timeline?.xoReport) {
                    const report = parseISO(cmd.timeline.xoReport);
                    if (isValid(report)) {
                        fillDate = addMonths(report, 18);
                        source = "fleetUp";
                    }
                }
                // Priority 3: Current XO PRD
                if (!fillDate && cmd.currentXO?.prd && cmd.currentXO.prd !== "N/A" && cmd.currentXO.prd !== "TBD") {
                    const prd = parseISO(cmd.currentXO.prd);
                    if (isValid(prd)) {
                        fillDate = prd;
                        source = "prd";
                    }
                }
            }

            // ── Slate match ─────────────────────────────────────────
            // Use predictNextVacancyDate (same as command card badges) for the
            // authoritative slate match. The flex-parsed fillDate is only used
            // for the incumbentPrd display date.
            const targetBoard = predictNextVacancyDate(cmd)
            if (targetBoard !== 'TBD' && targetBoard === slateCode) {
                const inboundName = cmd.inboundXO?.name;
                const currentName = cmd.currentXO?.name;
                const incumbentName = (inboundName && inboundName !== "N/A" && inboundName !== "Unknown")
                    ? inboundName
                    : (currentName && currentName !== "N/A" ? currentName : "Unknown");

                // For display, use flex-parsed fillDate if available; otherwise estimate
                // from the target board date.
                const displayDate = fillDate
                    ? fillDate.toISOString().split('T')[0]
                    : new Date().toISOString().split('T')[0]

                reqs.push({
                    id: `req-${cmd.id}-${isCOSM ? 'cosm' : 'xo'}`,
                    commandName: cmd.name,
                    commandId: cmd.id,
                    role: isCOSM ? 'CO-SM' : 'XO',
                    incumbent: incumbentName,
                    incumbentPrd: displayDate,
                    status: "Draft"
                });
            }
        })

        // Sort requirements by Rotate Date (incumbentPrd) ascending
        reqs.sort((a, b) => a.incumbentPrd.localeCompare(b.incumbentPrd));

        setGeneratedReqs(reqs)
    }

    return (
        <div className="space-y-6">
            <div>
                <PageHeader
                    label="PERS-41 · Slating"
                    title="Slate Generator"
                />
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
