const fs = require('fs');
const path = require('path');

const DATA_PATH = 'src/lib/data.ts';

try {
    let dataContent = fs.readFileSync(DATA_PATH, 'utf8');

    // Regex to match the oracleData array content
    const oracleRegex = /(export const oracleData: OracleCommand\[\] = )(\[[\s\S]*?\])/;
    const match = dataContent.match(oracleRegex);

    if (!match) {
        throw new Error("Could not find oracleData array in src/lib/data.ts");
    }

    const arrayString = match[2];
    let oracleData;

    // Evaluate the array string safely
    oracleData = eval(arrayString);

    let updatedCount = 0;

    const updatedData = oracleData.map(cmd => {
        // Look for typical platform designators
        // Examples: "USS STOUT (DDG 55)", "USS CHARLESTON (LCS 18)"
        // Regex to find content inside parentheses that looks like "DDG 55" or just "LCS"

        let platform = "N/A";

        // Match 2-4 uppercase letters followed by optional space and numbers inside parens
        // e.g. (DDG 55), (LCS 18), (CG 60), (LSD 44)
        const platformRegex = /\(([A-Z]{2,4}\s*\d+)\)/;
        const typeMatch = cmd.name.match(platformRegex);

        if (typeMatch) {
            platform = typeMatch[1]; // Capture "DDG 52"
            // Remove the platform from the name and trim
            // Also remove any trailing " - " if present
            cmd.name = cmd.name.replace(typeMatch[0], '').trim().replace(/\s*-\s*$/, '');
        } else {
            // Fallback: check if the name contains specific strings if not in parens
            if (cmd.name.includes("DDG")) platform = "DDG";
            else if (cmd.name.includes("LCS")) platform = "LCS";
            else if (cmd.name.includes("LSD")) platform = "LSD";
            else if (cmd.name.includes("LPD")) platform = "LPD";
            else if (cmd.name.includes("CG")) platform = "CG";
            else if (cmd.name.includes("MCM")) platform = "MCM";
        }

        cmd.platform = platform;
        updatedCount++;
        return cmd;
    });

    console.log(`Updated ${updatedCount} commands with platforms.`);

    // Reconstruct the file content
    const newArrayString = JSON.stringify(updatedData, null, 4);
    const newContent = dataContent.replace(oracleRegex, `$1${newArrayString}`);

    fs.writeFileSync(DATA_PATH, newContent);
    console.log("Successfully updated src/lib/data.ts");

} catch (e) {
    console.error("Error refining platform data:", e);
    process.exit(1);
}
