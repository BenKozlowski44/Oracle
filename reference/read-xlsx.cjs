const ExcelJS = require('exceljs');

async function main() {
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile('/Users/benjaminkozlowski/Documents/Oracle/reference/26-2 CDR CMD Slate.xlsx');

    for (const ws of wb.worksheets) {
        console.log(`\n${'█'.repeat(60)}`);
        console.log(`SHEET: "${ws.name}"  rows=${ws.rowCount} cols=${ws.columnCount}`);
        console.log(`${'█'.repeat(60)}`);

        // Column widths
        console.log('\n-- Column widths --');
        ws.columns.forEach((col, i) => {
            if (col.width) console.log(`  col ${i + 1}: width=${col.width}`);
        });

        // Merged cells
        console.log('\n-- Merged cells --');
        ws.mergeCells && console.log('  (checking...)');
        // @ts-ignore
        const merges = ws._merges;
        if (merges) {
            Object.keys(merges).forEach(k => console.log(`  merge: ${k}`));
        }

        // Row-by-row analysis (first 4 rows = title + header + data rows)
        for (let r = 1; r <= Math.min(ws.rowCount, 4); r++) {
            const row = ws.getRow(r);
            console.log(`\n  -- Row ${r} | height=${row.height} --`);
            row.eachCell({ includeEmpty: false }, (cell, col) => {
                const f = cell.font || {};
                const a = cell.alignment || {};
                const fill = cell.fill || {};
                const border = cell.border || {};
                const val = cell.value;
                const valStr = typeof val === 'object' && val?.richText
                    ? `[richText: ${JSON.stringify(val.richText).slice(0, 200)}]`
                    : JSON.stringify(val)?.slice(0, 120);
                console.log(`    C${col}: val=${valStr}`);
                console.log(`         font={sz:${f.size},bold:${f.bold},italic:${f.italic},color:${JSON.stringify(f.color)},name:${f.name}}`);
                console.log(`         fill=${JSON.stringify(fill?.fgColor)} align={h:${a.horizontal},v:${a.vertical},wrap:${a.wrapText}}`);
                console.log(`         border={top:${border.top?.style},bot:${border.bottom?.style},l:${border.left?.style},r:${border.right?.style}}`);
            });
        }
    }
}

main().catch(console.error);
