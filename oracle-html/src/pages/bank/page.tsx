import { Suspense } from "react"
import { PageHeader } from '@/components/PageHeader'
import { TheBank } from "@/components/bank/the-bank"
import { getOfficers } from '@/services/storage'

export default function BankPage() {
    const officers = getOfficers()
    return (
        <div className="space-y-6">
            <PageHeader
                label="PERS-41 · Talent Management"
                title="The Bank"
                description="Master Talent Inventory (Slated &amp; Unslated)."
            />
            <Suspense fallback={<div>Loading Bank...</div>}>
                <TheBank data={officers} />
            </Suspense>
        </div>
    )
}
