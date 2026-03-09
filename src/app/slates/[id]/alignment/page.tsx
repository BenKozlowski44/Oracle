// Server Component — reads fresh data on every navigation
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getSlates, getOfficers, getOracleData } from "@/lib/data"
import { AlignmentMatrixReport } from "@/components/reports/alignment-matrix"

interface AlignmentPageProps {
    params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'

export default async function AlignmentPage({ params }: AlignmentPageProps) {
    const { id } = await params
    const slates = getSlates()
    const slate = slates.find(s => s.id === id)

    if (!slate) {
        return <div className="p-8 text-center text-muted-foreground">Slate not found</div>
    }

    const officers = getOfficers()
    const oracleData = getOracleData()

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 border-b pb-4">
                <Link href={`/slates/${id}`}>
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Return to {slate.name}</h1>
                </div>
            </div>

            <div className="animate-in fade-in duration-300 pt-4">
                <AlignmentMatrixReport
                    slateId={id}
                    slate={slate}
                    officers={officers}
                    oracleData={oracleData}
                />
            </div>
        </div>
    )
}
