"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Archive, FolderOpen, Plus, Search, Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
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

export default function BoardsDashboard() {
    const [searchQuery, setSearchQuery] = useState("")
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [newBoardFy, setNewBoardFy] = useState("")
    const [newBoardDate, setNewBoardDate] = useState("")

    // Generate random 13 digit string for ID
    const generateId = () => `board_${Math.random().toString(36).substring(2, 11)}`

    const handleCreateBoard = () => {
        if (!newBoardFy || !newBoardDate) return;

        const newBoard: CdrCmdBoard = {
            id: generateId(),
            fy: newBoardFy,
            boardDate: newBoardDate,
            status: "Open",
            candidates: []
        }

        // In a real database this would be an API call
        boards.push(newBoard)

        setIsCreateDialogOpen(false)
        setNewBoardFy("")
        setNewBoardDate("")
    }

    const filteredBoards = boards.filter(b =>
        b.fy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.status.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">CDR CMD Board Prep</h2>
                <div className="flex items-center space-x-2">
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
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
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                                <Button onClick={handleCreateBoard}>Create</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Historical & Active Boards</CardTitle>
                    <CardDescription>
                        Manage board instances for Annual Selection Preperation and Record Review.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex w-full max-w-sm items-center space-x-2 relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search by FY..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Fiscal Year</TableHead>
                                    <TableHead>Board Date</TableHead>
                                    <TableHead>Eligible Pool</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredBoards.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                            No boards found. Create one to get started.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredBoards.map((board) => (
                                        <TableRow key={board.id}>
                                            <TableCell className="font-medium">
                                                {board.fy} CDR CMD Board
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center text-muted-foreground text-sm">
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {board.boardDate ? format(new Date(board.boardDate), "MMM do, yyyy") : "N/A"}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {board.candidates.length} candidates
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={board.status === "Open" ? "default" : "secondary"}>
                                                    {board.status === "Open" ? "Active" : "Closed"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Link href={`/boards/${board.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        {board.status === "Open" ? (
                                                            <><FolderOpen className="mr-2 h-4 w-4" /> Manage Board</>
                                                        ) : (
                                                            <><Archive className="mr-2 h-4 w-4" /> View Records</>
                                                        )}
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
