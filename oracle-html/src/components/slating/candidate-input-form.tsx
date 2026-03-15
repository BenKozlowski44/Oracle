import { useState, useEffect } from "react"
import { SlateCandidateProfile, Officer, OracleCommand } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatToMMMyy } from "@/lib/utils"
import { Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react"

interface CandidateInputFormProps {
    slateId: string
    officer: Officer
    commands: OracleCommand[] // Available commands to choose from
    initialProfile?: SlateCandidateProfile
    onSave: (profile: SlateCandidateProfile) => void
    onCancel: () => void
}

export function CandidateInputForm({
    slateId,
    officer,
    commands,
    initialProfile,
    onSave,
    onCancel
}: CandidateInputFormProps) {
    const [experienceSummary, setExperienceSummary] = useState(initialProfile?.experienceSummary || "")
    const [availabilityDate, setAvailabilityDate] = useState(initialProfile?.availabilityDate || "")
    const [notes, setNotes] = useState(initialProfile?.notes || "")

    // Manage preferences locally
    const [preferences, setPreferences] = useState<{ key: string, rank: number }[]>(
        initialProfile?.preferences || []
    )

    // Derived Preference Options (Platform - Location)
    // We want unique combinations from the available commands
    const preferenceOptions = Array.from(new Set(
        commands.map(c => `${c.platform || "Unknown"} - ${c.location}`)
    )).sort();

    // Sort preferences by rank for display
    const sortedPreferences = [...preferences].sort((a, b) => a.rank - b.rank)

    const handleAddPreference = (key: string) => {
        if (preferences.some(p => p.key === key)) return
        const newRank = preferences.length + 1
        setPreferences([...preferences, { key, rank: newRank }])
    }

    const handleRemovePreference = (key: string) => {
        const remaining = preferences.filter(p => p.key !== key)
        // Re-rank
        const reranked = remaining.map((p, index) => ({ ...p, rank: index + 1 }))
        setPreferences(reranked)
    }

    const movePreference = (index: number, direction: 'up' | 'down') => {
        const newPrefs = [...sortedPreferences]
        if (direction === 'up' && index > 0) {
            [newPrefs[index], newPrefs[index - 1]] = [newPrefs[index - 1], newPrefs[index]]
        } else if (direction === 'down' && index < newPrefs.length - 1) {
            [newPrefs[index], newPrefs[index + 1]] = [newPrefs[index + 1], newPrefs[index]]
        }
        // Re-assign ranks
        const finalized = newPrefs.map((p, i) => ({ ...p, rank: i + 1 }))
        setPreferences(finalized)
    }

    const handleSave = () => {
        const profile: SlateCandidateProfile = {
            id: initialProfile?.id || `prof-${Date.now()}`,
            slateId,
            officerId: officer.id,
            preferences: preferences,
            experienceSummary,
            availabilityDate,
            notes
        }
        onSave(profile)
    }

    // Filter available options (exclude already picked)
    const availableOptions = preferenceOptions.filter(opt => !preferences.some(p => p.key === opt))

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Candidate Profile: {officer.rank} {officer.name}</CardTitle>
                <CardDescription>Input slate-specific details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

                {/* 1. Experience / Document Input */}
                <div className="space-y-2">
                    <Label htmlFor="experience">Experience Summary / Document Highlights</Label>
                    <Textarea
                        id="experience"
                        placeholder="Paste experience summary or document text here..."
                        className="min-h-[100px]"
                        value={experienceSummary}
                        onChange={e => setExperienceSummary(e.target.value)}
                    />
                </div>

                {/* 2. Availability / Training Pipeline */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="availability">Estimated Availability</Label>
                        <Input
                            id="availability"
                            type="date"
                            value={availabilityDate}
                            onChange={e => setAvailabilityDate(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">Consider 6-9 mo training pipeline.</p>
                    </div>
                </div>

                {/* 3. Command Preferences */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label>Command Preferences (Ranked)</Label>
                    </div>

                    <div className="flex gap-2">
                        <Select onValueChange={handleAddPreference}>
                            <SelectTrigger>
                                <SelectValue placeholder="Add Preference..." />
                            </SelectTrigger>
                            <SelectContent>
                                {availableOptions.map(opt => (
                                    <SelectItem key={opt} value={opt}>
                                        {opt}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 border rounded-md p-2 min-h-[100px] bg-muted/20">
                        {sortedPreferences.length === 0 && (
                            <div className="text-center text-sm text-muted-foreground py-8">No preferences added.</div>
                        )}
                        {sortedPreferences.map((pref, index) => {
                            return (
                                <div key={pref.key} className="flex items-center justify-between p-2 bg-background border rounded-md">
                                    <div className="flex items-center gap-3">
                                        <div className="font-bold text-lg w-6 text-center">{pref.rank}</div>
                                        <div>
                                            <div className="font-medium">{pref.key}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost" size="icon" className="h-6 w-6"
                                            disabled={index === 0}
                                            onClick={() => movePreference(index, 'up')}
                                        >
                                            <ArrowUp className="h-3 w-3" />
                                        </Button>
                                        <Button
                                            variant="ghost" size="icon" className="h-6 w-6"
                                            disabled={index === sortedPreferences.length - 1}
                                            onClick={() => movePreference(index, 'down')}
                                        >
                                            <ArrowDown className="h-3 w-3" />
                                        </Button>
                                        <Button
                                            variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive"
                                            onClick={() => handleRemovePreference(pref.key)}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* 4. Notes */}
                <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                        id="notes"
                        placeholder="Additional notes..."
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                    />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button onClick={handleSave}>Save Profile</Button>
                </div>
            </CardContent>
        </Card>
    )
}
