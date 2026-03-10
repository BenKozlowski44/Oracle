import { NextResponse } from 'next/server'
import { readJson, writeJson, withWriteLock } from '@/services/data-service'
import { parseBody } from '@/lib/validate'
import { SlateStatusBodySchema } from '@/lib/schemas'
import type { Slate } from '@/lib/types'

// PATCH /api/slates/[id]/status — archive or restore a slate
// Body: { status: "Archived" | "Active" }
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const parsed = parseBody(SlateStatusBodySchema, await request.json())
        if (!parsed.ok) return parsed.response
        const { status } = parsed.data

        return withWriteLock(() => {
            const slates = readJson<Slate[]>('slates.json')
            const idx = slates.findIndex(s => s.id === id)
            if (idx === -1) {
                return NextResponse.json({ error: 'Slate not found' }, { status: 404 })
            }
            slates[idx] = { ...slates[idx], status }
            writeJson('slates.json', slates)
            return NextResponse.json({ ok: true, slate: slates[idx] })
        })
    } catch (error) {
        console.error('[PATCH /api/slates/[id]/status]', error)
        return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
    }
}
