"use client"

import { Officer, SlateCandidateProfile, TourEntry } from "@/lib/types"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    Mail, Phone, MapPin, Star, Award, Shield, Flag, User, BookOpen, Home
} from "lucide-react"

interface CandidateProfileViewProps {
    officer: Officer
    profile: SlateCandidateProfile
    open: boolean
    onClose: () => void
}

// Section wrapper
function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <span className="text-muted-foreground">{icon}</span>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
            </div>
            <div className="ml-6">{children}</div>
        </div>
    )
}

// Key-value row
function Row({ label, value }: { label: string; value?: string }) {
    if (!value) return null
    return (
        <div className="flex gap-3 text-sm py-0.5">
            <span className="text-muted-foreground w-40 shrink-0">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    )
}

// Tour history mini-block
function TourBlock({ tour }: { tour: TourEntry }) {
    const hasData = tour.ship || tour.monthsUW || tour.oodEvolutions
    if (!hasData) return null

    return (
        <div className="border rounded-md p-3 space-y-2 bg-muted/20">
            <div className="font-medium text-sm">{tour.period}</div>
            <div className="grid grid-cols-3 gap-x-4 gap-y-1 text-xs">
                {tour.ship && <><span className="text-muted-foreground">Ship</span><span className="col-span-2 font-medium">{tour.ship}</span></>}
                {tour.platform && <><span className="text-muted-foreground">Platform</span><span className="col-span-2 font-medium">{tour.platform}</span></>}
                {tour.ofrpPhase && <><span className="text-muted-foreground">OFRP Phase</span><span className="col-span-2 font-medium">{tour.ofrpPhase}</span></>}
            </div>
            <Separator />
            <div className="grid grid-cols-3 gap-x-4 gap-y-1 text-xs">
                {tour.monthsUW && (
                    <div className="text-center">
                        <div className="text-lg font-bold">{tour.monthsUW}</div>
                        <div className="text-muted-foreground text-[10px]">Months U/W</div>
                    </div>
                )}
                {tour.monthsDeployed && (
                    <div className="text-center">
                        <div className="text-lg font-bold">{tour.monthsDeployed}</div>
                        <div className="text-muted-foreground text-[10px]">Months Dep.</div>
                    </div>
                )}
                {tour.monthsAsOOD && (
                    <div className="text-center">
                        <div className="text-lg font-bold">{tour.monthsAsOOD}</div>
                        <div className="text-muted-foreground text-[10px]">Months OOD</div>
                    </div>
                )}
            </div>
            {(tour.oodEvolutions || tour.connEvolutions || tour.joodEvolutions) && (
                <div className="grid grid-cols-3 gap-x-4 text-xs pt-1 border-t">
                    {tour.oodEvolutions && (
                        <div className="text-center">
                            <div className="font-semibold">{tour.oodEvolutions}</div>
                            <div className="text-muted-foreground text-[10px]">OOD Evo.</div>
                        </div>
                    )}
                    {tour.connEvolutions && (
                        <div className="text-center">
                            <div className="font-semibold">{tour.connEvolutions}</div>
                            <div className="text-muted-foreground text-[10px]">CONN Evo.</div>
                        </div>
                    )}
                    {tour.joodEvolutions && (
                        <div className="text-center">
                            <div className="font-semibold">{tour.joodEvolutions}</div>
                            <div className="text-muted-foreground text-[10px]">JOOD Evo.</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export function CandidateProfileView({ officer, profile, open, onClose }: CandidateProfileViewProps) {
    const hasTours = profile.tourHistory && profile.tourHistory.some(t => t.ship || t.monthsUW)
    const hasContact = profile.contactInfo && Object.values(profile.contactInfo).some(Boolean)
    const hasPrefs = profile.preferences && profile.preferences.length > 0

    // Parse notes back out (co-location, EFM, education, candidateNotes)
    const notesParts = (profile.notes || '').split(' | ')
    const candidateNotesPart = notesParts.find(p => p.startsWith('Candidate Notes:'))?.replace('Candidate Notes:', '').trim()
    const coLocationPart = notesParts.find(p => p.startsWith('Co-Location:'))?.replace('Co-Location:', '').trim()
    const efmPart = notesParts.find(p => p.startsWith('EFM:'))?.replace('EFM:', '').trim()
    const educationPart = notesParts.find(p => p.startsWith('Education:'))?.replace('Education:', '').trim()

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle asChild>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
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

                <div className="space-y-5 pt-2">

                    {/* ── CONTACT INFORMATION ── */}
                    {hasContact && (
                        <>
                            <Section icon={<Phone className="h-4 w-4" />} title="Contact Information">
                                <div className="space-y-1">
                                    {profile.contactInfo?.workEmail && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                                            <span className="text-muted-foreground w-28 shrink-0">Work Email</span>
                                            <span className="font-medium">{profile.contactInfo.workEmail}</span>
                                        </div>
                                    )}
                                    {profile.contactInfo?.homeEmail && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Home className="h-3.5 w-3.5 text-muted-foreground" />
                                            <span className="text-muted-foreground w-28 shrink-0">Home Email</span>
                                            <span className="font-medium">{profile.contactInfo.homeEmail}</span>
                                        </div>
                                    )}
                                    {profile.contactInfo?.workPhone && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                                            <span className="text-muted-foreground w-28 shrink-0">Work Phone</span>
                                            <span className="font-medium">{profile.contactInfo.workPhone}</span>
                                        </div>
                                    )}
                                    {profile.contactInfo?.personalPhone && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                                            <span className="text-muted-foreground w-28 shrink-0">Personal Cell</span>
                                            <span className="font-medium">{profile.contactInfo.personalPhone}</span>
                                        </div>
                                    )}
                                    {profile.contactInfo?.mailingAddress && (
                                        <div className="flex items-start gap-2 text-sm">
                                            <MapPin className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                                            <span className="text-muted-foreground w-28 shrink-0">Mailing Address</span>
                                            <span className="font-medium">{profile.contactInfo.mailingAddress}</span>
                                        </div>
                                    )}
                                </div>
                            </Section>
                            <Separator />
                        </>
                    )}

                    {/* ── FLAG NOTIFIER ── */}
                    {profile.flagContact && (
                        <>
                            <Section icon={<Flag className="h-4 w-4" />} title="Flag Notifier">
                                <div className="space-y-1">
                                    <Row label="Flag Officer" value={profile.flagContact.name} />
                                    <Row label="Relationship" value={profile.flagContact.relationship} />
                                </div>
                            </Section>
                            <Separator />
                        </>
                    )}

                    {/* ── COMMAND PREFERENCES ── */}
                    {hasPrefs && (
                        <>
                            <Section icon={<Star className="h-4 w-4" />} title="Command Preferences">
                                <div className="space-y-1.5">
                                    {[...profile.preferences]
                                        .sort((a, b) => a.rank - b.rank)
                                        .map(pref => (
                                            <div key={pref.key} className="flex items-center gap-3 text-sm">
                                                <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 ${pref.rank <= 3 ? 'bg-green-100 text-green-700 border border-green-200' :
                                                        pref.rank <= 6 ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                                                            'bg-rose-100 text-rose-700 border border-rose-200'
                                                    }`}>
                                                    {pref.rank}
                                                </div>
                                                <span className="font-medium">{pref.key}</span>
                                            </div>
                                        ))}
                                </div>
                            </Section>
                            <Separator />
                        </>
                    )}

                    {/* ── TOUR HISTORY ── */}
                    {hasTours && (
                        <>
                            <Section icon={<Shield className="h-4 w-4" />} title="Tour History">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {profile.tourHistory!.map((tour, i) => (
                                        <TourBlock key={i} tour={tour} />
                                    ))}
                                </div>
                            </Section>
                            <Separator />
                        </>
                    )}

                    {/* ── QUALIFICATIONS ── */}
                    {(profile.jpme || profile.wti) && (
                        <>
                            <Section icon={<Award className="h-4 w-4" />} title="Professional Qualifications">
                                <div className="space-y-1">
                                    <Row label="JPME" value={profile.jpme} />
                                    <Row label="WTI" value={profile.wti} />
                                </div>
                            </Section>
                            <Separator />
                        </>
                    )}

                    {/* ── CONSIDERATIONS & NOTES ── */}
                    {(candidateNotesPart || coLocationPart || efmPart || educationPart) && (
                        <Section icon={<BookOpen className="h-4 w-4" />} title="Considerations & Notes">
                            <div className="space-y-2">
                                {candidateNotesPart && (
                                    <div className="text-sm bg-muted/40 rounded-md p-3 border whitespace-pre-wrap">
                                        {candidateNotesPart}
                                    </div>
                                )}
                                <div className="space-y-1">
                                    <Row label="Co-Location" value={coLocationPart} />
                                    <Row label="EFM" value={efmPart} />
                                    <Row label="Education" value={educationPart} />
                                </div>
                            </div>
                        </Section>
                    )}

                    {/* Empty state */}
                    {!hasContact && !profile.flagContact && !hasPrefs && !hasTours && !profile.jpme && !profile.wti && !profile.notes && (
                        <div className="text-center py-10 text-muted-foreground text-sm border border-dashed rounded-md">
                            No profile data yet. Upload the completed form using the ↑ icon next to this candidate.
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
