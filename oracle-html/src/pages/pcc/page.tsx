import { OfficerTable } from "@/components/officers/officer-table"
import { PageHeader } from '@/components/PageHeader'
import { getOfficers } from '@/services/storage'


export default function PCCPage() {
    const pccOfficers = getOfficers().filter(o => o.status === "PCC")

    return (
        <div className="space-y-6">
            <PageHeader
                label="PERS-41 · Post-Command"
                title="Post-Command Commanders"
                description="Officers who have completed their command tours."
            />
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    Tracking {pccOfficers.length} officers.
                </p>
                <OfficerTable data={pccOfficers} variant="pcc" />
            </div>
        </div>
    )
}
