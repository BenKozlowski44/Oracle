import { NextResponse } from 'next/server';
import { Officer } from '@/lib/types';
import { readJson, writeJson, withWriteLock } from '@/services/data-service';
import { getPersonnelAlerts } from '@/lib/alerts';
import { getMetrics, saveMetrics } from '@/lib/metrics-service';

export async function POST(request: Request) {
    try {
        const body = await request.json() as Officer;

        if (!body || !body.id) {
            return NextResponse.json({ error: 'Invalid officer data' }, { status: 400 });
        }

        const saved = await withWriteLock(() => {
            const officers = readJson<Officer[]>('officers.json');
            const index = officers.findIndex(o => o.id === body.id);
            if (index === -1) return null;
            const merged = { ...officers[index], ...body };

            // Metrics: track resolved personnel alerts
            try {
                const before = getPersonnelAlerts(officers[index]).length;
                const after = getPersonnelAlerts(merged).length;
                if (before > after) {
                    const metrics = getMetrics();
                    metrics.resolvedConflicts += before - after;
                    saveMetrics(metrics);
                }
            } catch (e) { console.error('Failed to update metrics', e); }

            officers[index] = merged;
            writeJson('officers.json', officers);
            return merged;
        });

        if (!saved) {
            return NextResponse.json({ error: 'Officer not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error updating officer:', error);
        return NextResponse.json({ error: 'Failed to update officer' }, { status: 500 });
    }
}
