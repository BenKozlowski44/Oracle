"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, Trash2 } from "lucide-react"
import Link from "next/link"
import type { Slate } from "@/lib/types"
import { formatToMMMyy } from "@/lib/utils"

export function ArchivedSlatesClient({ allSlates }: { allSlates: Slate[] }) {
    const router = useRouter()
    const [localSlates, setLocalSlates] = useState(allSlates)
    const archivedSlates = localSlates.filter(s => s.status === "Archived")

    const persist = async (updated: Slate[]) => {
        await fetch('/api/update-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slates: updated }),
        })
        router.refresh()
    }

    const handleRestore = async (e: React.MouseEvent, id: string) => {
        e.preventDefault(); e.stopPropagation()
        if (!confirm("Are you sure you want to restore this slate to Active?")) return
        const updated = localSlates.map(s => s.id === id ? { ...s, status: "Active" as const } : s)
        setLocalSlates(updated)
        await persist(updated)
    }

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.preventDefault(); e.stopPropagation()
        if (!confirm("Are you sure you want to PERMANENTLY delete this archived slate?")) return
        const updated = localSlates.filter(s => s.id !== id)
        setLocalSlates(updated)
        await persist(updated)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Archived Slates</h1>
                    <p className="text-muted-foreground">Slates that have been archived.</p>
                </div>
                <Link href="/slates">
                    <Button variant="outline">← Active Slates</Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {archivedSlates.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center p-8 border rounded-lg bg-card text-muted-foreground border-dashed">
                        No archived slates.
                    </div>
                ) : (
                    archivedSlates.map((slate) => (
                        <Link key={slate.id} href={`/slates/${slate.id}`}>
                            <Card className="hover:border-primary transition-colors cursor-pointer group relative flex flex-col h-full opacity-75">
                                <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted"
                                        onClick={(e) => handleRestore(e, slate.id)} title="Restore Slate">
                                        <RotateCcw className="h-4 w-4" />
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
                                    <p className="text-xs text-muted-foreground">Requirements</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}
