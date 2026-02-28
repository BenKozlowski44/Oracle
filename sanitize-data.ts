import fs from 'fs';
import path from 'path';
import { oracleData, officers as bankOfficers, slates } from './src/lib/data';

function sanitizeObject(obj: any): any {
    if (obj === null || obj === undefined) return obj;
    if (typeof obj === 'string') {
        const clean = obj.trim();
        if (clean === "TBD" || clean === "Unknown" || clean === "N/A" || clean === "VACANT") {
            return "";
        }
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => sanitizeObject(item));
    }
    if (typeof obj === 'object') {
        const result: any = {};
        for (const [key, value] of Object.entries(obj)) {
            result[key] = sanitizeObject(value);
        }
        return result;
    }
    return obj;
}

export const sanitizeData = () => {
    const dataPath = path.join(process.cwd(), 'src/lib/data.ts');
    let content = fs.readFileSync(dataPath, 'utf8');

    console.log("Starting data sanitization...");

    // 1. Sanitize OracleData
    const newOracleData = oracleData.map(cmd => sanitizeObject(cmd));
    const oDataStart = "export const oracleData: OracleCommand[] = ";
    const oDataStartIdx = content.indexOf(oDataStart);

    // We can assume OracleData is the last export block in the file
    if (oDataStartIdx !== -1) {
        const newBlock = `${oDataStart}${JSON.stringify(newOracleData, null, 4)}\n`;
        content = content.substring(0, oDataStartIdx) + newBlock;
        console.log(`Sanitized ${newOracleData.length} Oracle commands.`);
    }

    fs.writeFileSync(dataPath, content);
    console.log("Sanitization complete.");
}

sanitizeData();
