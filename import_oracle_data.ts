
import * as fs from 'fs';
import * as path from 'path';
import { parseOracleExcel } from './src/lib/excel-parser';
import { oracleData as existingOracleData } from './src/lib/data';
import type { OracleCommand } from './src/lib/types';

const filePath = path.join(process.cwd(), "oracle_data.xlsx");

if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

const fileBuffer = fs.readFileSync(filePath);
const parsedCommands = parseOracleExcel(fileBuffer.buffer as ArrayBuffer);

console.log(`Parsed ${parsedCommands.length} commands total.`);
const cosmCommands = parsedCommands.filter(c => c.tags?.includes("CO-SM"));
console.log(`Found ${cosmCommands.length} CO-SM commands.`);

if (cosmCommands.length > 0) {
    console.log("Example CO-SM:", JSON.stringify(cosmCommands[0], null, 2));
}

// Merge logic
// We want to replace all existing CO-SM commands with the new parsed list
// This ensures we clean up any "bad" parses from previous runs and have a clean state.
// Any manual edits to CO-SM commands (if any exist yet) will be lost, but this is acceptable for the initial parse.

// Filter out all existing CO-SM commands
const nonCosmCommands = existingOracleData.filter(c => !c.tags?.includes("CO-SM"));

const mergedOracleData = [...nonCosmCommands, ...cosmCommands];

// Log actions
console.log(`Replaced ${existingOracleData.length - nonCosmCommands.length} existing CO-SM commands with ${cosmCommands.length} new ones.`);


// Write back to data.ts
// We need to read the file first to preserve other exports? 
// Or just reconstruct it like import_bank_data.ts did.

// Read current data.ts to get other exports
// Actually, import_bank_data.ts reconstructed the whole file string.
// We should probably do the same or be careful.
// Let's reuse the logic from import_bank_data.ts structure

import { officers, slates, metrics, billets } from './src/lib/data';

const fileContent = `import type { Officer, Billet, OracleCommand, Slate, Metrics } from "./types"
import { cosmCommandData } from "./cosm-data"

export const slates: Slate[] = ${JSON.stringify(slates, null, 4)}

export const metrics: Metrics = ${JSON.stringify(metrics, null, 4)}

export const officers: Officer[] = ${JSON.stringify(officers, null, 4)}

export const billets = ${JSON.stringify(billets, null, 4)}

export const oracleData: OracleCommand[] = ${JSON.stringify(mergedOracleData, null, 4)}
`;

fs.writeFileSync(path.join(process.cwd(), 'src/lib/data.ts'), fileContent);
console.log("Successfully updated src/lib/data.ts");
