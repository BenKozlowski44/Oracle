import { useState } from "react"

import { getAllPersonnelAlerts } from "@/lib/alerts"
import { Officer } from "@/lib/types"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { EditOfficerDialog } from "@/components/officers/edit-officer-dialog"

interface MissingInputsReportProps {
    officers: Officer[]
}

export function MissingInputsReport({ officers }: MissingInputsReportProps) {
    const [search, setSearch] = useState("")
    const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null)

    // Calculate alerts to find missing data
    const alerts = getAllPersonnelAlerts(officers)

    // Get unique officers who have at least one alert
    // Officer IDs may contain underscores, so we carefully remove the "_screened" suffix
    const missingDataOfficerIds = Array.from(new Set(alerts.map(a => {
        return a.id.endsWith("_screened") ? a.id.replace("_screened", "") : a.id;
    })))

    // Map IDs to full officer objects and filter by search
    const filteredOfficers = missingDataOfficerIds
        .map(id => officers.find(o => o.id === id))
        .filter((o): o is Officer => {
            if (!o) return false
            const matchesSearch = o.name.toLowerCase().includes(search.toLowerCase()) ||
                o.designator.includes(search)
            return matchesSearch
        })

    const getOfficerIssues = (id: string) => {
        return alerts.filter(a => a.id.startsWith(id)).map(a => a.issue)
    }

    const isCosm = (o: Officer) => {
        return o.screened?.includes("CO-SM") || o.listShift === "CO-SM"
    }

    const handleEdit = (officer: Officer) => {
        setEditingOfficer(officer)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between print:hidden">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-red-600">Missing Inputs Report</h1>
                    <p className="text-muted-foreground">
                        Officers missing preferences or primary screening information.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or designator..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Officer Name</TableHead>
                            <TableHead>Rank</TableHead>
                            <TableHead>Designator</TableHead>
                            <TableHead>Bank Type</TableHead>
                            <TableHead>Missing Fields</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOfficers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                    No officers with missing inputs found. Great job!
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredOfficers.map((officer) => (
                                <TableRow key={officer.id}>
                                    <TableCell
                                        className="font-medium cursor-pointer hover:underline text-primary"
                                        onClick={() => handleEdit(officer)}
                                    >
                                        {officer.name}
                                    </TableCell>
                                    <TableCell>{officer.rank}</TableCell>
                                    <TableCell>{officer.designator}</TableCell>
                                    <TableCell>
                                        {isCosm(officer) ? (
                                            <Badge variant="outline" className="bg-blue-50">CO-SM</Badge>
                                        ) : (
                                            <Badge variant="outline">Standard</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            {getOfficerIssues(officer.id).map((issue, i) => (
                                                <span key={i} className="text-red-500 text-xs font-medium">
                                                    • {issue}
                                                </span>
                                            ))}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="text-sm text-muted-foreground">
                Showing {filteredOfficers.length} officers with missing data
            </div>

            <EditOfficerDialog
                officer={editingOfficer}
                open={!!editingOfficer}
                onOpenChange={(open) => {
                    if (!open) setEditingOfficer(null)
                }}
            />
        </div>
    )
}
