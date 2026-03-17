import { OracleCommand } from "./types"

/**
 * Hard save-blockers — only things that would make the record completely unusable.
 * Everything else (missing PRDs, XO data, etc.) surfaces as an alert in the
 * Command Issues widget instead of preventing the save.
 */
export function validateCommand(cmd: OracleCommand): string[] {
    const errors: string[] = []

    // A nameless command is unidentifiable in every list and report
    if (!cmd.name?.trim())
        errors.push("Command name is required")

    return errors
}
