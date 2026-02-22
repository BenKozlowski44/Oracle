import { TheBank } from "@/components/bank/the-bank"
import { officers } from "@/lib/data"

export default function BankPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">The Bank</h1>
                <p className="text-muted-foreground">
                    Master Talent Inventory (Slated & Unslated).
                </p>
            </div>
            <TheBank data={officers} />
        </div>
    )
}
