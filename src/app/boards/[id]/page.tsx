"use client"

import { useState, use, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { boards } from "@/lib/data"
import { CdrCmdBoard, BoardCandidate, BoardResult } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Upload, Save, UserPlus, Info } from "lucide-react"
import Link from "next/link"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

interface BoardPageProps {
    params: Promise<{ id: string }>
}

export default function BoardDetailPage({ params }: BoardPageProps) {
    const { id } = use(params)
    const router = useRouter()
    const [board, setBoard] = useState<CdrCmdBoard | null>(null)
    const [candidates, setCandidates] = useState<BoardCandidate[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const found = boards.find(b => b.id === id)
        if (found) {
            setBoard({ ...found })
            setCandidates([...found.candidates])
        }
    }, [id])

    if (!board) {
        return <div className="p-8">Loading board data...</div>
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const text = await file.text()
        const lines = text.split("\n").filter(l => l.trim().length > 0)

        // Very basic CSV parsing assuming headers: Name, Rank, Designator, Commissioning Date, Look Tracker
        // In a real app we'd use PapaParse
        const newCandidates: BoardCandidate[] = []
        const headers = lines[0].split(",").map(h => h.trim().toLowerCase())

        const nameIdx = headers.findIndex(h => h.includes("name"))
        const rankIdx = headers.findIndex(h => h.includes("rank"))
        const desigIdx = headers.findIndex(h => h.includes("desig"))
        const commIdx = headers.findIndex(h => h.includes("commission") || h.includes("date"))
        const lookIdx = headers.findIndex(h => h.includes("look"))

        for (let i = 1; i < lines.length; i++) {
            // Split respecting quotes (basic approximation)
            const row = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.replace(/^"|"$/g, '').trim())
            if (row.length < 2) continue;

            const commDate = commIdx >= 0 ? row[commIdx] : ""

            // Calculate a rough YCS if commDate and boardDate exist
            let calculatedYcs = 0;
            if (commDate && board.boardDate) {
                const commYear = new Date(commDate).getFullYear()
                const boardYear = new Date(board.boardDate).getFullYear()
                if (!isNaN(commYear) && !isNaN(boardYear)) {
                    calculatedYcs = boardYear - commYear
                }
            }

            const candidate: BoardCandidate = {
                id: `cand_${Math.random().toString(36).substring(2, 9)}`,
                name: nameIdx >= 0 ? row[nameIdx] : `Unknown ${i}`,
                rank: rankIdx >= 0 ? row[rankIdx] : "LCDR",
                designator: desigIdx >= 0 ? row[desigIdx] : "1110",
                commissioningDate: commDate,
                ycs: calculatedYcs,
                lookTracker: lookIdx >= 0 ? (row[lookIdx] as "1st Look" | "2nd Look" | "Other") : "1st Look",
                missingRecords: false,
                missingRecordsNotes: "",
                deferralRequested: false,
                deferralApproved: false,
                specialRequests: "",
                boardNotes: "",
                result: "Pending"
            }
            newCandidates.push(candidate)
        }

        setCandidates(prev => [...prev, ...newCandidates])
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const saveChanges = () => {
        const boardIndex = boards.findIndex(b => b.id === board.id)
        if (boardIndex >= 0) {
            boards[boardIndex].candidates = [...candidates]
            setBoard({ ...boards[boardIndex] })
            // Normally trigger toast or notification here
        }
    }

    const updateCandidate = (candId: string, updates: Partial<BoardCandidate>) => {
        setCandidates(prev => prev.map(c => c.id === candId ? { ...c, ...updates } : c))
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center space-x-4 mb-4">
                <Link href="/boards">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{board.fy} CDR CMD Board</h2>
                    <p className="text-muted-foreground">Board Date: {board.boardDate}</p>
                </div>
                <div className="ml-auto flex gap-2">
                    <input
                        type="file"
                        accept=".csv"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                    />
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4" /> Import Eligibles CSV
                    </Button>
                    <Button onClick={saveChanges}>
                        <Save className="mr-2 h-4 w-4" /> Save Board State
                    </Button>
                </div>
            </div>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Record Review & Candidate Prep</CardTitle>
                    <CardDescription>
                        Manage missing items, deferral requests, and special requests for the {candidates.length} eligible candidates.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {candidates.length === 0 ? (
                        <div className="text-center py-10 border border-dashed rounded-md">
                            <Info className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                            <h3 className="text-lg font-medium">No Candidates Uploaded</h3>
                            <p className="text-sm text-muted-foreground mb-4">Upload a CSV of eligible officers to begin the record review process.</p>
                            <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
                                <Upload className="mr-2 h-4 w-4" /> Import Candidates
                            </Button>
                        </div>
                    ) : (
                        <div className="border rounded-md overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">Officer</TableHead>
                                        <TableHead>Eligibility</TableHead>
                                        <TableHead className="w-[120px] text-center">Missing Records</TableHead>
                                        <TableHead className="w-[200px] text-center">Deferral</TableHead>
                                        <TableHead className="w-[250px]">Special Requests/Notes</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {candidates.map(c => (
                                        <TableRow key={c.id}>
                                            <TableCell>
                                                <div className="font-medium">{c.name}</div>
                                                <div className="text-xs text-muted-foreground">{c.rank} • {c.designator}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="mb-1">{c.lookTracker}</Badge>
                                                <div className="text-xs text-muted-foreground">Comm: {c.commissioningDate || "N/A"}</div>
                                                <div className="text-[10px] text-muted-foreground">{c.ycs > 0 ? `${c.ycs} YCS` : ""}</div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <Checkbox
                                                        checked={c.missingRecords}
                                                        onCheckedChange={(val) => updateCandidate(c.id, { missingRecords: !!val })}
                                                    />
                                                    {c.missingRecords && (
                                                        <Input
                                                            placeholder="Details..."
                                                            className="h-7 text-xs"
                                                            value={c.missingRecordsNotes || ""}
                                                            onChange={(e) => updateCandidate(c.id, { missingRecordsNotes: e.target.value })}
                                                        />
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-2 text-sm pt-1 pb-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-muted-foreground">Requested:</span>
                                                        <Checkbox
                                                            checked={c.deferralRequested}
                                                            onCheckedChange={(val) => updateCandidate(c.id, { deferralRequested: !!val })}
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-muted-foreground">Approved:</span>
                                                        <Checkbox
                                                            checked={c.deferralApproved}
                                                            onCheckedChange={(val) => updateCandidate(c.id, { deferralApproved: !!val })}
                                                            disabled={!c.deferralRequested}
                                                        />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-2">
                                                    <Input
                                                        placeholder="Special requests..."
                                                        className="h-7 text-xs"
                                                        value={c.specialRequests || ""}
                                                        onChange={(e) => updateCandidate(c.id, { specialRequests: e.target.value })}
                                                    />
                                                    <Textarea
                                                        placeholder="Board prep notes..."
                                                        className="min-h-[40px] text-xs py-1"
                                                        value={c.boardNotes || ""}
                                                        onChange={(e) => updateCandidate(c.id, { boardNotes: e.target.value })}
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
