import { describe, it, expect } from 'vitest'
import { applySlateToOracle } from '../../lib/slate-migration'
import type { Slate, Officer, OracleCommand } from '../../lib/types'

// ── Minimal fixtures ──────────────────────────────────────────────────────────

const makeOfficer = (overrides: Partial<Officer> = {}): Officer => ({
    id: 'officer-1',
    name: 'SMITH JOHN A',
    rank: 'CDR',
    designator: '1110',
    yearGroup: 2005,
    currentCommand: 'USS TEST',
    prd: '2026-07-01',
    preferences: [],
    status: 'Available',
    ...overrides,
})

const makeCommand = (overrides: Partial<OracleCommand> = {}): OracleCommand => ({
    id: 'cmd-1',
    name: 'USS TESTERSON',
    uic: '12345',
    location: 'Norfolk, VA',
    currentCO: { name: 'DOE JANE', prd: '2026-01-01' },
    currentXO: { name: 'ROE RICHARD', prd: '2026-06-01' },
    nextSlateParams: { targetBoardDate: 'TBD', requirement: 'XO' },
    timeline: {},
    ...overrides,
})

const makeSlate = (overrides: Partial<Slate> = {}): Slate => ({
    id: 'slate-1',
    name: 'FY26-2',
    windowStart: '2026-06-01',
    windowEnd: '2026-08-31',
    status: 'Active',
    requirements: [],
    candidates: [],
    approvals: { branchHead: false, pers41: false, swcc: false, swoboss: false },
    ...overrides,
})

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('applySlateToOracle', () => {
    it('returns oracle data unchanged when no filled requirements', () => {
        const slate = makeSlate()
        const oracle = [makeCommand()]
        const result = applySlateToOracle(slate, [], oracle)
        expect(result[0].slatedXO).toBeUndefined()
        expect(result[0].prospectiveCO).toBeUndefined()
    })

    it('sets slatedXO for a filled XO requirement', () => {
        const officer = makeOfficer({ id: 'o1', name: 'JONES TOM' })
        const slate = makeSlate({
            requirements: [{
                id: 'req-1',
                commandId: 'cmd-1',
                commandName: 'USS TESTERSON',
                role: 'XO',
                incumbent: 'ROE RICHARD',
                incumbentPrd: '2026-06-01',
                status: 'Filled',
                filledBy: 'o1',
            }]
        })
        const oracle = [makeCommand()]
        const result = applySlateToOracle(slate, [officer], oracle)
        expect(result[0].slatedXO?.name).toBe('JONES TOM')
    })

    it('sets prospectiveCO for a filled CO requirement', () => {
        const officer = makeOfficer({ id: 'o2', name: 'ADAMS SARAH' })
        const slate = makeSlate({
            requirements: [{
                id: 'req-2',
                commandId: 'cmd-1',
                commandName: 'USS TESTERSON',
                role: 'CO',
                incumbent: 'DOE JANE',
                incumbentPrd: '2026-01-01',
                status: 'Filled',
                filledBy: 'o2',
            }]
        })
        const oracle = [makeCommand()]
        const result = applySlateToOracle(slate, [officer], oracle)
        expect(result[0].prospectiveCO?.name).toBe('ADAMS SARAH')
    })

    it('skips requirements that are not Filled', () => {
        const slate = makeSlate({
            requirements: [{
                id: 'req-3',
                commandId: 'cmd-1',
                commandName: 'USS TESTERSON',
                role: 'XO',
                incumbent: '',
                incumbentPrd: '',
                status: 'Draft',
                filledBy: undefined,
            }]
        })
        const oracle = [makeCommand()]
        const result = applySlateToOracle(slate, [], oracle)
        expect(result[0].slatedXO).toBeUndefined()
    })

    it('skips when officer is not found in the pool', () => {
        const slate = makeSlate({
            requirements: [{
                id: 'req-4',
                commandId: 'cmd-1',
                commandName: 'USS TESTERSON',
                role: 'XO',
                incumbent: '',
                incumbentPrd: '',
                status: 'Filled',
                filledBy: 'nonexistent-officer',
            }]
        })
        const oracle = [makeCommand()]
        const result = applySlateToOracle(slate, [], oracle)
        expect(result[0].slatedXO).toBeUndefined()
    })

    it('skips when commandId does not exist in oracle', () => {
        const officer = makeOfficer({ id: 'o3' })
        const slate = makeSlate({
            requirements: [{
                id: 'req-5',
                commandId: 'cmd-DOES-NOT-EXIST',
                commandName: 'GHOST SHIP',
                role: 'XO',
                incumbent: '',
                incumbentPrd: '',
                status: 'Filled',
                filledBy: 'o3',
            }]
        })
        const oracle = [makeCommand()]
        const result = applySlateToOracle(slate, [officer], oracle)
        expect(result[0].slatedXO).toBeUndefined()
    })

    it('handles multiple requirements across different commands', () => {
        const o1 = makeOfficer({ id: 'o1', name: 'ALPHA BRAVO' })
        const o2 = makeOfficer({ id: 'o2', name: 'CHARLIE DELTA' })
        const slate = makeSlate({
            requirements: [
                {
                    id: 'r1', commandId: 'cmd-1', commandName: 'USS ONE',
                    role: 'XO', incumbent: '', incumbentPrd: '',
                    status: 'Filled', filledBy: 'o1',
                },
                {
                    id: 'r2', commandId: 'cmd-2', commandName: 'USS TWO',
                    role: 'CO', incumbent: '', incumbentPrd: '',
                    status: 'Filled', filledBy: 'o2',
                },
            ]
        })
        const oracle = [
            makeCommand({ id: 'cmd-1', name: 'USS ONE' }),
            makeCommand({ id: 'cmd-2', name: 'USS TWO' }),
        ]
        const result = applySlateToOracle(slate, [o1, o2], oracle)
        expect(result.find(c => c.id === 'cmd-1')?.slatedXO?.name).toBe('ALPHA BRAVO')
        expect(result.find(c => c.id === 'cmd-2')?.prospectiveCO?.name).toBe('CHARLIE DELTA')
    })
})
