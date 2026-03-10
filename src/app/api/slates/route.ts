import { NextResponse } from 'next/server'
import { readJson, writeJson, withWriteLock } from '@/services/data-service'
import { parseBody } from '@/lib/validate'
import { SlateCreateBodySchema } from '@/lib/schemas'
import type { Slate } from '@/lib/types'

// POST /api/slates — create a new slate
export async function POST(request: Request) {
    try {
        const parsed = parseBody(SlateCreateBodySchema, await request.json())
        if (!parsed.ok) return parsed.response
        const { slate } = parsed.data

        return withWriteLock(() => {
            const slates = readJson<Slate[]>('slates.json')
            slates.push(slate as Slate)
            writeJson('slates.json', slates)
            return NextResponse.json({ ok: true, slate })
        })
    } catch (error) {
        console.error('[POST /api/slates]', error)
        return NextResponse.json({ error: 'Failed to create slate' }, { status: 500 })
    }
}
