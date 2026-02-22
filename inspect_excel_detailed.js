
const XLSX = require('xlsx');

const file = process.argv[2];
if (!file) {
    console.error("Please provide a file path");
    process.exit(1);
}

const workbook = XLSX.readFile(file);
workbook.SheetNames.forEach(name => {
    console.log(`\n--- Sheet: ${name} ---`);
    const sheet = workbook.Sheets[name];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Print Header
    console.log("Headers:", data[0]);

    // Print first 5 rows
    console.log("First 5 rows:");
    data.slice(1, 6).forEach((row, i) => {
        console.log(`Row ${i + 1}:`, row);
    });

    console.log(`Total Rows: ${data.length}`);
});
