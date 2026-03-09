// Server Component
import { getOracleData } from "@/lib/data"
import { SlateGeneratorClient } from "./_generator-client"

export const dynamic = 'force-dynamic'

export default async function SlateGeneratorPage() {
    const oracleData = getOracleData()
    return <SlateGeneratorClient oracleData={oracleData} />
}
