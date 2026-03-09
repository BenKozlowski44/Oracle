import { NextResponse } from 'next/server';
import { Officer } from '@/lib/types';
import { readJson, writeJson } from '@/services/data-service';
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

        // Merge: update existing, add new
        const mergedOfficers = [...currentOfficers];
        let addedCount = 0;
        let updatedCount = 0;
        const genuinelyNewOfficers: Officer[] = [];

        newOfficers.forEach(newOfficer => {
            const index = mergedOfficers.findIndex(o => o.name === newOfficer.name);

            if (index !== -1) {
                const existing = mergedOfficers[index];
                mergedOfficers[index] = {
                    ...newOfficer,
                    id: existing.id,
                    status: existing.status,
                    listShift: existing.listShift,
                    notes: existing.notes || '',
                    rank: existing.rank || newOfficer.rank,
                    designator: existing.designator || newOfficer.designator,
                    tentativeSlate: existing.tentativeSlate || newOfficer.tentativeSlate,
                    preferences: existing.preferences || [],
                    preferredLocations: existing.preferredLocations?.length ? existing.preferredLocations : newOfficer.preferredLocations,
                    preferredPlatforms: existing.preferredPlatforms?.length ? existing.preferredPlatforms : newOfficer.preferredPlatforms,
                    preferencePriority: (existing.preferencePriority === 'Homeport' || existing.preferencePriority === 'Platform')
                        ? existing.preferencePriority
                        : newOfficer.preferencePriority,
                };
                updatedCount++;
            } else {
                newOfficer.status = 'Available';
                newOfficer.listShift = '';
                mergedOfficers.push(newOfficer);
                genuinelyNewOfficers.push(newOfficer);
                addedCount++;
            }
        });

        writeJson('officers.json', mergedOfficers);

        // Fire and forget Excel sync for genuinely new officers only
        if (genuinelyNewOfficers.length > 0) {
            import('@/lib/excel-writer').then(({ appendOfficersToExcel }) => {
                appendOfficersToExcel(genuinelyNewOfficers).catch(console.error);
            });
        }

        return NextResponse.json({
            success: true,
            added: addedCount,
            updated: updatedCount,
            total: mergedOfficers.length
        });

    } catch (error) {
        console.error('Error importing officers:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
