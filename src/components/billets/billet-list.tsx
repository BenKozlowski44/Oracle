"use client"

import { useState } from "react"
import { Billet } from "@/lib/types"
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
import { Search } from "lucide-react"

interface BilletListProps {
    data: Billet[]
}

export function BilletList({ data }: BilletListProps) {
    const [search, setSearch] = useState("")
    const [roleFilter, setRoleFilter] = useState<string>("all")
    const [statusFilter, setStatusFilter] = useState<string>("all")

    const filteredData = data.filter((billet) => {
        const matchesSearch = billet.unitName.toLowerCase().includes(search.toLowerCase()) ||
            billet.location.toLowerCase().includes(search.toLowerCase())
        const matchesRole = roleFilter === "all" || billet.role === roleFilter
        const matchesStatus = statusFilter === "all" || billet.status === statusFilter

        return matchesSearch && matchesRole && matchesStatus
    })

    // Sort by Fill Date (Soonest first)
    const sortedData = [...filteredData].sort((a, b) => new Date(a.fillDate).getTime() - new Date(b.fillDate).getTime())

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Open": return "bg-green-500 hover:bg-green-600"
            case "Pending": return "bg-yellow-500 hover:bg-yellow-600"
            case "Filled": return "bg-gray-500 hover:bg-gray-600"
            default: return "bg-gray-500"
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search commands or locations..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="CO">CO</SelectItem>
                        <SelectItem value="XO">XO</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Filled">Filled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Unit Name</TableHead>
                            <TableHead>UIC</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Fill Date</TableHead>
                            <TableHead>Incumbent</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedData.map((billet) => (
                                <TableRow key={billet.id}>
                                    <TableCell className="font-medium">{billet.unitName}</TableCell>
                                    <TableCell>{billet.uic}</TableCell>
                                    <TableCell>{billet.location}</TableCell>
                                    <TableCell>{billet.role}</TableCell>
                                    <TableCell>{new Date(billet.fillDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{billet.incumbent}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(billet.status)}>
                                            {billet.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="text-sm text-muted-foreground">
                Showing {sortedData.length} of {data.length} billets
            </div>
        </div>
    )
}
