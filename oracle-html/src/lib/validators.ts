import { OracleCommand } from "./types"
import { isPlaceholderName } from "./constants"

/**
 * Validates an OracleCommand before it is persisted to the JSON store.
 * Returns a list of human-readable error strings.
 * An empty array means the command is valid to save.
 *
 * These checks are intentionally conservative — they only block saves on
 * data that would definitely break downstream logic (health calculations,
 * slate predictions, fleet-up actions). Optional / forecast fields are
 * not required.
 */
export function validateCommand(cmd: OracleCommand): string[] {
    const errors: string[] = []
    const isFleetUp = cmd.rotationStyle !== "DirectCO"

    // ── Identity fields ───────────────────────────────────────────────────
    if (!cmd.name?.trim())
        errors.push("Command name is required")

    if (!cmd.uic?.trim())
        errors.push("UIC is required")

    // ── Current CO ───────────────────────────────────────────────────────
    if (!cmd.currentCO?.name?.trim() || isPlaceholderName(cmd.currentCO.name))
        errors.push("Current CO name is required")

    if (!cmd.currentCO?.prd?.trim())
        errors.push("Current CO PRD date is required")

    // ── Current XO (Fleet-Up commands only) ──────────────────────────────
    if (isFleetUp) {
        if (!cmd.currentXO?.name?.trim() || isPlaceholderName(cmd.currentXO.name))
            errors.push("Current XO name is required for Fleet-Up commands")

        if (!cmd.currentXO?.prd?.trim())
            errors.push("Current XO PRD date is required for Fleet-Up commands")
    }

    // ── Prospective CO consistency ────────────────────────────────────────
    // If a PCO is named, they must have a PRD so pipeline health works.
    if (cmd.prospectiveCO?.name && !isPlaceholderName(cmd.prospectiveCO.name)) {
        if (!cmd.prospectiveCO.prd?.trim())
            errors.push(`Prospective CO "${cmd.prospectiveCO.name}" is missing a PRD date`)
    }

    return errors
}
