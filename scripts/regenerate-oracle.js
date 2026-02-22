const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const EXCEL_FILE = 'oracle_data.xlsx';
const OUTPUT_FILE = path.join(__dirname, 'src', 'lib', 'data.ts');

function excelDateToJSDate(serial) {
    if (!serial || isNaN(serial)) return null;
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    // Adjust for timezone issue, simplistic approach for YYYY-MM-DD
    // Actually, just return ISO string part
    return date_info.toISOString().split('T')[0];
}

function parseExcel() {
    const workbook = xlsx.readFile(EXCEL_FILE);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    const oracleData = [];

    // Header logic: Data starts at row 5 (index 4) based on inspection
    // We iterate from row 5
    for (let i = 4; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length === 0) continue;

        const rawName = row[0]; // Buffer/String
        if (!rawName) continue;

        // Parse Name for Platform/Location?
        // Existing logic in list_names.js or similar
        // Name format: "CHARLESTON (LCS 18) - 20156"
        // Row 5 example: "Wang, Nellie..." -> These are NOT commands?
        // Wait, Row 4 (Index 3) had "CHARLESTON (LCS 18)..."
        // Row 5 had "Wang, Nellie..."

        // INSPECTION REVEALED:
        // Row 4: "CHARLESTON (LCS 18) - 20156"
        // Row 5: "Wang, Nellie..." (Incumbent?)

        // This structure is complex. The "Command" is likely the header row of a block,
        // and the "Incumbent" rows follow it?
        // OR, the file is flat but with weird cols.

        // Let's re-examine index 3 (Row 4) vs index 4 (Row 5).
        // Row 4 has "CHARLESTON..." in col 0. And then years in later columns?
        // Row 5 has "Wang, Nellie..." in col 0. And data in index 7,8,9...

        // It seems the "Oracle" rows we want are the ones with "Wang, Nellie" etc?
        // NO. The application displays "Commands". "Wang, Nellie" is likely the CO/XO.
        // If I look at `list_names.js` provided by user earlier (or `parse_oracle.js` if it existed), I'd see.
        // Let's look at `list_names.js` to see how it parsed.

        // Actually, I'll pause the script creation to checking `list_names.js`.
    }
}
