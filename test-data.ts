import * as fs from 'fs';
import * as path from 'path';

const fileContent = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'data.ts'), 'utf8');
const startMarker = 'export const officers: Officer[] =';
const searchStartIndex = fileContent.indexOf(startMarker);
const openBracketIndex = fileContent.indexOf('[', searchStartIndex + startMarker.length);
let depth = 0; let inString = false; let quoteChar = ''; let closeBracketIndex = -1;
for (let i = openBracketIndex; i < fileContent.length; i++) {
    const char = fileContent[i];
    if (inString) {
        if (char === quoteChar && fileContent[i - 1] !== '\\') inString = false;
    } else {
        if (char === '"' || char === "'" || char === '`') {
            inString = true; quoteChar = char;
        } else if (char === '[') depth++;
        else if (char === ']') {
            depth--;
            if (depth === 0) {
                closeBracketIndex = i; break;
            }
        }
    }
}
const jsonString = fileContent.substring(openBracketIndex, closeBracketIndex + 1);
const parseFn = new Function('return ' + jsonString);
const officers = parseFn();
const standardOfficers = officers.filter(o => !(o.screened?.includes('CO-SM') || o.listShift === 'CO-SM'));

let locPriority = 0;
let platPriority = 0;
let doesntMatter = 0;
const locationCounts: Record<string, number> = {};
const platformCounts: Record<string, number> = {};
standardOfficers.forEach(o => {
    if (o.preferencePriority) {
        const lp = o.preferencePriority.toLowerCase();
        if (lp.includes('location') || lp.includes('homeport')) locPriority++;
        else if (lp.includes('platform')) platPriority++;
        else doesntMatter++;
    }
    o.preferredLocations?.forEach(loc => {
        const neatLoc = loc.trim();
        if (neatLoc) locationCounts[neatLoc] = (locationCounts[neatLoc] || 0) + 1;
    });
    o.preferredPlatforms?.forEach(plat => {
        const neatPlat = plat.trim();
        if (neatPlat) platformCounts[neatPlat] = (platformCounts[neatPlat] || 0) + 1;
    });
});
console.log('Priority:', { locPriority, platPriority, doesntMatter });
console.log('Top locations:', Object.entries(locationCounts).sort((a, b) => b[1] - a[1]).slice(0, 5));
console.log('Top platforms:', Object.entries(platformCounts).sort((a, b) => b[1] - a[1]).slice(0, 5));
