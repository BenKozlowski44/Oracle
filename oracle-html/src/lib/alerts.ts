import { OracleCommand, Officer } from "@/lib/types"
import { format, parseISO, parse, isValid } from "date-fns"
import { formatToMMMyy } from "@/lib/utils"

/**
 * Parse a date string that may be ISO ("2027-05-01") or MMMyy ("MAY27").
 * Returns null if unparseable.
 */
function parseFlexDate(dateStr: string): Date | null {
    // Try ISO first (most timeline values are stored as ISO)
    const iso = parseISO(dateStr)
    if (isValid(iso)) return iso
    // Try MMMyy abbreviated format (e.g. "MAY27", "JUL27")
    const mmmyy = parse(dateStr, "MMMyy", new Date())
    if (isValid(mmmyy)) return mmmyy
    return null
}

export type AlertType = "missing_xo" | "date_mismatch" | "timeline_conflict"

export interface CommandAlert {
    id: string
    name: string
    issue: string
    type: AlertType
}

export function getCommandAlerts(command: OracleCommand): CommandAlert[] {
    const alerts: CommandAlert[] = []

    // Direct-input commands have no XO pipeline — skip all XO-related checks.
    // Fleet-up CO-SM commands (rotationStyle === 'FleetUp') still get alerts.
    if (command.rotationStyle === 'DirectCO') return alerts

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

    // 3. XO fleet-up date is after CO departure
    // Use proper date parsing so MMMyy-formatted strings (e.g. "MAY27") compare
    // correctly instead of falling back to alphabetic string comparison
    // ('M' > 'J' = true, causing MAY27 to wrongly appear after JUL27).
    // Use CO's timelineData.q (scheduled CoC) with prd as fallback.
    const xoFleetUpRaw = command.currentXO?.timelineData?.k
    const coDepartureRaw = command.currentCO?.timelineData?.q || command.currentCO?.prd
    if (xoFleetUpRaw && coDepartureRaw) {
        const xoDate = parseFlexDate(xoFleetUpRaw)
        const coDate = parseFlexDate(coDepartureRaw)
        if (xoDate && coDate && format(xoDate, 'yyyyMM') > format(coDate, 'yyyyMM')) {
            alerts.push({
                id: command.id + "_timeline",
                name: command.name,
                issue: `Timeline conflict: XO fleet-up (${formatToMMMyy(xoFleetUpRaw)}) is after CO departure (${formatToMMMyy(coDepartureRaw)})`,
                type: "timeline_conflict"
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
    // Rule 0: Completely ignore Post-Command Commanders (PCC)
    if (officer.status === "PCC" || officer.listShift === "PCC") {
        return [];
    }

    const alerts: PersonnelAlert[] = []

    // Rule 1: Missing Preference Inputs
    const isCosm = officer.screened?.includes("CO-SM") || officer.listShift === "CO-SM";
    let hasPreferences = false;

    if (isCosm) {
        // CO-SM needs at least one preference filled out
        hasPreferences = !!(officer.cosmPreferences && officer.cosmPreferences.some(p => typeof p === 'string' && p.trim() !== ""));
    } else {
        // Standard needs priority and either location or platform
        const hasPriority = !!officer.preferencePriority;
        const hasLocations = !!(officer.preferredLocations && officer.preferredLocations.length > 0);
        const hasPlatforms = !!(officer.preferredPlatforms && officer.preferredPlatforms.length > 0);

        hasPreferences = hasPriority && (hasLocations || hasPlatforms);
    }

    if (!hasPreferences) {
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
