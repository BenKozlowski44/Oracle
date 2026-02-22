
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(process.cwd(), "oracle_data.xlsx");
const fileBuffer = fs.readFileSync(filePath);
const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

// List sheet names to find CO-SM
console.log("Sheet Names:", workbook.SheetNames);

const cosmSheetName = workbook.SheetNames.find(name => name.includes("CO-SM") || name.includes("CO SM"));
if (cosmSheetName) {
    console.log(`Found CO-SM sheet: ${cosmSheetName}`);
    const worksheet = workbook.Sheets[cosmSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    if (jsonData.length > 0) {
        console.log("Dumping first 20 rows:");
        for (let i = 0; i < Math.min(20, jsonData.length); i++) {
            console.log(`Row ${i}:`, JSON.stringify(jsonData[i]));
        }
    } else {
        console.log("Sheet is empty");
    }
} else {
    console.log("CO-SM sheet not found");
}
