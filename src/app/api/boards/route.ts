import { NextResponse } from 'next/server'
import { readJson, writeJson, withWriteLock } from '@/services/data-service'
import { parseBody } from '@/lib/validate'
import { BoardCreateBodySchema } from '@/lib/schemas'
import type { CdrCmdBoard } from '@/lib/types'

// POST /api/boards — create a new board
export async function POST(request: Request) {
    try {
        const parsed = parseBody(BoardCreateBodySchema, await request.json())
        if (!parsed.ok) return parsed.response
        const { board } = parsed.data

        return withWriteLock(() => {
            const boards = readJson<CdrCmdBoard[]>('boards.json')
            boards.push(board as unknown as CdrCmdBoard)
            writeJson('boards.json', boards)
            return NextResponse.json({ ok: true, board })
        })
    } catch (error) {
        console.error('[POST /api/boards]', error)
        return NextResponse.json({ error: 'Failed to create board' }, { status: 500 })
    }
}
