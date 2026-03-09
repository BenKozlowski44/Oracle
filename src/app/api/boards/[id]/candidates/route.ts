import { NextResponse } from 'next/server'
import { readJson, writeJson } from '@/services/data-service'
import type { CdrCmdBoard, BoardCandidate } from '@/lib/types'

// PATCH /api/boards/[id]/candidates — save candidates (auto-save)
// Body: { candidates: BoardCandidate[] }
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const { candidates }: { candidates: BoardCandidate[] } = await request.json()

        const boards = readJson<CdrCmdBoard[]>('boards.json')
        const idx = boards.findIndex(b => b.id === id)
        if (idx === -1) {
            return NextResponse.json({ error: 'Board not found' }, { status: 404 })
        }

        boards[idx] = { ...boards[idx], candidates }
        writeJson('boards.json', boards)
        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('[PATCH /api/boards/[id]/candidates]', error)
        return NextResponse.json({ error: 'Failed to save candidates' }, { status: 500 })
    }
}
