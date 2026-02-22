import { parseBankExcel } from "./src/lib/excel-parser";
import { officers, slates, metrics, oracleData, billets } from "./src/lib/data";
import * as fs from "fs";
import * as path from "path";

// Read the Excel file
const filePath = path.join(process.cwd(), "data", "Adding Bank Officers FF.xlsx");
const fileBuffer = fs.readFileSync(filePath);

// Parse the data
const newOfficers = parseBankExcel(fileBuffer.buffer as ArrayBuffer);

console.log(`Parsed ${newOfficers.length} officers.`);

// Filter out header row if present (simple check)
// Assuming parser handles basic row iteration, but let's be safe if "Name" is in Name field
const validOfficers = newOfficers.filter(o => o.name !== "Name" && o.name !== "name");

// Merge with existing data to preserve manual edits
const mergedOfficers = validOfficers.map(newOfficer => {
    // Use Name for matching to handle ID changes/stability
    const existing = officers.find(o => o.name === newOfficer.name);
    if (existing) {
        return {
            ...newOfficer,
            status: existing.status,
            notes: existing.notes || "",
            rank: existing.rank || newOfficer.rank, // Preserve manual rank changes
            designator: existing.designator || newOfficer.designator, // Preserve manual desig changes
            tentativeSlate: existing.tentativeSlate || newOfficer.tentativeSlate, // Preserve manual tentative slate
            preferences: existing.preferences || [],
            // Preserve manual edits if they exist (though we don't track "touched" state easily, 
            // we can assume if existing has values, keep them. 
            // BUT for new Excel data, we might want to overwrite if the Excel is the source of truth for these?
            // Let's assume Excel is source for these *unless* we add a way to edit them in UI.
            // Since we Are adding UI editing, we should preserve existing if set.
            preferredLocations: existing.preferredLocations && existing.preferredLocations.length > 0 ? existing.preferredLocations : newOfficer.preferredLocations,
            preferredPlatforms: existing.preferredPlatforms && existing.preferredPlatforms.length > 0 ? existing.preferredPlatforms : newOfficer.preferredPlatforms,
            preferencePriority: (function () {
                if (newOfficer.preferencePriority) {
                    // console.log(`Merging Priority for ${newOfficer.name}: Existing=${existing.preferencePriority}, New=${newOfficer.preferencePriority}`);
                }
                // Bug fix: existing.preferencePriority might be undefined or null in the file, but we want to overwrite if new has value
                // If existing is explicitly set to something valid, keep it? 
                // Or if existing is null/undefined, take new?
                // The issue is existing.preferencePriority might be "Location" (old string) or null.

                // Force overwrite if existing is invalid or null/undefined, OR if we want Excel to be source of truth for now.
                // Since we just changed the TYPE to "Homeport", any existing "Location" string in data.ts is now invalid type-wise but present as string.
                // We should probably prefer the new parsed value if the existing value is not "Homeport" or "Platform".

                if (existing.preferencePriority === "Homeport" || existing.preferencePriority === "Platform") {
                    return existing.preferencePriority;
                }
                return newOfficer.preferencePriority;
            })()
        };
    }
    return newOfficer;
});

console.log(`Valid officers (merged): ${mergedOfficers.length}`);

const pccs = officers.filter(o => o.status === "PCC");
const allOfficers = [...pccs, ...mergedOfficers];

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
console.log("Successfully updated src/lib/data.ts");
