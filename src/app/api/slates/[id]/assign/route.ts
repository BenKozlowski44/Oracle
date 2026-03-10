import { NextResponse } from 'next/server'
import { readJson, writeJson, withWriteLock } from '@/services/data-service'
import { parseBody } from '@/lib/validate'
import { AssignBodySchema } from '@/lib/schemas'
import { Slate } from '@/lib/types'

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: slateId } = await params
        const parsed = parseBody(AssignBodySchema, await request.json())
        if (!parsed.ok) return parsed.response
        const { requirementId, officerId } = parsed.data

        return withWriteLock(() => {
            const slates = readJson<Slate[]>('slates.json')
            const slateIndex = slates.findIndex(s => s.id === slateId)
            if (slateIndex === -1) return NextResponse.json({ error: `Slate '${slateId}' not found` }, { status: 404 })

            const reqIndex = slates[slateIndex].requirements.findIndex(r => r.id === requirementId)
            if (reqIndex === -1) return NextResponse.json({ error: `Requirement '${requirementId}' not found` }, { status: 404 })

            if (officerId) {
                slates[slateIndex].requirements[reqIndex].filledBy = officerId
                slates[slateIndex].requirements[reqIndex].status = 'Filled'
            } else {
                delete slates[slateIndex].requirements[reqIndex].filledBy
                slates[slateIndex].requirements[reqIndex].status = 'Confirmed'
            }

            writeJson('slates.json', slates)

            return NextResponse.json({
                success: true,
                requirement: slates[slateIndex].requirements[reqIndex]
            })
        })
    } catch (err) {
        console.error('[assign route]', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
