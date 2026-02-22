const XLSX = require('xlsx');
const fs = require('fs');

const filename = process.argv[2];
if (!filename) {
    console.error("Usage: node inspect_excel.js <filename>");
    process.exit(1);
}

try {
    const workbook = XLSX.readFile(filename);
    console.log(`Analyzing ${filename}...`);
    console.log("Sheet Names:", workbook.SheetNames);

    workbook.SheetNames.forEach(sheetName => {
        if (sheetName.toLowerCase().includes('co-sm') || sheetName.toLowerCase().includes('cosm')) {
            console.log(`\n--- Found Sheet: ${sheetName} ---`);
            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Array of arrays
            if (json.length > 0) {
                console.log("Header Row:", json[1]); // Row 1 seems to be header
                console.log("--- Data Preview (Rows 2-12) ---");
                for (let i = 2; i < 12 && i < json.length; i++) {
                    const row = json[i];
                    if (row && row.length > 0) {
                        console.log(`\nRow ${i}:`);
                        row.forEach((val, idx) => {
                            if (val !== undefined && val !== null && val !== "") {
                                console.log(`  [${idx}] ${val}`);
                            }
                        });
                    }
                }
            } else {
                console.log("(Sheet is empty)");
            }
        }
    });

} catch (error) {
    console.error("Error reading file:", error.message);
}
