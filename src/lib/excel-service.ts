
// Force CommonJS require for ExcelJS to avoid Next.js import issues
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ExcelJS = require('exceljs');
import { Slate, OracleCommand } from '@/lib/types';
import { oracleData } from '@/lib/data';

export async function generateCandidateTemplate(slate: Slate): Promise<Buffer> {
    console.log("[ExcelService] Starting generation...");
    try {
        // 1. Get scoped Platform-Location options from this slate's requirements
        const relevantCommands = slate.requirements
            .map(req => oracleData.find(c => c.id === req.commandId))
            .filter((c): c is OracleCommand => !!c && !!c.platform && !!c.location);

        console.log(`[ExcelService] Found ${relevantCommands.length} relevant commands.`);

        const options = Array.from(new Set(
            relevantCommands.map(cmd => `${cmd.platform} - ${cmd.location}`)
        )).sort();

        const finalOptions = options.length > 0 ? options : ["No Commands Available"];

        // Number of preference rows = number of unique platform-location options
        // (they can't have more preferences than available options)
        const prefCount = finalOptions.length;

        // 2. Create Workbook
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'Slate Manager';
        workbook.created = new Date();

        // --- Sheet 1: Instructions ---
        const wsInstructions = workbook.addWorksheet('Instructions');
        wsInstructions.getColumn(1).width = 80;
        const instructions = [
            `Candidate Slate Input — ${slate.name}`,
            "",
            "1. Fill out the 'Input' tab completely. All blue cells require your input.",
            "2. Select your command preferences from the dropdown menus in ranked order (1 = top choice).",
            "3. Add a brief narrative in Column C explaining why you prefer that platform/location.",
            "4. Complete the Experience and Considerations sections honestly.",
            "5. Save this file and return it to your Detailer for upload.",
            "",
            "Note: Do not modify locked cells or the structure of this file.",
            `Slate Window: ${slate.windowStart} — ${slate.windowEnd}`,
        ];

        instructions.forEach((line, i) => {
            const row = wsInstructions.getRow(i + 1);
            row.getCell(1).value = line;
            if (i === 0) row.font = { bold: true, size: 14 };
        });

        await wsInstructions.protect('password', { selectLockedCells: true, selectUnlockedCells: true });

        // --- Sheet 2: Data (Hidden) — preference options for dropdown validation ---
        const wsData = workbook.addWorksheet('Data');
        wsData.state = 'hidden';
        finalOptions.forEach((opt, i) => {
            wsData.getRow(i + 1).getCell(1).value = opt;
        });

        // --- Sheet 3: Input ---
        const wsInput = workbook.addWorksheet('Input');
        wsInput.getColumn('A').width = 32;
        wsInput.getColumn('B').width = 50;
        wsInput.getColumn('C').width = 40;

        const inputStyle = {
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE6F0FF' } },
            border: {
                top: { style: 'thin' }, left: { style: 'thin' },
                bottom: { style: 'thin' }, right: { style: 'thin' }
            },
            protection: { locked: false }
        };

        const sectionHeaderStyle = { bold: true, size: 11 };
        const columnHeaderStyle = { bold: true, italic: true };

        const applyInput = (cellRef: string) => {
            const cell = wsInput.getCell(cellRef);
            cell.fill = inputStyle.fill;
            cell.border = inputStyle.border;
            cell.protection = { locked: false };
        };

        // ─── Section 1: Personal Info ────────────────────────────────
        wsInput.getRow(1).values = ["OFFICER INFORMATION", "", ""];
        wsInput.getRow(1).font = sectionHeaderStyle;
        wsInput.getRow(2).values = ["Officer Name", "Rank", "Designator"];
        wsInput.getRow(2).font = columnHeaderStyle;
        // Row 3: input cells
        ['A3', 'B3', 'C3'].forEach(applyInput);

        // ─── Spacer ──────────────────────────────────────────────────
        wsInput.getRow(4).values = [];

        // ─── Section 2: Preferences ──────────────────────────────────
        wsInput.getRow(5).values = ["COMMAND PREFERENCES (Ranked)", "", ""];
        wsInput.getRow(5).font = sectionHeaderStyle;
        wsInput.getRow(6).values = ["Rank", "Platform - Location", "Narrative (why this preference?)"];
        wsInput.getRow(6).font = columnHeaderStyle;

        const prefStartRow = 7;
        for (let i = 0; i < prefCount; i++) {
            const r = prefStartRow + i;
            const row = wsInput.getRow(r);
            row.getCell(1).value = `Preference ${i + 1}`;

            // Dropdown for Platform-Location
            const cellB = row.getCell(2);
            cellB.fill = inputStyle.fill;
            cellB.border = inputStyle.border;
            cellB.protection = { locked: false };
            cellB.dataValidation = {
                type: 'list',
                allowBlank: true,
                formulae: [`'Data'!$A$1:$A$${finalOptions.length}`]
            };

            // Narrative
            const cellC = row.getCell(3);
            cellC.fill = inputStyle.fill;
            cellC.border = inputStyle.border;
            cellC.protection = { locked: false };
        }

        // ─── Spacer ──────────────────────────────────────────────────
        let r = prefStartRow + prefCount + 1;

        // ─── Section 3: Experience ───────────────────────────────────
        wsInput.getRow(r).values = ["Experience", "Value"];
        wsInput.getRow(r).font = sectionHeaderStyle;
        r++;

        const expFields = [
            "Total Months U/W",
            "Total Months Deployed",
            "Current Role",
            "Past Roles (Key Tours)",
            "JPME Completion / Plan",
            "WTI Qualification (Type if applicable)",
        ];
        expFields.forEach(field => {
            wsInput.getRow(r).getCell(1).value = field;
            applyInput(`B${r}`);
            r++;
        });

        // ─── Spacer ──────────────────────────────────────────────────
        r++;

        // ─── Section 4: Considerations ───────────────────────────────
        wsInput.getRow(r).values = ["Considerations", "Notes"];
        wsInput.getRow(r).font = sectionHeaderStyle;
        r++;

        const consFields = ["Co-Location Request", "EFM Considerations", "Education / Pipeline"];
        consFields.forEach(field => {
            wsInput.getRow(r).getCell(1).value = field;
            applyInput(`B${r}`);
            r++;
        });

        // Protect Input sheet (leaves unlocked cells editable)
        await wsInput.protect('password', {
            selectLockedCells: true,
            selectUnlockedCells: true
        });

        const uint8Array = await workbook.xlsx.writeBuffer();
        return Buffer.from(uint8Array);
    } catch (e: any) {
        console.error("[ExcelService] Generation failed:", e);
        throw e;
    }
}
