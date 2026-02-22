
// Force CommonJS require for ExcelJS to avoid Next.js import issues
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ExcelJS = require('exceljs');
import { Slate, OracleCommand } from '@/lib/types';
import { oracleData } from '@/lib/data';

export async function generateCandidateTemplate(slate: Slate): Promise<Buffer> {
    console.log("[ExcelService] Starting generation...");
    try {
        // 1. Get Scoped Options
        const relevantCommands = slate.requirements
            .map(req => oracleData.find(c => c.id === req.commandId))
            .filter((c): c is OracleCommand => !!c && !!c.platform && !!c.location);

        console.log(`[ExcelService] Found ${relevantCommands.length} relevant commands.`);

        const options = Array.from(new Set(
            relevantCommands.map(cmd => `${cmd.platform} - ${cmd.location}`)
        )).sort();

        const finalOptions = options.length > 0 ? options : ["No Commands Available"];

        // 2. Create Workbook
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'Slate Manager';
        workbook.created = new Date();

        // --- Sheet 1: Instructions ---
        const wsInstructions = workbook.addWorksheet('Instructions');
        wsInstructions.getColumn(1).width = 80;
        const instructions = [
            "Candidate Slate Input - Instructions",
            "",
            "1. Please fill out the 'Input' tab completely.",
            "2. Select your top 5 preferences from the dropdown menus.",
            "3. Provide a narrative explanation for your preferences.",
            "4. Enter your experience details and operational months.",
            "5. Save this file and upload it back to the Slate Manager.",
            "",
            "Note: This sheet is protected. You can only edit the blue input cells."
        ];

        instructions.forEach((line, i) => {
            const row = wsInstructions.getRow(i + 1);
            row.getCell(1).value = line;
            if (i === 0) row.font = { bold: true, size: 14 };
        });

        await wsInstructions.protect('password', { selectLockedCells: true, selectUnlockedCells: true });

        // --- Sheet 2: Data (Hidden) ---
        // Created BEFORE Input to ensure validation references are valid during Input creation.
        const wsData = workbook.addWorksheet('Data');
        wsData.state = 'hidden';

        finalOptions.forEach((opt, i) => {
            wsData.getRow(i + 1).getCell(1).value = opt;
        });
        // Do NOT protect Data sheet to ensure it's readable by validation logic without issues.

        // --- Sheet 3: Input ---
        const wsInput = workbook.addWorksheet('Input');

        // Define Columns
        wsInput.getColumn('A').width = 30; // Labels
        wsInput.getColumn('B').width = 50; // Input
        wsInput.getColumn('C').width = 30; // Narrative / Extra

        // Helper to style input cells
        const inputStyle = {
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE6F0FF' } // Light Blue
            },
            border: {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            },
            protection: { locked: false }
        };

        const headerStyle = {
            bold: true
        };

        // Build Rows

        // Row 1: Headers
        wsInput.getRow(1).values = ["Officer Name", "Rank", "Designator", "Email"];
        wsInput.getRow(1).font = headerStyle;

        // Row 2: Inputs
        const personalRow = wsInput.getRow(2);
        // Explicitly set values to empty strings to ensure cells exist
        personalRow.values = ["", "", "", ""];
        ['A2', 'B2', 'C2', 'D2'].forEach(ref => {
            const cell = wsInput.getCell(ref);
            cell.fill = inputStyle.fill;
            cell.border = inputStyle.border;
            cell.protection = { locked: false };
        });

        // Spacer
        wsInput.getRow(3).values = [];

        // Row 4: Headers
        wsInput.getRow(4).values = ["Rank", "Platform - Location Preference", "Narrative / Notes"];
        wsInput.getRow(4).font = headerStyle;

        // Preferences (Rows 5-9)
        for (let i = 0; i < 5; i++) {
            const r = 5 + i;
            const row = wsInput.getRow(r);
            row.getCell(1).value = `Preference ${i + 1}`;

            // B: Dropdown
            const cellB = row.getCell(2);
            cellB.fill = inputStyle.fill;
            cellB.border = inputStyle.border;
            cellB.protection = { locked: false };
            cellB.dataValidation = {
                type: 'list',
                allowBlank: true,
                formulae: [`'Data'!$A$1:$A$${finalOptions.length}`] // Direct ref or named range
            };

            // C: Narrative
            const cellC = row.getCell(3);
            cellC.fill = inputStyle.fill;
            cellC.border = inputStyle.border;
            cellC.protection = { locked: false };
        }

        // Spacer

        // Experience
        let r = 11;
        wsInput.getRow(r++).values = ["Experience", "Value"];
        wsInput.getRow(r - 1).font = headerStyle;

        const expFields = ["Total Months U/W", "Total Months Deployed", "Current Role", "Past Roles"];
        expFields.forEach(field => {
            const row = wsInput.getRow(r++);
            row.getCell(1).value = field;

            const cell = row.getCell(2);
            cell.fill = inputStyle.fill;
            cell.border = inputStyle.border;
            cell.protection = { locked: false };
        });

        // Spacer
        r++;

        // Considerations
        wsInput.getRow(r++).values = ["Considerations", "Notes"];
        wsInput.getRow(r - 1).font = headerStyle;

        const consFields = ["Co-Location", "EFM", "Education"];
        consFields.forEach(field => {
            const row = wsInput.getRow(r++);
            row.getCell(1).value = field;

            const cell = row.getCell(2);
            cell.fill = inputStyle.fill;
            cell.border = inputStyle.border;
            cell.protection = { locked: false };
        });

        // Protect Input Sheet
        await wsInput.protect('password', {
            selectLockedCells: true,
            selectUnlockedCells: true
        });

        // Write to Buffer
        // ExcelJS writeBuffer returns Promise<Buffer>
        const uint8Array = await workbook.xlsx.writeBuffer();
        return Buffer.from(uint8Array);
    } catch (e: any) {
        console.error("[ExcelService] Generation failed:", e);
        throw e;
    }
}
