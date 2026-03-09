// Server Component — reads fresh slates on every navigation
import { getSlates, getOfficers, getOracleData } from "@/lib/data"
import { SlatesPageClient } from "./_slates-client"

export const dynamic = 'force-dynamic'

export default async function ActiveSlatesPage() {
    const allSlates = getSlates()
    const officers = getOfficers()
    const oracleData = getOracleData()
    return (
        <SlatesPageClient
            allSlates={allSlates}
            officers={officers}
            oracleData={oracleData}
        />
    )
}
