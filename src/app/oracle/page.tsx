// Server Component
import { getOracleData, getOfficers } from "@/lib/data"
import { OraclePageClient } from "./_oracle-client"

export const dynamic = 'force-dynamic'

export default async function OraclePage() {
    const oracleData = getOracleData()
    const officers = getOfficers()
    return <OraclePageClient initialOracleData={oracleData} initialOfficers={officers} />
}
