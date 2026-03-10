import { Suspense } from "react"
import { OfficerTable } from "@/components/officers/officer-table"
import { getOfficers } from "@/lib/data"

export default function OfficersPage() {
    const officers = getOfficers()
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Officer Roster</h1>
                <p className="text-muted-foreground">
                    Manage and view O-5 Command Eligible Officers.
                </p>
            </div>
            <Suspense fallback={<div className="text-muted-foreground text-sm p-4">Loading officers...</div>}>
                <OfficerTable data={officers} />
            </Suspense>
        </div>
    )
}
