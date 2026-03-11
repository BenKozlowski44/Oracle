"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Edit2, MapPin, Anchor, ClipboardList, FileText, Trash2 } from "lucide-react"
import { Officer } from "@/lib/types"
import { EditOfficerDialog } from "./edit-officer-dialog"
import { formatToMMMyy } from "@/lib/utils"
import { saveError, notifySuccess } from "@/lib/notify"

interface OfficerDetailSheetProps {
    officer: Officer | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

function Field({ label, value }: { label: string; value?: React.ReactNode }) {
    if (!value || value === "-") return null
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-muted-foreground uppercase tracking-wide">{label}</span>
            <span className="text-sm font-medium">{value}</span>
        </div>
    )
}

const STATUS_COLORS: Record<string, string> = {
    "Available": "bg-green-500 text-white",
    "Verify PD2": "bg-green-500 text-white",
    "Slated": "bg-blue-500 text-white",
    "Ready FF": "bg-blue-500 text-white",
    "Defer": "bg-yellow-500 text-white",
    "Family Planning": "bg-yellow-500 text-white",
    "Hold": "bg-red-500 text-white",
    "List Shift": "bg-red-500 text-white",
    "De-screened": "bg-red-500 text-white",
    "Declined": "bg-red-500 text-white",
    "No Opportunity": "bg-orange-500 text-white",
    "Retire": "bg-red-500 text-white",
    "Policy": "bg-red-500 text-white",
    "Joint Lock": "bg-purple-500 text-white",
    "War College": "bg-orange-500 text-white",
    "PCC": "bg-green-500 text-white",
}

export function OfficerDetailSheet({ officer, open, onOpenChange }: OfficerDetailSheetProps) {
    const [editOpen, setEditOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        if (!officer) return
        setDeleting(true)
        try {
            const res = await fetch('/api/delete-officer', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: officer.id }),
            })
            if (!res.ok) throw new Error()
            notifySuccess(`${officer.name} removed from bank`)
            onOpenChange(false)
            router.refresh()
        } catch {
            saveError(`Failed to delete ${officer.name}`)
        } finally {
            setDeleting(false)
        }
    }

    if (!officer) return null

    const isCosm = officer.screened?.includes("CO-SM") || officer.listShift === "CO-SM"
    const hasLocations = (officer.preferredLocations?.filter(l => l?.trim()).length ?? 0) > 0
    const hasPlatforms = (officer.preferredPlatforms?.filter(p => p?.trim()).length ?? 0) > 0
    const hasCosmPrefs = (officer.cosmPreferences?.filter(p => p?.trim()).length ?? 0) > 0
    const hasPrefs = isCosm ? hasCosmPrefs : (hasLocations || hasPlatforms)

    return (
        <>
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent className="w-full sm:max-w-[480px] overflow-y-auto flex flex-col gap-0 p-0">
                    {/* Header */}
                    <SheetHeader className="px-6 pt-6 pb-4 border-b bg-muted/30">
                        <SheetTitle className="text-lg font-bold leading-tight">{officer.name}</SheetTitle>
                        <div className="flex items-center gap-2 flex-wrap pt-1">
                            <Badge className={STATUS_COLORS[officer.status] ?? "bg-gray-500 text-white"}>
                                {officer.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{officer.rank} · {officer.designator}</span>
                        </div>
                    </SheetHeader>

                    {/* Body */}
                    <div className="px-6 py-5 space-y-5 flex-1">

                        {/* Identification */}
                        <section className="space-y-3">
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Identification</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Year Group" value={officer.yearGroup ? String(officer.yearGroup) : undefined} />
                                <Field label="CSR" value={officer.csr} />
                                <Field label="PRD" value={formatToMMMyy(officer.prd)} />
                                <Field label="Designator" value={officer.designator} />
                            </div>
                        </section>

                        {/* Assignment */}
                        <section className="space-y-3 border-t pt-4">
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Current Assignment</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Command" value={officer.currentCommand} />
                                <Field label="Billet" value={officer.billet} />
                            </div>
                        </section>

                        {/* Slate Info */}
                        {(officer.assignedSlate || officer.tentativeSlate) && (
                            <section className="space-y-3 border-t pt-4">
                                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Slate</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="Screened" value={officer.assignedSlate} />
                                    <Field label="Tentative" value={officer.tentativeSlate} />
                                </div>
                            </section>
                        )}

                        {/* Preferences */}
                        <section className="space-y-3 border-t pt-4">
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                Preferences
                                {!hasPrefs && <span className="ml-2 text-muted-foreground normal-case font-normal">(none set)</span>}
                            </h4>
                            {isCosm ? (
                                hasCosmPrefs ? (
                                    <div className="space-y-1">
                                        {officer.cosmPreferences?.map((pref, i) =>
                                            pref?.trim() ? (
                                                <div key={i} className="flex gap-2 text-sm">
                                                    <span className="text-muted-foreground w-5 text-right shrink-0">{i + 1}.</span>
                                                    <span>{pref}</span>
                                                </div>
                                            ) : null
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground italic">No CO-SM preferences set</p>
                                )
                            ) : (
                                <div className="space-y-3">
                                    {officer.preferencePriority && (
                                        <div className="inline-flex items-center gap-1.5 text-xs bg-muted px-2 py-1 rounded">
                                            <ClipboardList className="h-3 w-3" />
                                            Priority: <strong>{officer.preferencePriority}</strong>
                                        </div>
                                    )}
                                    {hasLocations && (
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                                                <MapPin className="h-3 w-3" /> Homeports
                                            </div>
                                            {officer.preferredLocations?.filter(l => l?.trim()).map((loc, i) => (
                                                <div key={i} className="flex gap-2 text-sm">
                                                    <span className="text-muted-foreground w-4 text-right">{i + 1}.</span>
                                                    <span>{loc}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {hasPlatforms && (
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                                                <Anchor className="h-3 w-3" /> Platforms
                                            </div>
                                            {officer.preferredPlatforms?.filter(p => p?.trim()).map((plat, i) => (
                                                <div key={i} className="flex gap-2 text-sm">
                                                    <span className="text-muted-foreground w-4 text-right">{i + 1}.</span>
                                                    <span>{plat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </section>

                        {/* Notes */}
                        {officer.notes?.trim() && (
                            <section className="space-y-2 border-t pt-4">
                                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                                    <FileText className="h-3 w-3" /> Notes
                                </h4>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{officer.notes}</p>
                            </section>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t bg-muted/20 flex items-center justify-between">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" disabled={deleting}>
                                    <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Remove officer from bank?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently remove <strong>{officer.name}</strong> from the officer bank.
                                        This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleDelete}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                        Yes, remove officer
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <Button onClick={() => setEditOpen(true)} size="sm">
                            <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                            Edit Officer
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>

            <EditOfficerDialog
                officer={editOpen ? officer : null}
                open={editOpen}
                onOpenChange={setEditOpen}
            />
        </>
    )
}
