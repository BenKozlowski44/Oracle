"use client"

import { useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Officer, Rank, Designator } from "@/lib/types"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Search, Edit2, StickyNote } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { EditOfficerDialog } from "./edit-officer-dialog"
import { OfficerDetailSheet } from "./officer-detail-sheet"
import { saveError, notifySuccess } from "@/lib/notify"

interface OfficerTableProps {
    data: Officer[]
    variant?: "default" | "pcc"
}

export function OfficerTable({ data, variant = "default" }: OfficerTableProps) {
    const searchParams = useSearchParams()
    const [search, setSearch] = useState(searchParams.get("search") || "")
    const [rankFilter, setRankFilter] = useState<string>("all")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [ygFrom, setYgFrom] = useState<string>("")
    const [ygTo, setYgTo] = useState<string>("")
    const [sortConfig, setSortConfig] = useState<{ key: keyof Officer; direction: "asc" | "desc" } | null>(null)
    const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [viewingOfficer, setViewingOfficer] = useState<Officer | null>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('/api/import-officers', {
                method: 'POST',
                body: formData,
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.error || "Failed to import officers")
            }

            notifySuccess(`Imported: ${result.added} added, ${result.updated} updated`)
            router.refresh()
        } catch (error: any) {
            console.error(error)
            saveError(`Import failed: ${error.message}`)
        } finally {
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    const handleEdit = (officer: Officer) => {
        setEditingOfficer(officer)
        setIsDialogOpen(true)
    }

    const filteredData = data.filter((officer) => {
        const matchesSearch = officer.name.toLowerCase().includes(search.toLowerCase()) ||
            (officer.currentCommand && officer.currentCommand.toLowerCase().includes(search.toLowerCase())) ||
            (officer.notes && officer.notes.toLowerCase().includes(search.toLowerCase()))

        const matchesRank = rankFilter === "all" || officer.rank === rankFilter
        const matchesStatus = statusFilter === "all" || officer.status === statusFilter
        const ygNum = officer.yearGroup ?? 0
        const matchesYgFrom = !ygFrom || ygNum >= parseInt(ygFrom)
        const matchesYgTo = !ygTo || ygNum <= parseInt(ygTo)

        return matchesSearch && matchesRank && matchesStatus && matchesYgFrom && matchesYgTo
    })

    const requestSort = (key: keyof Officer) => {
        let direction: "asc" | "desc" = "asc"
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc"
        }
        setSortConfig({ key, direction })
    }

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig) {
            // Default sort by Name
            return a.name.localeCompare(b.name)
        }

        const { key, direction } = sortConfig

        // Handle custom sorting for specific fields
        if (key === "rank") {
            const rankOrder: Record<string, number> = { "LCDR": 1, "CDR": 2, "CAPT": 3 }
            const rankA = rankOrder[a.rank] || 0
            const rankB = rankOrder[b.rank] || 0
            if (rankA < rankB) return direction === "asc" ? -1 : 1
            if (rankA > rankB) return direction === "asc" ? 1 : -1
            return 0
        }

        if (key === "status") {
            const statusOrder: Record<string, number> = {
                "Ready FF": 1,
                "Available": 2,
                "Verify PD2": 3,
                "Defer": 4,
                "Family Planning": 5,
                "War College": 6,
                "Joint Lock": 7,
                "Hold": 8,
                "De-screened": 97,
                "Retire": 99,
                "Policy": 98,
                "List Shift": 9
            }
            const orderA = statusOrder[String(a.status)] || 99
            const orderB = statusOrder[String(b.status)] || 99
            if (orderA < orderB) return direction === "asc" ? -1 : 1
            if (orderA > orderB) return direction === "asc" ? 1 : -1
            return 0
        }

        const valueA = a[key]
        const valueB = b[key]

        if (valueA === undefined || valueA === null) return 1 // push nulls to end
        if (valueB === undefined || valueB === null) return -1

        if (valueA < valueB) {
            return direction === "asc" ? -1 : 1
        }
        if (valueA > valueB) {
            return direction === "asc" ? 1 : -1
        }
        return 0
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Available": return "bg-green-500 hover:bg-green-600"
            case "Verify PD2": return "bg-green-500 hover:bg-green-600"
            case "Joint Lock":
                return "bg-purple-500 hover:bg-purple-600"
            case "War College":
                return "bg-orange-500 hover:bg-orange-600"
            case "Family Planning":
                return "bg-yellow-500 hover:bg-yellow-600"
            case "List Shift":
                return "bg-red-500 hover:bg-red-600"
            case "Retire":
                return "bg-red-500 hover:bg-red-600"
            case "Policy":
                return "bg-red-500 hover:bg-red-600"
            case "De-screened":
                return "bg-red-500 hover:bg-red-600"
            case "Declined":
                return "bg-red-500 hover:bg-red-600"
            case "No Opportunity":
                return "bg-orange-500 hover:bg-orange-600"
            case "Slated": return "bg-blue-500 hover:bg-blue-600"
            case "Defer": return "bg-yellow-500 hover:bg-yellow-600"
            case "PCC": return "bg-green-500 hover:bg-green-600"
            case "Hold": return "bg-red-500 hover:bg-red-600"
            case "Ready FF": return "bg-blue-500 hover:bg-blue-600"
            default: return "bg-gray-500"
        }
    }

    const formatPrd = (dateString: string) => {
        if (!dateString || dateString === "N/A" || dateString === "Unknown") return "N/A";
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return dateString;

            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            const month = monthNames[date.getMonth()];
            const year = date.getFullYear().toString().slice(-2);
            return `${month}${year}`;
        } catch (e) {
            return dateString;
        }
    }

    const formatScreened = (value: string | undefined | null) => {
        if (!value) return "-"

        // If it contains " CO" (with a leading space to avoid matching partial words if any), split it
        if (value.includes(" CO")) {
            const parts = value.split(" CO")
            // parts[0] is "3rd Look", parts[1] is "Afloat" (or whatever follows)
            // We want "3rd Look" then newline then "CO" + parts[1]
            // Actually split limits. simpler: replace " CO" with "\nCO"
            // But we need JSX for line break if we want strict control, or rely on whitespace-pre-line?
            // We used whitespace-normal.
            // Let's use JSX.
            const index = value.indexOf(" CO")
            const first = value.substring(0, index)
            const second = value.substring(index + 1) // "CO..."
            return (
                <>
                    {first}
                    <br />
                    {second}
                </>
            )
        }
        return value
    }

    const SortIcon = ({ column }: { column: keyof Officer }) => {
        if (sortConfig?.key !== column) return <ArrowUpDown className="ml-2 h-4 w-4" />
        return sortConfig.direction === "asc" ?
            <ArrowUpDown className="ml-2 h-4 w-4 text-primary" /> :
            <ArrowUpDown className="ml-2 h-4 w-4 text-primary rotate-180" />
    }

    const SortableHead = ({ label, column }: { label: React.ReactNode, column: keyof Officer }) => (
        <TableHead onClick={() => requestSort(column)} className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center">
                {label}
                <SortIcon column={column} />
            </div>
        </TableHead>
    )

    return (
        <div className="space-y-4">
            {/* Primary filter row */}
            <div className="flex items-center gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search officers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Select value={rankFilter} onValueChange={setRankFilter}>
                    <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Rank" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Ranks</SelectItem>
                        <SelectItem value="LCDR">LCDR</SelectItem>
                        <SelectItem value="CDR">CDR</SelectItem>
                        <SelectItem value="CAPT">CAPT</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Verify PD2">Verify PD2</SelectItem>
                        <SelectItem value="Ready FF">Ready FF</SelectItem>
                        <SelectItem value="Defer">Defer</SelectItem>
                        <SelectItem value="Family Planning">Family Planning</SelectItem>
                        <SelectItem value="War College">War College</SelectItem>
                        <SelectItem value="Joint Lock">Joint Lock</SelectItem>
                        <SelectItem value="Hold">Hold</SelectItem>
                        <SelectItem value="List Shift">List Shift</SelectItem>
                        <SelectItem value="Slated">Slated</SelectItem>
                        <SelectItem value="PCC">PCC</SelectItem>
                        <SelectItem value="Retire">Retire</SelectItem>
                        <SelectItem value="Policy">Policy</SelectItem>
                        <SelectItem value="Declined">Declined</SelectItem>
                        <SelectItem value="No Opportunity">No Opportunity</SelectItem>
                        <SelectItem value="De-screened">De-screened</SelectItem>
                    </SelectContent>
                </Select>
                {/* YG range */}
                <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">YG</span>
                    <Input
                        placeholder="From"
                        value={ygFrom}
                        onChange={(e) => setYgFrom(e.target.value)}
                        className="w-[70px] text-center"
                        maxLength={4}
                    />
                    <span className="text-xs text-muted-foreground">–</span>
                    <Input
                        placeholder="To"
                        value={ygTo}
                        onChange={(e) => setYgTo(e.target.value)}
                        className="w-[70px] text-center"
                        maxLength={4}
                    />
                </div>
                <Button onClick={() => {
                    setEditingOfficer({
                        id: "",
                        name: "",
                        rank: "LCDR",
                        designator: "1110",
                        currentCommand: "",
                        prd: "",
                        preferences: [],
                        status: "Available",
                        yearGroup: 0
                    } as Officer);
                    setIsDialogOpen(true);
                }}>
                    Add Officer
                </Button>
                <input
                    type="file"
                    accept=".xlsx,.xls"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                />
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    Import Excel
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <SortableHead label="Screened" column="assignedSlate" />
                            <SortableHead label="Tentative" column="tentativeSlate" />
                            <SortableHead label="Status" column="status" />
                            <SortableHead label="Name" column="name" />
                            <SortableHead label={
                                <div className="flex flex-col leading-tight">
                                    <span>Rank</span>
                                    <span className="text-xs text-muted-foreground">Desig</span>
                                </div>
                            } column="rank" />
                            <SortableHead label={
                                <div className="flex flex-col leading-tight">
                                    <span>YG</span>
                                    <span className="text-xs text-muted-foreground">CSR</span>
                                </div>
                            } column="yearGroup" />
                            {variant !== "pcc" && <SortableHead label={
                                <div className="flex flex-col leading-tight">
                                    <span>Command</span>
                                    <span className="text-xs text-muted-foreground">Billet</span>
                                </div>
                            } column="currentCommand" />}
                            <SortableHead label="PRD" column="prd" />
                            {variant === "default" && <TableHead>Preferences</TableHead>}
                            {variant === "pcc" && <TableHead>Command</TableHead>}
                            {variant === "pcc" && <TableHead>CoC Date</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={12} className="h-24 text-center">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedData.map((officer) => (
                                <TableRow key={officer.id}>
                                    <TableCell className="text-muted-foreground text-xs max-w-[80px] break-words whitespace-normal leading-tight">
                                        {formatScreened(officer.assignedSlate)}
                                    </TableCell>
                                    <TableCell className="text-xs">
                                        {officer.tentativeSlate || "-"}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(officer.status)}>
                                            {officer.status === "PCC" ? "Command Complete" : officer.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell
                                        className="font-medium cursor-pointer hover:underline text-primary"
                                        onClick={() => { setViewingOfficer(officer); setIsDetailOpen(true) }}
                                    >
                                        <span className="flex items-center gap-1.5">
                                            {officer.name}
                                            {officer.notes?.trim() && (
                                                <StickyNote className="h-3 w-3 text-muted-foreground shrink-0" />
                                            )}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{officer.rank}</span>
                                            <span className="text-xs text-muted-foreground">{officer.designator}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{officer.yearGroup}</span>
                                            <span className="text-xs text-muted-foreground">{officer.csr || "-"}</span>
                                        </div>
                                    </TableCell>
                                    {variant !== "pcc" && (
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{officer.currentCommand}</span>
                                                <span className="text-xs text-muted-foreground">{officer.billet || "-"}</span>
                                            </div>
                                        </TableCell>
                                    )}
                                    <TableCell>{formatPrd(officer.prd)}</TableCell>
                                    {variant === "default" && (
                                        <TableCell>
                                            {officer.screened?.includes("CO-SM") || officer.listShift === "CO-SM" ? (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger className="cursor-help text-left w-full">
                                                            <div className="flex flex-col text-xs space-y-1">
                                                                {officer.cosmPreferences && officer.cosmPreferences.some(p => p?.trim()) ? (
                                                                    <>
                                                                        {officer.cosmPreferences.filter(p => p?.trim()).slice(0, 3).map((pref, i) => (
                                                                            <span key={i} className="truncate max-w-[150px]">{i + 1}. {pref}</span>
                                                                        ))}
                                                                        {officer.cosmPreferences.filter(p => p?.trim()).length > 3 && (
                                                                            <span className="text-muted-foreground text-[10px] italic">
                                                                                +{officer.cosmPreferences.filter(p => p?.trim()).length - 3} more
                                                                            </span>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <span className="text-muted-foreground italic">No preferences</span>
                                                                )}
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="right" className="max-w-[300px] max-h-[400px] overflow-y-auto">
                                                            <div className="space-y-1 text-sm">
                                                                <div className="font-semibold border-b pb-1 mb-2">CO-SM Preferences</div>
                                                                {officer.cosmPreferences?.map((pref, i) => (
                                                                    pref?.trim() ? (
                                                                        <div key={i} className="grid grid-cols-[20px_1fr] gap-2">
                                                                            <span className="text-muted-foreground text-right">{i + 1}.</span>
                                                                            <span>{pref}</span>
                                                                        </div>
                                                                    ) : null
                                                                ))}
                                                                {(!officer.cosmPreferences || !officer.cosmPreferences.some(p => p?.trim())) && (
                                                                    <div className="text-muted-foreground italic">No preferences set</div>
                                                                )}
                                                            </div>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            ) : (
                                                <div className="flex flex-col text-xs" title={`Priority: ${officer.preferencePriority || "None"}`}>
                                                    {officer.preferencePriority === "Platform" ? (
                                                        <>
                                                            <span className={`truncate max-w-[150px] ${officer.preferencePriority === "Platform" ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                                                                🚢 {officer.preferredPlatforms?.join(", ") || "-"}
                                                            </span>
                                                            <span className="text-muted-foreground truncate max-w-[150px]">
                                                                🏠 {officer.preferredLocations?.join(", ") || "-"}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className={`truncate max-w-[150px] ${officer.preferencePriority === "Homeport" ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                                                                🏠 {officer.preferredLocations?.join(", ") || "-"}
                                                            </span>
                                                            <span className="text-muted-foreground truncate max-w-[150px]">
                                                                🚢 {officer.preferredPlatforms?.join(", ") || "-"}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </TableCell>
                                    )}
                                    {variant === "pcc" && (
                                        <TableCell>{officer.notes?.replace("CMD Tour: ", "") || "N/A"}</TableCell>
                                    )}
                                    {variant === "pcc" && (
                                        <TableCell>{officer.cocDate ? formatPrd(officer.cocDate) : "—"}</TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="text-sm text-muted-foreground">
                Showing {sortedData.length} of {data.length} officers
            </div>

            <EditOfficerDialog
                officer={editingOfficer}
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />
            <OfficerDetailSheet
                officer={viewingOfficer}
                open={isDetailOpen}
                onOpenChange={setIsDetailOpen}
            />
        </div>
    )
}
