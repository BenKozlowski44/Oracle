import { OracleCommand, Officer } from "@/lib/types"
import { format, parseISO, isValid } from "date-fns"

export type AlertType = "missing_xo" | "date_mismatch"

export interface CommandAlert {
    id: string
    name: string
    issue: string
    type: AlertType
}

export function getCommandAlerts(command: OracleCommand): CommandAlert[] {
    const alerts: CommandAlert[] = []

    // 1. Missing P-XO (Inbound XO)
    if (!command.inboundXO || !command.inboundXO.name) {
        alerts.push({
            id: command.id,
            name: command.name,
            issue: "Missing P-XO",
            type: "missing_xo"
        })
    }

    // 2. Date Mismatch
    const coTurnover = command.currentCO.timelineData?.q
    const xoCoc = command.currentXO.timelineData?.m

    if (coTurnover && xoCoc) {
        const normalizeDate = (dStr: string) => {
            const clean = dStr.trim().toUpperCase()
            const d = parseISO(clean)
            if (isValid(d)) return format(d, 'MMMyy').toUpperCase()
            return clean
        }

        const n1 = normalizeDate(coTurnover)
        const n2 = normalizeDate(xoCoc)

        if (n1 !== n2) {
            const formatDisplay = (dStr: string | undefined) => {
                if (!dStr) return "N/A"
                const d = parseISO(dStr)
                return isValid(d) ? format(d, 'MMMyy').toUpperCase() : dStr
            }

            alerts.push({
                id: command.id,
                name: command.name,
                issue: `Date Mismatch: CO Turnover (${formatDisplay(coTurnover)}) ≠ XO COC (${formatDisplay(xoCoc)})`,
                type: "date_mismatch"
            })
        }
    }

    return alerts
}

export function getAllAlerts(commands: OracleCommand[]): CommandAlert[] {
    return commands.flatMap(getCommandAlerts)
}

export interface PersonnelAlert {
    id: string
    name: string
    issue: string
    type: string
}

export function getPersonnelAlerts(officer: Officer): PersonnelAlert[] {
    const alerts: PersonnelAlert[] = []

    // Rule 1: Missing Preference Inputs
    // Check if priority is missing, or if both location and platform preferences are empty
    const hasPriority = !!officer.preferencePriority;
    const hasLocations = officer.preferredLocations && officer.preferredLocations.length > 0;
    const hasPlatforms = officer.preferredPlatforms && officer.preferredPlatforms.length > 0;

    if (!hasPriority || (!hasLocations && !hasPlatforms)) {
        alerts.push({
            id: officer.id,
            name: officer.name,
            issue: "Missing preference inputs",
            type: "missing_preferences"
        })
    }

    // Rule 2: Missing Screened Information
    // "Screened" maps to assignedSlate in the data model
    if (!officer.assignedSlate || officer.assignedSlate.trim() === "") {
        alerts.push({
            id: officer.id + "_screened",
            name: officer.name,
            issue: "Missing screened information",
            type: "missing_screened"
        })
    }

    return alerts
}

export function getAllPersonnelAlerts(officers: Officer[]): PersonnelAlert[] {
    return officers.flatMap(getPersonnelAlerts)
}
