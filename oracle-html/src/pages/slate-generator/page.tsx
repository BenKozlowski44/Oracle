import { SlateGeneratorClient } from './_generator-client'
import { getOracleData } from '@/services/storage'

export default function SlateGeneratorPage() {
    const oracleData = getOracleData()
    return <SlateGeneratorClient oracleData={oracleData} />
}
