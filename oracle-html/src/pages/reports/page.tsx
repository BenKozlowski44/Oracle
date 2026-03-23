import { getSlates, getOracleData, getOfficers, getBoards } from '@/services/storage'
import type { Officer } from "@/lib/types"
import { ReportsClient } from "@/components/reports/reports-client"


export default function ReportsPage() {
    const slates = getSlates()
    const oracleData = getOracleData()
    const currentOfficers = getOfficers()
    const boards = getBoards()
    return <ReportsClient officers={currentOfficers} slates={slates} oracleData={oracleData} boards={boards as any} />
}
