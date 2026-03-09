// Server Component — reads fresh data on every navigation
import { use } from "react"
import Link from "next/link"
import { getSlates, getOfficers, getOracleData } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CheckCircle2, AlertTriangle, Circle } from "lucide-react"
import { formatToMMMyy } from "@/lib/utils"
import { BriefButtons } from "./_brief-buttons"

interface BriefPageProps {
    params: Promise<{ id: string }>
}

const MIN_PIPELINE_MONTHS = 6

function hasPipelineConflict(availDate: string | undefined, fillDate: string | undefined): boolean {
    if (!availDate || !fillDate) return false
    const avail = new Date(availDate)
    const fill = new Date(fillDate)
    const pipelineEnd = new Date(avail)
    pipelineEnd.setMonth(pipelineEnd.getMonth() + MIN_PIPELINE_MONTHS)
    return pipelineEnd > fill
}

export const dynamic = 'force-dynamic'

export default async function SlateBriefPage({ params }: BriefPageProps) {
    const { id } = await params
    const slate = getSlates().find(s => s.id === id)
    const officers = getOfficers()
    const oracleData = getOracleData()

    if (!slate) {
        return <div className="p-8 text-center text-muted-foreground">Slate not found.</div>
    }

    const requirements = slate.requirements || []
    const candidateIds = slate.candidates || []
    const profiles = slate.candidateProfiles || []

    const slateCandidates = candidateIds
        .map(cid => officers.find(o => o.id === cid))
        .filter(Boolean) as typeof officers

    const filledCount = requirements.filter(r => r.filledBy).length
    const totalCount = requirements.length

    const generatedAt = new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    })

    return (
        <div className="max-w-5xl mx-auto space-y-0">

            {/* ── Screen-only controls ── */}
            <div className="flex items-center justify-between pb-4 print:hidden">
                <Link href={`/slates/${id}`}>
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Slate
                    </Button>
                </Link>
                <BriefButtons id={id} />
            </div>

            {/* ══ DOCUMENT ══════════════════════════════════════════════════════ */}
            <div className="bg-white text-gray-900 border rounded-lg p-8 space-y-6 print:border-none print:rounded-none print:p-6 print:shadow-none">

                {/* Header */}
                <div className="flex items-start justify-between border-b-2 border-gray-900 pb-4">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">PERS-41 // Detailer Slate</p>
                        <h1 className="text-3xl font-bold tracking-tight mt-1">{slate.name}</h1>
                        <p className="text-sm text-gray-600 mt-1">
                            Fill Window: {formatToMMMyy(slate.windowStart)} – {formatToMMMyy(slate.windowEnd)}
                        </p>
                    </div>
                    <div className="text-right text-xs text-gray-500 space-y-1">
                        <p>Generated: {generatedAt}</p>
                        <p>Status: <span className="font-semibold">{slate.status}</span></p>
                        <Badge variant="outline" className="text-xs mt-1">
                            {filledCount} / {totalCount} Requirements Filled
                        </Badge>
                    </div>
                </div>

                {/* ── REQUIREMENTS TABLE ── */}
                <section>
                    <h2 className="text-base font-bold uppercase tracking-wide text-gray-700 mb-2">Requirements ({totalCount})</h2>
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="border border-gray-300 px-2 py-1.5 font-semibold">Command</th>
                                <th className="border border-gray-300 px-2 py-1.5 font-semibold">Role</th>
                                <th className="border border-gray-300 px-2 py-1.5 font-semibold">Incumbent</th>
                                <th className="border border-gray-300 px-2 py-1.5 font-semibold">Fill Date</th>
                                <th className="border border-gray-300 px-2 py-1.5 font-semibold">Status</th>
                                <th className="border border-gray-300 px-2 py-1.5 font-semibold">Assigned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requirements.map(r => {
                                const cmd = oracleData.find(c => c.id === r.commandId)
                                const assignedOfficer = r.filledBy ? officers.find(o => o.id === r.filledBy) : null
                                return (
                                    <tr key={r.id} className={r.filledBy ? 'bg-green-50' : ''}>
                                        <td className="border border-gray-300 px-2 py-1.5">
                                            <span className="font-medium">{r.commandName}</span>
                                            {cmd && <span className="text-gray-500 text-xs ml-1">• {cmd.location}</span>}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-1.5">{r.role}</td>
                                        <td className="border border-gray-300 px-2 py-1.5 text-gray-700">{r.incumbent}</td>
                                        <td className="border border-gray-300 px-2 py-1.5">{formatToMMMyy(r.incumbentPrd)}</td>
                                        <td className="border border-gray-300 px-2 py-1.5">
                                            <span className={`text-xs font-semibold ${r.filledBy ? 'text-green-700' : 'text-amber-600'}`}>
                                                {r.status}
                                            </span>
                                        </td>
                                        <td className="border border-gray-300 px-2 py-1.5 text-sm">
                                            {assignedOfficer
                                                ? <span className="font-medium text-green-800">{assignedOfficer.name}</span>
                                                : <span className="text-gray-400 italic">—</span>}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </section>

                <Separator className="print:border-gray-300" />

                {/* ── CANDIDATE ROSTER ── */}
                <section>
                    <h2 className="text-base font-bold uppercase tracking-wide text-gray-700 mb-3">
                        Candidate Roster ({slateCandidates.length})
                    </h2>
                    <div className="grid grid-cols-1 gap-3 print:gap-2">
                        {slateCandidates.map(candidate => {
                            const profile = profiles.find(p => p.officerId === candidate.id)
                            const assignedReq = requirements.find(r => r.filledBy === candidate.id)
                            const assignedCmd = assignedReq
                                ? oracleData.find(c => c.id === assignedReq.commandId)
                                : null

                            const topPrefs = profile
                                ? [...profile.preferences].sort((a, b) => a.rank - b.rank).slice(0, 3)
                                : []

                            // Pipeline warnings for top prefs
                            const prefWarnings = topPrefs.map(pref => {
                                const matchedReq = requirements.find(r => {
                                    const cmd = oracleData.find(c => c.id === r.commandId)
                                    const pf = `${cmd?.platform || 'Unknown'} - ${cmd?.location || 'Unknown'}`
                                    return pf === pref.key
                                })
                                return {
                                    ...pref,
                                    hasConflict: hasPipelineConflict(profile?.availabilityDate, matchedReq?.incumbentPrd)
                                }
                            })

                            // Completeness
                            const checks = profile ? [
                                !!(profile.contactInfo?.workEmail || profile.contactInfo?.personalPhone),
                                !!profile.flagContact?.name,
                                profile.preferences.length > 0,
                                !!(profile.tourHistory?.some(t => t.ship)),
                                !!(profile.jpme || profile.wti),
                                !!profile.availabilityDate,
                            ] : []
                            const completed = checks.filter(Boolean).length

                            return (
                                <div
                                    key={candidate.id}
                                    className={`border rounded-md p-3 print:p-2 print:break-inside-avoid ${assignedReq ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        {/* Left: identity */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-bold text-sm">{candidate.name}</span>
                                                <span className="text-xs text-gray-500">{candidate.rank} · {candidate.designator}</span>
                                                {assignedReq && (
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-800">
                                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                                        {assignedCmd
                                                            ? `${assignedCmd.platform || ''} - ${assignedCmd.location}`
                                                            : assignedReq.commandName}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Preferences */}
                                            {prefWarnings.length > 0 ? (
                                                <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
                                                    {prefWarnings.map(pref => (
                                                        <span key={pref.rank} className="text-xs text-gray-700 flex items-center gap-1">
                                                            <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center
                                                                ${pref.rank <= 3 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                                                {pref.rank}
                                                            </span>
                                                            {pref.key}
                                                            {pref.hasConflict && (
                                                                <AlertTriangle className="h-3 w-3 text-amber-500" />
                                                            )}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-xs text-gray-400 italic mt-1">No preferences on file</p>
                                            )}
                                        </div>

                                        {/* Right: metadata */}
                                        <div className="text-xs text-gray-600 text-right shrink-0 space-y-0.5">
                                            {profile?.availabilityDate && (
                                                <p>Avail: <span className="font-medium">{formatToMMMyy(profile.availabilityDate)}</span></p>
                                            )}
                                            {profile?.jpme && (
                                                <p>JPME: <span className="font-medium">{profile.jpme}</span></p>
                                            )}
                                            {profile?.wti && (
                                                <p>WTI: <span className="font-medium">{profile.wti}</span></p>
                                            )}
                                            {profile ? (
                                                <p className={`font-semibold ${completed === 6 ? 'text-green-700' : completed >= 4 ? 'text-amber-600' : 'text-rose-600'}`}>
                                                    Profile {completed}/6
                                                </p>
                                            ) : (
                                                <p className="text-gray-400 italic">No profile</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Flag contact if present */}
                                    {profile?.flagContact?.name && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Flag: {profile.flagContact.name}
                                            {profile.flagContact.relationship && ` (${profile.flagContact.relationship})`}
                                        </p>
                                    )}
                                </div>
                            )
                        })}
                        {slateCandidates.length === 0 && (
                            <p className="text-sm text-gray-500 italic">No candidates on slate.</p>
                        )}
                    </div>
                </section>

                <Separator className="print:border-gray-300" />

                {/* ── APPROVALS ── */}
                <section>
                    <h2 className="text-base font-bold uppercase tracking-wide text-gray-700 mb-2">Approvals</h2>
                    <div className="flex gap-8 text-sm">
                        {[
                            { label: 'Branch Head', approved: slate.approvals?.branchHead },
                            { label: 'PERS-41', approved: slate.approvals?.pers41 },
                            { label: 'SWCC', approved: slate.approvals?.swcc },
                            { label: 'SWOBOSS', approved: slate.approvals?.swoboss },
                        ].map(({ label, approved }) => (
                            <div key={label} className="flex items-center gap-2">
                                {approved
                                    ? <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    : <Circle className="h-4 w-4 text-gray-300" />}
                                <span className={`font-medium ${approved ? 'text-green-800' : 'text-gray-500'}`}>{label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <div className="border-t border-gray-200 pt-3 text-xs text-gray-400 flex justify-between">
                    <span>PERS-41 Command Detailer · Oracle · Detailer Slate</span>
                    <span>{slate.name} · {generatedAt}</span>
                </div>
            </div>
        </div>
    )
}
