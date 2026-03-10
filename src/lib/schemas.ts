import { z } from 'zod'

// ── Primitive enums ───────────────────────────────────────────────────────────

export const BilletRoleSchema = z.enum(['CO', 'XO', 'CO-SM', 'NO RELIEF'])

export const SlateStatusSchema = z.enum(['Active', 'Archived'])

export const ApprovalEntitySchema = z.enum(['branchHead', 'pers41', 'swcc', 'swoboss'])

export const OfficerStatusSchema = z.enum([
    'Available', 'Verify PD2', 'Slated', 'Defer', 'PCC',
    'Hold', 'Ready FF', 'Joint Lock', 'War College',
    'Family Planning', 'List Shift', 'Retire',
])

// ── Simple request bodies ─────────────────────────────────────────────────────

// PATCH /api/slates/[id]/status
export const SlateStatusBodySchema = z.object({
    status: SlateStatusSchema,
})

// PATCH /api/slates/[id]/approvals
export const ApprovalsBodySchema = z.object({
    entity: ApprovalEntitySchema,
    value: z.boolean(),
})

// PATCH /api/slates/[id]/assign
export const AssignBodySchema = z.object({
    requirementId: z.string().min(1),
    officerId: z.string().nullable(),
})

// ── Slate requirement + profile ───────────────────────────────────────────────

export const SlateRequirementSchema = z.object({
    id: z.string().min(1),
    commandId: z.string().min(1),
    commandName: z.string().min(1),
    role: BilletRoleSchema,
    incumbent: z.string(),
    incumbentPrd: z.string(),
    status: z.enum(['Draft', 'Confirmed', 'Filled']),
    filledBy: z.string().optional(),
})

export const SlateCandidateProfileSchema = z.object({
    id: z.string().min(1),
    slateId: z.string().min(1),
    officerId: z.string().min(1),
    preferences: z.array(z.object({
        key: z.string(),
        rank: z.number(),
    })),
    experienceSummary: z.string().optional(),
    availabilityDate: z.string().optional(),
    notes: z.string().optional(),
    jpme: z.string().optional(),
    wti: z.string().optional(),
}).passthrough() // allow flagContact, tourHistory, contactInfo etc.

// PATCH /api/slates/[id]/requirements
export const RequirementsBodySchema = z.object({
    requirements: z.array(SlateRequirementSchema),
    candidates: z.array(z.string()),
    candidateProfiles: z.array(SlateCandidateProfileSchema),
})

// ── Slate creation ────────────────────────────────────────────────────────────

// POST /api/slates
export const SlateCreateBodySchema = z.object({
    slate: z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        windowStart: z.string().min(1),
        windowEnd: z.string().min(1),
        status: SlateStatusSchema,
        approvals: z.object({
            branchHead: z.boolean(),
            pers41: z.boolean(),
            swcc: z.boolean(),
            swoboss: z.boolean(),
        }),
        requirements: z.array(z.unknown()).optional(),
        candidates: z.array(z.unknown()).optional(),
        candidateProfiles: z.array(z.unknown()).optional(),
    }).passthrough(),
})

// ── Officer ───────────────────────────────────────────────────────────────────

// Shared officer shape — requires id; all other fields passthrough
export const OfficerSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
}).passthrough()

// POST /api/create-officer — id is generated server-side so not required
export const CreateOfficerBodySchema = z.object({
    name: z.string().min(1),
}).passthrough()

// ── Oracle command ────────────────────────────────────────────────────────────

// PATCH /api/oracle/[id]
export const OracleCommandPatchBodySchema = z.object({
    updatedCommand: z.object({
        id: z.string().min(1),
        name: z.string().min(1),
    }).passthrough(),
    metrics: z.unknown().optional(),
    officers: z.array(z.unknown()).optional(),
})

// ── Boards ────────────────────────────────────────────────────────────────────

export const BoardCandidateSchema = z.object({
    id: z.string().min(1),
}).passthrough()

// POST /api/boards
export const BoardCreateBodySchema = z.object({
    board: z.object({
        id: z.string().min(1),
        name: z.string().min(1),
    }).passthrough(),
})

// PATCH /api/boards/[id]/candidates
export const BoardCandidatesBodySchema = z.object({
    candidates: z.array(BoardCandidateSchema),
})

// PATCH /api/boards/[id]/close
export const BoardCloseBodySchema = z.object({
    candidates: z.array(BoardCandidateSchema),
    newOfficers: z.array(z.object({ id: z.string().min(1), name: z.string().min(1) }).passthrough()),
})
