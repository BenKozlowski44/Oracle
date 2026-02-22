
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Officer } from '@/lib/types';
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

        const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts');
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');

        // Extract existing officers
        const startMarker = 'export const officers: Officer[] = [';
        const startIndex = fileContent.indexOf(startMarker);

        if (startIndex === -1) {
            return NextResponse.json({ error: 'Could not find officers data' }, { status: 500 });
        }

        const blockStart = startIndex + startMarker.length;
        let blockEnd = fileContent.indexOf('export const', startIndex + startMarker.length);
        if (blockEnd === -1) blockEnd = fileContent.length;

        let jsonString = fileContent.substring(blockStart - 1, blockEnd).trim(); // Include '['
        // Attempt to find the matching closing bracket strictly?
        // Reuse logic from create-officer/update-officer:
        // We need to parse existing to merge.

        // Actually, let's just find the array content.
        // It starts with `[` and ends with `]`.
        // Finding the last `]` before the next export or EOF.

        // Simplified parsing for now:
        const arrayStart = jsonString.indexOf('[');
        const arrayEnd = jsonString.lastIndexOf(']');
        const arrayContent = jsonString.substring(arrayStart, arrayEnd + 1);

        let currentOfficers: Officer[] = [];
        try {
            currentOfficers = JSON.parse(arrayContent);
        } catch (e) {
            console.error("Failed to parse existing officers JSON", e);
            return NextResponse.json({ error: 'Data file corrupted or invalid JSON' }, { status: 500 });
        }

        // MERGE LOGIC
        // 1. Update existing (preserve manual edits)
        // 2. Add new

        const mergedOfficers = [...currentOfficers];
        let addedCount = 0;
        let updatedCount = 0;
        const genuinelyNewOfficers: Officer[] = [];
        const heavilyUpdatedOfficers: Officer[] = []; // To trigger updateOfficerInExcel

        newOfficers.forEach(newOfficer => {
            const index = mergedOfficers.findIndex(o => o.name === newOfficer.name);

            if (index !== -1) {
                // Update existing
                const existing = mergedOfficers[index];
                mergedOfficers[index] = {
                    ...newOfficer,
                    // Preserve ID
                    id: existing.id,
                    // Preserve manual status/tab routing
                    status: existing.status,
                    listShift: existing.listShift,
                    notes: existing.notes || "",
                    // Preserve manual rank/desig
                    rank: existing.rank || newOfficer.rank,
                    designator: existing.designator || newOfficer.designator,
                    tentativeSlate: existing.tentativeSlate || newOfficer.tentativeSlate,
                    // Preserve manual preferences
                    preferences: existing.preferences || [],
                    preferredLocations: existing.preferredLocations && existing.preferredLocations.length > 0 ? existing.preferredLocations : newOfficer.preferredLocations,
                    preferredPlatforms: existing.preferredPlatforms && existing.preferredPlatforms.length > 0 ? existing.preferredPlatforms : newOfficer.preferredPlatforms,
                    preferencePriority: (function () {
                        if (existing.preferencePriority === "Homeport" || existing.preferencePriority === "Platform") {
                            return existing.preferencePriority;
                        }
                        return newOfficer.preferencePriority;
                    })()
                };
                heavilyUpdatedOfficers.push(mergedOfficers[index]);
                updatedCount++;
            } else {
                // Add new
                // Forcibly land them in the Bank tab for manual sorting by user, regardless of Excel data.
                newOfficer.status = "Available";
                newOfficer.listShift = "";

                mergedOfficers.push(newOfficer);
                genuinelyNewOfficers.push(newOfficer);
                addedCount++;
            }
        });

        // Write back
        const newJson = JSON.stringify(mergedOfficers, null, 4);

        const before = fileContent.substring(0, startIndex);
        const after = fileContent.substring(blockEnd);

        const newFileContent = before +
            `export const officers: Officer[] = ${newJson};\n` +
            after.trimStart();

        fs.writeFileSync(dataFilePath, newFileContent);

        // Fire and forget Excel Syncs
        import('@/lib/excel-writer').then(({ appendOfficersToExcel, updateOfficerInExcel }) => {
            if (genuinelyNewOfficers.length > 0) {
                appendOfficersToExcel(genuinelyNewOfficers).catch(console.error);
            }
            if (heavilyUpdatedOfficers.length > 0) {
                // If the user wants imported changes synced back:
                // heavilyUpdatedOfficers.forEach(o => updateOfficerInExcel(o).catch(console.error));
                // Wait, if they imported FROM the excel, we don't strictly need to write back TO the excel immediately,
                // BUT it ensures formatting consistency. Let's do it to be safe if `updateOfficerInExcel` is fast enough, 
                // but might be slow for 100 officers. 
                // Given the requirement is specifically "Any Officers that I now add to the bank will be written back":
            }
        });

        return NextResponse.json({
            success: true,
            added: addedCount,
            updated: updatedCount,
            total: mergedOfficers.length
        });

    } catch (error) {
        console.error("Error importing officers:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
