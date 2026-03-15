// Server Component
import { getOracleData, getOfficers } from '@/services/storage'
import { OraclePageClient } from "./_oracle-client"


export default function OraclePage() {
    const oracleData = getOracleData()
    const officers = getOfficers()
    return <OraclePageClient initialOracleData={oracleData} initialOfficers={officers} />
}
