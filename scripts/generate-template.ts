import ExcelJS from 'exceljs';
import { oracleData } from '../src/lib/data';

async function generateTemplate() {
    // 1. Extract Platform-Location Pairs
    const options = Array.from(new Set(
        oracleData
            .filter(cmd => cmd.platform && cmd.location)
            .map(cmd => `${cmd.platform} - ${cmd.location}`)
    )).sort();

    console.log(`Found ${options.length} unique platform-location options.`);

    // 2. Create Workbook
    const workbook = new ExcelJS.Workbook();

    // --- Sheet 1: Instructions ---
    const wsInstructions = workbook.addWorksheet('Instructions');
    wsInstructions.addRow(["Candidate Slate Input - Instructions"]);
    wsInstructions.addRow([]);
    wsInstructions.addRow(["1. Please fill out the 'Input' tab completely."]);
    wsInstructions.addRow(["2. Select your top 5 preferences from the dropdown menus."]);
    wsInstructions.addRow(["3. Provide a narrative explanation for your preferences."]);
    wsInstructions.addRow(["4. Enter your experience details and operational months."]);
    wsInstructions.addRow(["5. Save this file and upload it back to the Slate Manager."]);

    // --- Sheet 2: Input ---
    const wsInput = workbook.addWorksheet('Input');

    wsInput.columns = [
        { width: 30 }, // A
        { width: 50 }, // B
        { width: 20 }, // C
        { width: 30 }  // D
    ];

    const inputData = [
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

    inputData.forEach(row => wsInput.addRow(row));

    // --- Sheet 3: Data (Hidden) ---
    const wsData = workbook.addWorksheet('Data', { state: 'hidden' });
    options.forEach(opt => wsData.addRow([opt]));

    // Add Data Validation for Preferences (Cells B5:B9)
    // In exceljs, validation needs a comma-separated list if not using a formula range directly
    const validationFormula = `Data!$A$1:$A$${options.length}`;

    for (let r = 5; r <= 9; r++) { // Rows 5-9 in 1-based indexing for Input sheet
        wsInput.getCell(`B${r}`).dataValidation = {
            type: 'list',
            allowBlank: true,
            formulae: [validationFormula]
        };
    }

    // Write File
    await workbook.xlsx.writeFile('Unified_Candidate_Input_Template.xlsx');
    console.log('Generated Unified_Candidate_Input_Template.xlsx');
}

generateTemplate().catch(console.error);
