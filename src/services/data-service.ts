import fs from 'fs';
import path from 'path';
import type { OracleCommand, Officer, Slate, CdrCmdBoard } from '../lib/types';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

// ─── Concurrency lock ─────────────────────────────────────────────────────────
// Serializes all read-modify-write cycles across API routes.
// Since readJson/writeJson are synchronous, fn() runs without async gaps —
// no two callers can interleave their reads and writes.
let _lockChain: Promise<unknown> = Promise.resolve();

export function withWriteLock<T>(fn: () => T): Promise<T> {
    const result = _lockChain.then(() => fn());
    // Keep the chain alive even if this slot errors
    _lockChain = result.then(() => undefined, () => undefined);
    return result;
}
// ─────────────────────────────────────────────────────────────────────────────

export function writeJson(filename: string, data: unknown): void {
    const filePath = path.join(DATA_DIR, filename);
    const tmp = filePath + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tmp, filePath); // atomic: old file stays intact if crash occurs mid-write
}

export function readJson<T>(filename: string): T {
    const filePath = path.join(DATA_DIR, filename);
    let raw: string;
    try {
        raw = fs.readFileSync(filePath, 'utf8');
    } catch {
        throw new Error(
            `Data file not found: ${filename}. ` +
            `Expected at ${filePath}. Restore from a backup or re-import data.`
        );
    }
    try {
        return JSON.parse(raw) as T;
    } catch {
        throw new Error(
            `Data file is corrupted: ${filename}. ` +
            `The file contains invalid JSON. Check ${filePath} and fix or restore it.`
        );
    }
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
