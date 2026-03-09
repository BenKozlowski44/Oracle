"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Archive } from "lucide-react"
import Link from "next/link"
import { formatToMMMyy } from "@/lib/utils"
import { applySlateToOracle } from "@/lib/slate-migration"
import type { Slate, Officer, OracleCommand } from "@/lib/types"

interface SlatesPageClientProps {
    allSlates: Slate[]
    officers: Officer[]
    oracleData: OracleCommand[]
}

export function SlatesPageClient({ allSlates, officers, oracleData }: SlatesPageClientProps) {
    const router = useRouter()
    const [localSlates, setLocalSlates] = useState(allSlates)
    const activeSlates = localSlates.filter(s => s.status !== "Archived")

    const persist = async (updatedSlates: Slate[], extraPayload?: Record<string, unknown>) => {
        await fetch('/api/update-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slates: updatedSlates, ...extraPayload }),
        })
        router.refresh()
    }

    const handleArchive = async (e: React.MouseEvent, id: string) => {
        e.preventDefault(); e.stopPropagation()
        if (!confirm("Are you sure you want to archive this slate? It will move to the Archived Slates view.")) return
        const updated = localSlates.map(s => s.id === id ? { ...s, status: "Archived" as const } : s)
        setLocalSlates(updated)
        await persist(updated)
    }

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.preventDefault(); e.stopPropagation()
        if (!confirm("Are you sure you want to PERMANENTLY delete this slate?")) return
        const updated = localSlates.filter(s => s.id !== id)
        setLocalSlates(updated)
        await persist(updated)
    }

    const handleApprovalToggle = async (e: React.MouseEvent, id: string, entity: keyof Slate['approvals']) => {
        e.preventDefault(); e.stopPropagation()
        const slate = localSlates.find(s => s.id === id)
        if (!slate) return
        const willBeTrue = !slate.approvals?.[entity]

        if (entity === 'swoboss' && willBeTrue) {
            const confirmed = confirm(
                `SWOBOSS APPROVAL CONFIRMATION\n\nAre you sure SWOBOSS has approved slate "${slate.name}"?\n\nThis will:\n• Mark the slate as SWOBOSS Approved\n• Populate the Slated XO slot in the Oracle for all filled requirements\n\nThis action cannot be undone.`
            )
            if (!confirmed) return
        }

        const updated = localSlates.map(s =>
            s.id === id ? { ...s, approvals: { ...s.approvals, [entity]: willBeTrue } } : s
        )
        setLocalSlates(updated)

        let extraPayload: Record<string, unknown> = {}
        if (entity === 'swoboss' && willBeTrue) {
            const updatedOracleData = applySlateToOracle(slate, officers, oracleData)
            extraPayload = { oracleData: updatedOracleData }
        }

        await persist(updated, extraPayload)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Active Slates</h1>
                    <p className="text-muted-foreground">Manage and assign officers to quarterly slates.</p>
                </div>
                <Link href="/slate-generator">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Slate
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {activeSlates.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center p-8 border rounded-lg bg-card text-muted-foreground border-dashed">
                        <div className="mb-4">No active slates found.</div>
                        <Link href="/slate-generator">
                            <Button variant="outline">Create your first slate</Button>
                        </Link>
                    </div>
                ) : (
                    activeSlates.map((slate) => (
                        <Link key={slate.id} href={`/slates/${slate.id}`}>
                            <Card className="hover:border-primary transition-colors cursor-pointer group relative flex flex-col h-full">
                                <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted"
                                        onClick={(e) => handleArchive(e, slate.id)} title="Archive Slate">
                                        <Archive className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
                                        onClick={(e) => handleDelete(e, slate.id)} title="Delete Slate">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <CardHeader>
                                    <CardTitle>{slate.name}</CardTitle>
                                    <CardDescription>
                                        Fill Window: {formatToMMMyy(slate.windowStart)} - {formatToMMMyy(slate.windowEnd)}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="text-2xl font-bold">{slate.requirements.length}</div>
                                    <p className="text-xs text-muted-foreground">Requirements to fill</p>
                                </CardContent>
                                <div className="p-4 border-t mt-auto bg-muted/20">
                                    <div className="text-xs font-semibold mb-2 text-muted-foreground">APPROVAL STATUS</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {([
                                            { label: "Branch Head", key: "branchHead" },
                                            { label: "PERS-41", key: "pers41" },
                                            { label: "SWCC", key: "swcc" },
                                            { label: "SWOBOSS", key: "swoboss" },
                                        ] as const).map((item) => (
                                            <div key={item.key}
                                                className="flex items-center gap-2 cursor-pointer hover:bg-accent/50 p-1 rounded transition-colors"
                                                onClick={(e) => handleApprovalToggle(e, slate.id, item.key)}>
                                                <div className={`h-4 w-4 rounded border flex items-center justify-center ${slate.approvals?.[item.key] ? "bg-green-500 border-green-500 text-white" : "border-muted-foreground"}`}>
                                                    {slate.approvals?.[item.key] && <div className="h-2 w-2 bg-white rounded-full" />}
                                                </div>
                                                <span className={`text-xs ${slate.approvals?.[item.key] ? "font-medium text-foreground" : "text-muted-foreground"}`}>{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}
