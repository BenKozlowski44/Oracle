import { PageHeader } from '@/components/PageHeader'
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
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
import { parseISO, isValid, parse } from "date-fns"
import { getCdrCmdXoRptDate, getCoSmRptDisplay } from '@/lib/slate-logic'
import { useNavigate } from 'react-router-dom'
import { saveSlate, getSlates } from '@/services/storage'
import { notifySuccess, saveError } from '@/lib/notify'

interface SlateGeneratorClientProps {
    oracleData: OracleCommand[]
}

/** Flex-parse a date string that could be ISO ("2027-09-01") or MMMyy ("SEP27"). */
function flexParse(s?: string | null): Date | null {
    if (!s) return null
    const r = s.trim()
    const upper = r.toUpperCase()
    if (['N/A', 'TBD', 'UNKNOWN', 'VACANT', ''].includes(upper)) return null
    let d = parseISO(r)
    if (isValid(d)) return d
    d = parse(r, 'MMMyy', new Date())
    if (isValid(d)) return d
    d = parse(r, 'MMMyyyy', new Date())
    return isValid(d) ? d : null
}

export function SlateGeneratorClient({ oracleData }: SlateGeneratorClientProps) {
    const [slateName, setSlateName] = useState("FY26-3")
    const [startDate, setStartDate] = useState("2026-07-01")
    const [endDate, setEndDate] = useState("2027-11-30")
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
        const start = new Date(startDate)
        const end   = new Date(endDate)

        // ── Build a set of commandIds already assigned on any Active slate ──────
        // A requirement is "assigned" if filledBy is a non-empty, non-placeholder string.
        const isFilledName = (name?: string | null) =>
            !!name && !/^(tbd|vacant|open|n\/a|unknown|forecast|)$/i.test(name.trim())

        const assignedCommandIds = new Set<string>()
        getSlates()
            .filter(s => s.status === 'Active')
            .forEach(s => {
                (s.requirements || []).forEach(r => {
                    if (r.commandId && isFilledName(r.filledBy)) {
                        assignedCommandIds.add(r.commandId)
                    }
                })
            })

        const reqs: SlateRequirement[] = []

        oracleData.forEach(cmd => {
            // ── Skip if already assigned on an active slate ───────────────────
            if (assignedCommandIds.has(cmd.id)) return

            const isCOSM = cmd.tags?.includes('CO-SM')

            // ── Get the fill date from the Oracle slate column ────────────────
            // This mirrors exactly what shows as the sub-badge date in each row.
            let fillDateStr: string | null = null
            if (isCOSM) {
                fillDateStr = getCoSmRptDisplay(cmd)?.date ?? null
            } else {
                fillDateStr = getCdrCmdXoRptDate(cmd)
            }

            const fillDate = flexParse(fillDateStr)
            if (!fillDate) return

            // ── Check fill date within range ──────────────────────────────────
            if (fillDate < start || fillDate > end) return

            // ── Incumbent: for CO-SM DirectCO use P-CO → CO chain;
            // for fleet-up CDR CMD use P-XO → XO chain.
            let incumbentName: string
            if (isCOSM) {
                const pCoName = cmd.prospectiveCO?.name
                const coName  = cmd.currentCO?.name
                const hasPCo  = !!pCoName && pCoName !== 'N/A' && pCoName !== 'Unknown'
                incumbentName = hasPCo
                    ? pCoName!
                    : (coName && coName !== 'N/A' ? coName : 'Unknown')
            } else {
                const inboundName = cmd.inboundXO?.name
                const currentName = cmd.currentXO?.name
                incumbentName = (inboundName && inboundName !== 'N/A' && inboundName !== 'Unknown')
                    ? inboundName
                    : (currentName && currentName !== 'N/A' ? currentName : 'Unknown')
            }

            reqs.push({
                id: `req-${cmd.id}-${isCOSM ? 'cosm' : 'xo'}`,
                commandName: cmd.name,
                commandId: cmd.id,
                role: isCOSM ? 'CO-SM' : 'XO',
                incumbent: incumbentName,
                incumbentPrd: fillDate.toISOString().split('T')[0],
                status: 'Draft'
            })
        })

        // Sort by fill date ascending
        reqs.sort((a, b) => a.incumbentPrd.localeCompare(b.incumbentPrd))
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
                                <Label htmlFor="start">Officer Fill Date — Start</Label>
                                <Input id="start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="end">Officer Fill Date — End</Label>
                                <Input id="end" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Enter the date range of the <strong>XO/CO RPT dates</strong> shown in the Oracle slate column.
                            Commands already assigned on an active slate are automatically excluded.
                        </p>
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
                                        <TableHead>Fill Date</TableHead>
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
