"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Archive } from "lucide-react"
import Link from "next/link"
import { slates } from "@/lib/data"
import { formatToMMMyy } from "@/lib/utils"
// import { useRouter } from "next/navigation" // Not strictly needed if we just update state

export default function ActiveSlatesPage() {
    const [activeSlates, setActiveSlates] = useState(slates.filter(s => s.status !== "Archived"));

    const handleArchive = async (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (!confirm("Are you sure you want to archive this slate? It will move to the Archived Slates view.")) return;

        // 1. Update Local State (Remove from view)
        const updatedSlates = activeSlates.filter(s => s.id !== id);
        setActiveSlates(updatedSlates);

        // 2. Update In-Memory Data
        const slateIndex = slates.findIndex(s => s.id === id);
        if (slateIndex !== -1) {
            slates[slateIndex].status = "Archived";
        }

        // 3. Persist
        try {
            await fetch('/api/update-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slates: slates }), // Send ALL slates, including archived ones with new status
            });
        } catch (error) {
            console.error("Failed to archive slate:", error);
        }
    }

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (!confirm("Are you sure you want to PERMANENTLY delete this slate?")) return;

        const updatedSlates = activeSlates.filter(s => s.id !== id);
        setActiveSlates(updatedSlates);

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

    const handleApprovalToggle = async (e: React.MouseEvent, id: string, entity: keyof typeof slates[0]['approvals']) => {
        e.preventDefault();
        e.stopPropagation();

        // 1. Update Local State
        const updatedSlates = activeSlates.map(slate => {
            if (slate.id === id) {
                return {
                    ...slate,
                    approvals: {
                        ...slate.approvals,
                        [entity]: !slate.approvals[entity]
                    }
                }
            }
            return slate;
        });
        setActiveSlates(updatedSlates);

        // 2. Update In-Memory Data
        const slateIndex = slates.findIndex(s => s.id === id);
        if (slateIndex !== -1 && slates[slateIndex].approvals) {
            slates[slateIndex].approvals[entity] = !slates[slateIndex].approvals[entity];
        }

        // 3. Persist
        try {
            await fetch('/api/update-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slates: slates }),
            });
        } catch (error) {
            console.error("Failed to update approval:", error);
        }
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
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 hover:bg-muted"
                                        onClick={(e) => handleArchive(e, slate.id)}
                                        title="Archive Slate"
                                    >
                                        <Archive className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
                                        onClick={(e) => handleDelete(e, slate.id)}
                                        title="Delete Slate"
                                    >
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
                                    <p className="text-xs text-muted-foreground">
                                        Requirements to fill
                                    </p>
                                </CardContent>
                                <div className="p-4 border-t mt-auto bg-muted/20">
                                    <div className="text-xs font-semibold mb-2 text-muted-foreground">APPROVAL STATUS</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            { label: "Branch Head", key: "branchHead" },
                                            { label: "PERS-41", key: "pers41" },
                                            { label: "SWCC", key: "swcc" },
                                            { label: "SWOBOSS", key: "swoboss" },
                                        ].map((item) => (
                                            <div
                                                key={item.key}
                                                className="flex items-center gap-2 cursor-pointer hover:bg-accent/50 p-1 rounded transition-colors"
                                                onClick={(e) => handleApprovalToggle(e, slate.id, item.key as any)}
                                            >
                                                <div className={`h-4 w-4 rounded border flex items-center justify-center ${slate.approvals?.[item.key as keyof typeof slate.approvals] ? "bg-green-500 border-green-500 text-white" : "border-muted-foreground"}`}>
                                                    {slate.approvals?.[item.key as keyof typeof slate.approvals] && <div className="h-2 w-2 bg-white rounded-full" />}
                                                </div>
                                                <span className={`text-xs ${slate.approvals?.[item.key as keyof typeof slate.approvals] ? "font-medium text-foreground" : "text-muted-foreground"}`}>{item.label}</span>
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
