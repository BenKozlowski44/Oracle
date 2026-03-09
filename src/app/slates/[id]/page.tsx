// Server Component — reads fresh data on every navigation
import { getSlates, getOfficers, getOracleData } from "@/lib/data"
import { SlateDetailClient } from "./_detail-client"

interface SlateDetailPageProps {
    params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'

export default async function SlateDetailPage({ params }: SlateDetailPageProps) {
    const { id } = await params
    const allSlates = getSlates()
    const officers = getOfficers()
    const oracleData = getOracleData()

    return (
        <SlateDetailClient
            id={id}
            allSlates={allSlates}
            officers={officers}
            oracleData={oracleData}
        />
    )
}
