"use client"

import { useState, useEffect } from "react"
import { addMonths, parse, isValid, format, parseISO } from "date-fns"
import { calculateTargetBoard, predictNextVacancyDate } from "@/lib/utils"
import { OracleCommand, Officer } from "@/lib/types"
import { OfficerNameInput } from "./officer-name-input"
import { CommandTimeline } from "./command-timeline"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface EditCommandDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    command: OracleCommand | null
    onSave: (updatedCommand: OracleCommand) => void
    onCOTurnover: (commandId: string) => void
    onXOFleetUp: (commandId: string) => void
    onDelete: (commandId: string) => void
    officers?: Officer[]
}

export function EditCommandDialog({
    open,
    onOpenChange,
    command,
    onSave,
    onCOTurnover,
    onXOFleetUp,
    onDelete,
    officers = [],
}: EditCommandDialogProps) {
    const [formData, setFormData] = useState<OracleCommand | null>(null)
    const [confirmAction, setConfirmAction] = useState<"delete" | "relieveCO" | "fleetUp" | null>(null)

    // ... (rest of component state/logic stays same until render)

    useEffect(() => {
        if (command) {
            setFormData({ ...command })
        }
    }, [command])

    // Auto-compute Target Board based on the furthest arriving officer
    useEffect(() => {
        if (formData) {
            const newBoard = predictNextVacancyDate(formData);
            if (newBoard !== "TBD" && newBoard !== formData.nextSlateParams.targetBoardDate) {
                setFormData(prev => {
                    if (!prev) return null;
                    return {
                        ...prev,
                        nextSlateParams: {
                            ...prev.nextSlateParams,
                            targetBoardDate: newBoard
                        }
                    };
                });
            }
        }
    }, [
        formData?.slatedXO?.name,
        formData?.slatedXO?.reportDate,
        formData?.slatedXO?.timelineData?.k,
        formData?.inboundXO?.reportDate,
        formData?.currentXO?.prd,
        formData?.currentCO?.prd
    ]);

    if (!formData) return null

    const handleChange = (field: string, value: string | number) => {
        setFormData((prev) => {
            if (!prev) return null
            return { ...prev, [field]: value }
        })
    }

    const handleNestedChange = (parent: "currentCO" | "currentXO" | "inboundXO" | "nextSlateParams", field: string, value: string) => {
        setFormData((prev) => {
            if (!prev) return null
            // Handle optional inboundXO initialization
            if (parent === "inboundXO" && !prev.inboundXO) {
                const newInbound = { name: "", reportDate: "" };
                // @ts-ignore
                newInbound[field] = value;
                return {
                    ...prev,
                    inboundXO: newInbound
                }
            }
            return {
                ...prev,
                [parent]: {
                    ...prev[parent]!,
                    [field]: value
                }
            }
        })
    }

    // Auto-populate Slated XO timeline dates when a real person name is selected
    const autoPopulateSlatedXODates = (prev: OracleCommand, name: string) => {
        const isRealPerson = /[a-zA-Z]{2,}/.test(name) && !name.match(/^\d{2}-\d/)
        if (!isRealPerson) {
            return {
                name,
                reportDate: prev.slatedXO?.reportDate || "",
                timelineData: prev.slatedXO?.timelineData
            }
        }
        // Anchor: inbound XO's fleet-up date = when the slated XO reports
        const anchorStr = prev.inboundXO?.timelineData?.k
        let anchorDate: Date | null = null
        if (anchorStr) {
            let d = parseISO(anchorStr)
            if (isValid(d)) anchorDate = d
            else {
                d = parse(anchorStr, 'MMMyy', new Date())
                if (isValid(d)) anchorDate = d
            }
        }
        if (!anchorDate) {
            // No anchor available — just update the name, keep existing dates
            return {
                name,
                reportDate: prev.slatedXO?.reportDate || "",
                timelineData: prev.slatedXO?.timelineData
            }
        }
        const tourLen = prev.tourLength || 18
        const kDate = addMonths(anchorDate, tourLen)
        const mDate = addMonths(kDate, 2)
        const qDate = addMonths(mDate, tourLen)
        const fmt = (d: Date) => format(d, 'MMMyy').toUpperCase()
        const iStr = fmt(anchorDate)
        return {
            name,
            reportDate: iStr,   // kept for Excel export compatibility — derived from timelineData.i
            timelineData: { i: iStr, k: fmt(kDate), m: fmt(mDate), q: fmt(qDate) }
        }
    }

    // Auto-populate Inbound XO timeline dates when a real person name is selected
    const autoPopulateInboundXODates = (prev: OracleCommand, name: string) => {
        const isRealPerson = /[a-zA-Z]{2,}/.test(name) && !name.match(/^\d{2}-\d/)
        if (!isRealPerson) {
            // Preserve existing timeline; sync reportDate from i for Excel compat
            const existingI = prev.inboundXO?.timelineData?.i
            return { name, reportDate: existingI || prev.inboundXO?.reportDate || "", timelineData: prev.inboundXO?.timelineData }
        }
        // Anchor: current XO's fleet-up date (k) = when the inbound XO arrives
        const anchorStr = prev.currentXO?.timelineData?.k
        let anchorDate: Date | null = null
        if (anchorStr) {
            let d = parseISO(anchorStr)
            if (isValid(d)) anchorDate = d
            else {
                d = parse(anchorStr, 'MMMyy', new Date())
                if (isValid(d)) anchorDate = d
            }
        }
        if (!anchorDate) {
            const existingI = prev.inboundXO?.timelineData?.i
            return { name, reportDate: existingI || prev.inboundXO?.reportDate || "", timelineData: prev.inboundXO?.timelineData }
        }
        const tourLen = prev.tourLength || 18
        const kDate = addMonths(anchorDate, tourLen)
        const mDate = addMonths(kDate, 2)
        const qDate = addMonths(mDate, tourLen)
        const fmt = (d: Date) => format(d, 'MMMyy').toUpperCase()
        const iStr = fmt(anchorDate)
        return {
            name,
            reportDate: iStr,   // kept for Excel export compatibility
            timelineData: { i: iStr, k: fmt(kDate), m: fmt(mDate), q: fmt(qDate) }
        }
    }


    const COMMUNITY_OPTIONS = [
        { value: "1110", label: "1110 (SWO)" },
        { value: "1200", label: "1200 (HR)" },
        { value: "1310", label: "1310 (Navy Aviation)" },
        { value: "1320", label: "1320 (NFO)" },
        { value: "1830", label: "1830 (LDO)" },
        { value: "Other", label: "Other Community" },
    ]

    const isCoSM = formData.tags?.includes("CO-SM")

    const CommunitySelect = ({ value, onChange }: { value?: string, onChange: (v: string) => void }) => (
        <div className="grid gap-2">
            <Label>Community Fill</Label>
            <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={value || "1110"}
                onChange={(e) => onChange(e.target.value)}
            >
                {COMMUNITY_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
        </div>
    )

    // Helper needed because nextSlateParams has nested object but strict types
    const handleNextSlateChange = (field: "targetBoardDate" | "requirement", value: string) => {
        setFormData((prev) => {
            if (!prev) return null
            return {
                ...prev,
                nextSlateParams: {
                    ...prev.nextSlateParams,
                    [field]: value
                }
            }
        })
    }


    const handleTimelineChange = (role: 'currentCO' | 'currentXO' | 'inboundXO' | 'slatedXO' | 'prospectiveCO' | 'slatedCO', field: 'i' | 'k' | 'm' | 'q', value: string) => {
        setFormData((prev) => {
            if (!prev) return null

            // Handle prospectiveCO if it doesn't exist yet
            if (role === 'prospectiveCO' && !prev.prospectiveCO) {
                return {
                    ...prev,
                    prospectiveCO: {
                        name: '',
                        prd: '',
                        timelineData: { [field]: value }
                    }
                }
            }

            // Handle slatedCO if it doesn't exist yet
            if (role === 'slatedCO' && !prev.slatedCO) {
                return {
                    ...prev,
                    slatedCO: {
                        name: 'Forecast',
                        prd: '',
                        timelineData: { [field]: value }
                    }
                }
            }

            // Handle inboundXO if it doesn't exist yet
            if (role === 'inboundXO' && !prev.inboundXO) {
                return {
                    ...prev,
                    inboundXO: {
                        name: "",
                        reportDate: "",
                        timelineData: { [field]: value }
                    }
                }
            }

            // Handle slatedXO if it doesn't exist yet
            if (role === 'slatedXO' && !prev.slatedXO) {
                return {
                    ...prev,
                    slatedXO: {
                        name: "Forecast",
                        reportDate: "",
                        timelineData: { [field]: value }
                    }
                }
            }

            // Standard update for existing roles
            let updatedRole = {
                ...prev[role]!,
                timelineData: {
                    ...prev[role]!.timelineData,
                    [field]: value
                }
            }

            // Sync reportDate if editing Slated XO 'i' column
            if (role === 'slatedXO' && field === 'i') {
                (updatedRole as any).reportDate = value
            }

            // Sync reportDate if editing Inbound XO 'i' column
            if (role === 'inboundXO' && field === 'i') {
                (updatedRole as any).reportDate = value
            }

            let newState = {
                ...prev,
                [role]: updatedRole
            }

            // AUTO-POPULATE: CO Departure → P-CO Arrival + CoC + Departure (Direct CO only)
            if (role === 'currentCO' && field === 'q' && prev.rotationStyle === 'DirectCO') {
                const formatMMMYY = (d: Date) => format(d, 'MMMyy').toUpperCase()
                const parseFlexDate = (str: string): Date | null => {
                    if (!str) return null
                    let d = parseISO(str); if (isValid(d)) return d
                    d = parse(str.trim().toUpperCase(), 'MMMyy', new Date()); return isValid(d) ? d : null
                }
                const arrivalDate = parseFlexDate(value)
                if (arrivalDate) {
                    const tourLen = prev.tourLength || 24
                    const departDate = addMonths(arrivalDate, tourLen)
                    newState = {
                        ...newState,
                        prospectiveCO: {
                            name: prev.prospectiveCO?.name || '',
                            prd: formatMMMYY(departDate),
                            timelineData: {
                                i: formatMMMYY(arrivalDate),
                                m: formatMMMYY(arrivalDate),
                                q: formatMMMYY(departDate)
                            }
                        }
                    }
                }
            }

            // AUTO-POPULATE: P-CO Arrival manually set → recalculate CoC + Departure
            if (role === 'prospectiveCO' && field === 'i') {
                const formatMMMYY = (d: Date) => format(d, 'MMMyy').toUpperCase()
                const parseFlexDate = (str: string): Date | null => {
                    if (!str) return null
                    let d = parseISO(str); if (isValid(d)) return d
                    d = parse(str.trim().toUpperCase(), 'MMMyy', new Date()); return isValid(d) ? d : null
                }
                const arrivalDate = parseFlexDate(value)
                if (arrivalDate) {
                    const tourLen = prev.tourLength || 24
                    const departDate = addMonths(arrivalDate, tourLen)
                    newState = {
                        ...newState,
                        prospectiveCO: {
                            ...newState.prospectiveCO!,
                            prd: formatMMMYY(departDate),
                            timelineData: {
                                ...newState.prospectiveCO?.timelineData,
                                i: value,
                                m: value,
                                q: formatMMMYY(departDate)
                            }
                        }
                    }
                }
            }

            // AUTO-POPULATE: P-CO Departure → Slated CO (same logic as P-CO auto-populate)
            if ((role === 'prospectiveCO' && field === 'q') || (role === 'prospectiveCO' && field === 'i')) {
                // Get the effective P-CO departure from newState after above updates
                const pCODeparture = newState.prospectiveCO?.timelineData?.q
                if (pCODeparture) {
                    const formatMMMYY2 = (d: Date) => format(d, 'MMMyy').toUpperCase()
                    const parseFlexDate2 = (str: string): Date | null => {
                        if (!str) return null
                        let d = parseISO(str); if (isValid(d)) return d
                        d = parse(str.trim().toUpperCase(), 'MMMyy', new Date()); return isValid(d) ? d : null
                    }
                    const slatedArrival = parseFlexDate2(pCODeparture)
                    if (slatedArrival) {
                        const tourLen = prev.tourLength || 24
                        const slatedDepart = addMonths(slatedArrival, tourLen)
                        newState = {
                            ...newState,
                            slatedCO: {
                                name: newState.slatedCO?.name || 'Forecast',
                                prd: formatMMMYY2(slatedDepart),
                                timelineData: {
                                    i: formatMMMYY2(slatedArrival),
                                    m: formatMMMYY2(slatedArrival),
                                    q: formatMMMYY2(slatedDepart)
                                }
                            }
                        }
                    }
                }
            }

            // AUTO-POPULATE: Slated CO Arrival manually set → recalculate CoC + Departure
            if (role === 'slatedCO' && field === 'i') {
                const formatMMMYY = (d: Date) => format(d, 'MMMyy').toUpperCase()
                const parseFlexDate = (str: string): Date | null => {
                    if (!str) return null
                    let d = parseISO(str); if (isValid(d)) return d
                    d = parse(str.trim().toUpperCase(), 'MMMyy', new Date()); return isValid(d) ? d : null
                }
                const arrivalDate = parseFlexDate(value)
                if (arrivalDate) {
                    const tourLen = prev.tourLength || 24
                    const departDate = addMonths(arrivalDate, tourLen)
                    newState = {
                        ...newState,
                        slatedCO: {
                            ...newState.slatedCO!,
                            prd: formatMMMYY(departDate),
                            timelineData: {
                                ...newState.slatedCO?.timelineData,
                                i: value,
                                m: value,
                                q: formatMMMYY(departDate)
                            }
                        }
                    }
                }
            }

            // AUTO-UPDATE LOGIC: If Inbound XO Turnover ('k') changes, Start Slated XO Forecast
            if (role === 'inboundXO' && field === 'k') {
                // 1. New Slated XO Report Date = P-XO Turnover Date
                const newReportDate = value.trim().toUpperCase();

                // 2. Calculate the rest of Slated XO timeline based on this new Report Date
                let date: Date | null = null;
                // Try ISO
                let d = parseISO(newReportDate);
                if (isValid(d)) date = d;
                else if (newReportDate.length === 5) {
                    d = parse(newReportDate, 'MMMyy', new Date());
                    if (isValid(d)) date = d;
                }

                if (date) {
                    // Calculate future dates for Slated XO
                    // Report = P-XO Turnover (now)
                    // Turnover = Report + 18 months
                    // COC = Turnover + 2 months
                    // CO Turnover = COC + 18 months
                    const kDate = addMonths(date, 18);
                    const mDate = addMonths(kDate, 2);
                    const qDate = addMonths(mDate, 18);

                    const formatMMMYY = (d: Date) => format(d, 'MMMyy').toUpperCase();

                    newState = {
                        ...newState,
                        slatedXO: {
                            name: prev.slatedXO?.name === "Forecast" || !prev.slatedXO?.name ? "Forecast" : prev.slatedXO.name,
                            reportDate: newReportDate,
                            timelineData: {
                                ...prev.slatedXO?.timelineData,
                                i: newReportDate,
                                k: formatMMMYY(kDate),
                                m: formatMMMYY(mDate),
                                q: formatMMMYY(qDate)
                            }
                        }
                    }
                } else {
                    // If invalid date, at least copy the string to Report Date so they match
                    newState = {
                        ...newState,
                        slatedXO: {
                            name: prev.slatedXO?.name === "Forecast" || !prev.slatedXO?.name ? "Forecast" : prev.slatedXO.name,
                            reportDate: newReportDate,
                            timelineData: {
                                ...prev.slatedXO?.timelineData,
                                i: newReportDate
                            }
                        }
                    }
                }
            }

            return newState
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (formData) {
            onSave(formData)
            onOpenChange(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[95vw] lg:max-w-6xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Edit Command</DialogTitle>
                    <DialogDescription>
                        Make changes to the command details, incumbents, and succession plan.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-6 py-4" autoComplete="off">

                    {/* Timeline Visualization */}
                    {formData && (
                        <div className="w-full overflow-x-auto pb-2">
                            <CommandTimeline
                                command={formData}
                                editable={true}
                                onDateChange={handleTimelineChange}
                            />
                        </div>
                    )}

                    {/* Command Details */}
                    <div className="grid gap-4">
                        <h3 className="font-semibold leading-none tracking-tight">Command Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Command Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="uic">UIC</Label>
                                <Input
                                    id="uic"
                                    value={formData.uic}
                                    onChange={(e) => handleChange("uic", e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="platform">Platform</Label>
                                <Input
                                    id="platform"
                                    value={formData.platform || ""}
                                    onChange={(e) => handleChange("platform", e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    value={formData.location}
                                    onChange={(e) => handleChange("location", e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="rotationStyle">Command Type</Label>
                                <select
                                    id="rotationStyle"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.rotationStyle || "FleetUp"}
                                    onChange={(e) => handleChange("rotationStyle", e.target.value)}
                                >
                                    <option value="FleetUp">Standard (Fleet Up)</option>
                                    <option value="DirectCO">Direct Input CO</option>
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="tourLength">Tour Length (Months)</Label>
                                <Input
                                    id="tourLength"
                                    type="number"
                                    value={formData.tourLength || ""}
                                    onChange={(e) => handleChange("tourLength", parseInt(e.target.value) || 0)}
                                    placeholder="e.g. 18, 24"
                                />
                            </div>
                            {isCoSM && (
                                <div className="grid gap-2">
                                    <Label htmlFor="nextSWOFillDate">Next SWO Fill Date</Label>
                                    <Input
                                        id="nextSWOFillDate"
                                        placeholder="e.g. SEP26 or 2026-09-01"
                                        value={formData.nextSWOFillDate || ""}
                                        onChange={(e) => handleChange("nextSWOFillDate", e.target.value)}
                                    />
                                    <div className="text-[10px] text-muted-foreground">Set when current fill is non-SWO — drives next slate target.</div>
                                </div>
                            )}
                            <div className="grid gap-2 col-span-full">
                                <Label htmlFor="notes">Notes</Label>
                                <textarea
                                    id="notes"
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.notes || ""}
                                    onChange={(e) => handleChange("notes", e.target.value)}
                                    placeholder="Command specific notes..."
                                />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Current CO */}
                    <div className="grid gap-4">
                        <h3 className="font-semibold leading-none tracking-tight">Current CO</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="grid gap-2 col-span-full">
                                <Label htmlFor="coName">Name</Label>
                                <OfficerNameInput
                                    id="coName"
                                    officers={officers}
                                    value={formData.currentCO.name}
                                    onChange={(v) => handleNestedChange("currentCO", "name", v)}
                                />
                            </div>
                            {isCoSM && (
                                <CommunitySelect
                                    value={formData.currentCO.fillCommunity}
                                    onChange={(v) => setFormData(prev => prev ? ({ ...prev, currentCO: { ...prev.currentCO, fillCommunity: v } }) : null)}
                                />
                            )}
                        </div>
                    </div>

                    <Separator />

                    {/* Prospective CO (P-CO / Stashed XO) */}
                    <div className="grid gap-4">
                        <h3 className="font-semibold leading-none tracking-tight">
                            {formData.rotationStyle === "DirectCO" ? "Prospective CO (Inbound Relief)" : "Prospective CO (P-CO)"}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="grid gap-2 col-span-full">
                                <Label htmlFor="pcoName">Name</Label>
                                <OfficerNameInput
                                    id="pcoName"
                                    officers={officers}
                                    placeholder={formData.rotationStyle === "DirectCO" ? "Leave empty if none" : "Waiting for CO Turnover..."}
                                    value={formData.prospectiveCO?.name || ""}
                                    onChange={(v) => setFormData(prev => prev ? ({
                                        ...prev,
                                        prospectiveCO: { ...prev.prospectiveCO, name: v, prd: prev.prospectiveCO?.prd || "" }
                                    }) : null)}
                                />
                            </div>
                            {isCoSM && (
                                <CommunitySelect
                                    value={formData.prospectiveCO?.fillCommunity}
                                    onChange={(v) => setFormData(prev => prev ? ({
                                        ...prev,
                                        prospectiveCO: { ...(prev.prospectiveCO || { name: "", prd: "" }), fillCommunity: v }
                                    }) : null)}
                                />
                            )}
                        </div>
                    </div>

                    {/* Slated CO name — Direct CO only */}
                    {formData.rotationStyle === "DirectCO" && (
                        <>
                            <Separator />
                            <div className="grid gap-4">
                                <h3 className="font-semibold leading-none tracking-tight">Slated CO (Forecast)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="grid gap-2 col-span-full">
                                        <Label htmlFor="slatedCOName">Name</Label>
                                        <OfficerNameInput
                                            id="slatedCOName"
                                            officers={officers}
                                            placeholder="Leave empty if none"
                                            value={formData.slatedCO?.name && formData.slatedCO.name !== 'Forecast' ? formData.slatedCO.name : ""}
                                            onChange={(v) => setFormData(prev => prev ? ({
                                                ...prev,
                                                slatedCO: { name: v || 'Forecast', prd: prev.slatedCO?.prd || "", timelineData: prev.slatedCO?.timelineData }
                                            }) : null)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* XO Sections - Only Show if FleetUp */}
                    {(formData.rotationStyle !== "DirectCO") && (
                        <>
                            <Separator />

                            {/* Current XO */}
                            <div className="grid gap-4">
                                <h3 className="font-semibold leading-none tracking-tight">Current XO</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="grid gap-2 col-span-full">
                                        <Label htmlFor="xoName">Name</Label>
                                        <OfficerNameInput
                                            id="xoName"
                                            officers={officers}
                                            value={formData.currentXO.name}
                                            onChange={(v) => handleNestedChange("currentXO", "name", v)}
                                        />
                                    </div>
                                    {isCoSM && (
                                        <CommunitySelect
                                            value={formData.currentXO.fillCommunity}
                                            onChange={(v) => setFormData(prev => prev ? ({ ...prev, currentXO: { ...prev.currentXO, fillCommunity: v } }) : null)}
                                        />
                                    )}
                                </div>
                            </div>

                            <Separator />

                            {/* Inbound XO */}
                            <div className="grid gap-4">
                                <h3 className="font-semibold leading-none tracking-tight">Inbound XO (P-XO)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="grid gap-2 md:col-span-2 col-span-1">
                                        <Label htmlFor="inboundName">Name</Label>
                                        <OfficerNameInput
                                            id="inboundName"
                                            officers={officers}
                                            placeholder="Leave empty if none"
                                            value={formData.inboundXO?.name || ""}
                                            onChange={(v) => setFormData(prev =>
                                                prev ? { ...prev, inboundXO: autoPopulateInboundXODates(prev, v) } : null
                                            )}
                                        />
                                        <div className="text-[10px] text-muted-foreground pt-1">
                                            * Dates auto-fill from Current XO fleet-up when a name is selected.
                                        </div>
                                    </div>

                                    {isCoSM && (
                                        <CommunitySelect
                                            value={formData.inboundXO?.fillCommunity}
                                            onChange={(v) => setFormData(prev => prev ? ({
                                                ...prev,
                                                inboundXO: { ...(prev.inboundXO || { name: "", reportDate: "", timelineData: undefined }), fillCommunity: v }
                                            }) : null)}
                                        />
                                    )}
                                </div>
                            </div>

                            <Separator />

                            {/* Slated XO */}
                            <div className="grid gap-4">
                                <h3 className="font-semibold leading-none tracking-tight">Slated XO (Forecast)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="grid gap-2 md:col-span-2 col-span-1">
                                        <Label htmlFor="slatedName">Name / Slate</Label>
                                        <OfficerNameInput
                                            id="slatedName"
                                            officers={officers}
                                            placeholder="e.g. 26-2 or Officer Name"
                                            value={formData.slatedXO?.name || ""}
                                            onChange={(v) => setFormData(prev =>
                                                prev ? { ...prev, slatedXO: autoPopulateSlatedXODates(prev, v) } : null
                                            )}
                                        />
                                        <div className="text-[10px] text-muted-foreground pt-1">
                                            * Dates (Col I/K/M/Q) auto-fill from Inbound XO fleet-up when a name is selected.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}



                    <Separator />

                    {/* Next Slate */}
                    <div className="grid gap-4">
                        <h3 className="font-semibold leading-none tracking-tight">Next Slate (Requirement)</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="slateReq">Requirement (Role)</Label>
                                <Input
                                    id="slateReq"
                                    value={formData.nextSlateParams.requirement}
                                    // Use type casting or direct string if acceptable by types, but here we cast
                                    onChange={(e) => handleNextSlateChange("requirement", e.target.value as any)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="targetBoard">Planned Slate</Label>
                                <Input
                                    id="targetBoard"
                                    value={formData.nextSlateParams.targetBoardDate}
                                    onChange={(e) => handleNextSlateChange("targetBoardDate", e.target.value)}
                                    readOnly
                                    className="bg-muted text-muted-foreground font-medium cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>


                    <DialogFooter className="gap-2 sm:gap-0 sm:justify-between">
                        {confirmAction ? (
                            <div className="flex-1 flex flex-col gap-2 items-center justify-center p-4 bg-muted/50 rounded-lg border">
                                <p className="text-sm font-medium text-center">
                                    {confirmAction === "delete" && "Are you sure you want to delete this command? This cannot be undone."}
                                    {confirmAction === "relieveCO" && (
                                        formData?.prospectiveCO?.name
                                            ? "Execute CO Turnover? (Current CO -> Bank, P-CO -> Current CO)"
                                            : "Execute CO Turnover? (Current CO -> Bank, Current XO -> CO)"
                                    )}
                                    {confirmAction === "fleetUp" && "Execute XO Fleet Up? (Inbound XO -> Current XO, Inbound Slot -> Empty)"}
                                </p>
                                <div className="flex gap-2 mt-2">
                                    <Button type="button" variant="outline" onClick={() => setConfirmAction(null)}>
                                        Cancel
                                    </Button>
                                    <Button type="button" variant="destructive" onClick={() => {
                                        if (confirmAction === "delete" && formData?.id) onDelete(formData.id);
                                        if (confirmAction === "relieveCO" && formData?.id) onCOTurnover(formData.id);
                                        if (confirmAction === "fleetUp" && formData?.id) onXOFleetUp(formData.id);
                                        setConfirmAction(null);
                                    }}>
                                        Yes, Confirm
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => setConfirmAction("delete")}
                                >
                                    Delete UIC
                                </Button>
                                <div className="flex gap-2">
                                    <div className="flex-1 flex justify-start gap-2">
                                        <Button type="button" variant="default" style={{ backgroundColor: '#2563eb', color: 'white' }} className="hover:bg-blue-700" onClick={() => setConfirmAction("relieveCO")}>
                                            Relieve CO
                                        </Button>
                                        <Button type="button" variant="default" style={{ backgroundColor: '#16a34a', color: 'white' }} className="hover:bg-green-700" onClick={() => setConfirmAction("fleetUp")}>
                                            Fleet Up P-XO
                                        </Button>
                                    </div>
                                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">Save Changes</Button>
                                </div>
                            </>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
