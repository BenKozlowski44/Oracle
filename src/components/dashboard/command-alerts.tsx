import { OracleCommand } from "@/lib/types"
import { AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAllAlerts } from "@/lib/alerts"

interface CommandAlertsProps {
    commands: OracleCommand[]
}

export function CommandAlerts({ commands }: CommandAlertsProps) {
    const allAlerts = getAllAlerts(commands)

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow h-full">
            <div className="p-6 flex flex-col space-y-1.5 border-b">
                <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <h3 className="font-semibold leading-none tracking-tight">Command Issues</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                    {allAlerts.length} commands require attention
                </p>
            </div>
            <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
                {allAlerts.length === 0 ? (
                    <div className="flex items-center justify-center h-20 text-sm text-muted-foreground">
                        No critical issues identified. Good to go!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {allAlerts.map((alert, i) => (
                            <div key={`${alert.id}-${i}`} className="flex items-center justify-between group">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none group-hover:underline">
                                        <Link href="/oracle">{alert.name}</Link>
                                    </p>
                                    <p className="text-xs text-muted-foreground">{alert.issue}</p>
                                </div>
                                <Button variant="ghost" size="sm" asChild className="h-8">
                                    <Link href={`/oracle?search=${alert.name}`}>
                                        Fix <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
