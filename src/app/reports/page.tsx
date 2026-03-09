import { getSlates, getOracleData } from "@/lib/data"
import type { Officer } from "@/lib/types"
import { readJson } from "@/services/data-service"
import { ReportsClient } from "@/components/reports/reports-client"

export const dynamic = 'force-dynamic'

export default async function ReportsPage() {
    const slates = getSlates()
    const oracleData = getOracleData()
    const currentOfficers = readJson<Officer[]>('officers.json')
    return <ReportsClient officers={currentOfficers} slates={slates} oracleData={oracleData} />
}
