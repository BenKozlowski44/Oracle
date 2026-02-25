"use client"

import { useState, useEffect } from "react"
import { Officer, Rank, Designator } from "@/lib/types"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

interface EditOfficerDialogProps {
    officer: Officer | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function EditOfficerDialog({ officer, open, onOpenChange }: EditOfficerDialogProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<Partial<Officer>>({})

    // Initialize form when officer changes
    useEffect(() => {
        if (officer) {
            setFormData({ ...officer })
        }
    }, [officer])

    const handleChange = (field: keyof Officer, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!officer) return

        setLoading(true)
        try {
            // Determine if create or update
            const isNew = !officer.id;
            const endpoint = isNew ? '/api/create-officer' : '/api/update-officer';


            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            })

            if (!res.ok) throw new Error(isNew ? "Failed to create officer" : "Failed to update officer")

            router.refresh()
            onOpenChange(false)
        } catch (error) {
            console.error(error)
            alert("Failed to save changes")
        } finally {
            setLoading(false)
        }
    }

    if (!officer) return null

    const isCosm = formData.screened?.includes("CO-SM") || formData.listShift === "CO-SM";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Edit Officer: {officer.name}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={formData.name || ""}
                                onChange={(e) => handleChange("name", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rank">Rank</Label>
                            <Select
                                value={formData.rank}
                                onValueChange={(v) => handleChange("rank", v)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Rank" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="LCDR">LCDR</SelectItem>
                                    <SelectItem value="CDR">CDR</SelectItem>
                                    <SelectItem value="CAPT">CAPT</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="designator">Designator</Label>
                            <Input
                                id="designator"
                                value={formData.designator || ""}
                                onChange={(e) => handleChange("designator", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="yearGroup">Year Group</Label>
                            <Input
                                id="yearGroup"
                                type="number"
                                value={formData.yearGroup || 0}
                                onChange={(e) => handleChange("yearGroup", parseInt(e.target.value))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="currentCommand">Current Command</Label>
                            <Input
                                id="currentCommand"
                                value={formData.currentCommand || ""}
                                onChange={(e) => handleChange("currentCommand", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="billet">Billet</Label>
                            <Input
                                id="billet"
                                value={formData.billet || ""}
                                onChange={(e) => handleChange("billet", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="assignedSlate">Screened</Label>
                            <Input
                                id="assignedSlate"
                                value={formData.assignedSlate || ""}
                                onChange={(e) => handleChange("assignedSlate", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="csr">CSR</Label>
                            <Input
                                id="csr"
                                value={formData.csr || ""}
                                onChange={(e) => handleChange("csr", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="prd">PRD (YYYY-MM-DD)</Label>
                            <Input
                                id="prd"
                                value={formData.prd || ""}
                                onChange={(e) => handleChange("prd", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(v) => handleChange("status", v)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Available">Available</SelectItem>
                                    <SelectItem value="Verify PD2">Verify PD2</SelectItem>
                                    <SelectItem value="Slated">Slated</SelectItem>
                                    <SelectItem value="Defer">Defer</SelectItem>
                                    <SelectItem value="Ready FF">Ready FF</SelectItem>
                                    <SelectItem value="Joint Lock">Joint Lock</SelectItem>
                                    <SelectItem value="War College">War College</SelectItem>
                                    <SelectItem value="Family Planning">Family Planning</SelectItem>
                                    <SelectItem value="List Shift">List Shift</SelectItem>
                                    <SelectItem value="PCC">PCC</SelectItem>
                                    <SelectItem value="Hold">Hold</SelectItem>
                                    <SelectItem value="Retire">Retire</SelectItem>
                                    <SelectItem value="Policy">Policy</SelectItem>
                                    <SelectItem value="Declined">Declined</SelectItem>
                                    <SelectItem value="No Opportunity">No Opportunity</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tentative">Tentative Slate</Label>
                            <Input
                                id="tentative"
                                value={formData.tentativeSlate || ""}
                                onChange={(e) => handleChange("tentativeSlate", e.target.value)}
                                placeholder="e.g. FY26-1"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <Label>Bank Tab Assignment</Label>
                        <Select
                            value={formData.listShift || "Bank"}
                            onValueChange={(v) => handleChange("listShift", v === "Bank" ? "" : v)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Assign to Tab..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Bank">Officer Bank</SelectItem>
                                <SelectItem value="Firefighters">Firefighters</SelectItem>
                                <SelectItem value="Slated">Slated</SelectItem>
                                <SelectItem value="CO-SM">CO-SM</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">Moving an officer via this dropdown updates their Tab assignment directly, saving to the List Shift column in Excel without altering their official Status.</p>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <h3 className="font-medium">Detailed Preferences</h3>

                        {isCosm ? (
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">CO-SM officers require 15 specific ranked preferences.</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {Array.from({ length: 15 }).map((_, i) => (
                                        <div key={`cosm-pref-${i}`} className="space-y-2">
                                            <Label>Choice {i + 1}</Label>
                                            <Input
                                                value={formData.cosmPreferences?.[i] || ""}
                                                onChange={(e) => {
                                                    const newPrefs = [...(formData.cosmPreferences || [])];
                                                    // Ensure array is large enough
                                                    while (newPrefs.length <= i) newPrefs.push("");
                                                    newPrefs[i] = e.target.value;
                                                    handleChange("cosmPreferences", newPrefs);
                                                }}
                                                placeholder={`Preference ${i + 1}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <Label>Priority</Label>
                                    <Select
                                        value={formData.preferencePriority || ""}
                                        onValueChange={(v) => handleChange("preferencePriority", v === "null" ? null : v)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="null">None</SelectItem>
                                            <SelectItem value="Homeport">Homeport</SelectItem>
                                            <SelectItem value="Platform">Platform</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Preferred Locations (In Order)</Label>
                                        {[0, 1, 2, 3, 4].map((index) => (
                                            <Input
                                                key={`loc-${index}`}
                                                placeholder={`Location ${index + 1}`}
                                                value={formData.preferredLocations?.[index] || ""}
                                                onChange={(e) => {
                                                    const newLocs = [...(formData.preferredLocations || [])];
                                                    newLocs[index] = e.target.value;
                                                    handleChange("preferredLocations", newLocs);
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Preferred Platforms (In Order)</Label>
                                        {[0, 1, 2].map((index) => (
                                            <Input
                                                key={`plat-${index}`}
                                                placeholder={`Platform ${index + 1}`}
                                                value={formData.preferredPlatforms?.[index] || ""}
                                                onChange={(e) => {
                                                    const newPlats = [...(formData.preferredPlatforms || [])];
                                                    newPlats[index] = e.target.value;
                                                    handleChange("preferredPlatforms", newPlats);
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            value={formData.notes || ""}
                            onChange={(e) => handleChange("notes", e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
