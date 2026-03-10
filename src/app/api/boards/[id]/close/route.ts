import { NextResponse } from 'next/server'
import { readJson, writeJson, withWriteLock } from '@/services/data-service'
import { parseBody } from '@/lib/validate'
import { BoardCloseBodySchema } from '@/lib/schemas'
import type { CdrCmdBoard, BoardCandidate, Officer } from '@/lib/types'

// PATCH /api/boards/[id]/close
// Body: { candidates: BoardCandidate[], newOfficers: Officer[] }
// Marks board Closed and appends migrated officers to officers.json
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const parsed = parseBody(BoardCloseBodySchema, await request.json())
        if (!parsed.ok) return parsed.response
        const { candidates, newOfficers } = parsed.data

        return withWriteLock(() => {
            // Update board status
            const boards = readJson<CdrCmdBoard[]>('boards.json')
            const idx = boards.findIndex(b => b.id === id)
            if (idx === -1) {
                return NextResponse.json({ error: 'Board not found' }, { status: 404 })
            }
            boards[idx] = { ...boards[idx], candidates: candidates as unknown as BoardCandidate[], status: 'Closed' }
            writeJson('boards.json', boards)

            // Append migrated officers
            if (newOfficers.length > 0) {
                const officers = readJson<Officer[]>('officers.json')
                writeJson('officers.json', [...officers, ...newOfficers as unknown as Officer[]])
            }

            return NextResponse.json({ ok: true, migratedCount: newOfficers.length })
        })
    } catch (error) {
        console.error('[PATCH /api/boards/[id]/close]', error)
        return NextResponse.json({ error: 'Failed to close board' }, { status: 500 })
    }
}
