const XLSX = require('xlsx');

const officers = [
    { Name: "Maverick, Pete", Rank: "CAPT", Designator: "1310", CurrentCommand: "TOPGUN", PRD: 45500 }, // Excel date approx
    { Name: "Kazansky, Tom", Rank: "ADM", Designator: "1310", CurrentCommand: "COMPACFLT", PRD: 45600 },
    { Name: "Bradshaw, Bradley", Rank: "LT", Designator: "1310", CurrentCommand: "VFA-41", PRD: 45700 },
    { Name: "Seresin, Jake", Rank: "LT", Designator: "1310", CurrentCommand: "VFA-87", PRD: 45800 },
    { Name: "Tracey, Phoenetia", Rank: "LCDR", Designator: "1110", CurrentCommand: "USS HIGGINS", PRD: 45900 },
    { Name: "Russo, Dominic", Rank: "CDR", Designator: "1120", CurrentCommand: "USS VIRGINIA", PRD: 46000 },
    { Name: "Austin, Dallas", Rank: "CDR", Designator: "1110", CurrentCommand: "DESRON 21", PRD: 45550 },
];

const worksheet = XLSX.utils.json_to_sheet(officers);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Bank Data");

XLSX.writeFile(workbook, "mock_bank_data.xlsx");
console.log("mock_bank_data.xlsx created successfully.");
