import { NextResponse } from 'next/server'
import { readJson, writeJson } from '@/services/data-service'
import type { Officer } from '@/lib/types'

// POST /api/import/officers
// Body: { mode: 'bank' | 'cosm', data: Officer[] }
// Intelligently merges uploaded officers with the existing pool
export async function POST(request: Request) {
    try {
        const { mode, data }: { mode: 'bank' | 'cosm'; data: Officer[] } = await request.json()

        if (!data || data.length === 0) {
            return NextResponse.json({ error: 'No officer data provided' }, { status: 400 })
        }

        const current = readJson<Officer[]>('officers.json')

        let merged: Officer[]
        if (mode === 'bank') {
            // Keep CO-SM officers, replace standard bank
            const cosmOfficers = current.filter(o => o.listShift === 'CO-SM' || o.screened?.includes('CO-SM'))
            merged = [...cosmOfficers, ...data]
        } else {
            // Keep standard bank officers, merge CO-SM list
            const standardOfficers = current.filter(o => !(o.listShift === 'CO-SM' || o.screened?.includes('CO-SM')))
            const newCosmIds = new Set(data.map(o => o.id))
            const existingCosmToKeep = current.filter(o =>
                (o.listShift === 'CO-SM' || o.screened?.includes('CO-SM')) && !newCosmIds.has(o.id)
            )
            merged = [...standardOfficers, ...existingCosmToKeep, ...data]
        }

        writeJson('officers.json', merged)
        return NextResponse.json({ ok: true, count: merged.length })
    } catch (error) {
        console.error('[POST /api/import/officers]', error)
        return NextResponse.json({ error: 'Import failed' }, { status: 500 })
    }
}
