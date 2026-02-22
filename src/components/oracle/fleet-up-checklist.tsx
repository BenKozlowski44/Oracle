"use strict";

import { useState } from "react"
import { Check, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { OracleCommand } from "@/lib/types"

interface FleetUpChecklistProps {
    command: OracleCommand
    onUpdate: (updatedCommand: OracleCommand) => void
}

export function FleetUpChecklist({ command, onUpdate }: FleetUpChecklistProps) {
    const [open, setOpen] = useState(false)

    const progress = command.fleetUpProgress || {
        isic: false,
        tycom: false,
        pco: false,
        orders: false,
        coc: false
    }

    const handleToggle = (key: keyof typeof progress) => {
        const newProgress = { ...progress, [key]: !progress[key] }
        const updatedCommand: OracleCommand = {
            ...command,
            fleetUpProgress: newProgress
        }
        onUpdate(updatedCommand)
    }

    // Calculate completion for icon state
    const completedCount = Object.values(progress).filter(Boolean).length
    const totalCount = 5
    const isComplete = completedCount === totalCount

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className={`h-6 w-6 ${isComplete ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {isComplete ? <Check className="h-4 w-4" /> : <ClipboardList className="h-4 w-4" />}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60">
                <div className="space-y-4">
                    <h4 className="font-medium leading-none">Fleet Up Checklist</h4>
                    <p className="text-sm text-muted-foreground">Detailed status for current XO verification.</p>

                    <div className="grid gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="isic" checked={progress.isic} onCheckedChange={() => handleToggle('isic')} />
                            <Label htmlFor="isic">ISIC Endorsement</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="tycom" checked={progress.tycom} onCheckedChange={() => handleToggle('tycom')} />
                            <Label htmlFor="tycom">TYCOM Fleet Up</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="pco" checked={progress.pco} onCheckedChange={() => handleToggle('pco')} />
                            <Label htmlFor="pco">PCO</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="orders" checked={progress.orders} onCheckedChange={() => handleToggle('orders')} />
                            <Label htmlFor="orders">Orders</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="coc" checked={progress.coc} onCheckedChange={() => handleToggle('coc')} />
                            <Label htmlFor="coc">CoC</Label>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
