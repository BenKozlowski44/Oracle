import { NextResponse } from 'next/server'
import { readJson, writeJson, withWriteLock } from '@/services/data-service'
import { parseBody } from '@/lib/validate'
import { RequirementsBodySchema } from '@/lib/schemas'
import type { Slate } from '@/lib/types'

// PATCH /api/slates/[id]/requirements
// Body: { requirements, candidates, candidateProfiles }
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const parsed = parseBody(RequirementsBodySchema, await request.json())
        if (!parsed.ok) return parsed.response
        const { requirements, candidates, candidateProfiles } = parsed.data

        return withWriteLock(() => {
            const slates = readJson<Slate[]>('slates.json')
            const idx = slates.findIndex(s => s.id === id)
            if (idx === -1) {
                return NextResponse.json({ error: 'Slate not found' }, { status: 404 })
            }
            slates[idx] = { ...slates[idx], requirements, candidates, candidateProfiles }
            writeJson('slates.json', slates)
            return NextResponse.json({ ok: true })
        })
    } catch (error) {
        console.error('[PATCH /api/slates/[id]/requirements]', error)
        return NextResponse.json({ error: 'Failed to update requirements' }, { status: 500 })
    }
}
