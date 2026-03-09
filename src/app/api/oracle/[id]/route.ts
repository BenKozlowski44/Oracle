import { NextResponse } from 'next/server'
import { readJson, writeJson, withWriteLock } from '@/services/data-service'
import { saveMetrics } from '@/lib/metrics-service'
import type { OracleCommand, Officer, Metrics } from '@/lib/types'

// PATCH /api/oracle/[id] — update or add a command
// Body: { updatedCommand, metrics?, officers? }
// Triggers fire-and-forget Excel write-back
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await params // resolve params (id used client-side already)
        const { updatedCommand, metrics, officers }: {
            updatedCommand: OracleCommand
            metrics?: Metrics
            officers?: Officer[]
        } = await request.json()

        const result = withWriteLock(() => {
            const oracleData = readJson<OracleCommand[]>('oracle-data.json')
            const exists = oracleData.some(c => c.id === updatedCommand.id)
            const newData = exists
                ? oracleData.map(c => c.id === updatedCommand.id ? updatedCommand : c)
                : [...oracleData, updatedCommand]
            writeJson('oracle-data.json', newData)
            if (metrics) saveMetrics(metrics)
            if (officers) writeJson('officers.json', officers)
        })

        // Fire-and-forget Excel write-back (outside lock — non-blocking)
        import('@/lib/excel-writer').then(({ updateCommandInExcel }) => {
            updateCommandInExcel(updatedCommand)
                .then(res => {
                    if (!res.success) console.warn(`[PATCH /api/oracle] Excel update failed: ${res.message}`)
                    else console.log(`[PATCH /api/oracle] Synced ${updatedCommand.name} to Excel`)
                })
                .catch(err => console.error('[PATCH /api/oracle] Excel sync error:', err))
        })

        return result.then(() => NextResponse.json({ ok: true }))
    } catch (error) {
        console.error('[PATCH /api/oracle/[id]]', error)
        return NextResponse.json({ error: 'Failed to update oracle command' }, { status: 500 })
    }
}

// DELETE /api/oracle/[id] — remove a command
// Triggers fire-and-forget Excel deletion
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

        // Fire-and-forget Excel deletion (outside lock)
        import('@/lib/excel-writer').then(({ deleteCommandFromExcel }) => {
            deleteCommandFromExcel(commandToDelete)
                .then(res => {
                    if (!res.success) console.warn(`[DELETE /api/oracle] Excel deletion failed: ${res.message}`)
                    else console.log(`[DELETE /api/oracle] Deleted ${commandToDelete.name} from Excel`)
                })
                .catch(err => console.error('[DELETE /api/oracle] Excel deletion error:', err))
        })

        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('[DELETE /api/oracle/[id]]', error)
        return NextResponse.json({ error: 'Failed to delete oracle command' }, { status: 500 })
    }
}
