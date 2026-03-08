import { Slate, Officer, OracleCommand } from './types'

/**
 * Applies a SWOBOSS-approved slate to the Oracle by setting the `slatedXO`
 * field on each command that has a filled requirement.
 *
 * Returns the mutated oracleData array (the same reference, modified in place,
 * and also returned for convenience).
 */
export function applySlateToOracle(
    slate: Slate,
    officers: Officer[],
    oracleData: OracleCommand[]
): OracleCommand[] {
    const filledReqs = slate.requirements.filter(
        r => r.status === 'Filled' && r.filledBy
    )

    for (const req of filledReqs) {
        const officer = officers.find(o => o.id === req.filledBy)
        if (!officer) continue

        const cmdIndex = oracleData.findIndex(c => c.id === req.commandId)
        if (cmdIndex === -1) continue

        // Set the slatedXO — name is the key piece; reportDate left empty until known
        oracleData[cmdIndex] = {
            ...oracleData[cmdIndex],
            slatedXO: {
                name: officer.name,
                reportDate: ''
            }
        }

        console.log(
            `[slate-migration] Set slatedXO on ${oracleData[cmdIndex].name}: ${officer.name}`
        )
    }

    return oracleData
}
