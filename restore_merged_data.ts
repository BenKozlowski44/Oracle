
import { parseBankExcel } from "./src/lib/excel-parser";
import { slates, metrics, oracleData, billets } from "./src/lib/data";
import * as fs from "fs";
import * as path from "path";

// 1. Read Mock Data (Original Bank)
const mockPath = path.join(process.cwd(), "mock_bank_data.xlsx");
const mockBuffer = fs.readFileSync(mockPath);
const originalBankOfficers = parseBankExcel(mockBuffer.buffer as ArrayBuffer);
console.log(`Parsed ${originalBankOfficers.length} officers from original bank (mock_bank_data.xlsx).`);

// 2. Read Firefighter Data (Newer file)
const ffPath = path.join(process.cwd(), "data", "Adding Bank Officers FF.xlsx");
let ffOfficers: any[] = [];
if (fs.existsSync(ffPath)) {
    const ffBuffer = fs.readFileSync(ffPath);
    ffOfficers = parseBankExcel(ffBuffer.buffer as ArrayBuffer);
    console.log(`Parsed ${ffOfficers.length} officers from Firefighter list.`);
}

// 3. Merge Strategies
// User wants "Original back" for Firefighters statuses?
// And "Show officers in the bank".
// Likely: 
// - The 20 FF officers in `Adding...` are the "Firefighters".
// - The 7 officers in `mock...` are the "Bank".
// - Some might overlap?

const officerMap = new Map();

// Strategies:
// A. Load Original Bank first (Base)
originalBankOfficers.forEach(o => {
    // Ensure they are "Available" if they are from the bank file
    // The parser might have set them to something else?
    // In mock_bank_data, they usually don't have "3rd Look" slate.
    officerMap.set(o.id, o);
});

// B. Load Firefighters
ffOfficers.forEach(o => {
    if (officerMap.has(o.id)) {
        // Conflict! User complained statuses changed.
        // If the FF file says they are FF, but user manually made them Bank...
        // We lost the manual edit.
        // But maybe the "Original" state the user refers to IS the state in mock_bank_data?
        // User said: "First all of the statuses of the officers in the Firefighters tab have changed, I need the orignal back."
        // AND "Second, I am not showing any officers in the bank and they need to have their original statuses"

        // If I assume mock_bank_data is the "Original" source of truth for THOSE officers.
        // And `Adding...` is the source for the others.

        // Let's overwite if it's a "Firefighter" status? OR keep the "Bank" status?
        // If they are in the Bank file, they probably belong in Bank.
        // If they are in FF file, they belong in FF.
        // If in BOTH, which one wins?

        // Let's assume the user wants the "Bank" entries to exist.
        // I will PRIORITIZE the "Bank" file status for overlaps if the user implies they shouldn't be FF.
        console.log(`Overlap found: ${o.name}. Keeping Bank version.`);
    } else {
        officerMap.set(o.id, o);
    }
});

const allOfficers = Array.from(officerMap.values());

console.log(`Total Merged Officers: ${allOfficers.length}`);

// Generate the new data.ts content
const fileContent = `import type { Officer, Billet, OracleCommand, Slate, Metrics } from "./types"
import { cosmCommandData } from "./cosm-data"

export const slates: Slate[] = ${JSON.stringify(slates, null, 4)}

export const metrics: Metrics = ${JSON.stringify(metrics, null, 4)}

export const officers: Officer[] = ${JSON.stringify(allOfficers, null, 4)}

export const billets = ${JSON.stringify(billets, null, 4)}

export const oracleData: OracleCommand[] = ${JSON.stringify(oracleData, null, 4)}
`;

// Write back to data.ts
fs.writeFileSync(path.join(process.cwd(), "src/lib/data.ts"), fileContent);
console.log("Successfully restored merged data to src/lib/data.ts");
