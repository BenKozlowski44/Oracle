import { PageHeader } from '@/components/PageHeader'
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

const CosmMap = dynamic(() => import("@/components/oracle/cosm-map"), {
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
    const [showCoSM, setShowCoSM] = useState(false)

    // Unique locations from CO-SM commands only (for the CO-SM map)
    const coSMLocations = Array.from(
        new Set(
            initialOracleData
                .filter(cmd => cmd.tags?.includes("CO-SM"))
                .map(cmd => cmd.location)
                .filter(Boolean)
        )
    )

    return (
        <div className="space-y-6">
            <div>
                <PageHeader
                    label="PERS-41 · Command Management"
                    title="The Oracle"
                />
                <p className="text-muted-foreground">Command Succession Management & Tracking.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        {showCoSM ? "CO-SM Global Laydown" : "Global Fleet Laydown"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ErrorBoundary fallback={
                        <Alert><AlertDescription>Map visualization temporarily unavailable. Using table view below.</AlertDescription></Alert>
                    }>
                        {showCoSM ? (
                            <CosmMap
                                locations={coSMLocations}
                                onLocationSelect={setSelectedLocation}
                                selectedLocation={selectedLocation}
                            />
                        ) : (
                            <OracleMap onLocationSelect={setSelectedLocation} selectedLocation={selectedLocation} />
                        )}
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
                    showCoSM={showCoSM}
                    onToggleView={setShowCoSM}
                />
            </Suspense>
        </div>
    )
}
