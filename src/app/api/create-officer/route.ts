
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Officer } from '@/lib/types';

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

        const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts');
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');

        // Logic similar to update-officer, but we append to the array.
        const startMarker = 'export const officers: Officer[] = [';
        const startIndex = fileContent.indexOf(startMarker);

        if (startIndex === -1) {
            return NextResponse.json({ error: 'Could not find officers data' }, { status: 500 });
        }

        const blockStart = startIndex + startMarker.length;

        // Find the end of the array by counting brackets is safest, or use the "export const billets" marker method as before?
        // Let's use the same robust logic as update-officer or update-data if possible.
        // Actually, update-officer implementation we saw earlier might have been incomplete in my view_file? 
        // Let's re-read update-officer logic to reuse it or improve it.
        // For simplicity and speed in a prototype:
        // We can just find the LAST closing bracket of the officers array?

        // Let's assume the file structure is somewhat static due to our generators.
        // "export const officers: Officer[] = [...];"

        // Matches the array content
        // Regex to match "export const officers: Officer[] = <JSONArray>;" or similar
        // But referencing manual file parsing is risky.

        // Robust approach:
        // 1. Read file.
        // 2. Extract current officers block.
        // 3. Parse it? (Dangerous with comments/imports)

        // Safest for this environment:
        // Read file, find "export const officers: Officer[] = [" 
        // Insert the new officer object string right after that.

        const newOfficerString = JSON.stringify(newOfficer, null, 4) + ',\n';

        const newFileContent = fileContent.slice(0, blockStart) + '\n' + newOfficerString + fileContent.slice(blockStart);

        fs.writeFileSync(dataFilePath, newFileContent);

        // Fire and forget Excel write-back
        import('@/lib/excel-writer').then(({ appendOfficersToExcel }) => {
            appendOfficersToExcel([newOfficer]).then(res => {
                if (!res.success) {
                    console.warn(`[API] Excel append failed: ${res.message}`);
                }
            }).catch(err => {
                console.error("Failed to append officer to Excel:", err);
            });
        });

        return NextResponse.json({ success: true, officer: newOfficer });

    } catch (error) {
        console.error("Error creating officer:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
