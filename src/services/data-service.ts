import fs from 'fs';
import path from 'path';
import type { OracleCommand, Officer, Slate, CdrCmdBoard } from '../lib/types';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

function writeJson(filename: string, data: unknown): void {
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export function readJson<T>(filename: string): T {
    const filePath = path.join(DATA_DIR, filename);
    return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
}

/**
 * Persists updated data to the individual JSON files.
 * Each key is optional — only provided keys are written.
 */
export async function updateDataFile(updates: {
    oracleData?: OracleCommand[];
    officers?: Officer[];
    slates?: Slate[];
    boards?: CdrCmdBoard[];
}) {
    if (updates.oracleData) writeJson('oracle-data.json', updates.oracleData);
    if (updates.officers) writeJson('officers.json', updates.officers);
    if (updates.slates) writeJson('slates.json', updates.slates);
    if (updates.boards) writeJson('boards.json', updates.boards);
}
