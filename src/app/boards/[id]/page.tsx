"use client"

import { useState, use, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { boards } from "@/lib/data"
import { CdrCmdBoard, BoardCandidate, BoardResult } from "@/lib/types"
import ExcelJS from "exceljs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Upload, Save, UserPlus, Info, Trash2 } from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

        const arrayBuffer = await file.arrayBuffer()
        const workbook = new ExcelJS.Workbook()
        await workbook.xlsx.load(arrayBuffer)

        const newCandidates: BoardCandidate[] = []

        workbook.eachSheet((worksheet, sheetId) => {
            // Determine Look Tracker from sheet name
            let sheetLookTracker: "1st Look" | "2nd Look" | "3rd Look";
            const sheetNameLower = worksheet.name.toLowerCase();
            if (sheetNameLower.includes("1st")) sheetLookTracker = "1st Look";
            else if (sheetNameLower.includes("2nd")) sheetLookTracker = "2nd Look";
            else if (sheetNameLower.includes("3rd")) sheetLookTracker = "3rd Look";
            else return; // Skip sheets that are not look tabs (e.g., Bank, CO-SM)

            // Map headers
            const headers: Record<string, number> = {};
            const headerRow = worksheet.getRow(1);
            if (!headerRow) return;

            headerRow.eachCell((cell, colNumber) => {
                const value = cell.value?.toString().trim().toLowerCase();
                if (value) headers[value] = colNumber;
            });

            // Helper to get value
            const getVal = (row: ExcelJS.Row, ...possibleHeaders: string[]) => {
                for (const h of possibleHeaders) {
                    const col = headers[h.toLowerCase()];
                    if (col) {
                        const cell = row.getCell(col);
                        // Handle rich text
                        if (cell.type === ExcelJS.ValueType.RichText && cell.value && typeof cell.value === 'object' && 'richText' in cell.value) {
                            return cell.value.richText.map(rt => rt.text).join('').trim();
                        }
                        // Handle formulas
                        if (cell.type === ExcelJS.ValueType.Formula && cell.result !== undefined) {
                            return cell.result?.toString().trim();
                        }
                        // Handle dates directly
                        if (cell.value instanceof Date) {
                            const year = cell.value.getFullYear();
                            const month = String(cell.value.getMonth() + 1).padStart(2, '0');
                            const day = String(cell.value.getDate()).padStart(2, '0');
                            return `${year}-${month}-${day}`;
                        }
                        return cell.value?.toString().trim();
                    }
                }
                return null;
            };

            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber === 1) return; // skip header

                const rawName = getVal(row, 'name');
                const name = String(rawName || "Unknown");
                if (!rawName || name.trim() === '') return;

                const rank = String(getVal(row, 'rank') || "LCDR");
                const designator = String(getVal(row, 'desig', 'designator') || "1110");
                const commDate = String(getVal(row, 'commission', 'date', 'comm date', 'commissioning date') || "");

                let calculatedYcs = 0;
                if (commDate && board.boardDate) {
                    // Approximate Year extracting
                    let commYearText = commDate;
                    // If it's a serial date string, or YYYY-MM-DD
                    if (commDate.match(/^\d{4}/)) {
                        commYearText = commDate.substring(0, 4);
                    } else if (commDate.includes('/')) {
                        const parts = commDate.split('/');
                        if (parts.length === 3) commYearText = parts[2].length === 2 ? `20${parts[2]}` : parts[2];
                    }

                    const commYear = parseInt(commYearText, 10);
                    const boardYear = new Date(board.boardDate).getFullYear();
                    if (!isNaN(commYear) && !isNaN(boardYear)) {
                        calculatedYcs = boardYear - commYear;
                    }
                }

                newCandidates.push({
                    id: `cand_${Math.random().toString(36).substring(2, 9)}`,
                    name,
                    rank,
                    designator,
                    commissioningDate: commDate,
                    ycs: calculatedYcs,
                    lookTracker: sheetLookTracker,
                    missingRecords: false,
                    missingRecordsNotes: "",
                    deferralRequested: false,
                    deferralApproved: false,
                    specialRequests: "",
                    boardNotes: "",
                    result: "Pending"
                });
            });
        });

        setCandidates(prev => [...prev, ...newCandidates])
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const saveChanges = async () => {
        const boardIndex = boards.findIndex(b => b.id === board.id)
        if (boardIndex >= 0) {
            const updatedBoards = [...boards];
            updatedBoards[boardIndex].candidates = [...candidates];

            setBoard({ ...updatedBoards[boardIndex] });

            try {
                const res = await fetch('/api/update-data', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ boards: updatedBoards })
                });

                if (res.ok) {
                    alert("Board saved successfully!");
                } else {
                    alert("Failed to save board");
                }
            } catch (e) {
                console.error("Save error", e);
                alert("Failed to save board");
            }
        }
    }

    const updateCandidate = (candId: string, updates: Partial<BoardCandidate>) => {
        setCandidates(prev => prev.map(c => c.id === candId ? { ...c, ...updates } : c))
    }

    const clearCandidates = async () => {
        if (!confirm("Are you sure you want to clear all candidates from this board? This cannot be undone if saved.")) return;
        setCandidates([]);

        const boardIndex = boards.findIndex(b => b.id === board.id)
        if (boardIndex >= 0) {
            const updatedBoards = [...boards];
            updatedBoards[boardIndex].candidates = [];
            setBoard({ ...updatedBoards[boardIndex] });

            try {
                const res = await fetch('/api/update-data', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ boards: updatedBoards })
                });

                if (res.ok) {
                    alert("Board cleared successfully!");
                } else {
                    alert("Failed to clear board data");
                }
            } catch (e) {
                console.error("Save error", e);
                alert("Failed to clear board data");
            }
        }
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
                        accept=".xlsx, .xls"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                    />
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4" /> Import Eligibles Excel
                    </Button>
                    <Button variant="destructive" onClick={clearCandidates} disabled={candidates.length === 0}>
                        <Trash2 className="mr-2 h-4 w-4" /> Clear Board
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
                            <p className="text-sm text-muted-foreground mb-4">Upload an Excel file (.xlsx) of eligible officers to begin the record review process.</p>
                            <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
                                <Upload className="mr-2 h-4 w-4" /> Import Candidates
                            </Button>
                        </div>
                    ) : (
                        <Tabs defaultValue="1st Look" className="w-full">
                            <TabsList className="mb-4">
                                <TabsTrigger value="1st Look">
                                    1st Look
                                    <Badge variant="secondary" className="ml-2 h-5 bg-muted-foreground/20">{candidates.filter(c => c.lookTracker === "1st Look").length}</Badge>
                                </TabsTrigger>
                                <TabsTrigger value="2nd Look">
                                    2nd Look
                                    <Badge variant="secondary" className="ml-2 h-5 bg-muted-foreground/20">{candidates.filter(c => c.lookTracker === "2nd Look").length}</Badge>
                                </TabsTrigger>
                                <TabsTrigger value="3rd Look">
                                    3rd Look
                                    <Badge variant="secondary" className="ml-2 h-5 bg-muted-foreground/20">{candidates.filter(c => c.lookTracker === "3rd Look").length}</Badge>
                                </TabsTrigger>
                            </TabsList>

                            {(["1st Look", "2nd Look", "3rd Look"] as const).map(look => {
                                const lookCandidates = candidates.filter(c => c.lookTracker === look);

                                return (
                                    <TabsContent key={look} value={look}>
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
                                                    {lookCandidates.length === 0 ? (
                                                        <TableRow>
                                                            <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                                                No candidates in this category.
                                                            </TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        lookCandidates.map(c => (
                                                            <TableRow key={c.id}>
                                                                <TableCell>
                                                                    <div className="font-medium">{c.name}</div>
                                                                    <div className="text-xs text-muted-foreground">{c.rank} • {c.designator}</div>
                                                                </TableCell>
                                                                <TableCell>
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
                                                        ))
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </TabsContent>
                                );
                            })}
                        </Tabs>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
