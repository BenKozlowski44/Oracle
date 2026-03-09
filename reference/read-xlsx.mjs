import ExcelJS from 'exceljs';
import { fileURLToPath } from 'url';
import path from 'path';

await wb.xlsx.readFile('/Users/benjaminkozlowski/Documents/Oracle/reference/26-2 CDR CMD Slate.xlsx');

for (const ws of wb.worksheets) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`SHEET: "${ws.name}"  rows=${ws.rowCount} cols=${ws.columnCount}`);
    console.log('='.repeat(60));
    for (let r = 1; r <= ws.rowCount; r++) {
        const row = ws.getRow(r);
        const vals = [];
        row.eachCell({ includeEmpty: false }, (cell, col) => {
            const v = cell.value;
            if (v !== null && v !== undefined && v !== '') {
                vals.push(`C${col}=${JSON.stringify(typeof v === 'object' && v?.result !== undefined ? v.result : v)}`);
            }
        });
        if (vals.length) console.log(`  R${r}: ${vals.join('  ')}`);
    }
}
