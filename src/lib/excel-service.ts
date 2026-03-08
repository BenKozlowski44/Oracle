
// Force CommonJS require for ExcelJS to avoid Next.js import issues
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ExcelJS = require('exceljs');
import { Slate, OracleCommand } from '@/lib/types';
import { oracleData } from '@/lib/data';

// OFRP Phase dropdown options
const OFRP_PHASES = [
    'Maintenance',
    'Basic',
    'Integrated',
    'Sustainment',
    'Deployment Prep',
    'Deployed',
    'Post-Deployment',
    'N/A (Shore/Staff)',
];

// The 6 career tour periods, in order
const TOUR_PERIODS = [
    '1st Division Officer Tour',
    '2nd Division Officer Tour',
    'Post-Division Officer Tour',
    '1st Department Head Tour',
    '2nd Department Head Tour',
    'Post-Department Head Tour',
];

export async function generateCandidateTemplate(slate: Slate): Promise<Buffer> {
    console.log('[ExcelService] Starting generation...');
    try {
        // --- Scoped preference options ---
        const relevantCommands = slate.requirements
            .map(req => oracleData.find(c => c.id === req.commandId))
            .filter((c): c is OracleCommand => !!c && !!c.platform && !!c.location);

        const options = Array.from(new Set(
            relevantCommands.map(cmd => `${cmd.platform} - ${cmd.location}`)
        )).sort();

        const finalOptions = options.length > 0 ? options : ['No Commands Available'];
        const prefCount = finalOptions.length;

        // --- Workbook ---
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'Oracle Slate Manager';
        workbook.created = new Date();

        // ── Sheet 1: Instructions ────────────────────────────────────
        const wsInstructions = workbook.addWorksheet('Instructions');
        wsInstructions.getColumn(1).width = 90;
        const instructionLines = [
            `Candidate Slate Input — ${slate.name}`,
            '',
            'INSTRUCTIONS',
            '1. Fill in every blue cell in the "Input" tab. Locked cells cannot be edited.',
            '2. For command preferences, select from the dropdown and explain your reasoning in the narrative column.',
            '3. Complete ALL tour history sections honestly. Accuracy matters — this guides the Detailer.',
            '4. For OFRP Phase, select the phase the ship was in for the MAJORITY of that tour.',
            '5. Save and return this file to your Detailer.',
            '',
            `Slate Window: ${slate.windowStart} — ${slate.windowEnd}`,
            '',
            'DO NOT alter the structure of this file or rename worksheets.',
        ];
        instructionLines.forEach((line, i) => {
            const cell = wsInstructions.getRow(i + 1).getCell(1);
            cell.value = line;
            if (i === 0) cell.font = { bold: true, size: 14 };
            else if (i === 2) cell.font = { bold: true, size: 11 };
        });
        await wsInstructions.protect('password', { selectLockedCells: true, selectUnlockedCells: true });

        // ── Sheet 2: Data (hidden) — dropdown sources ────────────────
        const wsData = workbook.addWorksheet('Data');
        wsData.state = 'hidden';
        // Column A: preference options
        finalOptions.forEach((opt, i) => wsData.getRow(i + 1).getCell(1).value = opt);
        // Column B: OFRP phases
        OFRP_PHASES.forEach((phase, i) => wsData.getRow(i + 1).getCell(2).value = phase);

        // ── Sheet 3: Input ───────────────────────────────────────────
        const wsInput = workbook.addWorksheet('Input');
        wsInput.getColumn('A').width = 34;
        wsInput.getColumn('B').width = 22;
        wsInput.getColumn('C').width = 22;
        wsInput.getColumn('D').width = 22;
        wsInput.getColumn('E').width = 40;

        // Style helpers
        const makeInputCell = (cellRef: string) => {
            const cell = wsInput.getCell(cellRef);
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE6F0FF' } };
            cell.border = {
                top: { style: 'thin' }, left: { style: 'thin' },
                bottom: { style: 'thin' }, right: { style: 'thin' }
            };
            cell.protection = { locked: false };
            return cell;
        };

        const makeSectionHeader = (rowNum: number, title: string, argb = 'FF1F3864') => {
            const row = wsInput.getRow(rowNum);
            const cell = row.getCell(1);
            cell.value = title;
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb } };
            // Merge across all 5 columns
            wsInput.mergeCells(rowNum, 1, rowNum, 5);
        };

        const makeSubHeader = (rowNum: number, labels: string[]) => {
            const row = wsInput.getRow(rowNum);
            labels.forEach((lbl, i) => {
                const cell = row.getCell(i + 1);
                cell.value = lbl;
                cell.font = { bold: true, italic: true, size: 9 };
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E1F2' } };
            });
        };

        let r = 1;

        // ─── OFFICER INFORMATION ─────────────────────────────────────
        makeSectionHeader(r++, 'OFFICER INFORMATION');
        makeSubHeader(r++, ['Full Name', 'Rank', 'Designator', 'Email', '']);
        ['B', 'C', 'D', 'E'].forEach(col => makeInputCell(`A${r}`));
        makeInputCell(`A${r}`);
        makeInputCell(`B${r}`);
        makeInputCell(`C${r}`);
        makeInputCell(`D${r}`);
        makeInputCell(`E${r}`);
        r++;

        // spacer
        r++;

        // ─── CONTACT INFORMATION ──────────────────────────────────────
        makeSectionHeader(r++, 'CONTACT INFORMATION');
        makeSubHeader(r++, ['Work Email', 'Home / Personal Email', 'Work Phone', 'Personal Cell', '']);
        makeInputCell(`A${r}`);
        makeInputCell(`B${r}`);
        makeInputCell(`C${r}`);
        makeInputCell(`D${r}`);
        r++;

        makeSubHeader(r++, ['Mailing Address (Street, City, State ZIP)', '', '', '', '']);
        wsInput.mergeCells(r - 1, 1, r - 1, 5);
        wsInput.mergeCells(r, 1, r, 5);
        makeInputCell(`A${r}`);
        r++;

        // spacer
        r++;

        // ─── FLAG CONTACT ─────────────────────────────────────────────
        makeSectionHeader(r++, 'FLAG CONTACT');
        makeSubHeader(r++, ['Flag Officer Name', 'Relationship / Context', '', '', '']);
        makeInputCell(`A${r}`);
        makeInputCell(`B${r}`);
        r++;

        // spacer
        r++;

        // ─── COMMAND PREFERENCES ──────────────────────────────────────
        makeSectionHeader(r++, `COMMAND PREFERENCES (Ranked 1–${prefCount})`);
        makeSubHeader(r++, ['Rank', 'Platform - Location', 'Narrative (why this preference?)', '', '']);

        const prefStartRow = r;
        for (let i = 0; i < prefCount; i++) {
            wsInput.getRow(r).getCell(1).value = `Preference ${i + 1}`;
            const cellB = makeInputCell(`B${r}`);
            cellB.dataValidation = {
                type: 'list',
                allowBlank: true,
                formulae: [`'Data'!$A$1:$A$${finalOptions.length}`]
            };
            wsInput.mergeCells(r, 3, r, 5);
            makeInputCell(`C${r}`);
            r++;
        }
        console.log(`[ExcelService] Built ${prefCount} preference rows (first at row ${prefStartRow}).`);

        // spacer
        r++;

        // ─── TOUR HISTORY (6 tours) ───────────────────────────────────
        makeSectionHeader(r++, 'TOUR HISTORY', 'FF1B5E20'); // dark green

        for (const period of TOUR_PERIODS) {
            // Tour sub-header
            const subHeaderRow = r;
            wsInput.getRow(r).getCell(1).value = period;
            wsInput.getRow(r).getCell(1).font = { bold: true, size: 10 };
            wsInput.getRow(r).getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8F5E9' } };
            wsInput.mergeCells(r, 1, r, 5);
            r++;

            // Line 1: Ship | Platform | OFRP Phase
            makeSubHeader(r, ['Ship / Command', 'Platform (DDG/CG/etc.)', 'OFRP Phase (majority)', '', '']);
            r++;
            makeInputCell(`A${r}`);
            makeInputCell(`B${r}`);
            const cellOFRP = makeInputCell(`C${r}`);
            cellOFRP.dataValidation = {
                type: 'list',
                allowBlank: true,
                formulae: [`'Data'!$B$1:$B$${OFRP_PHASES.length}`]
            };
            r++;

            // Line 2: Months U/W | Months Deployed | Months as OOD
            makeSubHeader(r, ['Months U/W', 'Months Deployed', 'Months stood as OOD', '', '']);
            r++;
            makeInputCell(`A${r}`);
            makeInputCell(`B${r}`);
            makeInputCell(`C${r}`);
            r++;

            // Line 3: OOD Evolutions | CONN Evolutions | JOOD Evolutions
            makeSubHeader(r, ['# OOD Evolutions', '# CONN Evolutions', '# JOOD Evolutions', '', '']);
            r++;
            makeInputCell(`A${r}`);
            makeInputCell(`B${r}`);
            makeInputCell(`C${r}`);
            r++;

            // spacer between tours
            r++;
        }

        // ─── PROFESSIONAL QUALIFICATIONS ──────────────────────────────
        makeSectionHeader(r++, 'PROFESSIONAL QUALIFICATIONS');
        makeSubHeader(r++, ['Field', 'Value', '', '', '']);

        const qualFields = [
            'JPME Completion / Plan',
            'WTI Qualification (Type if applicable)',
        ];
        for (const field of qualFields) {
            wsInput.getRow(r).getCell(1).value = field;
            makeInputCell(`B${r}`);
            r++;
        }

        // spacer
        r++;

        // ─── PERSONAL CONSIDERATIONS ──────────────────────────────────
        makeSectionHeader(r++, 'PERSONAL CONSIDERATIONS');
        makeSubHeader(r++, ['Consideration', 'Notes', '', '', '']);

        const consFields = ['Co-Location Request', 'EFM Considerations', 'Education / Pipeline'];
        for (const field of consFields) {
            wsInput.getRow(r).getCell(1).value = field;
            makeInputCell(`B${r}`);
            r++;
        }

        // Protect the input sheet
        await wsInput.protect('password', {
            selectLockedCells: true,
            selectUnlockedCells: true
        });

        const uint8Array = await workbook.xlsx.writeBuffer();
        return Buffer.from(uint8Array);
    } catch (e: any) {
        console.error('[ExcelService] Generation failed:', e);
        throw e;
    }
}
