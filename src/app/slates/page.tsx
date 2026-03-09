// Server Component — reads fresh slates on every navigation
import { getSlates } from "@/lib/data"
import { SlatesPageClient } from "./_slates-client"

export const dynamic = 'force-dynamic'

export default async function ActiveSlatesPage() {
    const allSlates = getSlates()
    return <SlatesPageClient allSlates={allSlates} />
}
