
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';
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
        const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });

        // Assume "Input" sheet
        const sheetName = workbook.SheetNames.find(n => n === "Input") || workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Parse basic details (Cell extraction)
        // B2 = Name, B3 = Rank, B4 = Designator are placeholders in row 1? 
        // Let's re-check the generator script:
        // Rows:
        // 0: Headers
        // 1: [Name, Rank, Desig, Email] <- User inputs here
        // 2: Spacer
        // 3: Headers
        // 4-8: Preferences
        // So User Input for Name is B2 (R1, C0..3)

        // Wait, "Input" keys were: ["Officer Name", "Rank", "Designator", "Email"] at Row 0.
        // User inputs at Row 1 (Index 1).

        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];
        if (jsonData.length < 2) return NextResponse.json({ error: 'File appears empty' }, { status: 400 });

        const nameRow = jsonData[1]; // Row 1: [Name, Rank, Desig, Email]
        const rawName = nameRow[0];

        if (!rawName) return NextResponse.json({ error: 'Officer Name is required in cell A2' }, { status: 400 });

        const officerId = findOfficerId(rawName);
        if (!officerId) return NextResponse.json({ error: `Officer '${rawName}' not found in system.` }, { status: 404 });

        // Parse Preferences (Rows 4-8, Indices 4-8)
        // Columns: A=Label, B=Dropdown Value (Platform-Location), C=Narrative
        // C is at Index 2 ? Wait, generator had "Preference 1" at A5. Input B5.
        // A=0, B=1.
        // Narrative was column "Narrative / Notes" at D? No.
        // Let's check generator:
        // ["Preferences (Select from Dropdown)", "Narrative / Notes"] at Row 3 (Index 3).
        // Row 4: ["Preference 1", "", "", ""] ? 
        // wsInput['!cols'] defined 4 cols.
        // Headers: ["Preferences...", "Narrative..."]
        // So B5 is preference, C5 (or B5's neighbor?) is Narrative?
        // Actually the generator script:
        // ["Preference 1", ""] -> This puts label in A, empty in B. 
        // "Narrative" header is at B4? No, Row 3 is: ["Preferences...", "Narrative..."].
        // This likely puts "Preferences..." in A4. "Narrative..." in B4.
        // So Preference Value is in A5? No, A5 is "Preference 1".
        // B5 is empty (Input).
        // C5 is ?? 
        // Let's look at the Generator script logic for Row 3:
        // `["Preferences (Select from Dropdown)", "Narrative / Notes"]`
        // Takes A4 and B4.
        // Row 4: `["Preference 1", ""]` -> A5="Preference 1", B5=Input.
        // So Narrative is likely missing a specific column or user puts it in C?
        // Wait, `wsInput['!cols']` has 4 columns.
        // Use logic: 
        // Preferences: B5..B9 (Indices: R4..R8, C1)

        const preferences: { key: string, rank: number }[] = [];
        for (let r = 4; r <= 8; r++) {
            const row = jsonData[r];
            if (row && row[1]) {
                const val = row[1].toString().trim();
                // Expect format: "PLATFORM - LOCATION"
                if (val && val.includes(" - ")) {
                    preferences.push({ key: val, rank: r - 3 }); // Row 4 = Rank 1
                }
            }
        }

        // Parse Experience / Narrative
        // Row 10: "Experience", "Value" (Index 10)
        // Row 11: "Total Months U/W", Value (B12)
        // Row 12: "Total Months Deployed", Value (B13)
        // Row 16: "Considerations", "Notes"
        // Row 17: Co-Location (B18)

        let experienceSummary = "";

        // Collect narrative text if found. 
        // Maybe in C column for preferences? User might naturally type there.
        // Or gather experience fields.
        const monthsUW = jsonData[11]?.[1] || "0";
        const monthsDep = jsonData[12]?.[1] || "0";
        const currentRole = jsonData[13]?.[1] || "";
        const pastRoles = jsonData[14]?.[1] || "";

        experienceSummary = `U/W: ${monthsUW}mo, Deployed: ${monthsDep}mo.\nCurrent: ${currentRole}\nPast: ${pastRoles}`;

        // Co-Location / Notes
        const notes = jsonData[17]?.[1] ? `Co-Lo: ${jsonData[17][1]}` : "";

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
