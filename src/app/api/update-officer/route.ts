import { NextResponse } from 'next/server';
import { Officer } from '@/lib/types';
import { readJson } from '@/services/data-service';
import { updateOfficerInExcel } from '@/lib/excel-writer';
import { getPersonnelAlerts } from '@/lib/alerts';
import { getMetrics, saveMetrics } from '@/lib/metrics-service';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

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

        // Persist to JSON
        fs.writeFileSync(path.join(DATA_DIR, 'officers.json'), JSON.stringify(officers, null, 2), 'utf8');

        // Write-Back to Excel (Fire and Forget)
        console.log(`[API] Updating Excel for ${officers[index].name}`);
        const excelResult = await updateOfficerInExcel(officers[index]);
        if (!excelResult.success) {
            console.warn(`[API] Excel update failed: ${excelResult.message}`);
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error updating officer:', error);
        return NextResponse.json({ error: 'Failed to update officer' }, { status: 500 });
    }
}
