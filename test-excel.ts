import ExcelJS from 'exceljs';
import path from 'path';

async function test() {
    const p = path.join(process.cwd(), 'oracle_data.xlsx');
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(p);

    const ws = workbook.worksheets.find(w => w.name !== "Summary" && w.name !== "CO-SM" && !w.name.includes("Sheet"));
    if (ws) {
        console.log("Sheet:", ws.name);
        for (let i = 1; i <= 20; i++) {
            const r = ws.getRow(i);
            console.log(`Row ${i} - A: ${r.getCell(1).value}, B: ${r.getCell(2).value}`);
        }
    }
}
test().catch(console.error);
