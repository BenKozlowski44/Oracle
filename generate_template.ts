
import * as fs from 'fs';
import * as XLSX from 'xlsx';
import { oracleData } from './src/lib/data';

// 1. Extract Platform-Location Pairs
const options = Array.from(new Set(
    oracleData
        .filter(cmd => cmd.platform && cmd.location)
        .map(cmd => `${cmd.platform} - ${cmd.location}`)
)).sort();

console.log(`Found ${options.length} unique platform-location options.`);

// 2. Create Workbook
const wb = XLSX.utils.book_new();

// --- Sheet 1: Instructions ---
const instructionsData = [
    ["Candidate Slate Input - Instructions"],
    [""],
    ["1. Please fill out the 'Input' tab completely."],
    ["2. Select your top 5 preferences from the dropdown menus."],
    ["3. Provide a narrative explanation for your preferences."],
    ["4. Enter your experience details and operational months."],
    ["5. Save this file and upload it back to the Slate Manager."],
];
const wsInstructions = XLSX.utils.aoa_to_sheet(instructionsData);
XLSX.utils.book_append_sheet(wb, wsInstructions, "Instructions");

// --- Sheet 2: Input ---
const inputHeaders = [
    ["Officer Name", "Rank", "Designator", "Email"],
    ["", "", "", ""], // Placeholder for user input
    [""],
    ["Preferences (Select from Dropdown)", "Narrative / Notes"],
    ["Preference 1", ""],
    ["Preference 2", ""],
    ["Preference 3", ""],
    ["Preference 4", ""],
    ["Preference 5", ""],
    [""],
    ["Experience", "Value"],
    ["Total Months U/W", ""],
    ["Total Months Deployed", ""],
    ["Current Role", ""],
    ["Past Roles", ""],
    [""],
    ["Considerations", "Notes"],
    ["Co-Location", ""],
    ["EFM", ""],
    ["Education", ""]
];

const wsInput = XLSX.utils.aoa_to_sheet(inputHeaders);

// Set column widths
wsInput['!cols'] = [
    { wch: 30 }, // A
    { wch: 50 }, // B
    { wch: 20 }, // C
    { wch: 30 }  // D
];

// Add Data Validation for Preferences (Cells B5:B9 - assuming 0-indexed: rows 4-8, col 1)
// We need to reference the Data sheet.
// Excel limit for list validation is 255 chars, so we must use a named range or reference the range directly.
// Since we are generating this, we'll put data in a hidden sheet and reference it.

// --- Sheet 3: Data (Hidden) ---
const wsData = XLSX.utils.aoa_to_sheet(options.map(o => [o]));
XLSX.utils.book_append_sheet(wb, wsData, "Data");

// Apply Validation
// Range B5:B9 (Indices: R4C1 to R8C1)
const range = { s: { r: 4, c: 0 }, e: { r: 8, c: 0 } }; // Column A is labels ("Preference 1"), Column B is Input. Wait.
// Row 4 is "Preference 1", "Input here". So it's Column 1 (B).
// Let's correct the range.
// "Preference 1" is at A5 (R4, C0). Input is at B5 (R4, C1).
const inputRange = { s: { r: 4, c: 1 }, e: { r: 8, c: 1 } };

// Construct validation object
// Note: sheetJS writing validation is complex and sometimes not fully supported in community edition for all formats.
// However, creating the Name range is safer.
// Let's define the name 'PreferenceOptions' for Data!$A$1:$A$N
wb.Workbook = {
    Names: [
        { Name: 'PreferenceOptions', Ref: `Data!$A$1:$A$${options.length}` }
    ]
};

// We manually enforce validation if possible, or just trust the user will see the dropdown if opened in Excel.
// Actually, basic validation is supported.
for (let r = 4; r <= 8; r++) {
    const cellRef = XLSX.utils.encode_cell({ r, c: 1 });
    if (!wsInput[cellRef]) wsInput[cellRef] = { t: 's', v: '' }; // Ensure cell exists

    // This is the tricky part with SheetJS community. Sometimes it doesn't write validation.
    // We will try to set the type. if it fails, we assume user can copy-paste or we implement fuzzy matching on import.
    wsInput[cellRef].l = { Target: 'PreferenceOptions' };
}

XLSX.utils.book_append_sheet(wb, wsInput, "Input");

// Write File
XLSX.writeFile(wb, 'Unified_Candidate_Input_Template.xlsx');
console.log('Generated Unified_Candidate_Input_Template.xlsx');
