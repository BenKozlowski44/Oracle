"use client"

import { useState } from "react"
import { Officer, SlateCandidateProfile, TourEntry } from "@/lib/types"
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Star, Award, Shield, Flag, User, BookOpen, Home, Save, X } from "lucide-react"

// Fields considered "significant" — show red border when empty
const SIGNIFICANT_CONTACT = ['workEmail', 'personalPhone'] as const
const SIGNIFICANT_FLAG = ['name'] as const
const SIGNIFICANT_TOUR_FIELDS = ['ship', 'platform', 'ofrpPhase', 'monthsUW', 'monthsDeployed'] as const
const SIGNIFICANT_QUAL = ['jpme', 'wti'] as const
const TOUR_PERIODS = [
    '1st Division Officer Tour', '2nd Division Officer Tour', 'Post-Division Officer Tour',
    '1st Department Head Tour', '2nd Department Head Tour', 'Post-Department Head Tour',
]

// ── Style helpers ─────────────────────────────────────────────────────────────
const fieldClass = (value: string | undefined, significant: boolean) =>
    `w-full rounded-md border px-2.5 py-1.5 text-sm bg-background transition-colors focus:outline-none focus:ring-1 focus:ring-primary ${significant && !value?.trim()
        ? 'border-red-400 focus:ring-red-400 placeholder:text-red-300'
        : 'border-input hover:border-muted-foreground/50'
    }`

const textareaClass = (value: string | undefined, significant: boolean) =>
    `w-full rounded-md border px-2.5 py-1.5 text-sm bg-background resize-none transition-colors focus:outline-none focus:ring-1 focus:ring-primary ${significant && !value?.trim()
        ? 'border-red-400 focus:ring-red-400 placeholder:text-red-300'
        : 'border-input hover:border-muted-foreground/50'
    }`

// ── Sub-components ────────────────────────────────────────────────────────────
function Section({ icon, title, badge, children }: { icon: React.ReactNode; title: string; badge?: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="text-muted-foreground">{icon}</span>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
                {badge}
            </div>
            <div className="ml-6 space-y-2">{children}</div>
        </div>
    )
}

function FieldRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-[160px_1fr] items-start gap-3 text-sm">
            <span className="text-muted-foreground pt-2 text-right">{label}</span>
            {children}
        </div>
    )
}

interface EditableTourProps {
    tour: TourEntry
    onChange: (updated: TourEntry) => void
}
function EditableTour({ tour, onChange }: EditableTourProps) {
    const set = (key: keyof TourEntry) => (e: React.ChangeEvent<HTMLInputElement>) =>
        onChange({ ...tour, [key]: e.target.value })

    const isSig = (f: string) => SIGNIFICANT_TOUR_FIELDS.includes(f as typeof SIGNIFICANT_TOUR_FIELDS[number])

    return (
        <div className="border rounded-md p-3 space-y-3 bg-muted/20">
            <div className="font-medium text-sm text-foreground">{tour.period}</div>
            <div className="grid grid-cols-3 gap-2">
                {([
                    { key: 'ship', label: 'Ship / Command' },
                    { key: 'platform', label: 'Platform' },
                    { key: 'ofrpPhase', label: 'OFRP Phase' },
                ] as { key: keyof TourEntry; label: string }[]).map(({ key, label }) => (
                    <div key={key}>
                        <div className="text-[10px] text-muted-foreground mb-1">{label}</div>
                        <input
                            className={fieldClass(tour[key] as string, isSig(key))}
                            value={tour[key] as string || ''}
                            onChange={set(key)}
                            placeholder={`${label}...`}
                        />
                    </div>
                ))}
            </div>
            <Separator />
            <div className="grid grid-cols-3 gap-2">
                {([
                    { key: 'monthsUW', label: 'Months U/W' },
                    { key: 'monthsDeployed', label: 'Months Dep.' },
                    { key: 'monthsAsOOD', label: 'Months OOD' },
                ] as { key: keyof TourEntry; label: string }[]).map(({ key, label }) => (
                    <div key={key}>
                        <div className="text-[10px] text-muted-foreground mb-1">{label}</div>
                        <input
                            type="number" min="0"
                            className={fieldClass(tour[key] as string, isSig(key))}
                            value={tour[key] as string || ''}
                            onChange={set(key)}
                            placeholder="0"
                        />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
                {([
                    { key: 'oodEvolutions', label: '# OOD Evo.' },
                    { key: 'connEvolutions', label: '# CONN Evo.' },
                    { key: 'joodEvolutions', label: '# JOOD Evo.' },
                ] as { key: keyof TourEntry; label: string }[]).map(({ key, label }) => (
                    <div key={key}>
                        <div className="text-[10px] text-muted-foreground mb-1">{label}</div>
                        <input
                            type="number" min="0"
                            className={fieldClass(tour[key] as string, false)}
                            value={tour[key] as string || ''}
                            onChange={set(key)}
                            placeholder="0"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

// ── Main component ────────────────────────────────────────────────────────────
interface CandidateProfileViewProps {
    officer: Officer
    profile: SlateCandidateProfile
    open: boolean
    onClose: () => void
    onSave: (updated: SlateCandidateProfile) => void
}

export function CandidateProfileView({ officer, profile, open, onClose, onSave }: CandidateProfileViewProps) {
    // Parse notes parts from the stored string
    const notesParts = (profile.notes || '').split(' | ')
    const parsedNotes = notesParts.find(p => p.startsWith('Candidate Notes:'))?.replace('Candidate Notes:', '').trim() || ''
    const parsedCoLoc = notesParts.find(p => p.startsWith('Co-Location:'))?.replace('Co-Location:', '').trim() || ''
    const parsedEFM = notesParts.find(p => p.startsWith('EFM:'))?.replace('EFM:', '').trim() || ''
    const parsedEduc = notesParts.find(p => p.startsWith('Education:'))?.replace('Education:', '').trim() || ''

    // Ensure all 6 tour periods are present
    const initialTours = TOUR_PERIODS.map(period =>
        profile.tourHistory?.find(t => t.period === period) ?? { period }
    )

    // Local editable state
    const [contactInfo, setContactInfo] = useState(profile.contactInfo || {})
    const [flagContact, setFlagContact] = useState(profile.flagContact || { name: '', relationship: '' })
    const [preferences, setPreferences] = useState(profile.preferences || [])
    const [tours, setTours] = useState<TourEntry[]>(initialTours)
    const [jpme, setJpme] = useState(profile.jpme || '')
    const [wti, setWti] = useState(profile.wti || '')
    const [candidateNotes, setCandidateNotes] = useState(parsedNotes)
    const [coLocation, setCoLocation] = useState(parsedCoLoc)
    const [efm, setEfm] = useState(parsedEFM)
    const [education, setEducation] = useState(parsedEduc)

    const updateContact = (key: string, val: string) => setContactInfo(c => ({ ...c, [key]: val }))
    const updateTour = (i: number, updated: TourEntry) => setTours(t => t.map((tr, idx) => idx === i ? updated : tr))
    const updatePref = (i: number, key: string, rank: number) =>
        setPreferences(p => p.map((pr, idx) => idx === i ? { key, rank } : pr))
    const addPref = () => setPreferences(p => [...p, { key: '', rank: p.length + 1 }])
    const removePref = (i: number) => setPreferences(p => p.filter((_, idx) => idx !== i).map((pr, idx) => ({ ...pr, rank: idx + 1 })))

    const missingPrefs = preferences.length === 0 || preferences.every(p => !p.key.trim())

    const handleSave = () => {
        const notes = [
            candidateNotes ? `Candidate Notes: ${candidateNotes}` : '',
            coLocation ? `Co-Location: ${coLocation}` : '',
            efm ? `EFM: ${efm}` : '',
            education ? `Education: ${education}` : '',
        ].filter(Boolean).join(' | ')

        onSave({
            ...profile,
            contactInfo: Object.keys(contactInfo).length ? contactInfo : undefined,
            flagContact: flagContact.name ? flagContact : undefined,
            preferences,
            tourHistory: tours,
            jpme: jpme || undefined,
            wti: wti || undefined,
            notes,
        })
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle asChild>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <div className="text-lg font-bold leading-tight">{officer.name}</div>
                                <div className="text-sm text-muted-foreground font-normal">
                                    {officer.rank} · {officer.designator}
                                    {officer.screened?.includes("CO-SM") && (
                                        <Badge variant="secondary" className="ml-2 text-[10px] h-5 px-1">CO-SM</Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 pt-2">

                    {/* ── CONTACT INFORMATION ── */}
                    <Section icon={<Phone className="h-4 w-4" />} title="Contact Information">
                        <FieldRow label={<><Mail className="inline h-3 w-3 mr-1" />Work Email</>}>
                            <input className={fieldClass(contactInfo.workEmail, true)} value={contactInfo.workEmail || ''} onChange={e => updateContact('workEmail', e.target.value)} placeholder="Work email..." />
                        </FieldRow>
                        <FieldRow label={<><Home className="inline h-3 w-3 mr-1" />Home Email</>}>
                            <input className={fieldClass(contactInfo.homeEmail, false)} value={contactInfo.homeEmail || ''} onChange={e => updateContact('homeEmail', e.target.value)} placeholder="Home/personal email..." />
                        </FieldRow>
                        <FieldRow label={<><Phone className="inline h-3 w-3 mr-1" />Work Phone</>}>
                            <input className={fieldClass(contactInfo.workPhone, false)} value={contactInfo.workPhone || ''} onChange={e => updateContact('workPhone', e.target.value)} placeholder="Work phone..." />
                        </FieldRow>
                        <FieldRow label={<><Phone className="inline h-3 w-3 mr-1" />Personal Cell</>}>
                            <input className={fieldClass(contactInfo.personalPhone, true)} value={contactInfo.personalPhone || ''} onChange={e => updateContact('personalPhone', e.target.value)} placeholder="Personal cell..." />
                        </FieldRow>
                        <FieldRow label={<><MapPin className="inline h-3 w-3 mr-1" />Mailing Address</>}>
                            <input className={fieldClass(contactInfo.mailingAddress, false)} value={contactInfo.mailingAddress || ''} onChange={e => updateContact('mailingAddress', e.target.value)} placeholder="Street, City, State ZIP..." />
                        </FieldRow>
                    </Section>

                    <Separator />

                    {/* ── FLAG NOTIFIER ── */}
                    <Section icon={<Flag className="h-4 w-4" />} title="Flag Notifier">
                        <FieldRow label="Flag Officer Name">
                            <input className={fieldClass(flagContact.name, true)} value={flagContact.name} onChange={e => setFlagContact(f => ({ ...f, name: e.target.value }))} placeholder="Flag officer name..." />
                        </FieldRow>
                        <FieldRow label="Relationship / Context">
                            <input className={fieldClass(flagContact.relationship, false)} value={flagContact.relationship} onChange={e => setFlagContact(f => ({ ...f, relationship: e.target.value }))} placeholder="e.g., CO during DH tour..." />
                        </FieldRow>
                    </Section>

                    <Separator />

                    {/* ── COMMAND PREFERENCES ── */}
                    <Section
                        icon={<Star className="h-4 w-4" />}
                        title="Command Preferences"
                        badge={missingPrefs ? <Badge variant="destructive" className="text-[10px] h-5 px-1.5">Missing</Badge> : undefined}
                    >
                        <div className="space-y-2">
                            {preferences.map((pref, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 ${pref.rank <= 3 ? 'bg-green-100 text-green-700 border border-green-200' :
                                        pref.rank <= 6 ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                                            'bg-rose-100 text-rose-700 border border-rose-200'
                                        }`}>{pref.rank}</div>
                                    <input
                                        className={fieldClass(pref.key, true)}
                                        value={pref.key}
                                        onChange={e => updatePref(i, e.target.value, pref.rank)}
                                        placeholder="Platform - Location (e.g. DDG - Norfolk)..."
                                    />
                                    <button onClick={() => removePref(i)} className="text-muted-foreground hover:text-destructive shrink-0">
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={addPref} className="mt-1">
                                + Add Preference
                            </Button>
                        </div>
                    </Section>

                    <Separator />

                    {/* ── TOUR HISTORY ── */}
                    <Section icon={<Shield className="h-4 w-4" />} title="Tour History">
                        <div className="grid grid-cols-1 gap-3">
                            {tours.map((tour, i) => (
                                <EditableTour key={tour.period} tour={tour} onChange={updated => updateTour(i, updated)} />
                            ))}
                        </div>
                    </Section>

                    <Separator />

                    {/* ── QUALIFICATIONS ── */}
                    <Section icon={<Award className="h-4 w-4" />} title="Professional Qualifications">
                        <FieldRow label="JPME Completion / Plan">
                            <input className={fieldClass(jpme, true)} value={jpme} onChange={e => setJpme(e.target.value)} placeholder="JPME status or plan..." />
                        </FieldRow>
                        <FieldRow label="WTI Qualification">
                            <input className={fieldClass(wti, true)} value={wti} onChange={e => setWti(e.target.value)} placeholder="WTI type or N/A..." />
                        </FieldRow>
                    </Section>

                    <Separator />

                    {/* ── CONSIDERATIONS & NOTES ── */}
                    <Section icon={<BookOpen className="h-4 w-4" />} title="Considerations & Notes">
                        <FieldRow label="General Notes">
                            <textarea
                                className={textareaClass(candidateNotes, false)}
                                rows={4}
                                value={candidateNotes}
                                onChange={e => setCandidateNotes(e.target.value)}
                                placeholder="Amplifying information, timing constraints, career goals..."
                            />
                        </FieldRow>
                        <FieldRow label="Co-Location">
                            <input className={fieldClass(coLocation, false)} value={coLocation} onChange={e => setCoLocation(e.target.value)} placeholder="Co-location request..." />
                        </FieldRow>
                        <FieldRow label="EFM Considerations">
                            <input className={fieldClass(efm, false)} value={efm} onChange={e => setEfm(e.target.value)} placeholder="EFM details..." />
                        </FieldRow>
                        <FieldRow label="Education / Pipeline">
                            <input className={fieldClass(education, false)} value={education} onChange={e => setEducation(e.target.value)} placeholder="Planned education or pipeline..." />
                        </FieldRow>
                    </Section>
                </div>

                <DialogFooter className="pt-4 border-t mt-4">
                    <Button variant="outline" onClick={onClose}>
                        <X className="h-4 w-4 mr-1.5" /> Cancel
                    </Button>
                    <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-1.5" /> Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
