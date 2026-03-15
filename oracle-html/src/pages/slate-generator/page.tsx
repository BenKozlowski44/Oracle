// Server Component
import { getOracleData } from '@/services/storage'
import { SlateGeneratorClient } from "./_generator-client"


export default function SlateGeneratorPage() {
    const oracleData = getOracleData()
    return <SlateGeneratorClient oracleData={oracleData} />
}
