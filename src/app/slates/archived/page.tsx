"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, Trash2 } from "lucide-react"
import Link from "next/link"
import { slates } from "@/lib/data"
import { formatToMMMyy } from "@/lib/utils"

export default function ArchivedSlatesPage() {
    const [archivedSlates, setArchivedSlates] = useState(slates.filter(s => s.status === "Archived"));

    const handleRestore = async (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (!confirm("Are you sure you want to restore this slate to Active?")) return;

        // 1. Update Local State
        const updatedSlates = archivedSlates.filter(s => s.id !== id);
        setArchivedSlates(updatedSlates);

        // 2. Update In-Memory Data
        const slateIndex = slates.findIndex(s => s.id === id);
        if (slateIndex !== -1) {
            slates[slateIndex].status = "Active";
        }

        // 3. Persist
        try {
            await fetch('/api/update-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slates: slates }),
            });
        } catch (error) {
            console.error("Failed to restore slate:", error);
        }
    }

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (!confirm("Are you sure you want to PERMANENTLY delete this archived slate?")) return;

        const updatedSlates = archivedSlates.filter(s => s.id !== id);
        setArchivedSlates(updatedSlates);

        const index = slates.findIndex(s => s.id === id);
        if (index !== -1) slates.splice(index, 1);

        try {
            await fetch('/api/update-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slates: slates }),
            });
        } catch (error) {
            console.error("Failed to delete slate:", error);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Archived Slates</h1>
                    <p className="text-muted-foreground">Historical slates and past records.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {archivedSlates.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center p-8 border rounded-lg bg-card text-muted-foreground border-dashed">
                        <div className="mb-4">No archived slates found.</div>
                        <p className="text-sm">Archive slates from the Active Slates page once they are complete.</p>
                    </div>
                ) : (
                    archivedSlates.map((slate) => (
                        <Link key={slate.id} href={`/slates/${slate.id}`}>
                            <Card className="hover:border-primary transition-colors cursor-pointer group relative opacity-75 hover:opacity-100">
                                <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 hover:bg-muted"
                                        onClick={(e) => handleRestore(e, slate.id)}
                                        title="Restore to Active"
                                    >
                                        <RotateCcw className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
                                        onClick={(e) => handleDelete(e, slate.id)}
                                        title="Delete Permanently"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-muted-foreground">{slate.name}</CardTitle>
                                    <CardDescription>
                                        Window: {formatToMMMyy(slate.windowStart)} - {formatToMMMyy(slate.windowEnd)}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-muted-foreground">{slate.requirements.length}</div>
                                    <p className="text-xs text-muted-foreground">
                                        Requirements
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}
