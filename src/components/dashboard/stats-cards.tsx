"use client"

import { Officer, Billet, OracleCommand, Metrics } from "@/lib/types"
import { getAllAlerts, getAllPersonnelAlerts } from "@/lib/alerts"

export function CommandInventoryCard({ oracleData }: { oracleData: OracleCommand[] }) {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex flex-col space-y-1.5">
                <h3 className="tracking-tight text-sm font-medium text-muted-foreground text-center">Command Inventory</h3>
                <div className="flex justify-between items-baseline px-4">
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold">{oracleData.length - oracleData.filter(c => c.tags?.includes("CO-SM")).length}</span>
                        <span className="text-[10px] text-muted-foreground uppercase">CDR CMD</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold">{oracleData.filter(c => c.tags?.includes("CO-SM")).length}</span>
                        <span className="text-[10px] text-muted-foreground uppercase">CO-SM</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function BankOfficersCard({ officers }: { officers: Officer[] }) {
    // Filter out PCCs and Slated officers as requested, AND CO-SM screened (mutually exclusive)
    const validOfficers = officers.filter(o =>
        o.status !== "PCC" &&
        o.status !== "Slated" &&
        o.listShift !== "Slated" &&
        o.status !== "Declined" &&
        o.status !== "No Opportunity" &&
        !o.screened?.includes("CO-SM")
    )
    const totalCount = validOfficers.length

    const statusCounts = validOfficers.reduce((acc, curr) => {
        const status = curr.status || "Unknown"
        acc[status] = (acc[status] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Available": return "bg-green-500"
            case "Joint Lock": return "bg-purple-500"
            case "War College": return "bg-orange-500"
            case "Family Planning": return "bg-yellow-500"
            case "List Shift": return "bg-red-500"
            case "Retire": return "bg-red-500"
            case "Policy": return "bg-red-500"
            case "Slated": return "bg-blue-500"
            case "Defer": return "bg-yellow-500"
            case "Hold": return "bg-red-500"
            case "Ready FF": return "bg-blue-500"
            default: return "bg-gray-500"
        }
    }

    const statusOrder: Record<string, number> = {
        "Ready FF": 1,
        "Available": 2,
        "Defer": 3,
        "Family Planning": 4,
        "War College": 5,
        "Joint Lock": 6,
        "Hold": 7,
        "Policy": 98,
        "Retire": 99,
        "List Shift": 8
    }

    // Sort statuses by custom order first, then count
    const sortedStatuses = Object.entries(statusCounts).sort(([statusA], [statusB]) => {
        const orderA = statusOrder[statusA] || 99
        const orderB = statusOrder[statusB] || 99
        return orderA - orderB
    })

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex flex-col space-y-1.5">
                <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Total CDR CMD Bank Officers</h3>
                <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">{totalCount}</span>
                    <span className="text-xs text-muted-foreground">in current pool</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
                    {sortedStatuses.map(([status, count]) => (
                        <div key={status} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
                            <span>{count} {status}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function CosmBankOfficersCard({ officers }: { officers: Officer[] }) {
    // Filter for CO-SM screened, and not PCC/Slated
    const validOfficers = officers.filter(o =>
        o.screened?.includes("CO-SM") &&
        o.status !== "PCC" &&
        o.status !== "Slated" &&
        o.listShift !== "Slated" &&
        o.status !== "Declined" &&
        o.status !== "No Opportunity"
    )
    const totalCount = validOfficers.length

    const available = validOfficers.filter(o => o.status === "Available").length
    const hold = validOfficers.filter(o => o.status === "Hold").length
    const other = totalCount - available - hold

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex flex-col space-y-1.5">
                <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Total CO-SM Bank Officers</h3>
                <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">{totalCount}</span>
                    <span className="text-xs text-muted-foreground">in current pool</span>
                </div>
                <div className="flex gap-2 mt-2 text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span>{available} Avail</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <span>{hold} Hold</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-gray-500" />
                        <span>{other} Other</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function ActiveIssuesCard({ oracleData, officers }: { oracleData: OracleCommand[], officers: Officer[] }) {
    const commandAlertsCount = getAllAlerts(oracleData).length
    const personnelAlertsCount = getAllPersonnelAlerts(officers).length
    const count = commandAlertsCount + personnelAlertsCount
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex flex-col space-y-1.5">
                <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Active Issues</h3>
                <div className="text-2xl font-bold text-red-600">{count}</div>
                <p className="text-xs text-muted-foreground">Requires attention</p>
            </div>
        </div>
    )
}

export function ResolvedIssuesCard({ metrics }: { metrics: Metrics }) {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex flex-col space-y-1.5">
                <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Resolved Issues</h3>
                <div className="text-2xl font-bold text-green-600">{metrics.resolvedConflicts}</div>
                <p className="text-xs text-muted-foreground">Fixed manually</p>
            </div>
        </div>
    )
}

export function FirefighterStatsCard({ officers }: { officers: Officer[] }) {
    const isFirefighter = (o: Officer) => {
        if (o.status === "Slated" || o.listShift === "Slated" || o.status === "Declined" || o.status === "No Opportunity") return false;
        const slate = o.assignedSlate?.toLowerCase() || ""
        return o.status === "Ready FF" ||
            slate.includes("3rd look") ||
            slate.includes("no command")
    }

    const firefighters = officers.filter(isFirefighter)
    const totalCount = firefighters.length

    const statusCounts = firefighters.reduce((acc, curr) => {
        const status = curr.status || "Unknown"
        acc[status] = (acc[status] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Available": return "bg-green-500"
            case "Joint Lock": return "bg-purple-500"
            case "War College": return "bg-orange-500"
            case "Family Planning": return "bg-yellow-500"
            case "List Shift": return "bg-red-500"
            case "Slated": return "bg-blue-500"
            case "Defer": return "bg-yellow-500"
            case "Hold": return "bg-red-500"
            case "Ready FF": return "bg-blue-500"
            default: return "bg-gray-500"
        }
    }

    const statusOrder: Record<string, number> = {
        "Ready FF": 1,
        "Available": 2,
        "Defer": 3,
        "Family Planning": 4,
        "War College": 5,
        "Joint Lock": 6,
        "Hold": 7,
        "List Shift": 8
    }

    // Sort statuses by custom order first, then count
    const sortedStatuses = Object.entries(statusCounts).sort(([statusA], [statusB]) => {
        const orderA = statusOrder[statusA] || 99
        const orderB = statusOrder[statusB] || 99
        return orderA - orderB
    })

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex flex-col space-y-1.5">
                <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Firefighters</h3>
                <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">{totalCount}</span>
                    <span className="text-xs text-muted-foreground">total</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
                    {sortedStatuses.map(([status, count]) => (
                        <div key={status} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
                            <span>{count} {status}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
