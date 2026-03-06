import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'lib', 'data.ts');

export async function readDataFile(): Promise<string> {
    return fs.promises.readFile(DATA_FILE_PATH, 'utf8');
}

export async function writeDataFile(content: string): Promise<void> {
    return fs.promises.writeFile(DATA_FILE_PATH, content, 'utf8');
}

/**
 * Replaces an exported array in the data.ts file with new data
 */
export function replaceExport(content: string, varName: string, data: any): string {
    const startMarker = `export const ${varName}:`;
    const startIndex = content.indexOf(startMarker);
    if (startIndex === -1) return content; // Variable not found

    const nextExportIndex = content.indexOf('export const', startIndex + startMarker.length);
    const endIndex = nextExportIndex === -1 ? content.length : nextExportIndex;

    let typeAnnotation = 'any';
    if (varName === 'oracleData') typeAnnotation = 'OracleCommand[]';
    if (varName === 'officers') typeAnnotation = 'Officer[]';
    if (varName === 'slates') typeAnnotation = 'Slate[]';
    if (varName === 'boards') typeAnnotation = 'CdrCmdBoard[]';

    const dataString = JSON.stringify(data, null, 4);
    const newBlock = `export const ${varName}: ${typeAnnotation} = ${dataString}${endIndex === content.length ? '' : '\n\n'}`;

    return content.substring(0, startIndex) + newBlock + content.substring(endIndex);
}

/**
 * High-level orchestration function to safely update data.ts
 */
export async function updateDataFile(updates: { oracleData?: any, officers?: any, slates?: any, boards?: any }) {
    let fileContent = await readDataFile();
    let updated = false;

    if (updates.oracleData && Array.isArray(updates.oracleData)) {
        fileContent = replaceExport(fileContent, 'oracleData', updates.oracleData);
        updated = true;
    }

    if (updates.officers && Array.isArray(updates.officers)) {
        fileContent = replaceExport(fileContent, 'officers', updates.officers);
        updated = true;
    }

    if (updates.slates && Array.isArray(updates.slates)) {
        fileContent = replaceExport(fileContent, 'slates', updates.slates);
        updated = true;
    }

    if (updates.boards && Array.isArray(updates.boards)) {
        fileContent = replaceExport(fileContent, 'boards', updates.boards);
        updated = true;
    }

    if (updated) {
        await writeDataFile(fileContent);
    }
}
