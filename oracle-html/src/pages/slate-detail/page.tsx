// Server Component — reads fresh data on every navigation
import { getSlates, getOfficers, getOracleData } from '@/services/storage'
import { SlateDetailClient } from "./_detail-client"

interface SlateDetailPageProps {
    params: Promise<{ id: string }>
}


export default function SlateDetailPage({ params }: SlateDetailPageProps) {
    const { id } = useParams<{ id: string }>()
    if (!id) return null
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
