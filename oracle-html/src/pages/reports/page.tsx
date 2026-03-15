import { getSlates, getOracleData } from '@/services/storage'
import type { Officer } from "@/lib/types"
import { readJson } from '@/services/storage'
import { ReportsClient } from "@/components/reports/reports-client"


export default function ReportsPage() {
    const slates = getSlates()
    const oracleData = getOracleData()
    const currentOfficers = readJson<Officer[]>('officers.json')
    return <ReportsClient officers={currentOfficers} slates={slates} oracleData={oracleData} />
}
