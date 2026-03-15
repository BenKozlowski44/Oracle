import { useState } from "react"
import { Officer, OracleCommand } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Check, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface SlatingBoardProps {
    initialOfficers: Officer[]
    initialCommands: OracleCommand[]
}

export function SlatingBoard({ initialOfficers, initialCommands }: SlatingBoardProps) {
    const [officers, setOfficers] = useState(initialOfficers)
    const [commands, setCommands] = useState(initialCommands)

    const [selectedOfficerId, setSelectedOfficerId] = useState<string | null>(null)
    const [selectedCommandId, setSelectedCommandId] = useState<string | null>(null)

    const selectedOfficer = officers.find(o => o.id === selectedOfficerId)
    const selectedCommand = commands.find(c => c.id === selectedCommandId)

    // Filter for available resources
    const availableOfficers = officers.filter(o => o.status === "Available")
    // Filter for ANY command (since we might want to slate for a future gap), 
    // but for the UI let's highlight ones with active next slate params
    const targetCommands = commands

    const handleAssign = () => {
        if (!selectedOfficerId || !selectedCommandId) return

        // visual update only for prototype
        setOfficers(prev => prev.map(o =>
            o.id === selectedOfficerId ? { ...o, status: "Slated" } : o
        ))

        setCommands(prev => prev.map(c => {
            if (c.id === selectedCommandId) {
                // Assign to Inbound XO slot for demo purposes if empty, or just log it
                return {
                    ...c,
                    inboundXO: {
                        name: selectedOfficer?.name || "New Assignee",
                        reportDate: c.nextSlateParams.targetBoardDate // Mock logic
                    }
                }
            }
            return c
        }))

        // Reset selection
        setSelectedOfficerId(null)
        setSelectedCommandId(null)
    }

    return (
        <div className="flex h-[calc(100vh-12rem)] gap-6">
            {/* Officers Column (The Bank) */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="font-semibold mb-2 flex items-center justify-between">
                    <span>The Bank (Available: {availableOfficers.length})</span>
                </div>
                <Card className="flex-1 overflow-hidden bg-muted/50 border-dashed">
                    <ScrollArea className="h-full p-4">
                        <div className="space-y-3">
                            {availableOfficers.map(officer => (
                                <div
                                    key={officer.id}
                                    onClick={() => setSelectedOfficerId(officer.id)}
                                    className={cn(
                                        "p-3 rounded-lg border bg-background cursor-pointer transition-all hover:shadow-md",
                                        selectedOfficerId === officer.id ? "ring-2 ring-primary border-primary" : ""
                                    )}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="font-semibold">{officer.rank} {officer.name}</div>
                                            <div className="text-sm text-muted-foreground">{officer.designator} • PRD: {new Date(officer.prd).toLocaleDateString()}</div>
                                        </div>
                                        <Badge variant="outline">{officer.currentCommand}</Badge>
                                    </div>
                                    <div className="mt-2 text-xs text-muted-foreground truncate">
                                        Prefs: {officer.preferences.join(", ")}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </Card>
            </div>

            {/* Action Column */}
            <div className="w-12 flex flex-col items-center justify-center gap-4">
                <ArrowRight className="text-muted-foreground/50" />
            </div>

            {/* Commands Column (The Oracle) */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="font-semibold mb-2 flex items-center justify-between">
                    <span>The Oracle (Commands)</span>
                </div>
                <Card className="flex-1 overflow-hidden bg-muted/50 border-dashed">
                    <ScrollArea className="h-full p-4">
                        <div className="space-y-3">
                            {targetCommands.map(cmd => (
                                <div
                                    key={cmd.id}
                                    onClick={() => setSelectedCommandId(cmd.id)}
                                    className={cn(
                                        "p-3 rounded-lg border bg-background cursor-pointer transition-all hover:shadow-md",
                                        selectedCommandId === cmd.id ? "ring-2 ring-primary border-primary" : ""
                                    )}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="font-semibold">{cmd.name}</div>
                                            <div className="text-xs text-muted-foreground">{cmd.location}</div>
                                        </div>
                                        <Badge variant={cmd.inboundXO ? "outline" : "default"}>
                                            {cmd.inboundXO ? "Inbound Set" : `Needs ${cmd.nextSlateParams.requirement}`}
                                        </Badge>
                                    </div>
                                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                        <div>CO: {cmd.currentCO.name}</div>
                                        <div>XO: {cmd.currentXO.name}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </Card>
            </div>

            {/* Detail / Action Panel */}
            <Card className="w-80 flex flex-col">
                <CardHeader>
                    <CardTitle>Slate Action</CardTitle>
                    <CardDescription>Confirm assignment</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                    <div className="space-y-1">
                        <span className="text-xs font-semibold uppercase text-muted-foreground">Officer</span>
                        <div className={cn("text-sm p-2 rounded-md bg-muted", !selectedOfficer && "text-muted-foreground italic")}>
                            {selectedOfficer ? `${selectedOfficer.rank} ${selectedOfficer.name}` : "Select from Bank"}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                        <span className="text-xs font-semibold uppercase text-muted-foreground">Command Slot</span>
                        <div className={cn("text-sm p-2 rounded-md bg-muted", !selectedCommand && "text-muted-foreground italic")}>
                            {selectedCommand ? (
                                <div className="flex flex-col">
                                    <span>{selectedCommand.name}</span>
                                    <span className="text-xs text-muted-foreground">Filling: {selectedCommand.nextSlateParams.requirement}</span>
                                </div>
                            ) : (
                                "Select from Oracle"
                            )}
                        </div>
                    </div>

                    <Separator className="my-2" />

                    {/* Conflict Check Mockup */}
                    {selectedOfficer && selectedCommand && (
                        <div className="rounded-md border p-2 text-xs space-y-2">
                            <div className="font-semibold">Slating Checks</div>
                            {/* Mock simple check logic */}
                            <div className="flex items-center gap-2 text-green-600">
                                <Check className="h-3 w-3" /> Quals Match (1310/1110)
                            </div>
                            <div className="flex items-center gap-2 text-amber-600">
                                <AlertCircle className="h-3 w-3" /> PRD alignment (+/- 2 mo)
                            </div>
                        </div>
                    )}

                    <div className="mt-auto">
                        <Button
                            className="w-full"
                            disabled={!selectedOfficer || !selectedCommand}
                            onClick={handleAssign}
                        >
                            Confirm Slate
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
