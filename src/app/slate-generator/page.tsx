// Server Component
import { getOracleData, getSlates } from "@/lib/data"
import { SlateGeneratorClient } from "./_generator-client"

export const dynamic = 'force-dynamic'

export default async function SlateGeneratorPage() {
    const oracleData = getOracleData()
    const allSlates = getSlates()
    return <SlateGeneratorClient oracleData={oracleData} allSlates={allSlates} />
}
