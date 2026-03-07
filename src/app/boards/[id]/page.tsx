"use client"

import { useState, use, useRef, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { boards } from "@/lib/data"
import { CdrCmdBoard, BoardCandidate, BoardResult } from "@/lib/types"
import ExcelJS from "exceljs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Upload, Info, Trash2, ChevronDown, ChevronUp, CheckCircle2, Loader2, AlertCircle } from "lucide-react"
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
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
interface BoardPageProps {
    params: Promise<{ id: string }>
}

export default function BoardDetailPage({ params }: BoardPageProps) {
    const { id } = use(params)
    const router = useRouter()
    const [board, setBoard] = useState<CdrCmdBoard | null>(null)
    const [candidates, setCandidates] = useState<BoardCandidate[]>([])
    const [expandedCandidates, setExpandedCandidates] = useState<Set<string>>(new Set())
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
    const fileInputRef = useRef<HTMLInputElement>(null)
    const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const isFirstRender = useRef(true)

    useEffect(() => {
        const found = boards.find(b => b.id === id)
        if (found) {
            setBoard({ ...found })
            setCandidates([...found.candidates])
        }
    }, [id])

    // Warn on browser tab close / refresh when actively saving or unsaved
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (saveStatus === 'saving' || saveStatus === 'idle') {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [saveStatus])

    // Core save function
    const performSave = useCallback(async (candidatesToSave: BoardCandidate[], currentBoard: CdrCmdBoard) => {
        const boardIndex = boards.findIndex(b => b.id === currentBoard.id);
        if (boardIndex < 0) return;
        const updatedBoards = [...boards];
        updatedBoards[boardIndex].candidates = [...candidatesToSave];
        setSaveStatus('saving');
        try {
            const res = await fetch('/api/update-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ boards: updatedBoards })
            });
            if (res.ok) {
                setSaveStatus('saved');
            } else {
                setSaveStatus('error');
            }
        } catch {
            setSaveStatus('error');
        }
    }, [])

    // Debounced auto-save: fires 2s after candidates last changed
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (!board) return;
        setSaveStatus('idle');
        if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
        autoSaveTimer.current = setTimeout(() => {
            performSave(candidates, board);
        }, 2000);
        return () => {
            if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
        };
    }, [candidates])

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
            if (sheetNameLower.includes("1st") || sheetNameLower.includes("first") || sheetNameLower === "1") sheetLookTracker = "1st Look";
            else if (sheetNameLower.includes("2nd") || sheetNameLower.includes("second") || sheetNameLower === "2") sheetLookTracker = "2nd Look";
            else if (sheetNameLower.includes("3rd") || sheetNameLower.includes("third") || sheetNameLower === "3") sheetLookTracker = "3rd Look";
            else return; // Skip sheets that are not look tabs (e.g., Bank, CO-SM)

            // Map headers
            const headers: Record<string, number> = {};
            const headerRow = worksheet.getRow(1);
            if (!headerRow) return;

            headerRow.eachCell((cell, colNumber) => {
                const raw = cell.value?.toString().trim() ?? '';
                // Strip parenthetical suffix from header labels (e.g. "PERS-8 (Detail Officer)" -> "pers-8")
                const value = raw.replace(/\s*\(.*?\)/g, '').trim().toLowerCase();
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

                // Capture all raw data, stripping any parenthetical suffixes
                const stripParens = (str: string) => str.replace(/\s*\(.*?\)/g, '').trim();
                const rawData: Record<string, string> = {};
                Object.entries(headers).forEach(([headerName, colNumber]) => {
                    const cell = row.getCell(colNumber);
                    let val = "";
                    if (cell.type === ExcelJS.ValueType.RichText && cell.value && typeof cell.value === 'object' && 'richText' in cell.value) {
                        val = cell.value.richText.map(rt => rt.text).join('').trim();
                    } else if (cell.type === ExcelJS.ValueType.Formula && cell.result !== undefined) {
                        val = cell.result?.toString().trim() || "";
                    } else if (cell.value instanceof Date) {
                        const year = cell.value.getFullYear();
                        const month = String(cell.value.getMonth() + 1).padStart(2, '0');
                        const day = String(cell.value.getDate()).padStart(2, '0');
                        val = `${year}-${month}-${day}`;
                    } else {
                        val = cell.value?.toString().trim() || "";
                    }
                    // Strip any parenthetical content (e.g. "PERS-8 (Detail Officer)" -> "PERS-8")
                    val = stripParens(val);
                    if (val) {
                        rawData[headerName] = val;
                    }
                });

                newCandidates.push({
                    id: `cand_${Math.random().toString(36).substring(2, 9)}`,
                    name,
                    rank,
                    designator,
                    commissioningDate: commDate,
                    ycs: calculatedYcs,
                    lookTracker: sheetLookTracker,
                    rawData,
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


    const updateCandidate = (candId: string, updates: Partial<BoardCandidate>) => {
        setCandidates(prev => prev.map(c => c.id === candId ? { ...c, ...updates } : c))
    }

    const updateCandidateRawData = (candId: string, key: string, value: string) => {
        setCandidates(prev => prev.map(c => {
            if (c.id === candId) {
                return {
                    ...c,
                    rawData: {
                        ...(c.rawData || {}),
                        [key]: value
                    }
                }
            }
            return c;
        }))
    }

    // Preserve original Excel column order (left to right = highest priority first)
    const allRawHeaders = Array.from(
        new Set(
            candidates.flatMap(c => Object.keys(c.rawData || {}))
        )
    );

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
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                        if (saveStatus === 'idle' || saveStatus === 'saving') {
                            const confirmed = confirm("Changes are still being saved. Are you sure you want to leave?");
                            if (!confirmed) return;
                        }
                        router.push("/boards");
                    }}
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{board.fy} CDR CMD Board</h2>
                    <p className="text-muted-foreground flex items-center gap-2">
                        Board Date: {board.boardDate}
                        {saveStatus === 'idle' && <span className="ml-2 text-amber-500 text-xs font-medium flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-amber-400"></span>Unsaved</span>}
                        {saveStatus === 'saving' && <span className="ml-2 text-muted-foreground text-xs flex items-center gap-1"><Loader2 className="h-3 w-3 animate-spin" />Saving...</span>}
                        {saveStatus === 'saved' && <span className="ml-2 text-green-600 text-xs flex items-center gap-1"><CheckCircle2 className="h-3 w-3" />Saved</span>}
                        {saveStatus === 'error' && <span className="ml-2 text-red-500 text-xs flex items-center gap-1"><AlertCircle className="h-3 w-3" />Save failed</span>}
                    </p>
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
                </div>
            </div>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Record Review & Candidate Prep</CardTitle>
                    <CardDescription>
                        Manage deferral requests, special requests, and candidate data for the {candidates.length} eligible candidates.
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
                                        {lookCandidates.length === 0 ? (
                                            <div className="text-center py-10 border border-dashed rounded-md text-muted-foreground">
                                                No candidates in this category.
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                {lookCandidates.map(c => {
                                                    const isExpanded = expandedCandidates.has(c.id);
                                                    const toggle = () => setExpandedCandidates(prev => {
                                                        const next = new Set(prev);
                                                        if (next.has(c.id)) next.delete(c.id);
                                                        else next.add(c.id);
                                                        return next;
                                                    });
                                                    return (
                                                        <div key={c.id} className="border rounded-md overflow-hidden">
                                                            {/* Collapsed Header Row */}
                                                            <button
                                                                onClick={toggle}
                                                                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors text-left"
                                                            >
                                                                <div className="flex items-center gap-6">
                                                                    <div>
                                                                        <div className="font-semibold text-sm">{c.name}</div>
                                                                        <div className="text-xs text-muted-foreground">{c.rank} &bull; {c.designator}</div>
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground hidden sm:block">
                                                                        <span className="font-medium">Comm:</span> {c.commissioningDate || "N/A"}
                                                                        {c.ycs > 0 && <span className="ml-2">({c.ycs} YCS)</span>}
                                                                    </div>
                                                                    {c.deferralRequested && (
                                                                        <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-600">Deferral Requested</Badge>
                                                                    )}
                                                                    {c.deferralApproved && (
                                                                        <Badge variant="outline" className="text-xs border-green-500 text-green-600">Deferral Approved</Badge>
                                                                    )}
                                                                    {/* Key flags visible at a glance */}
                                                                    {(['pers-8', '2d1', 'ln7'] as const).map(flagKey => {
                                                                        const val = Object.entries(c.rawData || {}).find(([k]) => k.toLowerCase() === flagKey)?.[1]?.toUpperCase();
                                                                        if (!val) return null;
                                                                        const isYes = val === 'Y';
                                                                        return (
                                                                            <Badge
                                                                                key={flagKey}
                                                                                variant="outline"
                                                                                className={`text-xs uppercase ${isYes ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-muted text-muted-foreground'}`}
                                                                            >
                                                                                {flagKey.toUpperCase()}: {isYes ? 'Y' : 'N'}
                                                                            </Badge>
                                                                        );
                                                                    })}
                                                                </div>
                                                                {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                                                            </button>

                                                            {/* Expanded Detail Panel */}
                                                            {isExpanded && (
                                                                <div className="border-t bg-muted/20 px-4 py-4 space-y-6">

                                                                    {/* Board Prep Fields */}
                                                                    <div className="space-y-3">
                                                                        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Board Prep</h4>
                                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                            <div className="space-y-2">
                                                                                <div className="flex items-center gap-3">
                                                                                    <Checkbox
                                                                                        id={`defer-req-${c.id}`}
                                                                                        checked={c.deferralRequested}
                                                                                        onCheckedChange={(val) => updateCandidate(c.id, { deferralRequested: !!val })}
                                                                                    />
                                                                                    <label htmlFor={`defer-req-${c.id}`} className="text-sm">Deferral Requested</label>
                                                                                </div>
                                                                                <div className="flex items-center gap-3">
                                                                                    <Checkbox
                                                                                        id={`defer-appr-${c.id}`}
                                                                                        checked={c.deferralApproved}
                                                                                        onCheckedChange={(val) => updateCandidate(c.id, { deferralApproved: !!val })}
                                                                                        disabled={!c.deferralRequested}
                                                                                    />
                                                                                    <label htmlFor={`defer-appr-${c.id}`} className={`text-sm ${!c.deferralRequested ? "text-muted-foreground" : ""}`}>Deferral Approved</label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex flex-col gap-2">
                                                                                <Input
                                                                                    placeholder="Special requests..."
                                                                                    className="h-8 text-sm"
                                                                                    value={c.specialRequests || ""}
                                                                                    onChange={(e) => updateCandidate(c.id, { specialRequests: e.target.value })}
                                                                                />
                                                                                <Textarea
                                                                                    placeholder="Board prep notes..."
                                                                                    className="min-h-[60px] text-sm py-1"
                                                                                    value={c.boardNotes || ""}
                                                                                    onChange={(e) => updateCandidate(c.id, { boardNotes: e.target.value })}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* Raw Data Fields */}
                                                                    {allRawHeaders.length > 0 && (
                                                                        <div className="space-y-3">
                                                                            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Imported Data</h4>
                                                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                                                                {allRawHeaders.map(header => {
                                                                                    const val = c.rawData?.[header] || "";
                                                                                    const isYN = val.toUpperCase() === 'Y' || val.toUpperCase() === 'N';
                                                                                    const isYes = val.toUpperCase() === 'Y';
                                                                                    return (
                                                                                        <div key={header} className="flex flex-col gap-1">
                                                                                            <label className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{header}</label>
                                                                                            {isYN ? (
                                                                                                <button
                                                                                                    onClick={() => updateCandidateRawData(c.id, header, isYes ? 'N' : 'Y')}
                                                                                                    className={`inline-flex items-center justify-center h-8 rounded-md text-sm font-semibold px-3 border transition-colors ${isYes ? 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200' : 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200'}`}
                                                                                                >
                                                                                                    {isYes ? '✓ Yes' : '✗ No'}
                                                                                                </button>
                                                                                            ) : (
                                                                                                <Input
                                                                                                    className="h-8 text-sm"
                                                                                                    value={val}
                                                                                                    onChange={(e) => updateCandidateRawData(c.id, header, e.target.value)}
                                                                                                />
                                                                                            )}
                                                                                        </div>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
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
