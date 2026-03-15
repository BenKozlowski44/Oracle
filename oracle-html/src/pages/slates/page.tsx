// Server Component — reads fresh slates on every navigation
import { getSlates } from '@/services/storage'
import { SlatesPageClient } from "./_slates-client"


export default function ActiveSlatesPage() {
    const allSlates = getSlates()
    return <SlatesPageClient allSlates={allSlates} />
}
