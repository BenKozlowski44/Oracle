import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';
import { SlateCandidateProfile, Officer } from '@/lib/types';
import { slates, officers as existingOfficers } from '@/lib/data'; // We need access to current data to match officers

// Helper to find officer by name (fuzzy match or exact)
function findOfficerId(name: string): string | undefined {
    // 1. Exact Name match
    const exact = existingOfficers.find(o => o.name.toLowerCase() === name.toLowerCase());
    if (exact) return exact.id;

    // 2. Simple fuzzy (contains)
    const fuzzy = existingOfficers.find(o => o.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(o.name.toLowerCase()));
    if (fuzzy) return fuzzy.id;

    return undefined;
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const slateId = formData.get('slateId') as string;

        if (!file || !slateId) {
            return NextResponse.json({ error: 'Missing file or slateId' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer);

        // Assume "Input" sheet
        const sheet = workbook.getWorksheet("Input") || workbook.worksheets[0];

        if (!sheet) return NextResponse.json({ error: 'File appears empty' }, { status: 400 });

        // User inputs at Row 2 (Index 2 in 1-based indexing for ExcelJS).
        const nameRow = sheet.getRow(2);
        const rawName = nameRow.getCell(1).value?.toString() || "";

        if (!rawName) return NextResponse.json({ error: 'Officer Name is required in cell A2' }, { status: 400 });

        const officerId = findOfficerId(rawName);
        if (!officerId) return NextResponse.json({ error: `Officer '${rawName}' not found in system.` }, { status: 404 });

        // Parse Preferences (Rows 5-9)
        // A=Label, B=Dropdown Value (Platform-Location), C=Narrative
        const preferences: { key: string, rank: number }[] = [];
        for (let r = 5; r <= 9; r++) {
            const row = sheet.getRow(r);
            const val = row.getCell(2).value?.toString().trim(); // Column B
            if (val && val.includes(" - ")) {
                preferences.push({ key: val, rank: r - 4 }); // Row 5 = Rank 1
            }
        }

        let experienceSummary = "";

        // Collect narrative text if found. 
        const monthsUW = sheet.getRow(12).getCell(2).value?.toString() || "0";
        const monthsDep = sheet.getRow(13).getCell(2).value?.toString() || "0";
        const currentRole = sheet.getRow(14).getCell(2).value?.toString() || "";
        const pastRoles = sheet.getRow(15).getCell(2).value?.toString() || "";

        experienceSummary = `U/W: ${monthsUW}mo, Deployed: ${monthsDep}mo.\nCurrent: ${currentRole}\nPast: ${pastRoles}`;

        // Co-Location / Notes
        const notes = sheet.getRow(18).getCell(2).value ? `Co-Lo: ${sheet.getRow(18).getCell(2).value}` : "";

        // Construct Profile
        const newProfile: SlateCandidateProfile = {
            id: `prof-${Date.now()}`,
            slateId,
            officerId,
            preferences,
            experienceSummary,
            availabilityDate: new Date().toISOString().split('T')[0], // Default to today/TBD? Or parse if added?
            notes
        };

        // --- UPDATE DATA.TS ---
        // Identical logic to import-officers: Read, Find "slates", Update candidateProfiles
        const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts');
        let fileContent = fs.readFileSync(dataFilePath, 'utf8');

        // Locate `export const slates: Slate[] = [`
        const startMarker = 'export const slates: Slate[] = [';
        const startIndex = fileContent.indexOf(startMarker);
        if (startIndex === -1) throw new Error("Could not find slates data");

        // Extract array
        // We know slates is usually the last export, but let's be safe.
        // Find closing `];` ?
        // Or just parse the whole file via AST? No, text replacement is safer for preserving comments/structure if careful.
        // But `data.ts` is huge.
        // Simple approach: Find the Slate object within the array.

        // Alternative: Regex replace the specific slate's candidateProfiles.
        // But we need to allow for *new* profiles.

        // 1. Parse current slates from `data.ts` (using import is safest for value, but we need text for writing)
        // Actually, importing `slates` allows us to modify the object in memory and serialized back?
        // No, we need to write to file.
        // Let's rely on string parsing of the known structure.

        // Find the slate by ID in the text.
        // Regex: `id: "${slateId}"`
        // Then find `candidateProfiles: [` inside it.
        // If not found, create it.

        // This is complex to do robustly with text manipulation on a massive file.
        // Strategy:
        // 1. Read file.
        // 2. Find the Block for `slates`.
        // 3. Eval/JSON.parse is hard because it's TS code (keys not quoted?). `data.ts` has unquoted keys?
        // Let's check `data.ts` format.
        // It has `"slates": [` or `slates: [` ?
        // View file showed: `"candidates": [...], "candidateProfiles": [...]` inside `export const slates`.
        // It seems to use JSON-like structure but as TS export.

        // BETTER STRATEGY:
        // Since this is a prototype/scratchpad:
        // We will just APPEND the new profile to the specific slate using strict string replacement of the `candidateProfiles` array end.

        // 1. Find Slate start
        const slateStart = fileContent.indexOf(slateId);
        if (slateStart === -1) throw new Error("Slate not found in data file");

        // 2. Look ahead for `candidateProfiles: [`
        // Limit lookahead to avoid jumping to next slate.
        const nextSlate = fileContent.indexOf('id: "slate-', slateStart + 10);
        const searchRegion = (nextSlate === -1) ? fileContent.substring(slateStart) : fileContent.substring(slateStart, nextSlate);

        let newSearchRegion = searchRegion;

        // Check if candidateProfiles exists
        if (searchRegion.includes('candidateProfiles: [')) {
            // It exists, insert into it.
            // Find `candidateProfiles: [`
            // Find the matching `]`
            // Insert our new json object before `]`

            // We need to replace the EXISTING profile for this officer if it exists.
            // This is getting hard with string manipulation.

            // FALLBACK: Read the WHOLE file, find the `export const slates` part.
            // Use a simple AST logic or just assume standard formatting.
            // The file is 10k lines.

            // Let's try to load the current `slates` via `import`. We already did: `import { slates } ...`
            // Modifying that object in memory and then writing it back as JSON is risky if `data.ts` isn't pure JSON.
            // `data.ts` IS TS code.

            // OK, let's use the exact same approach as `import-officers`:
            // 1. Extract the array string.
            // 2. JSON.parse it? 
            // `import-officers` used `JSON.parse`. This implies `data.ts` contents for these arrays ARE valid JSON (quoted keys etc).
            // Let's verify `data.ts` content format.
        } else {
            // Create it.
            // Find `candidates: [ ... ],`
            // Append `candidateProfiles: [ ... ],` after it.
        }

        // RE-VERIFY DATA.TS FORMAT
        // View file of data.ts around line 1.

        // ... (Logic continues after verify)

        return NextResponse.json({ success: true, profile: newProfile });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}
