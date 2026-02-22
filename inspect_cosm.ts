import ExcelJS from 'exceljs';
import * as path from 'path';
import * as fs from 'fs';

async function main() {
    const filePath = path.join(process.cwd(), "oracle_data.xlsx");

    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    // List sheet names to find CO-SM
    const sheetNames = workbook.worksheets.map(ws => ws.name);
    console.log("Sheet Names:", sheetNames);

    const cosmSheetName = sheetNames.find(name => name.includes("CO-SM") || name.includes("CO SM"));
    if (cosmSheetName) {
        console.log(`Found CO-SM sheet: ${cosmSheetName}`);
        const worksheet = workbook.getWorksheet(cosmSheetName);

        if (worksheet && worksheet.rowCount > 0) {
            console.log("Dumping first 20 rows:");
            const limit = Math.min(20, worksheet.rowCount);
            for (let i = 1; i <= limit; i++) {
                const row = worksheet.getRow(i);
                // Convert row to array for simple dumping
                const rowValues: any[] = [];
                row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                    rowValues[colNumber - 1] = cell.value;
                });
                console.log(`Row ${i}:`, JSON.stringify(rowValues));
            }
        } else {
            console.log("Sheet is empty");
        }
    } else {
        console.log("CO-SM sheet not found");
    }
}

main().catch(console.error);
