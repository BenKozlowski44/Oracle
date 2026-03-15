import { useParams } from 'react-router-dom'
import { getSlates, getOfficers, getOracleData } from '@/services/storage'
import { SlateDetailClient } from './_detail-client'

export default function SlateDetailPage() {
    const { id } = useParams<{ id: string }>()
    const allSlates = getSlates()
    const officers = getOfficers()
    const oracleData = getOracleData()

    if (!id) return <div className="p-4 text-muted-foreground">Slate not found.</div>

    return (
        <SlateDetailClient
            id={id}
            allSlates={allSlates}
            officers={officers}
            oracleData={oracleData}
        />
    )
}
