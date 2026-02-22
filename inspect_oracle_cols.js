const xlsx = require('xlsx');

const workbook = xlsx.readFile('oracle_data.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Function to convert column letter to index (0-based)
const colIndex = (col) => {
    let index = 0;
    for (let i = 0; i < col.length; i++) {
        index = index * 26 + col.charCodeAt(i) - 'A'.charCodeAt(0) + 1;
    }
    return index - 1;
};

const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

// Columns I, K, M, Q correspond to indices 8, 10, 12, 16
const columns = ['I', 'K', 'M', 'Q'];
const indices = columns.map(colIndex);

console.log('\nScanning rows 0-10 for headers:');
for (let r = 0; r <= 10; r++) {
    const row = rows[r];
    if (row) {
        // Print all values in the row to see context, not just specific columns
        // But map to string to make it readable
        console.log(`Row ${r + 1}:`, JSON.stringify(row));
    }
}
