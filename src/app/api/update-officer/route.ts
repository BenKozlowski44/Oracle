import { NextResponse } from 'next/server';
import { Officer } from '@/lib/types';
import { readJson, writeJson } from '@/services/data-service';
import { updateOfficerInExcel } from '@/lib/excel-writer';
import { getPersonnelAlerts } from '@/lib/alerts';
import { getMetrics, saveMetrics } from '@/lib/metrics-service';


export async function POST(request: Request) {
    try {
        const updatedOfficer = await request.json() as Officer;

        if (!updatedOfficer || !updatedOfficer.id) {
            return NextResponse.json({ error: 'Invalid officer data' }, { status: 400 });
        }

        const officers = readJson<Officer[]>('officers.json');

        const index = officers.findIndex(o => o.id === updatedOfficer.id);
        if (index === -1) {
            return NextResponse.json({ error: 'Officer not found' }, { status: 404 });
        }

        const originalOfficer = officers[index];
        const newOfficerObj = { ...originalOfficer, ...updatedOfficer };

        // Metrics Tracking: Check if we resolved any personnel issues
        try {
            const originalAlerts = getPersonnelAlerts(originalOfficer).length;
            const newAlerts = getPersonnelAlerts(newOfficerObj).length;

            if (originalAlerts > newAlerts) {
                const diff = originalAlerts - newAlerts;
                const metrics = getMetrics();
                metrics.resolvedConflicts += diff;
                saveMetrics(metrics);
                console.log(`[API] Resolved ${diff} personnel issues for ${newOfficerObj.name}`);
            }
        } catch (e) {
            console.error('Failed to update metrics for officer', e);
        }

        officers[index] = newOfficerObj;
        writeJson('officers.json', officers);

        // Fire-and-forget Excel write-back
        updateOfficerInExcel(officers[index]).then(result => {
            if (!result.success) console.warn(`[API] Excel update failed: ${result.message}`);
            else console.log(`[API] Updated Excel for ${officers[index].name}`);
        }).catch(err => console.error('[update-officer] Excel sync error:', err));

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error updating officer:', error);
        return NextResponse.json({ error: 'Failed to update officer' }, { status: 500 });
    }
}
