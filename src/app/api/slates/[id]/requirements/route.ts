import { NextResponse } from 'next/server'
import { readJson, writeJson } from '@/services/data-service'
import type { Slate, SlateRequirement, SlateCandidateProfile } from '@/lib/types'

// PATCH /api/slates/[id]/requirements
// Body: { requirements, candidates, candidateProfiles }
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const {
            requirements,
            candidates,
            candidateProfiles,
        }: {
            requirements: SlateRequirement[]
            candidates: string[]
            candidateProfiles: SlateCandidateProfile[]
        } = await request.json()

        const slates = readJson<Slate[]>('slates.json')
        const idx = slates.findIndex(s => s.id === id)
        if (idx === -1) {
            return NextResponse.json({ error: 'Slate not found' }, { status: 404 })
        }

        slates[idx] = { ...slates[idx], requirements, candidates, candidateProfiles }
        writeJson('slates.json', slates)
        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('[PATCH /api/slates/[id]/requirements]', error)
        return NextResponse.json({ error: 'Failed to update requirements' }, { status: 500 })
    }
}
