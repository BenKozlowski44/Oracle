import { NextResponse } from 'next/server'
import { readJson, writeJson, withWriteLock } from '@/services/data-service'
import { applySlateToOracle } from '@/lib/slate-migration'
import { parseBody } from '@/lib/validate'
import { ApprovalsBodySchema } from '@/lib/schemas'
import type { Slate, Officer, OracleCommand } from '@/lib/types'

// PATCH /api/slates/[id]/approvals
// Body: { entity: "branchHead" | "pers41" | "swcc" | "swoboss", value: boolean }
// Special: SWOBOSS approval also triggers oracle migration server-side
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const parsed = parseBody(ApprovalsBodySchema, await request.json())
        if (!parsed.ok) return parsed.response
        const { entity, value } = parsed.data

        return withWriteLock(() => {
            const slates = readJson<Slate[]>('slates.json')
            const idx = slates.findIndex(s => s.id === id)
            if (idx === -1) {
                return NextResponse.json({ error: 'Slate not found' }, { status: 404 })
            }

            slates[idx] = {
                ...slates[idx],
                approvals: { ...slates[idx].approvals, [entity]: value }
            }
            writeJson('slates.json', slates)

            // SWOBOSS approval → run oracle migration server-side
            if (entity === 'swoboss' && value === true) {
                const officers = readJson<Officer[]>('officers.json')
                const oracleData = readJson<OracleCommand[]>('oracle-data.json')
                const updatedOracle = applySlateToOracle(slates[idx], officers, oracleData)
                writeJson('oracle-data.json', updatedOracle)
            }

            return NextResponse.json({ ok: true })
        })
    } catch (error) {
        console.error('[PATCH /api/slates/[id]/approvals]', error)
        return NextResponse.json({ error: 'Failed to update approval' }, { status: 500 })
    }
}
