import { OfficerTable } from "@/components/officers/officer-table"
import { getOfficers } from '@/services/storage'


export default function PCCPage() {
    const pccOfficers = getOfficers().filter(o => o.status === "PCC")

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Post-Command Commanders (PCC)</h1>
                <p className="text-muted-foreground">
                    Officers who have completed their command tours.
                </p>
            </div>
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    Tracking {pccOfficers.length} officers.
                </p>
                <OfficerTable data={pccOfficers} variant="pcc" />
            </div>
        </div>
    )
}
