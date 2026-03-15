import { getSlates, getOracleData, getOfficers } from '@/services/storage'
import type { Officer } from "@/lib/types"
import { } from '@/services/storage'
import { ReportsClient } from "@/components/reports/reports-client"


export default function ReportsPage() {
    const slates = getSlates()
    const oracleData = getOracleData()
    const currentOfficers = getOfficers()
    return <ReportsClient officers={currentOfficers} slates={slates} oracleData={oracleData} />
}
