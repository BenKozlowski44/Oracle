import { NextResponse } from 'next/server';
import { Officer } from '@/lib/types';
import { readJson, writeJson, withWriteLock } from '@/services/data-service';

export async function POST(request: Request) {
    try {
        const newOfficer = await request.json() as Officer;

        if (!newOfficer || !newOfficer.name) {
            return NextResponse.json({ error: 'Invalid officer data' }, { status: 400 });
        }

        // Generate ID if missing
        if (!newOfficer.id) {
            newOfficer.id = newOfficer.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '_' + Date.now();
        }

        // Ensure defaults
        if (!newOfficer.preferences) newOfficer.preferences = [];
        if (!newOfficer.preferredLocations) newOfficer.preferredLocations = [];
        if (!newOfficer.preferredPlatforms) newOfficer.preferredPlatforms = [];

        const officers = readJson<Officer[]>('officers.json');
        await withWriteLock(() => {
            officers.unshift(newOfficer);
            writeJson('officers.json', officers);
        });

        // Fire-and-forget Excel write-back (outside lock)
        import('@/lib/excel-writer').then(({ appendOfficersToExcel }) => {
            appendOfficersToExcel([newOfficer]).then(res => {
                if (!res.success) console.warn(`[API] Excel append failed: ${res.message}`);
            }).catch(err => console.error('Failed to append officer to Excel:', err));
        });

        return NextResponse.json({ success: true, officer: newOfficer });

    } catch (error) {
        console.error('Error creating officer:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
