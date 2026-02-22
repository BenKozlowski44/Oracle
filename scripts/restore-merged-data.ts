import { parseBankExcel } from "../src/lib/excel-parser";
import { slates, metrics, oracleData, billets } from "../src/lib/data";
import * as fs from "fs";
import * as path from "path";

async function main() {
    // 1. Read Mock Data (Original Bank)
    const mockPath = path.join(process.cwd(), "mock_bank_data.xlsx");
    const mockBuffer = fs.readFileSync(mockPath);
    const originalBankOfficers = await parseBankExcel(mockBuffer.buffer as ArrayBuffer);
    console.log(`Parsed ${originalBankOfficers.length} officers from original bank (mock_bank_data.xlsx).`);

    // 2. Read Firefighter Data (Newer file)
    const ffPath = path.join(process.cwd(), "data", "Adding Bank Officers FF.xlsx");
    let ffOfficers: any[] = [];
    if (fs.existsSync(ffPath)) {
        const ffBuffer = fs.readFileSync(ffPath);
        ffOfficers = await parseBankExcel(ffBuffer.buffer as ArrayBuffer);
        console.log(`Parsed ${ffOfficers.length} officers from Firefighter list.`);
    }

    // 3. Merge Strategies
    const officerMap = new Map();

    // Strategies:
    // A. Load Original Bank first (Base)
    originalBankOfficers.forEach(o => {
        officerMap.set(o.id, o);
    });

    // B. Load Firefighters
    ffOfficers.forEach(o => {
        if (officerMap.has(o.id)) {
            console.log(`Overlap found: ${o.name}. Keeping Bank version.`);
        } else {
            officerMap.set(o.id, o);
        }
    });

    const allOfficers = Array.from(officerMap.values());

    console.log(`Total Merged Officers: ${allOfficers.length}`);

    // Generate the new data.ts content
    const fileContent = [
        `import type { Officer, Billet, OracleCommand, Slate, Metrics } from "./types"`,
        `import { cosmCommandData } from "./cosm-data"`,
        ``,
        `export const slates: Slate[] = ${JSON.stringify(slates, null, 4)}`,
        ``,
        `export const metrics: Metrics = ${JSON.stringify(metrics, null, 4)}`,
        ``,
        `export const officers: Officer[] = ${JSON.stringify(allOfficers, null, 4)}`,
        ``,
        `export const billets = ${JSON.stringify(billets, null, 4)}`,
        ``,
        `export const oracleData: OracleCommand[] = ${JSON.stringify(oracleData, null, 4)}`,
        ``
    ].join('\n');

    // Write back to data.ts
    fs.writeFileSync(path.join(process.cwd(), "src/lib/data.ts"), fileContent);
    console.log("Successfully restored merged data to src/lib/data.ts");
}

main().catch(console.error);
