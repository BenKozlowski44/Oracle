import { NextResponse } from 'next/server';
import { Officer } from '@/lib/types';
import { readJson, writeJson, withWriteLock } from '@/services/data-service';
import { parseBankExcel } from '@/lib/excel-parser';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const newOfficers = await parseBankExcel(arrayBuffer);

        if (!newOfficers || newOfficers.length === 0) {
            return NextResponse.json({ error: 'No officers found in file' }, { status: 400 });
        }

        const currentOfficers = readJson<Officer[]>('officers.json');

        const [mergedOfficers, genuinelyNewOfficers] = await withWriteLock(() => {
            const currentOfficers = readJson<Officer[]>('officers.json');
            const merged = [...currentOfficers];
            let added = 0;
            const newlyAdded: Officer[] = [];

            newOfficers.forEach(newOfficer => {
                const index = merged.findIndex(o => o.name === newOfficer.name);
                if (index !== -1) {
                    const existing = merged[index];
                    merged[index] = {
                        ...newOfficer,
                        id: existing.id, status: existing.status, listShift: existing.listShift,
                        notes: existing.notes || '',
                        rank: existing.rank || newOfficer.rank,
                        designator: existing.designator || newOfficer.designator,
                        tentativeSlate: existing.tentativeSlate || newOfficer.tentativeSlate,
                        preferences: existing.preferences || [],
                        preferredLocations: existing.preferredLocations?.length ? existing.preferredLocations : newOfficer.preferredLocations,
                        preferredPlatforms: existing.preferredPlatforms?.length ? existing.preferredPlatforms : newOfficer.preferredPlatforms,
                        preferencePriority: (existing.preferencePriority === 'Homeport' || existing.preferencePriority === 'Platform')
                            ? existing.preferencePriority : newOfficer.preferencePriority,
                    };
                } else {
                    newOfficer.status = 'Available'; newOfficer.listShift = '';
                    merged.push(newOfficer); newlyAdded.push(newOfficer); added++;
                }
            });

            writeJson('officers.json', merged);
            return [merged, newlyAdded] as const;
        });

        // Fire and forget Excel sync for genuinely new officers only
        if (genuinelyNewOfficers.length > 0) {
            import('@/lib/excel-writer').then(({ appendOfficersToExcel }) => {
                appendOfficersToExcel(genuinelyNewOfficers).catch(console.error);
            });
        }

        return NextResponse.json({
            success: true,
            total: mergedOfficers.length
        });

    } catch (error) {
        console.error('Error importing officers:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
