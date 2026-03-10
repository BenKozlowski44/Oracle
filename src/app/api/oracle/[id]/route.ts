import { NextResponse } from 'next/server'
import { readJson, writeJson, withWriteLock } from '@/services/data-service'
import { saveMetrics } from '@/lib/metrics-service'
import { parseBody } from '@/lib/validate'
import { OracleCommandPatchBodySchema } from '@/lib/schemas'
import type { OracleCommand, Officer, Metrics } from '@/lib/types'

// PATCH /api/oracle/[id] — update or add a command
// Body: { updatedCommand, metrics?, officers? }
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await params
        const parsed = parseBody(OracleCommandPatchBodySchema, await request.json())
        if (!parsed.ok) return parsed.response
        const { updatedCommand, metrics, officers } = parsed.data

        return withWriteLock(() => {
            const oracleData = readJson<OracleCommand[]>('oracle-data.json')
            const exists = oracleData.some(c => c.id === updatedCommand.id)
            const newData = exists
                ? oracleData.map(c => c.id === updatedCommand.id ? updatedCommand as unknown as OracleCommand : c)
                : [...oracleData, updatedCommand as unknown as OracleCommand]
            writeJson('oracle-data.json', newData)
            if (metrics) saveMetrics(metrics as Metrics)
            if (officers) writeJson('officers.json', officers as Officer[])
            return NextResponse.json({ ok: true })
        })
    } catch (error) {
        console.error('[PATCH /api/oracle/[id]]', error)
        return NextResponse.json({ error: 'Failed to update oracle command' }, { status: 500 })
    }
}

// DELETE /api/oracle/[id] — remove a command
export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const commandToDelete = await withWriteLock(() => {
            const oracleData = readJson<OracleCommand[]>('oracle-data.json')
            const cmd = oracleData.find(c => c.id === id)
            if (!cmd) return null
            writeJson('oracle-data.json', oracleData.filter(c => c.id !== id))
            return cmd
        })

        if (!commandToDelete) {
            return NextResponse.json({ error: 'Command not found' }, { status: 404 })
        }

        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('[DELETE /api/oracle/[id]]', error)
        return NextResponse.json({ error: 'Failed to delete oracle command' }, { status: 500 })
    }
}
