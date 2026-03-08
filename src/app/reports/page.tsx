import { slates } from "@/lib/data"
import { Officer } from "@/lib/types"
import { readJson } from "@/services/data-service"
import { ReportsClient } from "@/components/reports/reports-client"

export const dynamic = 'force-dynamic'

export default async function ReportsPage() {
    const currentOfficers = readJson<Officer[]>('officers.json')
    return <ReportsClient officers={currentOfficers} slates={slates} />
}
