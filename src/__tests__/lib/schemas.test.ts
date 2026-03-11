import { describe, it, expect } from 'vitest'
import {
    SlateStatusBodySchema,
    ApprovalsBodySchema,
    AssignBodySchema,
    OfficerSchema,
    CreateOfficerBodySchema,
    OracleCommandPatchBodySchema,
    BoardCreateBodySchema,
} from '../../lib/schemas'

describe('Zod API Schemas', () => {

    describe('SlateStatusBodySchema', () => {
        it('accepts valid status values', () => {
            expect(SlateStatusBodySchema.safeParse({ status: 'Active' }).success).toBe(true)
            expect(SlateStatusBodySchema.safeParse({ status: 'Archived' }).success).toBe(true)
        })

        it('rejects invalid status', () => {
            expect(SlateStatusBodySchema.safeParse({ status: 'Deleted' }).success).toBe(false)
            expect(SlateStatusBodySchema.safeParse({}).success).toBe(false)
        })
    })

    describe('ApprovalsBodySchema', () => {
        it('accepts valid entity + boolean', () => {
            expect(ApprovalsBodySchema.safeParse({ entity: 'swoboss', value: true }).success).toBe(true)
            expect(ApprovalsBodySchema.safeParse({ entity: 'branchHead', value: false }).success).toBe(true)
        })

        it('rejects unknown entity', () => {
            expect(ApprovalsBodySchema.safeParse({ entity: 'admiral', value: true }).success).toBe(false)
        })

        it('rejects non-boolean value', () => {
            expect(ApprovalsBodySchema.safeParse({ entity: 'pers41', value: 'yes' }).success).toBe(false)
        })
    })

    describe('AssignBodySchema', () => {
        it('accepts string requirementId and string officerId', () => {
            expect(AssignBodySchema.safeParse({ requirementId: 'req-1', officerId: 'off-1' }).success).toBe(true)
        })

        it('accepts null officerId (unassign)', () => {
            expect(AssignBodySchema.safeParse({ requirementId: 'req-1', officerId: null }).success).toBe(true)
        })

        it('rejects empty requirementId', () => {
            expect(AssignBodySchema.safeParse({ requirementId: '', officerId: 'off-1' }).success).toBe(false)
        })

        it('rejects missing fields', () => {
            expect(AssignBodySchema.safeParse({ requirementId: 'req-1' }).success).toBe(false)
        })
    })

    describe('OfficerSchema', () => {
        it('requires id and name', () => {
            expect(OfficerSchema.safeParse({ id: 'o1', name: 'SMITH JOHN' }).success).toBe(true)
        })

        it('passes through extra fields', () => {
            const result = OfficerSchema.safeParse({ id: 'o1', name: 'SMITH JOHN', status: 'Available', rank: 'CDR' })
            expect(result.success).toBe(true)
        })

        it('rejects missing id', () => {
            expect(OfficerSchema.safeParse({ name: 'SMITH JOHN' }).success).toBe(false)
        })

        it('rejects empty name', () => {
            expect(OfficerSchema.safeParse({ id: 'o1', name: '' }).success).toBe(false)
        })
    })

    describe('CreateOfficerBodySchema', () => {
        it('accepts payload with just name', () => {
            expect(CreateOfficerBodySchema.safeParse({ name: 'JONES MARY' }).success).toBe(true)
        })

        it('rejects empty name', () => {
            expect(CreateOfficerBodySchema.safeParse({ name: '' }).success).toBe(false)
        })
    })

    describe('OracleCommandPatchBodySchema', () => {
        it('accepts valid patch body', () => {
            const body = { updatedCommand: { id: 'cmd-1', name: 'USS TEST' } }
            expect(OracleCommandPatchBodySchema.safeParse(body).success).toBe(true)
        })

        it('accepts optional metrics and officers fields', () => {
            const body = {
                updatedCommand: { id: 'cmd-1', name: 'USS TEST' },
                metrics: { foo: 1 },
                officers: [{ id: 'o1', name: 'X' }],
            }
            expect(OracleCommandPatchBodySchema.safeParse(body).success).toBe(true)
        })

        it('rejects when updatedCommand is missing id', () => {
            const body = { updatedCommand: { name: 'USS TEST' } }
            expect(OracleCommandPatchBodySchema.safeParse(body).success).toBe(false)
        })
    })

    describe('BoardCreateBodySchema', () => {
        it('accepts valid board body', () => {
            const body = { board: { id: 'b1', name: 'FY26 Board' } }
            expect(BoardCreateBodySchema.safeParse(body).success).toBe(true)
        })

        it('rejects missing board id', () => {
            const body = { board: { name: 'FY26 Board' } }
            expect(BoardCreateBodySchema.safeParse(body).success).toBe(false)
        })
    })
})
