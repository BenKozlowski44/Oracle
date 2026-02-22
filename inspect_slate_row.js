const xlsx = require('xlsx');

const EXCEL_FILE = 'oracle_data.xlsx';

function run() {
    const workbook = xlsx.readFile(EXCEL_FILE);
    const sheetName = workbook.SheetNames[0]; // Just check first sheet
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    console.log(`Sheet: ${sheetName}`);
    // Print first 20 rows to see structure
    for (let i = 0; i < 20; i++) {
        console.log(`Row ${i}:`, rows[i]);
    }
}

run();
