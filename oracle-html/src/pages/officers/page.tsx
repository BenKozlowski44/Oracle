import { OfficerTable } from "@/components/officers/officer-table"
import { getOfficers } from '@/services/storage'

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
            <OfficerTable data={officers} />
        </div>
    )
}
