import { useState, Suspense } from "react"
import dynamic from 'next/dynamic'
import { OracleTable } from "@/components/oracle/oracle-table"
import type { OracleCommand, Officer } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

const OracleMap = dynamic(() => import("@/components/oracle/oracle-map"), {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[400px] rounded-md" />
})

interface OraclePageClientProps {
    initialOracleData: OracleCommand[]
    initialOfficers: Officer[]
}

export function OraclePageClient({ initialOracleData, initialOfficers }: OraclePageClientProps) {
    const [selectedLocation, setSelectedLocation] = useState<string>("All")
    const [officers, setOfficers] = useState(initialOfficers)

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">The Oracle</h1>
                <p className="text-muted-foreground">Command Succession Management & Tracking.</p>
            </div>

            <Card>
                <CardHeader><CardTitle>Global Fleet Laydown</CardTitle></CardHeader>
                <CardContent>
                    <ErrorBoundary fallback={
                        <Alert><AlertDescription>Map visualization temporarily unavailable. Using table view below.</AlertDescription></Alert>
                    }>
                        <OracleMap onLocationSelect={setSelectedLocation} selectedLocation={selectedLocation} />
                    </ErrorBoundary>
                </CardContent>
            </Card>

            <Suspense fallback={<div>Loading Oracle Table...</div>}>
                <OracleTable
                    data={initialOracleData}
                    selectedLocation={selectedLocation}
                    onLocationChange={setSelectedLocation}
                    officers={officers}
                    setOfficers={setOfficers}
                />
            </Suspense>
        </div>
    )
}
