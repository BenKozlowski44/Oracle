import { describe, it, expect } from 'vitest'
import { isFirefighter, normaliseYearGroup } from '../../lib/officer-utils'
import type { Officer } from '../../lib/types'

const base: Officer = {
    id: 'o1',
    name: 'TEST OFFICER',
    rank: 'CDR',
    designator: '1110',
    yearGroup: 2005,
    currentCommand: 'USS TEST',
    prd: '2026-01-01',
    preferences: [],
    status: 'Available',
}

describe('isFirefighter', () => {
    it('returns true for status Ready FF', () => {
        expect(isFirefighter({ ...base, status: 'Ready FF' })).toBe(true)
    })

    it('returns true for listShift Firefighters', () => {
        expect(isFirefighter({ ...base, listShift: 'Firefighters' })).toBe(true)
    })

    it('returns true for assignedSlate containing 3rd look', () => {
        expect(isFirefighter({ ...base, assignedSlate: 'FY26 3rd Look' })).toBe(true)
    })

    it('returns true for assignedSlate containing no command', () => {
        expect(isFirefighter({ ...base, assignedSlate: 'No Command' })).toBe(true)
    })

    it('returns false for normal Available officer', () => {
        expect(isFirefighter({ ...base, status: 'Available' })).toBe(false)
    })

    it('returns false when status is Slated (overrides listShift)', () => {
        expect(isFirefighter({ ...base, status: 'Slated', listShift: 'Firefighters' })).toBe(false)
    })

    it('returns false when listShift is Slated', () => {
        expect(isFirefighter({ ...base, status: 'Ready FF', listShift: 'Slated' })).toBe(false)
    })

    it('returns false when listShift is CO-SM (CO-SM takes priority)', () => {
        expect(isFirefighter({ ...base, status: 'Ready FF', listShift: 'CO-SM' })).toBe(false)
    })

    it('returns false when screened includes CO-SM', () => {
        expect(isFirefighter({ ...base, status: 'Ready FF', screened: ['CO-SM'] })).toBe(false)
    })

    it('returns false for De-screened status', () => {
        expect(isFirefighter({ ...base, status: 'De-screened' })).toBe(false)
    })

    it('returns false for Declined status', () => {
        expect(isFirefighter({ ...base, status: 'Declined' })).toBe(false)
    })

    it('returns false for No Opportunity status', () => {
        expect(isFirefighter({ ...base, status: 'No Opportunity' })).toBe(false)
    })

    it('returns false for Declined/Descreened listShift', () => {
        expect(isFirefighter({ ...base, listShift: 'Declined/Descreened' })).toBe(false)
    })
})

describe('normaliseYearGroup', () => {
    it('strips trailing zero from 5-digit year groups', () => {
        expect(normaliseYearGroup(20050)).toBe(2005)
        expect(normaliseYearGroup(20130)).toBe(2013)
        expect(normaliseYearGroup(20140)).toBe(2014)
        expect(normaliseYearGroup(20150)).toBe(2015)
    })

    it('leaves 4-digit year groups unchanged', () => {
        expect(normaliseYearGroup(2005)).toBe(2005)
        expect(normaliseYearGroup(2013)).toBe(2013)
    })

    it('handles zero (no year group)', () => {
        expect(normaliseYearGroup(0)).toBe(0)
    })
})
