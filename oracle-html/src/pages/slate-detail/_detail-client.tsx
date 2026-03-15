import { useState, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { toast } from "sonner"
import type { Slate, Officer, OracleCommand } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trash2, Plus, Search, UserPlus, Edit, Upload } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { formatToMMMyy, cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { SlateRequirement, SlateCandidateProfile } from "@/lib/types"
import { CandidateInputForm } from "@/components/slating/candidate-input-form"
import { CandidateProfileView } from "@/components/slating/candidate-profile-view"

interface SlateDetailClientProps {
    id: string
    allSlates: Slate[]
    officers: Officer[]
    oracleData: OracleCommand[]
}

export function SlateDetailClient({ id, allSlates, officers, oracleData }: SlateDetailClientProps) {
    const navigate = useNavigate()
    const slate = allSlates.find(s => s.id === id)

    // Local state
    const [requirements, setRequirements] = useState(slate?.requirements || []);
    const [candidates, setCandidates] = useState<string[]>(slate?.candidates || []);
    const [candidateProfiles, setCandidateProfiles] = useState<SlateCandidateProfile[]>(slate?.candidateProfiles || []);

    // Dialog States
    const [isAddReqDialogOpen, setIsAddReqDialogOpen] = useState(false);
    const [isAddDirectCoDialogOpen, setIsAddDirectCoDialogOpen] = useState(false);
    const [isAddCandidateDialogOpen, setIsAddCandidateDialogOpen] = useState(false);
    const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

    // Profile Edit State
    const [editingOfficerId, setEditingOfficerId] = useState<string | null>(null);
    const [viewingOfficerId, setViewingOfficerId] = useState<string | null>(null);

    // Per-candidate upload state
    const [uploadTargetOfficerId, setUploadTargetOfficerId] = useState<string | null>(null);
    const [uploadingOfficerId, setUploadingOfficerId] = useState<string | null>(null);
    const perCandidateFileInputRef = useRef<HTMLInputElement>(null);

    // Selection States
    const [searchQuery, setSearchQuery] = useState("");
    const [directCoSearchQuery, setDirectCoSearchQuery] = useState("");
    const [candidateSearchQuery, setCandidateSearchQuery] = useState("");
    const [candidateTab, setCandidateTab] = useState<"firefighters" | "bank">("firefighters");
    const [selectedReqId, setSelectedReqId] = useState<string | null>(null);
    const [cosmFilter, setCosmFilter] = useState(false); // Toggle to show only CO-SM screened

    if (!slate) {
        return <div className="p-8 text-center text-muted-foreground">Slate not found</div>
    }

    const handleRemoveRequirement = async (reqId: string) => {
        if (!confirm("Are you sure you want to remove this requirement from the slate?")) return;

        const updatedReqs = requirements.filter(r => r.id !== reqId);
        setRequirements(updatedReqs);
        updateSlateData(updatedReqs, candidates, candidateProfiles);
    }

    const handleAddCommand = async (commandId: string) => {
        const cmd = oracleData.find(c => c.id === commandId);
        if (!cmd) return;

        const newReq: SlateRequirement = {
            id: `req-${cmd.id}-xo-${Date.now()}`,
            commandName: cmd.name,
            commandId: cmd.id,
            role: "XO",
            incumbent: cmd.currentXO?.name || "Unknown",
            incumbentPrd: cmd.currentXO?.prd || "",
            status: "Draft"
        };

        const updatedReqs = [...requirements, newReq];
        setRequirements(updatedReqs);
        updateSlateData(updatedReqs, candidates, candidateProfiles);
        setIsAddReqDialogOpen(false);
        setSearchQuery("");
    }

    const handleAddDirectCoCommand = async (commandId: string) => {
        const cmd = oracleData.find(c => c.id === commandId);
        if (!cmd) return;

        const newReq: SlateRequirement = {
            id: `req-${cmd.id}-co-${Date.now()}`,
            commandName: cmd.name,
            commandId: cmd.id,
            role: "CO",
            incumbent: cmd.currentCO?.name || "Unknown",
            incumbentPrd: cmd.currentCO?.prd || "",
            status: "Draft"
        };

        const updatedReqs = [...requirements, newReq];
        setRequirements(updatedReqs);
        updateSlateData(updatedReqs, candidates, candidateProfiles);
        setIsAddDirectCoDialogOpen(false);
        setDirectCoSearchQuery("");
    }

    const handleAddCandidate = async (officerId: string) => {
        if (candidates.includes(officerId)) return;

        const updatedCandidates = [...candidates, officerId];
        setCandidates(updatedCandidates);
        updateSlateData(requirements, updatedCandidates, candidateProfiles);
    }

    const handleRemoveCandidate = async (officerId: string) => {
        const updatedCandidates = candidates.filter(id => id !== officerId);
        setCandidates(updatedCandidates);
        updateSlateData(requirements, updatedCandidates, candidateProfiles);
    }

    const handleSaveProfile = (profile: SlateCandidateProfile) => {
        const existingIndex = candidateProfiles.findIndex(p => p.officerId === profile.officerId);
        let updatedProfiles = [...candidateProfiles];

        if (existingIndex >= 0) {
            updatedProfiles[existingIndex] = profile;
        } else {
            updatedProfiles.push(profile);
        }

        setCandidateProfiles(updatedProfiles);
        updateSlateData(requirements, candidates, updatedProfiles);
        setEditingOfficerId(null);
    }

    const openAssignDialog = (reqId: string) => {
        setSelectedReqId(reqId);
        setIsAssignDialogOpen(true);
    }

    const handleAssignCandidate = async (officerId: string | null) => {
        if (!selectedReqId) return;

        const updatedReqs = requirements.map(req => {
            if (req.id === selectedReqId) {
                if (!officerId) return { ...req, status: "Draft" as const, filledBy: undefined };
                return { ...req, status: "Filled" as const, filledBy: officerId };
            }
            return req;
        });

        setRequirements(updatedReqs);
        updateSlateData(updatedReqs, candidates, candidateProfiles);
        setIsAssignDialogOpen(false);
        setSelectedReqId(null);
    }

    const updateSlateData = async (reqs: SlateRequirement[], cands: string[], profiles: SlateCandidateProfile[]) => {
        await persistSlates(reqs, cands, profiles);
    }

    const persistSlates = async (reqs: SlateRequirement[], cands: string[], profiles: SlateCandidateProfile[]) => {
        try {
            saveSlate(slateWithReqs)
            
        } catch (error) {
            console.error("Failed to update slate:", error);
        }
    }

    const filledCount = requirements.filter(r => r.status === "Filled").length
    const totalCount = requirements.length

    // Split requirements by role
    const xoReqs = requirements.filter(r => r.role === 'XO')
    const directCoReqs = requirements.filter(r => r.role === 'CO')
    const cosmReqs = requirements.filter(r => r.role === 'CO-SM')

    // Search filters
    const availableCommands = oracleData
        .filter(c => !requirements.some(r => r.commandId === c.id))
        .filter(c => c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || (c.uic || "").includes(searchQuery));

    const availableDirectCoCommands = oracleData
        .filter(c => !directCoReqs.some(r => r.commandId === c.id))
        .filter(c => c.name?.toLowerCase().includes(directCoSearchQuery.toLowerCase()) || (c.uic || "").includes(directCoSearchQuery));

    // Valid candidates from global pool (Bank)
    const firefighterOfficers = officers.filter(o => o.status === 'Ready FF')
    const bankOfficers = officers.filter(o => o.status !== 'Ready FF' && o.status !== 'PCC')

    const filterBySearch = (list: typeof officers) =>
        list.filter(o =>
            o.name?.toLowerCase().includes(candidateSearchQuery.toLowerCase()) ||
            (o.designator || "").includes(candidateSearchQuery)
        )

    const displayedCandidateTab = candidateTab === 'firefighters'
        ? filterBySearch(firefighterOfficers)
        : filterBySearch(bankOfficers)

    // Hydrate candidates for display
    const slateCandidates = candidates
        .map(cid => officers.find(o => o.id === cid))
        .filter((o): o is Officer => !!o);

    const handleDownloadTemplate = () => {
        // Use the new dynamic API endpoint
        const link = document.createElement('a');
        link.href = `/api/slates/${id}/template`;
        // We don't need to set download attribute if the server sends Content-Disposition, 
        // but setting it helps if the browser ignores headers or for testing.
        // The server sends a filename, so we can let the browser handle it, or force one.
        // Let's just click the link.
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file);
        formData.append('slateId', slate.id);

        try {
            const ok = true
            if (ok) {
                const data = await res.json();
                if (data.success && data.profile) {
                    handleSaveProfile(data.profile);
                    toast.success(`Profile imported successfully`);
                }
            } else {
                const err = await res.json();
                toast.error(`Import failed: ${err.error}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error uploading file — check console for details.");
        }
    }

    const handlePerCandidateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0 || !uploadTargetOfficerId) return;
        const file = e.target.files[0];
        setUploadingOfficerId(uploadTargetOfficerId);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('slateId', slate.id);
        formData.append('officerId', uploadTargetOfficerId);

        try {
            const ok = true
            if (ok) {
                const data = await res.json();
                if (data.success && data.profile) {
                    handleSaveProfile(data.profile);
                    const officerName = officers.find(o => o.id === uploadTargetOfficerId)?.name ?? 'Officer';
                    toast.success(`Profile imported for ${officerName}`);
                }
            } else {
                const err = await res.json();
                toast.error(`Import failed: ${err.error}`);
            }
        } catch (err) {
            console.error(err);
            toast.error('Error uploading file — check console for details.');
        } finally {
            setUploadingOfficerId(null);
            setUploadTargetOfficerId(null);
            if (perCandidateFileInputRef.current) perCandidateFileInputRef.current.value = '';
        }
    }


    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/slates">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{slate.name}</h1>
                    <p className="text-muted-foreground">
                        Fill Window: {formatToMMMyy(slate.windowStart)} - {formatToMMMyy(slate.windowEnd)}
                    </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <div className="flex gap-2 mr-4 border-r pr-4">
                        <Button variant="outline" size="sm" onClick={handleDownloadTemplate}>
                            Preference Template
                        </Button>
                    </div>
                    <Link to={`/slates/${id}/alignment`}>
                        <Button variant="outline">Alignment Matrix</Button>
                    </Link>
                    <Link to={`/slates/${id}/brief`}>
                        <Button variant="outline">Detailer Slate</Button>
                    </Link>
                    <Badge variant="outline" className="text-sm px-3 py-1">
                        {filledCount} / {totalCount} Requirements Filled
                    </Badge>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Main Requirements Table */}
                <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Requirements</CardTitle>
                        <Dialog open={isAddReqDialogOpen} onOpenChange={setIsAddReqDialogOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Requirement
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]" aria-describedby={undefined}>
                                <DialogHeader>
                                    <DialogTitle>Add Command to Slate</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="relative">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search commands..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto border rounded-md">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Command</TableHead>
                                                    <TableHead>Current XO</TableHead>
                                                    <TableHead></TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {availableCommands.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                                                            No commands found.
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    availableCommands.slice(0, 50).map((cmd) => (
                                                        <TableRow key={cmd.id}>
                                                            <TableCell className="font-medium">
                                                                <div>{cmd.name}</div>
                                                                <div className="text-xs text-muted-foreground">{cmd.uic}</div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="text-sm">{cmd.currentXO?.name}</div>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <Button size="sm" variant="ghost" onClick={() => handleAddCommand(cmd.id)}>
                                                                    Add
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* ── Shared renderReqTable ────────────────────────────────── */}
                        {(() => {
                            const renderReqTable = (reqs: SlateRequirement[], title: string) => (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">{title}</h3>
                                        <Badge variant="secondary" className="text-xs">
                                            {reqs.length} Commands
                                        </Badge>
                                    </div>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Command</TableHead>
                                                <TableHead>Incumbent</TableHead>
                                                <TableHead>Rotate Date</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {reqs.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                                        No {title.toLowerCase()} in this slate.
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                reqs.map((req) => {
                                                    const filledOfficer = req.filledBy ? officers.find(o => o.id === req.filledBy) : null;
                                                    return (
                                                        <TableRow key={req.id}>
                                                            <TableCell className="font-medium">
                                                                <div>{req.commandName}</div>
                                                                {(() => {
                                                                    const cmd = oracleData.find(c => c.id === req.commandId);
                                                                    if (!cmd) return <div className="text-xs text-muted-foreground font-normal">{req.role}</div>;
                                                                    const tags = cmd.tags ? cmd.tags.filter(t => t !== "CO-SM" && t !== "CDR CMD").join(", ") : "";
                                                                    const locationInfo = [cmd.uic, cmd.location, tags].filter(Boolean).join(" • ");
                                                                    let roleDetails = `Role: ${req.role}`;
                                                                    if (cmd.tags?.includes("CO-SM") || title === "CO-SM") {
                                                                        const style = cmd.rotationStyle === "DirectCO" ? "Direct Input CO" : "Fleet Up CO";
                                                                        const length = cmd.tourLength ? `${cmd.tourLength} mos` : "";
                                                                        roleDetails += ` (${style} ${length}`.trim() + `)`;
                                                                    }
                                                                    if (cmd.notes) roleDetails += ` • ${cmd.notes}`;
                                                                    return (
                                                                        <div className="mt-1 space-y-0.5">
                                                                            {locationInfo && <div className="text-[11px] text-muted-foreground font-normal leading-tight">{locationInfo}</div>}
                                                                            <div className="text-xs text-muted-foreground font-normal leading-tight">{roleDetails}</div>
                                                                        </div>
                                                                    );
                                                                })()}
                                                            </TableCell>
                                                            <TableCell>{req.incumbent}</TableCell>
                                                            <TableCell>{formatToMMMyy(req.incumbentPrd)}</TableCell>
                                                            <TableCell>
                                                                {filledOfficer ? (
                                                                    <div className="flex flex-col">
                                                                        <Badge variant="default">Filled</Badge>
                                                                        <span className="text-xs mt-1 text-muted-foreground">{filledOfficer.name}</span>
                                                                    </div>
                                                                ) : (
                                                                    <Badge variant="secondary">Open</Badge>
                                                                )}
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <div className="flex justify-end gap-2">
                                                                    <Button
                                                                        size="sm"
                                                                        variant={req.status === "Filled" ? "outline" : "default"}
                                                                        onClick={() => openAssignDialog(req.id)}
                                                                    >
                                                                        {req.status === "Filled" ? "Edit" : "Assign"}
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="ghost"
                                                                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                                                        onClick={() => handleRemoveRequirement(req.id)}
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            );

                            return (
                                <>
                                    {/* ── CDR CMD ───────────────────────────── */}
                                    {renderReqTable(xoReqs, "CDR CMD")}

                                    {/* ── Direct CO Input ───────────────────── */}
                                    <div className="space-y-4 pt-2 border-t">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold">Direct CO Input</h3>
                                                <p className="text-xs text-muted-foreground">Officers appointed directly as CO (no fleet-up)</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className="text-xs">{directCoReqs.length} Commands</Badge>
                                                {/* Add Direct CO dialog */}
                                                <Dialog open={isAddDirectCoDialogOpen} onOpenChange={setIsAddDirectCoDialogOpen}>
                                                    <DialogTrigger asChild>
                                                        <Button size="sm" variant="outline">
                                                            <Plus className="mr-2 h-4 w-4" />
                                                            Add Direct CO
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[600px]" aria-describedby={undefined}>
                                                        <DialogHeader>
                                                            <DialogTitle>Add Direct CO Command</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="relative">
                                                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                                <Input
                                                                    placeholder="Search commands..."
                                                                    value={directCoSearchQuery}
                                                                    onChange={(e) => setDirectCoSearchQuery(e.target.value)}
                                                                    className="pl-8"
                                                                />
                                                            </div>
                                                            <div className="max-h-[300px] overflow-y-auto border rounded-md">
                                                                <Table>
                                                                    <TableHeader>
                                                                        <TableRow>
                                                                            <TableHead>Command</TableHead>
                                                                            <TableHead>Current CO</TableHead>
                                                                            <TableHead></TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        {availableDirectCoCommands.length === 0 ? (
                                                                            <TableRow>
                                                                                <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                                                                                    No commands found.
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        ) : (
                                                                            availableDirectCoCommands.slice(0, 50).map((cmd) => (
                                                                                <TableRow key={cmd.id}>
                                                                                    <TableCell className="font-medium">
                                                                                        <div>{cmd.name}</div>
                                                                                        <div className="text-xs text-muted-foreground">{cmd.uic}</div>
                                                                                    </TableCell>
                                                                                    <TableCell>
                                                                                        <div className="text-sm">{cmd.currentCO?.name}</div>
                                                                                    </TableCell>
                                                                                    <TableCell className="text-right">
                                                                                        <Button size="sm" variant="ghost" onClick={() => handleAddDirectCoCommand(cmd.id)}>
                                                                                            Add
                                                                                        </Button>
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            ))
                                                                        )}
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Command</TableHead>
                                                    <TableHead>Current CO</TableHead>
                                                    <TableHead>Rotate Date</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead className="text-right">Action</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {directCoReqs.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="h-16 text-center text-muted-foreground">
                                                            No direct CO inputs added.
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    directCoReqs.map((req) => {
                                                        const filledOfficer = req.filledBy ? officers.find(o => o.id === req.filledBy) : null;
                                                        const cmd = oracleData.find(c => c.id === req.commandId);
                                                        const locationInfo = cmd ? [cmd.uic, cmd.location].filter(Boolean).join(" • ") : "";
                                                        return (
                                                            <TableRow key={req.id}>
                                                                <TableCell className="font-medium">
                                                                    <div>{req.commandName}</div>
                                                                    {locationInfo && <div className="text-[11px] text-muted-foreground">{locationInfo}</div>}
                                                                </TableCell>
                                                                <TableCell>{req.incumbent}</TableCell>
                                                                <TableCell>{formatToMMMyy(req.incumbentPrd)}</TableCell>
                                                                <TableCell>
                                                                    {filledOfficer ? (
                                                                        <div className="flex flex-col">
                                                                            <Badge variant="default">Filled</Badge>
                                                                            <span className="text-xs mt-1 text-muted-foreground">{filledOfficer.name}</span>
                                                                        </div>
                                                                    ) : (
                                                                        <Badge variant="secondary">Open</Badge>
                                                                    )}
                                                                </TableCell>
                                                                <TableCell className="text-right">
                                                                    <div className="flex justify-end gap-2">
                                                                        <Button
                                                                            size="sm"
                                                                            variant={req.status === "Filled" ? "outline" : "default"}
                                                                            onClick={() => openAssignDialog(req.id)}
                                                                        >
                                                                            {req.status === "Filled" ? "Edit" : "Assign"}
                                                                        </Button>
                                                                        <Button
                                                                            size="sm"
                                                                            variant="ghost"
                                                                            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                                                            onClick={() => handleRemoveRequirement(req.id)}
                                                                        >
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    {/* ── CO-SM ─────────────────────────────── */}
                                    <div className="pt-2 border-t">
                                        {renderReqTable(cosmReqs, "CO-SM")}
                                    </div>
                                </>
                            );
                        })()}
                    </CardContent>

                </Card>

                {/* Candidates / Bench Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between padding-bottom-2">
                        <div className="space-y-1">
                            <CardTitle>Candidates</CardTitle>
                            <CardDescription>Available Pool</CardDescription>
                        </div>
                        <Dialog open={isAddCandidateDialogOpen} onOpenChange={setIsAddCandidateDialogOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                    <UserPlus className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]" aria-describedby={undefined}>
                                <DialogHeader>
                                    <DialogTitle>Manage Candidates</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="relative">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search officers..."
                                            value={candidateSearchQuery}
                                            onChange={(e) => setCandidateSearchQuery(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                    {/* Tabs */}
                                    <div className="flex gap-1 border-b pb-2">
                                        <button
                                            className={`px-3 py-1 text-sm rounded-t font-medium transition-colors ${candidateTab === 'firefighters' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                            onClick={() => setCandidateTab('firefighters')}
                                        >
                                            Firefighters ({firefighterOfficers.length})
                                        </button>
                                        <button
                                            className={`px-3 py-1 text-sm rounded-t font-medium transition-colors ${candidateTab === 'bank' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                            onClick={() => setCandidateTab('bank')}
                                        >
                                            Officer Bank ({bankOfficers.length})
                                        </button>
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto border rounded-md">
                                        <Table>
                                            <TableBody>
                                                {displayedCandidateTab.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell className="text-center h-24 text-muted-foreground">
                                                            No matching officers found.
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    displayedCandidateTab.map((officer: Officer) => {
                                                        const isAdded = candidates.includes(officer.id);
                                                        return (
                                                            <TableRow key={officer.id}>
                                                                <TableCell>
                                                                    <div>
                                                                        <div className="font-medium">
                                                                            {officer.name}
                                                                            {officer.screened?.includes("CO-SM") && (
                                                                                <Badge variant="secondary" className="ml-2 text-[10px] px-1 h-5">CO-SM</Badge>
                                                                            )}
                                                                        </div>
                                                                        <div className="text-sm text-muted-foreground">
                                                                            {officer.rank} • {officer.designator} • PRD: {formatToMMMyy(officer.prd)}
                                                                        </div>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell className="text-right">
                                                                    <Button
                                                                        size="sm"
                                                                        variant={isAdded ? "destructive" : "ghost"}
                                                                        onClick={() => isAdded ? handleRemoveCandidate(officer.id) : handleAddCandidate(officer.id)}
                                                                    >
                                                                        {isAdded ? "Remove" : "Add"}
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {slateCandidates.length === 0 ? (
                                <div className="text-center py-8 text-sm text-muted-foreground border border-dashed rounded-md">
                                    No candidates added.
                                    <br />
                                    Click + to add from Bank.
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {slateCandidates.map(c => {
                                        const profile = candidateProfiles.find(p => p.officerId === c.id);
                                        const hasProfile = !!profile;

                                        // Profile completeness scoring (6 sections)
                                        const completenessChecks = profile ? [
                                            {
                                                label: 'Contact Info',
                                                done: !!(profile.contactInfo?.workEmail || profile.contactInfo?.personalPhone)
                                            },
                                            {
                                                label: 'Flag Notifier',
                                                done: !!profile.flagContact?.name
                                            },
                                            {
                                                label: 'Command Preferences',
                                                done: profile.preferences.length > 0
                                            },
                                            {
                                                label: 'Tour History',
                                                done: !!(profile.tourHistory?.some(t => t.ship))
                                            },
                                            {
                                                label: 'JPME / WTI',
                                                done: !!(profile.jpme || profile.wti)
                                            },
                                            {
                                                label: 'Availability Date',
                                                done: !!profile.availabilityDate
                                            },
                                        ] : [];
                                        const completedCount = completenessChecks.filter(c => c.done).length;
                                        const totalCount = completenessChecks.length;
                                        const missingLabels = completenessChecks.filter(c => !c.done).map(c => c.label);
                                        const completenessColor = totalCount === 0 ? '' :
                                            completedCount === totalCount ? 'bg-green-100 text-green-800 border-green-200' :
                                                completedCount >= 4 ? 'bg-amber-100 text-amber-800 border-amber-200' :
                                                    'bg-rose-100 text-rose-800 border-rose-200';

                                        // Check if candidate is assigned to any requirement in this slate
                                        const assignedReq = requirements.find(r => r.filledBy === c.id);
                                        const isAssigned = !!assignedReq;

                                        return (
                                            <div key={c.id} className={cn("flex items-center justify-between p-2 border rounded-md group transition-all", isAssigned ? "bg-muted/10 opacity-60" : "bg-muted/40")}>
                                                <div>
                                                    <button
                                                        className="font-medium text-sm flex items-center gap-2 hover:underline cursor-pointer text-left"
                                                        onClick={() => setViewingOfficerId(c.id)}
                                                    >
                                                        {c.name}
                                                        {hasProfile && (
                                                            <Badge
                                                                variant="outline"
                                                                className={`text-[10px] h-5 px-1.5 border ${completenessColor}`}
                                                                title={missingLabels.length > 0 ? `Missing: ${missingLabels.join(', ')}` : 'Profile complete'}
                                                            >
                                                                {completedCount}/{totalCount}
                                                            </Badge>
                                                        )}
                                                        {isAssigned && <Badge variant="default" className="text-[10px] h-5 px-1">Slated</Badge>}
                                                    </button>
                                                    <div className="text-xs text-muted-foreground">
                                                        {c.rank} • {c.designator}
                                                        {isAssigned && assignedReq && <span className="ml-1 text-primary/80">• Assigned: {assignedReq.commandName}</span>}
                                                    </div>
                                                </div>
                                                <div className="flex gap-1">
                                                    {/* Per-candidate upload icon */}
                                                    <Button
                                                        variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground"
                                                        title="Upload Completed Form"
                                                        disabled={uploadingOfficerId === c.id}
                                                        onClick={() => {
                                                            setUploadTargetOfficerId(c.id);
                                                            perCandidateFileInputRef.current?.click();
                                                        }}
                                                    >
                                                        <Upload className={`h-3 w-3 ${uploadingOfficerId === c.id ? 'animate-pulse text-primary' : ''}`} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground"
                                                        onClick={() => setViewingOfficerId(c.id)}
                                                        title="View Profile"
                                                    >
                                                        <Edit className="h-3 w-3" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                                        onClick={() => handleRemoveCandidate(c.id)}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Candidate Profile Dialog */}
            <Dialog open={!!editingOfficerId} onOpenChange={(open) => !open && setEditingOfficerId(null)}>
                <DialogContent className="sm:max-w-2xl" aria-describedby={undefined}>
                    {editingOfficerId && (() => {
                        const officer = officers.find(o => o.id === editingOfficerId);
                        if (!officer) return null;
                        const profile = candidateProfiles.find(p => p.officerId === editingOfficerId);
                        // Get commands associated with this slate to pick from
                        const slateCommands = requirements.map(r => oracleData.find(od => od.id === r.commandId)).filter(Boolean) as any[];

                        return (
                            <CandidateInputForm
                                slateId={slate.id}
                                officer={officer}
                                commands={slateCommands}
                                initialProfile={profile}
                                onSave={handleSaveProfile}
                                onCancel={() => setEditingOfficerId(null)}
                            />
                        )
                    })()}
                </DialogContent>
            </Dialog>

            {/* Assign Dialog */}
            <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
                <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>Assign Candidate</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        {(() => {
                            // Filter candidates based on requirement type
                            let assignableCandidates = slateCandidates;
                            const targetReq = requirements.find(r => r.id === selectedReqId);

                            if (targetReq) {
                                const cmd = oracleData.find(c => c.id === targetReq.commandId);
                                const isCosmCommand = cmd?.tags?.includes("CO-SM");

                                if (!isCosmCommand) {
                                    // For Standard Commands, EXCLUDE CO-SM screened officers
                                    assignableCandidates = assignableCandidates.filter(c => !c.screened?.includes("CO-SM"));
                                }
                            }

                            // EXCLUDE candidates already assigned to another command
                            assignableCandidates = assignableCandidates.filter(c => {
                                const assignedReq = requirements.find(r => r.filledBy === c.id);
                                return !assignedReq || assignedReq.id === selectedReqId;
                            });

                            if (assignableCandidates.length === 0 && targetReq?.status !== "Filled") {
                                return (
                                    <div className="text-center text-muted-foreground">
                                        No eligible candidates in pool.
                                        {slateCandidates.length > 0 && <div className="text-xs mt-1">(CO-SM or Already Assigned restrictions apply)</div>}
                                    </div>
                                )
                            }

                            return (
                                <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-2">
                                    {targetReq?.status === "Filled" && (
                                        <Button
                                            variant="destructive"
                                            className="justify-start h-auto py-3"
                                            onClick={() => handleAssignCandidate(null)}
                                        >
                                            <div className="text-left font-medium">Unassign Current Officer</div>
                                        </Button>
                                    )}
                                    {assignableCandidates.map(c => (
                                        <Button
                                            key={c.id}
                                            variant="outline"
                                            className="justify-start h-auto py-3"
                                            onClick={() => handleAssignCandidate(c.id)}
                                        >
                                            <div className="text-left">
                                                <div className="font-medium">
                                                    {c.name}
                                                    {c.screened?.includes("CO-SM") && (
                                                        <Badge variant="secondary" className="ml-2 text-[10px] px-1 h-5">CO-SM</Badge>
                                                    )}
                                                </div>
                                                <div className="text-xs text-muted-foreground">{c.rank} • {c.designator}</div>
                                            </div>
                                        </Button>
                                    ))}
                                </div>
                            );
                        })()}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Hidden shared file input for per-candidate upload */}
            <input
                ref={perCandidateFileInputRef}
                type="file"
                accept=".xlsx"
                className="hidden"
                onChange={handlePerCandidateUpload}
            />

            {/* Candidate Profile Viewer */}
            {
                viewingOfficerId && (() => {
                    const officer = officers.find(o => o.id === viewingOfficerId);
                    const profile = candidateProfiles.find(p => p.officerId === viewingOfficerId);
                    if (!officer) return null;
                    return (
                        <CandidateProfileView
                            officer={officer}
                            profile={profile ?? {
                                id: '',
                                slateId: slate.id,
                                officerId: viewingOfficerId,
                                preferences: [],
                            }}
                            open={!!viewingOfficerId}
                            onClose={() => setViewingOfficerId(null)}
                            onSave={handleSaveProfile}
                        />
                    );
                })()
            }
        </div >
    )
}
