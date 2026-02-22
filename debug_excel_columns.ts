import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

// Read the file
const filePath = path.join(process.cwd(), "data", "Adding Bank Officers FF.xlsx");
const fileBuffer = fs.readFileSync(filePath);
const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
const firstSheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[firstSheetName];

// Get range
const range = XLSX.utils.decode_range(worksheet['!ref'] || "A1:Z1");

console.log(`Sheet: ${firstSheetName}`);
console.log(`Range: ${worksheet['!ref']}`);

// Print headers for columns G (index 6) and H (index 7)
// And maybe A-Z to be sure
for (let C = range.s.c; C <= 10; ++C) { // First 10 columns
    const cell_address = { c: C, r: 0 }; // Row 0 is header
    const cell_ref = XLSX.utils.encode_cell(cell_address);
    const cell = worksheet[cell_ref];
    const header = cell ? cell.v : "EMPTY";

    // Column Letter
    const colLetter = XLSX.utils.encode_col(C);

    console.log(`Column ${colLetter} (Index ${C}): ${header}`);
}

// Print first data row (Row 2, index 1)
console.log("\nFirst Data Row (Row 2):");
for (let C = range.s.c; C <= 10; ++C) {
    const cell_address = { c: C, r: 1 };
    const cell_ref = XLSX.utils.encode_cell(cell_address);
    const cell = worksheet[cell_ref];
    const val = cell ? cell.v : "EMPTY";
    const colLetter = XLSX.utils.encode_col(C);
    console.log(`Column ${colLetter}: ${val}`);
}
