import { NextResponse } from 'next/server'
import { readJson, writeJson } from '@/services/data-service'
import type { CdrCmdBoard } from '@/lib/types'

// POST /api/boards — create a new board
export async function POST(request: Request) {
    try {
        const { board }: { board: CdrCmdBoard } = await request.json()
        const boards = readJson<CdrCmdBoard[]>('boards.json')
        boards.push(board)
        writeJson('boards.json', boards)
        return NextResponse.json({ ok: true, board })
    } catch (error) {
        console.error('[POST /api/boards]', error)
        return NextResponse.json({ error: 'Failed to create board' }, { status: 500 })
    }
}
