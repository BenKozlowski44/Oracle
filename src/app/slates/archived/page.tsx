// Server Component — reads fresh data on every navigation
import { getSlates } from "@/lib/data"
import { ArchivedSlatesClient } from "./_archived-client"

export const dynamic = 'force-dynamic'

export default async function ArchivedSlatesPage() {
    const allSlates = getSlates()
    return <ArchivedSlatesClient allSlates={allSlates} />
}
