import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Tools | Command Center",
    description: "Utility tools and advanced features for the Oracle dataset.",
}

export default function ToolsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Tools</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Placeholder for future tools */}
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="font-semibold leading-none tracking-tight">Tool Canvas</h3>
                        <p className="text-sm text-muted-foreground">Ready for your new utilities.</p>
                    </div>
                    <div className="p-6 pt-0">
                        <p className="text-sm text-muted-foreground">
                            This space will host automated scripts, data generation tools, or specialized calculators.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
