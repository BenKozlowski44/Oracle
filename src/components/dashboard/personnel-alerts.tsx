"use client"

import { useState } from "react"
import { Officer } from "@/lib/types"
import { UserX, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllPersonnelAlerts } from "@/lib/alerts"
import { EditOfficerDialog } from "@/components/officers/edit-officer-dialog"

interface PersonnelAlertsProps {
    officers: Officer[]
}

export function PersonnelAlerts({ officers }: PersonnelAlertsProps) {
    const allAlerts = getAllPersonnelAlerts(officers)
    const [selectedOfficer, setSelectedOfficer] = useState<Officer | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleEditClick = (alertName: string) => {
        const fullOfficer = officers.find(o => o.name === alertName)
        if (fullOfficer) {
            setSelectedOfficer(fullOfficer)
            setIsDialogOpen(true)
        }
    }

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow h-full flex flex-col">
            <div className="p-6 flex flex-col space-y-1.5 border-b shrink-0">
                <div className="flex items-center gap-2">
                    <UserX className="h-5 w-5 text-destructive" />
                    <h3 className="font-semibold leading-none tracking-tight">Personnel Issues</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                    {allAlerts.length} personnel require attention
                </p>
            </div>
            <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto flex-1">
                {allAlerts.length === 0 ? (
                    <div className="flex items-center justify-center h-20 text-sm text-muted-foreground">
                        No critical issues identified. Good to go!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {allAlerts.map((alert, i) => (
                            <div key={`${alert.id}-${i}`} className="flex items-center justify-between group">
                                <div className="space-y-1">
                                    <button
                                        className="text-sm font-medium leading-none group-hover:underline text-left"
                                        onClick={() => handleEditClick(alert.name)}
                                    >
                                        {alert.name}
                                    </button>
                                    <p className="text-xs text-muted-foreground">{alert.issue}</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 group-hover:bg-muted"
                                    onClick={() => handleEditClick(alert.name)}
                                >
                                    Fix <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <EditOfficerDialog
                officer={selectedOfficer}
                open={isDialogOpen}
                onOpenChange={(open) => {
                    setIsDialogOpen(open)
                    if (!open) setSelectedOfficer(null)
                }}
            />
        </div>
    )
}
