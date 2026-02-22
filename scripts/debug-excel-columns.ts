import ExcelJS from 'exceljs';
import * as fs from 'fs';

async function debugFile(filePath: string) {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }

    console.log(`\nDebugging: ${filePath}`);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    // Assume first sheet
    const sheet = workbook.worksheets[0];
    if (!sheet) {
        console.log("No worksheets found.");
        return;
    }

    const row = sheet.getRow(1);
    const headers: string[] = [];
    row.eachCell((cell, colNumber) => {
        headers.push(`Col ${colNumber}: ${cell.value}`);
    });

    console.log("Headers (Row 1):");
    console.log(headers);
}

async function main() {
    await debugFile('mock_bank_data.xlsx');
    await debugFile('data/Adding Bank Officers FF.xlsx');
}

main();
