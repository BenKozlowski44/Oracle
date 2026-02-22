import { OracleCommand } from "@/lib/types"
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
