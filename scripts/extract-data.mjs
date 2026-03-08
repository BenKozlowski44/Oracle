/**
 * extract-data.mjs
 * Extracts each exported array from src/lib/data.ts into individual JSON files
 * under src/data/. Run once with: node scripts/extract-data.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataFilePath = path.join(root, 'src', 'lib', 'data.ts');
const outputDir = path.join(root, 'src', 'data');

fs.mkdirSync(outputDir, { recursive: true });

const fileContent = fs.readFileSync(dataFilePath, 'utf8');

/**
 * Find the JSON array/object for a given exported variable name.
 * Returns the raw text between the first [ or { after the export and
 * its matching closing bracket.
 */
function extractExport(varName) {
    const marker = `export const ${varName}`;
    const markerIdx = fileContent.indexOf(marker);
    if (markerIdx === -1) {
        console.warn(`⚠️  ${varName} not found`);
        return null;
    }

    // Find the = sign, then the first [ or {
    const eqIdx = fileContent.indexOf('=', markerIdx);
    let openIdx = -1;
    let openChar = '';
    let closeChar = '';

    for (let i = eqIdx + 1; i < fileContent.length; i++) {
        if (fileContent[i] === '[') { openIdx = i; openChar = '['; closeChar = ']'; break; }
        if (fileContent[i] === '{') { openIdx = i; openChar = '{'; closeChar = '}'; break; }
    }

    if (openIdx === -1) {
        console.warn(`⚠️  Could not find opening bracket for ${varName}`);
        return null;
    }

    let depth = 0;
    let inString = false;
    let quoteChar = '';
    let closeIdx = -1;

    for (let i = openIdx; i < fileContent.length; i++) {
        const ch = fileContent[i];
        if (inString) {
            if (ch === quoteChar && fileContent[i - 1] !== '\\') inString = false;
        } else {
            if (ch === '"' || ch === "'" || ch === '`') { inString = true; quoteChar = ch; }
            else if (ch === openChar) depth++;
            else if (ch === closeChar) {
                depth--;
                if (depth === 0) { closeIdx = i; break; }
            }
        }
    }

    if (closeIdx === -1) {
        console.warn(`⚠️  Could not find closing bracket for ${varName}`);
        return null;
    }

    return fileContent.substring(openIdx, closeIdx + 1);
}

const exports = [
    { varName: 'boards', filename: 'boards.json' },
    { varName: 'slates', filename: 'slates.json' },
    { varName: 'officers', filename: 'officers.json' },
    { varName: 'oracleData', filename: 'oracle-data.json' },
];

for (const { varName, filename } of exports) {
    console.log(`Extracting ${varName}...`);
    const raw = extractExport(varName);
    if (!raw) continue;

    try {
        // Parse as JS (handles trailing commas etc) then re-serialize as clean JSON
        const parsed = new Function(`return ${raw}`)();
        const jsonStr = JSON.stringify(parsed, null, 2);
        const outPath = path.join(outputDir, filename);
        fs.writeFileSync(outPath, jsonStr, 'utf8');
        const sizeKb = (jsonStr.length / 1024).toFixed(1);
        console.log(`  ✅ ${filename} written (${sizeKb} KB)`);
    } catch (e) {
        console.error(`  ❌ Failed to parse ${varName}:`, e.message);
    }
}

console.log('\nDone. JSON files are in src/data/');
