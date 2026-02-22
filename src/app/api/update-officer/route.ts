import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Officer } from '@/lib/types';
import { updateOfficerInExcel } from '@/lib/excel-writer';

export async function POST(request: Request) {
    try {
        const updatedOfficer = await request.json() as Officer;

        if (!updatedOfficer || !updatedOfficer.id) {
            return NextResponse.json({ error: 'Invalid officer data' }, { status: 400 });
        }

        // 1. Update data.ts
        const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts');
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');

        // Extract JSON
        const startMarker = 'export const officers: Officer[] =';
        const searchStartIndex = fileContent.indexOf(startMarker);

        if (searchStartIndex === -1) throw new Error("Could not find officers array");

        const openBracketIndex = fileContent.indexOf('[', searchStartIndex + startMarker.length);
        if (openBracketIndex === -1) throw new Error("Could not find opening bracket");

        // 2. Find the matching closing bracket using a counter
        let depth = 0;
        let inString = false;
        let quoteChar = '';
        let closeBracketIndex = -1;

        for (let i = openBracketIndex; i < fileContent.length; i++) {
            const char = fileContent[i];

            if (inString) {
                if (char === quoteChar && fileContent[i - 1] !== '\\') {
                    inString = false;
                }
            } else {
                if (char === '"' || char === "'" || char === '`') {
                    inString = true;
                    quoteChar = char;
                } else if (char === '[') {
                    depth++;
                } else if (char === ']') {
                    depth--;
                    if (depth === 0) {
                        closeBracketIndex = i;
                        break;
                    }
                }
            }
        }

        if (closeBracketIndex === -1) throw new Error("Could not find matching closing bracket");

        const jsonString = fileContent.substring(openBracketIndex, closeBracketIndex + 1);

        // The content might not be valid JSON because keys might not be quoted if written loosely, 
        // OR it might be perfectly valid JSON if we used JSON.stringify to write it previously.
        // Our `update-data` uses JSON.stringify, so it SHOULD be valid JSON.
        // HOWEVER: data.ts often has trailing commas if edited manually or by certain formatters.

        let officers: Officer[];
        try {
            // Use Function constructor to parse valid JS object literal strings (supports trailing commas)
            // This is safer for data.ts which is a TS file, not strict JSON.
            const parseFn = new Function(`return ${jsonString}`);
            officers = parseFn() as Officer[];
        } catch (e) {
            console.error("Failed to parse officers data", e);
            return NextResponse.json({ error: 'Data file corrupted or invalid format' }, { status: 500 });
        }

        // Update in memory
        const index = officers.findIndex(o => o.id === updatedOfficer.id);
        if (index !== -1) {
            officers[index] = { ...officers[index], ...updatedOfficer };
        } else {
            return NextResponse.json({ error: 'Officer not found' }, { status: 404 });
        }

        // Write back to data.ts
        const newSegment = JSON.stringify(officers, null, 4);
        const newFileContent = fileContent.substring(0, openBracketIndex) +
            newSegment +
            fileContent.substring(closeBracketIndex + 1);

        fs.writeFileSync(dataFilePath, newFileContent);

        // 2. Write-Back to Excel (Fire and Forget / Async)
        console.log(`[API] Updating Excel for ${officers[index].name}`);
        const excelResult = await updateOfficerInExcel(officers[index]);
        if (!excelResult.success) {
            console.warn(`[API] Excel update failed: ${excelResult.message}`);
            // We do NOT fail the request, as the DB update succeeded. 
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error updating officer:', error);
        return NextResponse.json({ error: 'Failed to update officer' }, { status: 500 });
    }
}
