import { NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import { SlateCandidateProfile, TourEntry, Slate, Officer } from '@/lib/types';
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

const TOUR_PERIODS = [
    '1st Division Officer Tour',
    '2nd Division Officer Tour',
    'Post-Division Officer Tour',
    '1st Department Head Tour',
    '2nd Department Head Tour',
    'Post-Department Head Tour',
];

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const slateId = formData.get('slateId') as string;

        if (!file || !slateId) {
            return NextResponse.json({ error: 'Missing file or slateId' }, { status: 400 });
        }

        // ── Load workbook ────────────────────────────────────────────
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(await file.arrayBuffer());
        const sheet = workbook.getWorksheet('Input') || workbook.worksheets[0];
        if (!sheet) return NextResponse.json({ error: 'File appears empty' }, { status: 400 });

        // ── Build a row-index map for fast section scanning ───────────
        // Map: rowNumber → first-cell text value
        const rowLabels = new Map<number, string>();
        sheet.eachRow((row, rowNumber) => {
            const val = row.getCell(1).value?.toString().trim() || '';
            rowLabels.set(rowNumber, val);
        });

        const findRow = (startsWith: string): number => {
            for (const [rowNum, label] of rowLabels) {
                if (label.includes(startsWith)) return rowNum;
            }
            return -1;
        };

        const cellVal = (r: number, c: number): string =>
            sheet.getRow(r).getCell(c).value?.toString().trim() || '';

        // ── OFFICER INFORMATION (row 3 is input, row 1 = header, row 2 = col headers) ──
        const infoRow = findRow('OFFICER INFORMATION');
        const rawName = infoRow > 0 ? cellVal(infoRow + 2, 1) : '';
        if (!rawName) {
            return NextResponse.json({ error: 'Officer Name is required (cell A in the name input row)' }, { status: 400 });
        }

        const officers = readJson<Officer[]>('officers.json');
        const officerId = findOfficerId(rawName, officers);
        if (!officerId) {
            return NextResponse.json({ error: `Officer '${rawName}' not found in system.` }, { status: 404 });
        }

        // ── CONTACT INFORMATION ───────────────────────────────────────
        // Section layout: header → column headers → emails+phones row → address sub-header → address row
        const contactSection = findRow('CONTACT INFORMATION');
        const workEmail = contactSection > 0 ? cellVal(contactSection + 2, 1) : '';
        const homeEmail = contactSection > 0 ? cellVal(contactSection + 2, 2) : '';
        const workPhone = contactSection > 0 ? cellVal(contactSection + 2, 3) : '';
        const personalPhone = contactSection > 0 ? cellVal(contactSection + 2, 4) : '';
        // Address row is merged into col A, 2 rows after the address sub-header (which is +3)
        const mailingAddress = contactSection > 0 ? cellVal(contactSection + 4, 1) : '';

        // ── FLAG CONTACT ──────────────────────────────────────────────
        const flagRow = findRow('FLAG NOTIFIER');
        const flagName = flagRow > 0 ? cellVal(flagRow + 2, 1) : '';
        const flagRelationship = flagRow > 0 ? cellVal(flagRow + 2, 2) : '';

        // ── PREFERENCES ───────────────────────────────────────────────
        // Section header contains "COMMAND PREFERENCES", input starts 2 rows later
        const prefSection = findRow('COMMAND PREFERENCES');
        const preferences: { key: string; rank: number }[] = [];
        if (prefSection > 0) {
            let r = prefSection + 2; // skip section header + column header
            let rank = 1;
            while (r < prefSection + 100) {
                const label = rowLabels.get(r) || '';
                if (!label.startsWith('Preference')) break;
                const val = cellVal(r, 2);
                if (val && val.includes(' - ')) {
                    preferences.push({ key: val, rank });
                    rank++;
                }
                r++;
            }
        }

        // ── CONSIDERATIONS & NOTES (free-text box below preferences) ──
        const candNotesSection = findRow('CONSIDERATIONS & NOTES');
        // The free-text area is 2 rows after the section header (header +1 = instruction label, +2 = input)
        const candidateNotes = candNotesSection > 0 ? cellVal(candNotesSection + 2, 1) : '';

        // ── TOUR HISTORY ──────────────────────────────────────────────
        // Each tour block:
        //  +0  tour name sub-header (colored, merged)
        //  +1  sub-header: Ship | Platform | OFRP Phase
        //  +2  input row 1
        //  +3  sub-header: Months U/W | Months Deployed | Months as OOD
        //  +4  input row 2
        //  +5  sub-header: # OOD | # CONN | # JOOD
        //  +6  input row 3
        //  +7  spacer
        const tourHistory: TourEntry[] = [];
        const tourSectionRow = findRow('TOUR HISTORY');

        if (tourSectionRow > 0) {
            for (const period of TOUR_PERIODS) {
                const tourRow = findRow(period);
                if (tourRow < 0) continue;

                tourHistory.push({
                    period,
                    ship: cellVal(tourRow + 2, 1),
                    platform: cellVal(tourRow + 2, 2),
                    ofrpPhase: cellVal(tourRow + 2, 3),
                    monthsUW: cellVal(tourRow + 4, 1),
                    monthsDeployed: cellVal(tourRow + 4, 2),
                    monthsAsOOD: cellVal(tourRow + 4, 3),
                    oodEvolutions: cellVal(tourRow + 6, 1),
                    connEvolutions: cellVal(tourRow + 6, 2),
                    joodEvolutions: cellVal(tourRow + 6, 3),
                });
            }
        }

        // ── PROFESSIONAL QUALIFICATIONS ───────────────────────────────
        const qualRow = findRow('PROFESSIONAL QUALIFICATIONS');
        const jpme = qualRow > 0 ? cellVal(qualRow + 2, 2) : '';
        const wti = qualRow > 0 ? cellVal(qualRow + 3, 2) : '';

        // ── PERSONAL CONSIDERATIONS ───────────────────────────────────
        const consRow = findRow('PERSONAL CONSIDERATIONS');
        const coLocation = consRow > 0 ? cellVal(consRow + 2, 2) : '';
        const efm = consRow > 0 ? cellVal(consRow + 3, 2) : '';
        const education = consRow > 0 ? cellVal(consRow + 4, 2) : '';

        const notes = [
            candidateNotes ? `Candidate Notes: ${candidateNotes}` : '',
            coLocation ? `Co-Location: ${coLocation}` : '',
            efm ? `EFM: ${efm}` : '',
            education ? `Education: ${education}` : '',
        ].filter(Boolean).join(' | ');

        // ── Build summary string from tour history ────────────────────
        const experienceSummary = tourHistory
            .filter(t => t.ship || t.monthsUW)
            .map(t =>
                `[${t.period}] ${t.ship || 'N/A'} (${t.platform || '?'}) · OFRP: ${t.ofrpPhase || '?'} · ` +
                `U/W: ${t.monthsUW || '0'}mo · Dep: ${t.monthsDeployed || '0'}mo · OOD: ${t.monthsAsOOD || '0'}mo · ` +
                `Evo: OOD ${t.oodEvolutions || '0'}, CONN ${t.connEvolutions || '0'}, JOOD ${t.joodEvolutions || '0'}`
            )
            .join('\n');

        // ── Build Profile ─────────────────────────────────────────────
        const newProfile: SlateCandidateProfile = {
            id: `prof-${Date.now()}`,
            slateId,
            officerId,
            preferences,
            experienceSummary,
            availabilityDate: '',
            notes,
            flagContact: flagName ? { name: flagName, relationship: flagRelationship } : undefined,
            tourHistory: tourHistory.length > 0 ? tourHistory : undefined,
            jpme: jpme || undefined,
            wti: wti || undefined,
            contactInfo: (workEmail || homeEmail || workPhone || personalPhone || mailingAddress)
                ? {
                    workEmail: workEmail || undefined, homeEmail: homeEmail || undefined,
                    workPhone: workPhone || undefined, personalPhone: personalPhone || undefined,
                    mailingAddress: mailingAddress || undefined
                }
                : undefined,
        };

        // ── Persist to slates.json ────────────────────────────────────
        const slates = readJson<Slate[]>('slates.json');
        const slateIndex = slates.findIndex(s => s.id === slateId);
        if (slateIndex === -1) {
            return NextResponse.json({ error: 'Slate not found' }, { status: 404 });
        }

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
