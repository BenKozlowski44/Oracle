import { Slate, Officer, OracleCommand } from './types'

/**
 * Applies a SWOBOSS-approved slate to the Oracle.
 *
 * - role === 'XO'  → sets `slatedXO`       (fleet-up pipeline)
 * - role === 'CO'  → sets `prospectiveCO`   (direct CO input)
 *
 * Returns the mutated oracleData array.
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

        if (req.role === 'XO') {
            // Fleet-up: slated XO advances through pipeline
            oracleData[cmdIndex] = {
                ...oracleData[cmdIndex],
                slatedXO: { name: officer.name, reportDate: '' }
            }
            console.log(`[slate-migration] Set slatedXO on ${oracleData[cmdIndex].name}: ${officer.name}`)

        } else if (req.role === 'CO') {
            // Direct CO input: officer becomes Prospective CO (P-CO)
            oracleData[cmdIndex] = {
                ...oracleData[cmdIndex],
                prospectiveCO: { name: officer.name, prd: '' }
            }
            console.log(`[slate-migration] Set prospectiveCO on ${oracleData[cmdIndex].name}: ${officer.name}`)
        }
    }

    return oracleData
}
