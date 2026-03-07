import type { BoardCandidate, Officer, OfficerStatus } from './types';

/**
 * Converts a BoardCandidate's result into the correct Officer migration data.
 * Returns null if the result does not require migration to the officer database.
 */
export function getMigrationConfig(result: BoardCandidate['result']): {
    status: OfficerStatus;
    listShift?: string;
    screened?: string[];
} | null {
    switch (result) {
        case 'Selected CO':
            return { status: 'Available', screened: ['CO'] };
        case 'Selected XO':
            return { status: 'Available', listShift: 'XO Screened' };
        case 'Selected XO-SM':
            return { status: 'Available', listShift: 'XO Screened' };
        case 'Selected CO-SM':
            return { status: 'Available', listShift: 'CO-SM', screened: ['CO-SM'] };
        default:
            return null; // FOS, Deferred, Pulled, Pending — no migration
    }
}

/**
 * Converts a BoardCandidate into a minimal valid Officer record
 * suitable for insertion into the global officers database.
 */
export function boardCandidateToOfficer(candidate: BoardCandidate): Officer {
    const raw = candidate.rawData || {};

    // Pull yearGroup from rawData 'year group' or fall back to 0
    const ygEntry = Object.entries(raw).find(([k]) => k.toLowerCase().startsWith('year'));
    const yearGroup = ygEntry ? parseInt(ygEntry[1], 10) || 0 : 0;

    // Pull CSR from rawData
    const csrEntry = Object.entries(raw).find(([k]) => k.toLowerCase() === 'csr');
    const csr = csrEntry?.[1] || '';

    const config = getMigrationConfig(candidate.result);

    return {
        id: `officer_${Math.random().toString(36).substring(2, 11)}`,
        name: candidate.name,
        rank: candidate.rank as Officer['rank'],
        designator: (candidate.designator as Officer['designator']) || '1110',
        currentCommand: '',
        prd: '',
        preferences: [],
        status: config?.status ?? 'Available',
        yearGroup,
        csr,
        ...(config?.listShift ? { listShift: config.listShift } : {}),
        ...(config?.screened ? { screened: config.screened } : {}),
    };
}
