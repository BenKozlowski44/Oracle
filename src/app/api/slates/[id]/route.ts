import { NextResponse } from 'next/server'
import { readJson, writeJson, withWriteLock } from '@/services/data-service'
import type { Slate } from '@/lib/types'

// DELETE /api/slates/[id] — permanently delete a slate
export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        return withWriteLock(() => {
            const slates = readJson<Slate[]>('slates.json')
            const updated = slates.filter(s => s.id !== id)
            if (updated.length === slates.length) {
                return NextResponse.json({ error: 'Slate not found' }, { status: 404 })
            }
            writeJson('slates.json', updated)
            return NextResponse.json({ ok: true })
        })
    } catch (error) {
        console.error('[DELETE /api/slates/[id]]', error)
        return NextResponse.json({ error: 'Failed to delete slate' }, { status: 500 })
    }
}
