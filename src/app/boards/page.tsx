"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Archive, FolderOpen, Plus, Search, CalendarIcon, Users } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { boards } from "@/lib/data"
import { CdrCmdBoard } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Safely format a date that may be ISO or a display string (e.g. "Dec 3-5")
function formatBoardDate(dateStr: string): string {
    if (!dateStr) return "N/A"
    const parsed = new Date(dateStr)
    if (!isNaN(parsed.getTime())) {
        return parsed.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    }
    return dateStr // Return as-is if not parseable (e.g. "Dec 3-5")
}

export default function BoardsDashboard() {
    const [localBoards, setLocalBoards] = useState<CdrCmdBoard[]>([...boards])
    const [searchQuery, setSearchQuery] = useState("")
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [newBoardFy, setNewBoardFy] = useState("")
    const [newBoardDate, setNewBoardDate] = useState("")
    const [isSaving, setIsSaving] = useState(false)
    const [createError, setCreateError] = useState("")

    const generateId = () => `board_${Math.random().toString(36).substring(2, 11)}`

    const handleCreateBoard = async () => {
        if (!newBoardFy.trim() || !newBoardDate.trim()) {
            setCreateError("Both Fiscal Year and Board Date are required.")
            return
        }

        const newBoard: CdrCmdBoard = {
            id: generateId(),
            fy: newBoardFy.trim().toUpperCase(),
            boardDate: newBoardDate,
            status: "Open",
            candidates: []
        }

        setIsSaving(true)
        setCreateError("")

        const updatedBoards = [...localBoards, newBoard]

        try {
            const res = await fetch('/api/update-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ boards: updatedBoards })
            })

            if (res.ok) {
                // Update the live in-memory array so navigation to [id] works immediately
                boards.push(newBoard)
                setLocalBoards(updatedBoards)
                setIsCreateDialogOpen(false)
                setNewBoardFy("")
                setNewBoardDate("")
            } else {
                setCreateError("Failed to save board. Please try again.")
            }
        } catch {
            setCreateError("Network error. Please try again.")
        } finally {
            setIsSaving(false)
        }
    }

    const filteredBoards = localBoards.filter(b =>
        b.fy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.status.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const activeBoards = filteredBoards.filter(b => b.status === "Open")
    const closedBoards = filteredBoards.filter(b => b.status === "Closed")

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">CDR CMD Board Prep</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage annual selection board preparation and candidate record review.
                    </p>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={(open) => { setIsCreateDialogOpen(open); setCreateError("") }}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Create New Board
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create CDR CMD Board</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="fy" className="text-right">
                                    Board FY
                                </Label>
                                <Input
                                    id="fy"
                                    placeholder="e.g. FY28"
                                    value={newBoardFy}
                                    onChange={(e) => setNewBoardFy(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="date" className="text-right">
                                    Board Date
                                </Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={newBoardDate}
                                    onChange={(e) => setNewBoardDate(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            {createError && (
                                <p className="text-xs text-red-500 col-span-4 text-center">{createError}</p>
                            )}
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => { setIsCreateDialogOpen(false); setCreateError("") }}>
                                Cancel
                            </Button>
                            <Button onClick={handleCreateBoard} disabled={isSaving}>
                                {isSaving ? "Saving..." : "Create Board"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-md"><FolderOpen className="h-5 w-5 text-blue-600" /></div>
                            <div>
                                <p className="text-2xl font-bold">{localBoards.filter(b => b.status === "Open").length}</p>
                                <p className="text-xs text-muted-foreground">Active Boards</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-md"><Archive className="h-5 w-5 text-muted-foreground" /></div>
                            <div>
                                <p className="text-2xl font-bold">{localBoards.filter(b => b.status === "Closed").length}</p>
                                <p className="text-xs text-muted-foreground">Closed Boards</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-md"><Users className="h-5 w-5 text-green-600" /></div>
                            <div>
                                <p className="text-2xl font-bold">{localBoards.reduce((sum, b) => sum + b.candidates.length, 0)}</p>
                                <p className="text-xs text-muted-foreground">Total Candidates</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Boards</CardTitle>
                    <CardDescription>
                        Select a board to manage candidate record review and board prep.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center mb-4">
                        <div className="flex w-full max-w-sm items-center space-x-2 relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search by FY or status..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {filteredBoards.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-muted-foreground gap-2">
                            <FolderOpen className="h-8 w-8 opacity-40" />
                            <p className="text-sm">No boards found. Create one to get started.</p>
                        </div>
                    ) : (
                        <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Board</TableHead>
                                        <TableHead>Board Date</TableHead>
                                        <TableHead>Candidates</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/* Active boards first */}
                                    {activeBoards.map((board) => (
                                        <TableRow key={board.id}>
                                            <TableCell className="font-medium">
                                                {board.fy} CDR CMD Board
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                <div className="flex items-center gap-1.5">
                                                    <CalendarIcon className="h-3.5 w-3.5" />
                                                    {formatBoardDate(board.boardDate)}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                {board.candidates.length} eligible
                                            </TableCell>
                                            <TableCell>
                                                <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
                                                    Active
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Link href={`/boards/${board.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        <FolderOpen className="mr-2 h-4 w-4" /> Manage Board
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {/* Closed boards second */}
                                    {closedBoards.map((board) => (
                                        <TableRow key={board.id} className="opacity-60">
                                            <TableCell className="font-medium">
                                                {board.fy} CDR CMD Board
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                <div className="flex items-center gap-1.5">
                                                    <CalendarIcon className="h-3.5 w-3.5" />
                                                    {formatBoardDate(board.boardDate)}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                {board.candidates.length} eligible
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">Closed</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Link href={`/boards/${board.id}`}>
                                                    <Button variant="ghost" size="sm">
                                                        <Archive className="mr-2 h-4 w-4" /> View Records
                                                    </Button>
                                                </Link>
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
