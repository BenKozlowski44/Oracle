import { PageHeader } from '@/components/PageHeader'
import { useState } from "react"
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Archive } from "lucide-react"
import { formatToMMMyy } from "@/lib/utils"
import type { Slate } from "@/lib/types"
import { getSlates, saveSlate, deleteSlate, getOracleData, saveOfficers, getOfficers } from "@/services/storage"
import { applySlateToOracle } from "@/lib/slate-migration"
import { writeData } from "@/services/storage"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface SlatesPageClientProps {
    allSlates: Slate[]
}

type PendingAction =
    | { type: 'archive'; slateId: string; slateName: string }
    | { type: 'delete';  slateId: string; slateName: string }
    | { type: 'swoboss'; slateId: string; slateName: string }

export function SlatesPageClient({ allSlates }: SlatesPageClientProps) {
    const navigate = useNavigate()
    const [localSlates, setLocalSlates] = useState(allSlates)
    const [pending, setPending] = useState<PendingAction | null>(null)
    const activeSlates = localSlates.filter(s => s.status !== "Archived")

    // ── Initiators (just open the dialog) ──────────────────────────────────
    const handleArchive = (e: React.MouseEvent, id: string) => {
        e.preventDefault(); e.stopPropagation()
        const slate = localSlates.find(s => s.id === id)
        if (!slate) return
        setPending({ type: 'archive', slateId: id, slateName: slate.name })
    }

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.preventDefault(); e.stopPropagation()
        const slate = localSlates.find(s => s.id === id)
        if (!slate) return
        setPending({ type: 'delete', slateId: id, slateName: slate.name })
    }

    const handleApprovalToggle = (e: React.MouseEvent, id: string, entity: keyof Slate['approvals']) => {
        e.preventDefault(); e.stopPropagation()
        const slate = localSlates.find(s => s.id === id)
        if (!slate) return
        const willBeTrue = !slate.approvals?.[entity]

        if (entity === 'swoboss' && willBeTrue) {
            // Open confirmation dialog instead of window.confirm()
            setPending({ type: 'swoboss', slateId: id, slateName: slate.name })
            return
        }

        // All other approvals toggle immediately (no confirmation needed)
        const updatedSlate = { ...slate, approvals: { ...slate.approvals, [entity]: willBeTrue } }
        setLocalSlates(prev => prev.map(s => s.id === id ? updatedSlate : s))
        saveSlate(updatedSlate)
    }

    // ── Executors (called when user clicks Confirm in dialog) ───────────────
    const executeAction = () => {
        if (!pending) return

        if (pending.type === 'archive') {
            const updated = localSlates.map(s =>
                s.id === pending.slateId ? { ...s, status: "Archived" as const } : s
            )
            setLocalSlates(updated)
            const slate = updated.find(s => s.id === pending.slateId)
            if (slate) saveSlate(slate)

        } else if (pending.type === 'delete') {
            setLocalSlates(prev => prev.filter(s => s.id !== pending.slateId))
            deleteSlate(pending.slateId)

        } else if (pending.type === 'swoboss') {
            const slate = localSlates.find(s => s.id === pending.slateId)
            if (!slate) return
            const updatedSlate = { ...slate, approvals: { ...slate.approvals, swoboss: true } }
            setLocalSlates(prev => prev.map(s => s.id === pending.slateId ? updatedSlate : s))
            saveSlate(updatedSlate)
            // Apply slate to Oracle pipeline
            const officers = getOfficers()
            const oracleData = getOracleData()
            const updatedOracle = applySlateToOracle(updatedSlate, officers, oracleData)
            writeData('oracle-data', updatedOracle)
        }

        setPending(null)
    }

    // ── Dialog content by type ──────────────────────────────────────────────
    const dialogContent = pending ? {
        archive: {
            title: 'Archive Slate',
            description: `Archive "${pending.slateName}"? It will be moved to Archived Slates and hidden from the active view.`,
            confirmLabel: 'Archive',
            confirmClass: '',
        },
        delete: {
            title: 'Delete Slate',
            description: `Permanently delete "${pending.slateName}"? This cannot be undone.`,
            confirmLabel: 'Delete',
            confirmClass: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        },
        swoboss: {
            title: 'SWOBOSS Approval Confirmation',
            description: `Are you sure SWOBOSS has approved slate "${pending.slateName}"?\n\nThis will mark the slate as SWOBOSS Approved and populate the Oracle pipeline for all filled requirements. This action cannot be undone.`,
            confirmLabel: 'Confirm SWOBOSS Approval',
            confirmClass: 'bg-green-600 text-white hover:bg-green-700',
        },
    }[pending.type] : null

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <PageHeader label="PERS-41 · Slating" title="Active Slates" />
                    <p className="text-muted-foreground">Manage and assign officers to quarterly slates.</p>
                </div>
                <Link to="/slate-generator">
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
                        <Link to="/slate-generator">
                            <Button variant="outline">Create your first slate</Button>
                        </Link>
                    </div>
                ) : (
                    activeSlates.map((slate) => (
                        <Link key={slate.id} to={`/slates/${slate.id}`}>
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

            {/* ── Confirmation Dialog ──────────────────────────────────────── */}
            <AlertDialog open={!!pending} onOpenChange={(open) => { if (!open) setPending(null) }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{dialogContent?.title}</AlertDialogTitle>
                        <AlertDialogDescription className="whitespace-pre-line">
                            {dialogContent?.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className={dialogContent?.confirmClass}
                            onClick={executeAction}
                        >
                            {dialogContent?.confirmLabel}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
