import { describe, it, expect } from 'vitest';
import { formatToMMMyy, calculateTargetBoard, cn } from '../../lib/utils';

describe('utils', () => {
    describe('cn()', () => {
        it('merges tailwind classes properly', () => {
            expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
            expect(cn('px-2 py-1', { 'bg-blue-500': true })).toBe('px-2 py-1 bg-blue-500');
            expect(cn('p-4', 'p-2')).toBe('p-2'); // Tailwind merge should overwrite p-4 with p-2
        });
    });

    describe('formatToMMMyy()', () => {
        it('handles empty or N/A strings', () => {
            expect(formatToMMMyy()).toBe('N/A');
            expect(formatToMMMyy('N/A')).toBe('N/A');
            expect(formatToMMMyy('TBD')).toBe('TBD');
        });

        it('formats ISO dates correctly', () => {
            expect(formatToMMMyy('2024-05-15T00:00:00Z')).toBe('MAY24');
            expect(formatToMMMyy('2026-11-01')).toBe('NOV26');
        });

        it('returns original string if it cannot parse', () => {
            expect(formatToMMMyy('APR25')).toBe('APR25');
        });
    });

    describe('calculateTargetBoard()', () => {
        it('handles unknown dates', () => {
            expect(calculateTargetBoard()).toBe('TBD');
            expect(calculateTargetBoard('TBD')).toBe('TBD');
            expect(calculateTargetBoard('Unknown')).toBe('TBD');
        });

        it('calculates the target board correctly from ISO date', () => {
            // Uses 2028 dates so results are never clamped by getCurrentActiveSlate().
            // Formula: vacancy year 2028 → slate year 27 (year - 1).
            // Spring (Mar-May) -> Q1
            expect(calculateTargetBoard('2028-04-15')).toBe('27-1');
            // Summer (Jun-Aug) -> Q2
            expect(calculateTargetBoard('2028-07-01')).toBe('27-2');
            // Fall (Sep-Nov) -> Q3
            expect(calculateTargetBoard('2028-10-15')).toBe('27-3');
            // Winter Dec -> Q4 same slate year
            expect(calculateTargetBoard('2028-12-15')).toBe('27-4');
            // Winter Jan -> Q4 of prior slate year (2029 → 28-1 = 27-4)
            expect(calculateTargetBoard('2029-01-15')).toBe('27-4');
        });
    });
});
