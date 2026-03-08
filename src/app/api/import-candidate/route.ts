import { NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import { SlateCandidateProfile, Slate, Officer } from '@/lib/types';
import { readJson, writeJson } from '@/services/data-service';

// Helper to find officer by name (exact then fuzzy)
function findOfficerId(name: string, officers: Officer[]): string | undefined {
    const exact = officers.find(o => o.name.toLowerCase() === name.toLowerCase());
    if (exact) return exact.id;

    const fuzzy = officers.find(
        o => o.name.toLowerCase().includes(name.toLowerCase()) ||
            name.toLowerCase().includes(o.name.toLowerCase())
    );
    return fuzzy?.id;
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const slateId = formData.get('slateId') as string;

        if (!file || !slateId) {
            return NextResponse.json({ error: 'Missing file or slateId' }, { status: 400 });
        }

        // --- Parse Excel ---
        const arrayBuffer = await file.arrayBuffer();
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer);

        const sheet = workbook.getWorksheet('Input') || workbook.worksheets[0];
        if (!sheet) return NextResponse.json({ error: 'File appears empty' }, { status: 400 });

        // Row 3: Officer name (row 1 = section header, row 2 = column headers, row 3 = input)
        const rawName = sheet.getRow(3).getCell(1).value?.toString().trim() || '';
        if (!rawName) {
            return NextResponse.json({ error: 'Officer Name is required in cell A3' }, { status: 400 });
        }

        const officers = readJson<Officer[]>('officers.json');
        const officerId = findOfficerId(rawName, officers);
        if (!officerId) {
            return NextResponse.json({ error: `Officer '${rawName}' not found in system.` }, { status: 404 });
        }

        // --- Parse Preferences ---
        // Template layout:
        //   Row 1: "OFFICER INFORMATION" section header
        //   Row 2: column headers
        //   Row 3: officer input cells
        //   Row 4: blank spacer
        //   Row 5: "COMMAND PREFERENCES..." section header
        //   Row 6: column headers (Rank | Platform - Location | Narrative)
        //   Row 7+: "Preference 1", "Preference 2", ... (dynamic count)
        //
        // Scan from row 7, stop when the cell label no longer starts with "Preference"
        const preferences: { key: string; rank: number }[] = [];
        let r = 7;
        while (r < 200) {
            const row = sheet.getRow(r);
            const label = row.getCell(1).value?.toString() || '';
            if (!label.startsWith('Preference')) break;
            const val = row.getCell(2).value?.toString().trim();
            if (val && val.includes(' - ')) {
                preferences.push({ key: val, rank: r - 6 }); // row 7 = rank 1
            }
            r++;
        }

        // --- Parse Experience section ---
        // After preferences there's a blank spacer row, then "Experience" header
        // Scan forward from r to find the Experience header
        while (r < 100 && (sheet.getRow(r).getCell(1).value?.toString() || '') !== 'Experience') r++;
        r++; // skip header row

        const monthsUW = sheet.getRow(r).getCell(2).value?.toString() || '0'; r++;
        const monthsDep = sheet.getRow(r).getCell(2).value?.toString() || '0'; r++;
        const currentRole = sheet.getRow(r).getCell(2).value?.toString() || ''; r++;
        const pastRoles = sheet.getRow(r).getCell(2).value?.toString() || ''; r++;
        const jpme = sheet.getRow(r).getCell(2).value?.toString() || ''; r++;
        const wti = sheet.getRow(r).getCell(2).value?.toString() || ''; r++;

        const experienceSummary = [
            `U/W: ${monthsUW}mo, Deployed: ${monthsDep}mo`,
            `Current: ${currentRole}`,
            `Past: ${pastRoles}`,
            jpme ? `JPME: ${jpme}` : '',
            wti ? `WTI: ${wti}` : '',
        ].filter(Boolean).join('\n');

        // --- Parse Considerations section ---
        while (r < 100 && (sheet.getRow(r).getCell(1).value?.toString() || '') !== 'Considerations') r++;
        r++; // skip header

        const coLocation = sheet.getRow(r).getCell(2).value?.toString() || ''; r++;
        const efm = sheet.getRow(r).getCell(2).value?.toString() || ''; r++;
        const education = sheet.getRow(r).getCell(2).value?.toString() || '';

        const notes = [
            coLocation ? `Co-Location: ${coLocation}` : '',
            efm ? `EFM: ${efm}` : '',
            education ? `Education: ${education}` : '',
        ].filter(Boolean).join(' | ');

        // --- Build Profile ---
        const newProfile: SlateCandidateProfile = {
            id: `prof-${Date.now()}`,
            slateId,
            officerId,
            preferences,
            experienceSummary,
            availabilityDate: '', // Not synced to officer bank per design
            notes,
        };

        // --- Persist to slates.json ---
        const slates = readJson<Slate[]>('slates.json');
        const slateIndex = slates.findIndex(s => s.id === slateId);

        if (slateIndex === -1) {
            return NextResponse.json({ error: 'Slate not found' }, { status: 404 });
        }

        // Upsert: replace existing profile for this officer, or append
        const existing = slates[slateIndex].candidateProfiles || [];
        const profileIndex = existing.findIndex(p => p.officerId === officerId);

        if (profileIndex >= 0) {
            existing[profileIndex] = newProfile;
        } else {
            existing.push(newProfile);
        }

        slates[slateIndex].candidateProfiles = existing;
        writeJson('slates.json', slates);

        return NextResponse.json({ success: true, profile: newProfile });

    } catch (e) {
        console.error('[import-candidate]', e);
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}
