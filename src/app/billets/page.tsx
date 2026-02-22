import { BilletList } from "@/components/billets/billet-list"
import { billets } from "@/lib/data"

export default function BilletsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Command Billets</h1>
                <p className="text-muted-foreground">
                    View and manage open O-5 Command and XO positions.
                </p>
            </div>
            <BilletList data={billets} />
        </div>
    )
}
