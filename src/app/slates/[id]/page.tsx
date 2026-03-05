"use client"

import { useState, use } from "react"
import { slates, officers, oracleData } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trash2, Plus, Search, UserPlus, Edit } from "lucide-react"
import Link from "next/link"
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
import { formatToMMMyy } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { SlateRequirement, Officer, SlateCandidateProfile } from "@/lib/types"
import { CandidateInputForm } from "@/components/slating/candidate-input-form"

interface SlateDetailPageProps {
    params: Promise<{ id: string }>
}

export default function SlateDetailPage({ params }: SlateDetailPageProps) {
    const { id } = use(params)
    const slate = slates.find(s => s.id === id)

    // Local state
    const [requirements, setRequirements] = useState(slate?.requirements || []);
    const [candidates, setCandidates] = useState<string[]>(slate?.candidates || []);
    const [candidateProfiles, setCandidateProfiles] = useState<SlateCandidateProfile[]>(slate?.candidateProfiles || []);

    // Dialog States
    const [isAddReqDialogOpen, setIsAddReqDialogOpen] = useState(false);
    const [isAddCandidateDialogOpen, setIsAddCandidateDialogOpen] = useState(false);
    const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

    // Profile Edit State
    const [editingOfficerId, setEditingOfficerId] = useState<string | null>(null);

    // Selection States
    const [searchQuery, setSearchQuery] = useState("");
    const [candidateSearchQuery, setCandidateSearchQuery] = useState("");
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

    const handleAssignCandidate = async (officerId: string) => {
        if (!selectedReqId) return;

        const updatedReqs = requirements.map(req => {
            if (req.id === selectedReqId) {
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
        const slateIndex = slates.findIndex(s => s.id === id);
        if (slateIndex !== -1) {
            slates[slateIndex].requirements = reqs;
            slates[slateIndex].candidates = cands;
            slates[slateIndex].candidateProfiles = profiles;
        }
        await persistSlates();
    }

    const persistSlates = async () => {
        try {
            await fetch('/api/update-data', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ slates: slates }),
            });
        } catch (error) {
            console.error("Failed to update slate:", error);
        }
    }

    const filledCount = requirements.filter(r => r.status === "Filled").length
    const totalCount = requirements.length

    // Filter oracle commands for the add requirement dialog
    const availableCommands = oracleData
        .filter(c => !requirements.some(r => r.commandId === c.id))
        .filter(c => c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || (c.uic || "").includes(searchQuery));

    // Valid candidates from global pool (Bank)
    const availableOfficers = officers
        .filter(o => o.status !== "PCC")
        .filter(o => {
            const matchesSearch = o.name?.toLowerCase().includes(candidateSearchQuery.toLowerCase()) ||
                (o.designator || "").includes(candidateSearchQuery);

            // If CO-SM Filter is ON, only show screened officers
            const matchesCosm = cosmFilter ? o.screened?.includes("CO-SM") : true;

            return matchesSearch && matchesCosm;
        });

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
            const res = await fetch('/api/import-candidate', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                const data = await res.json();
                if (data.success && data.profile) {
                    handleSaveProfile(data.profile);
                    alert(`Successfully imported profile for ${data.profile.officerId}`);
                }
            } else {
                const err = await res.json();
                alert(`Import failed: ${err.error}`);
            }
        } catch (error) {
            console.error(error);
            alert("Error uploading file.");
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/slates">
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
                            Download Template
                        </Button>
                        <div className="relative">
                            <Button variant="outline" size="sm" className="relative cursor-pointer">
                                Upload Completed Form
                                <input
                                    type="file"
                                    accept=".xlsx"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleFileUpload}
                                />
                            </Button>
                        </div>
                    </div>
                    <Link href={`/slates/${id}/alignment`}>
                        <Button variant="outline">Alignment Matrix</Button>
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
                        {/* Helper function to check if a requirement is for a CO-SM command */}
                        {(() => {
                            const isCosm = (req: SlateRequirement) => {
                                const cmd = oracleData.find(c => c.id === req.commandId);
                                return cmd?.tags?.includes("CO-SM");
                            };

                            const standardReqs = requirements.filter(r => !isCosm(r));
                            const cosmReqs = requirements.filter(r => isCosm(r));

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
                                                                    if (cmd.notes) {
                                                                        roleDetails += ` • ${cmd.notes}`;
                                                                    }

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
                                    {renderReqTable(standardReqs, "CDR CMD")}
                                    {renderReqTable(cosmReqs, "CO-SM")}
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
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Search officers..."
                                                value={candidateSearchQuery}
                                                onChange={(e) => setCandidateSearchQuery(e.target.value)}
                                                className="pl-8"
                                            />
                                            <Button
                                                variant={cosmFilter ? "default" : "outline"}
                                                onClick={() => setCosmFilter(!cosmFilter)}
                                                size="icon"
                                                title="Filter CO-SM Screened"
                                            >
                                                <span className="text-xs font-bold">SM</span>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto border rounded-md">
                                        <Table>
                                            <TableBody>
                                                {availableOfficers.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell className="text-center h-24 text-muted-foreground">
                                                            No matching officers found.
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    availableOfficers.map((officer) => {
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
                                        return (
                                            <div key={c.id} className="flex items-center justify-between p-2 border rounded-md bg-muted/40 group">
                                                <div>
                                                    <div className="font-medium text-sm flex items-center gap-2">
                                                        {c.name}
                                                        {hasProfile && <Badge variant="secondary" className="text-[10px] h-5 px-1 bg-green-100 text-green-800 hover:bg-green-100">Profile</Badge>}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">{c.rank} • {c.designator}</div>
                                                </div>
                                                <div className="flex gap-1">
                                                    <Button
                                                        variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground"
                                                        onClick={() => setEditingOfficerId(c.id)}
                                                        title="Edit Slate Profile"
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
                                    assignableCandidates = slateCandidates.filter(c => !c.screened?.includes("CO-SM"));
                                }
                            }

                            if (assignableCandidates.length === 0) {
                                return (
                                    <div className="text-center text-muted-foreground">
                                        No eligible candidates in pool.
                                        {slateCandidates.length > 0 && <div className="text-xs mt-1">(CO-SM officers are restricted from Standard Commands)</div>}
                                    </div>
                                )
                            }

                            return (
                                <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-2">
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
                            )
                        })()}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
