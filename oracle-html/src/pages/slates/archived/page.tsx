// Server Component — reads fresh data on every navigation
import { getSlates } from '@/services/storage'
import { ArchivedSlatesClient } from "./_archived-client"


export default function ArchivedSlatesPage() {
    const allSlates = getSlates()
    return <ArchivedSlatesClient allSlates={allSlates} />
}
