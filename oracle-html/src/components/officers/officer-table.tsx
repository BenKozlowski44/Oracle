import * as XLSX from 'xlsx'
import { saveOfficers, getOfficers } from '@/services/storage'
import { useState, useRef } from "react"
import { useNavigate, useSearchParams } from 'react-router-dom'
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
import { ArrowUpDown, Search, Edit2 } from "lucide-react"
import { notifySuccess, saveError } from "@/lib/notify"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { EditOfficerDialog } from "./edit-officer-dialog"

interface OfficerTableProps {
    data: Officer[]
    variant?: "default" | "pcc"
    onSave?: (updated: Officer) => void
}

export function OfficerTable({ data, variant = "default", onSave: onSaveProp }: OfficerTableProps) {
    const [searchParams] = useSearchParams()
    const [search, setSearch] = useState(searchParams.get("search") || "")
    const [rankFilter, setRankFilter] = useState<string>("all")
    const [sortConfig, setSortConfig] = useState<{ key: keyof Officer; direction: "asc" | "desc" } | null>(null)
    const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [localData, setLocalData] = useState<Officer[]>(data)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        try {
            const arrayBuffer = await file.arrayBuffer()
            const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array', cellDates: true })
            const worksheet = workbook.Sheets[workbook.SheetNames[0]]
            if (!worksheet) throw new Error('No worksheet found in file')

            const rawRows: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
            const headerRow = (rawRows[0] || []) as string[]

            // Build header index map (case-insensitive)
            const headers: Record<string, number> = {}
            headerRow.forEach((h, i) => { if (h) headers[String(h).trim().toLowerCase()] = i })

            const getVal = (row: any[], ...keys: string[]) => {
                for (const k of keys) {
                    const idx = headers[k.toLowerCase()]
                    if (idx !== undefined && row[idx] !== undefined && row[idx] !== null && row[idx] !== '') {
                        return row[idx]
                    }
                }
                return null
            }

            const parseDate = (val: any): string => {
                if (!val) return 'Unknown'
                if (val instanceof Date) {
                    return `${val.getFullYear()}-${String(val.getMonth() + 1).padStart(2, '0')}-${String(val.getDate()).padStart(2, '0')}`
                }
                if (typeof val === 'number' && val > 200000 && val < 210000) {
                    const s = String(val)
                    return `${s.substring(0, 4)}-${s.substring(4, 6)}-01`
                }
                if (typeof val === 'string' && /^\d{6}$/.test(val)) {
                    return `${val.substring(0, 4)}-${val.substring(4, 6)}-01`
                }
                return String(val)
            }

            const STATUS_MAP: Record<string, string> = {
                'FF': 'Ready FF', 'Ready FF': 'Ready FF', 'Available': 'Available',
                'Verify PD2': 'Verify PD2', 'Defer': 'Defer', 'Family Planning': 'Family Planning',
                'War College': 'War College', 'Joint Lock': 'Joint Lock', 'Hold': 'Hold',
                'Retire': 'Retire', 'Policy': 'Policy', 'List Shift': 'List Shift',
            }

            const newOfficers: Officer[] = []
            for (let i = 1; i < rawRows.length; i++) {
                const row = rawRows[i]
                const rawName = getVal(row, 'name')
                const name = String(rawName || '').trim()
                if (!name) continue

                const rank = String(getVal(row, 'rank') || 'LT')
                const designator = String(getVal(row, 'designator', 'desig') || '1110')
                const currentCommand = String(getVal(row, 'command', 'currentcommand', 'current command') || 'Unassigned')
                const yearGroup = parseInt(String(getVal(row, 'yg', 'year group') || '0')) || 0
                const billet = String(getVal(row, 'btitle', 'billet') || '')
                const csr = String(getVal(row, 'csr') || '')
                const assignedSlate = String(getVal(row, 'slate', 'assigned slate', 'look') || '')
                const listShift = String(getVal(row, 'list shift') || '')
                const prdRaw = getVal(row, 'prd')
                const prd = prdRaw ? parseDate(prdRaw) : 'Unknown'
                const statusRaw = String(getVal(row, 'status', 'co-a milestone') || 'Available')
                const status = (STATUS_MAP[statusRaw] || statusRaw || 'Available') as any

                const priorityVal = getVal(row, 'h/p', 'priority')
                let preferencePriority: 'Homeport' | 'Platform' | null = null
                if (priorityVal) {
                    const v = String(priorityVal).toUpperCase()
                    if (v.startsWith('H') || v === 'LOCATION' || v === 'HOMEPORT') preferencePriority = 'Homeport'
                    else if (v === 'P' || v === 'PLATFORM') preferencePriority = 'Platform'
                }

                newOfficers.push({
                    id: name.toLowerCase().replace(/[^a-z0-9]/g, '') + '_' + name.length,
                    rank: rank as any, designator: designator as any,
                    name, currentCommand, prd, preferences: [], status, notes: '',
                    yearGroup, billet, csr, assignedSlate,
                    listShift: listShift || undefined, preferencePriority,
                    preferredLocations: ['hp1','hp2','hp3','hp4','hp5']
                        .map(k => getVal(row, k, `location ${k.slice(-1)}`, `loc${k.slice(-1)}`))
                        .map(v => v ? String(v) : '').filter(Boolean),
                    preferredPlatforms: ['p1','p2','p3']
                        .map(k => getVal(row, k, `platform ${k.slice(-1)}`, `plat${k.slice(-1)}`))
                        .map(v => v ? String(v) : '').filter(Boolean),
                })
            }

            if (newOfficers.length === 0) {
                saveError('No officers found — verify the file has a "Name" header row')
                return
            }

            // Merge: update existing officers (preserve status/notes/preferences), add new ones
            const existing = getOfficers()
            const merged = [...existing]
            let added = 0, updated = 0

            newOfficers.forEach(o => {
                const idx = merged.findIndex(e => e.name === o.name)
                if (idx !== -1) {
                    const e = merged[idx]
                    merged[idx] = {
                        ...o, id: e.id, status: e.status, listShift: e.listShift,
                        notes: e.notes || '', preferences: e.preferences || [],
                        preferredLocations: e.preferredLocations?.length ? e.preferredLocations : o.preferredLocations,
                        preferredPlatforms: e.preferredPlatforms?.length ? e.preferredPlatforms : o.preferredPlatforms,
                        preferencePriority: (e.preferencePriority === 'Homeport' || e.preferencePriority === 'Platform') ? e.preferencePriority : o.preferencePriority,
                    }
                    updated++
                } else {
                    merged.push({ ...o, status: 'Available', listShift: '' })
                    added++
                }
            })

            saveOfficers(merged)
            setLocalData(merged)
            notifySuccess(`Import complete — ${added} added, ${updated} updated`)

        } catch (error: any) {
            console.error(error)
            saveError(`Import failed: ${error.message}`)
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    const handleEdit = (officer: Officer) => {
        setEditingOfficer(officer)
        setIsDialogOpen(true)
    }

    const filteredData = localData.filter((officer) => {
        const matchesSearch = officer.name.toLowerCase().includes(search.toLowerCase()) ||
            (officer.currentCommand && officer.currentCommand.toLowerCase().includes(search.toLowerCase())) ||
            (officer.notes && officer.notes.toLowerCase().includes(search.toLowerCase()))

        const matchesRank = rankFilter === "all" || officer.rank === rankFilter

        return matchesSearch && matchesRank
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

        // If it's already in MMMyy format (e.g. "JAN27"), return as-is uppercased
        if (/^[A-Za-z]{3}\d{2}$/.test(dateString.trim())) {
            return dateString.trim().toUpperCase()
        }

        // Parse YYYY-MM-DD directly from the string to avoid UTC timezone shift.
        // Using new Date("2027-01-01") parses as UTC midnight, which in US timezones
        // (UTC-5/6) becomes Dec 31 2026 locally → displays as DEC26 instead of JAN27.
        const isoMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/)
        if (isoMatch) {
            const year = isoMatch[1].slice(-2)
            const monthIdx = parseInt(isoMatch[2], 10) - 1
            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
            return `${monthNames[monthIdx]}${year}`
        }

        return dateString;
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
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#c9a227]/50" />
                    <Input
                        placeholder="Search officers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 bg-[#07111f] border-[#c9a227]/30 text-[#c9a227] placeholder:text-[#8a9bb0] text-xs font-semibold tracking-widest uppercase focus-visible:ring-[#c9a227]/30 focus-visible:border-[#c9a227]/60"
                    />
                </div>
                <Select value={rankFilter} onValueChange={setRankFilter}>
                    <SelectTrigger className="w-[180px] bg-[#07111f] border-[#c9a227]/30 text-[#8a9bb0] text-xs font-semibold tracking-widest uppercase">
                        <SelectValue placeholder="Rank" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Ranks</SelectItem>
                        <SelectItem value="LCDR">LCDR</SelectItem>
                        <SelectItem value="CDR">CDR</SelectItem>
                        <SelectItem value="CAPT">CAPT</SelectItem>
                    </SelectContent>
                </Select>
                <Button className="bg-[#c9a227] text-[#07111f] text-xs font-semibold tracking-widest uppercase hover:bg-[#f0c040] border-transparent transition-all duration-150" onClick={() => {
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
                <Button variant="outline" className="bg-[#07111f] border-[#c9a227]/30 text-[#c9a227] text-xs font-semibold tracking-widest uppercase hover:bg-[#c9a227]/10 hover:text-[#f0c040] transition-all duration-150" onClick={() => fileInputRef.current?.click()}>
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
                                        onClick={() => handleEdit(officer)}
                                    >
                                        {officer.name}
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
                Showing {sortedData.length} of {localData.length} officers
            </div>

            <EditOfficerDialog
                officer={editingOfficer}
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={(updated) => {
                    setLocalData(prev => prev.map(o => o.id === updated.id ? updated : o))
                    onSaveProp?.(updated)
                }}
            />
        </div>
    )
}
