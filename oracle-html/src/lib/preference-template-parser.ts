/**
 * preference-template-parser.ts
 *
 * Parses a returned PERS-41 Candidate Preference Template Excel file
 * (both CDR CMD and CO-SM variants) into a structured object for
 * storage as a SlateCandidateProfile.
 *
 * Works client-side using xlsx-js-style (already a project dependency).
 * The template row structure is fixed by our own generator, so
 * section-relative offsets are used for most fields, with a preference
 * loop for the variable-length ranked list.
 */

import * as XLSX from 'xlsx-js-style'
import type { TourEntry, ContactInfo, FlagContact } from '@/lib/types'

export interface ParsedPreferenceTemplate {
    officerName?: string
    rank?: string
    designator?: string
    availabilityDate?: string
    contactInfo?: ContactInfo
    flagContact?: FlagContact
    /** Ranked platform/command preferences extracted from the dropdown section */
    preferences: { key: string; rank: number }[]
    notes?: string
    tourHistory: TourEntry[]
    jpme?: string
    wti?: string
    coLocation?: string
    efm?: string
    education?: string
    /** Detected from the preference section header text */
    templateType: 'cdr-cmd' | 'co-sm'
}

const TOUR_PERIOD_NAMES = [
    '1ST DIVISION OFFICER TOUR',
    '2ND DIVISION OFFICER TOUR',
    'POST-DIVISION OFFICER TOUR',
    '1ST DEPARTMENT HEAD TOUR',
    '2ND DEPARTMENT HEAD TOUR',
    'POST-DEPARTMENT HEAD TOUR',
]

/** Coerce any cell value to a trimmed string */
const s = (v: unknown): string => String(v ?? '').trim()
const up = (v: unknown): string => s(v).toUpperCase()

/** Safely access a row that may be undefined */
const row = (rows: unknown[][], i: number): unknown[] => rows[i] ?? []

export function parsePreferenceTemplate(arrayBuffer: ArrayBuffer): ParsedPreferenceTemplate {
    const wb = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' })

    const ws = wb.Sheets['Candidate Input']
    if (!ws) {
        throw new Error(
            'Could not find a "Candidate Input" sheet. ' +
            'Make sure you are uploading an Oracle preference template.'
        )
    }

    // sheet_to_json with header:1 returns each row as an array.
    // Blank rows appear as empty/short arrays. blankrows is true by default
    // for array output, preserving row positions so our offsets stay valid.
    const rows = XLSX.utils.sheet_to_json(ws, {
        header: 1,
        defval: '',
    }) as unknown[][]

    const result: ParsedPreferenceTemplate = {
        preferences: [],
        tourHistory: [],
        templateType: 'cdr-cmd',
    }

    let i = 0
    while (i < rows.length) {
        const colA = up(row(rows, i)[0])

        // ── OFFICER INFORMATION ──────────────────────────────────────────────
        // Row i:   section header
        // Row i+1: sub-header labels
        // Row i+2: input values [Name, Rank, Designator, Availability Date]
        if (colA === 'OFFICER INFORMATION') {
            const inp = row(rows, i + 2)
            result.officerName    = s(inp[0]) || undefined
            result.rank           = s(inp[1]) || undefined
            result.designator     = s(inp[2]) || undefined
            result.availabilityDate = s(inp[3]) || undefined
            i += 3
            continue
        }

        // ── CONTACT INFORMATION ──────────────────────────────────────────────
        // Row i:   section header
        // Row i+1: sub-header (email, phone labels)
        // Row i+2: input [workEmail, homeEmail, workPhone, personalCell]
        // Row i+3: sub-header (mailing address)
        // Row i+4: input [mailingAddress]
        if (colA === 'CONTACT INFORMATION') {
            const inp1 = row(rows, i + 2)
            const inp2 = row(rows, i + 4)
            result.contactInfo = {
                workEmail:      s(inp1[0]) || undefined,
                homeEmail:      s(inp1[1]) || undefined,
                workPhone:      s(inp1[2]) || undefined,
                personalPhone:  s(inp1[3]) || undefined,
                mailingAddress: s(inp2[0]) || undefined,
            }
            i += 5
            continue
        }

        // ── FLAG NOTIFIER ────────────────────────────────────────────────────
        // Row i:   section header
        // Row i+1: sub-header
        // Row i+2: input [flagName, relationship]
        if (colA === 'FLAG NOTIFIER') {
            const inp = row(rows, i + 2)
            const name = s(inp[0])
            if (name) {
                result.flagContact = { name, relationship: s(inp[1]) || undefined }
            }
            i += 3
            continue
        }

        // ── COMMAND PREFERENCES (CDR CMD or CO-SM) ───────────────────────────
        // Section header contains "PREFERENCES".
        // Detected as CO-SM when it also contains "CO-SM".
        // Row i:   section header
        // Row i+1: sub-header (Rank | Platform/Command label)
        // Row i+2+: "Preference N" label in col A, selected value in col B
        if (colA.includes('PREFERENCES')) {
            if (colA.includes('CO-SM')) result.templateType = 'co-sm'

            let j = i + 2 // skip section header + sub-header
            while (j < rows.length) {
                const pr = row(rows, j)
                const label = up(pr[0])
                if (!label.startsWith('PREFERENCE')) break

                const numMatch = label.match(/PREFERENCE\s+(\d+)/)
                const rank = numMatch ? parseInt(numMatch[1], 10) : result.preferences.length + 1
                const key = s(pr[1])
                if (key) result.preferences.push({ key, rank })
                j++
            }
            i = j
            continue
        }

        // ── CONSIDERATIONS & NOTES ───────────────────────────────────────────
        // Row i:   section header
        // Row i+1: amplifying info label (static text, not user input)
        // Row i+2: notes input (col A)
        // Note: avoid matching "PERSONAL CONSIDERATIONS"
        if (colA === 'CONSIDERATIONS & NOTES') {
            const inp = row(rows, i + 2)
            result.notes = s(inp[0]) || undefined
            i += 3
            continue
        }

        // ── TOUR HISTORY ─────────────────────────────────────────────────────
        // Row i:   section header
        // Row i+1: first tour name (e.g. "1st Division Officer Tour")
        // Each tour is 8 rows: name, hdr, input, hdr, input, hdr, input, blank
        if (colA === 'TOUR HISTORY') {
            let j = i + 1
            while (j < rows.length && result.tourHistory.length < 6) {
                const tourLabel = up(row(rows, j)[0])
                if (!TOUR_PERIOD_NAMES.includes(tourLabel)) {
                    // Stop if we hit another section header
                    if (tourLabel.includes('PROFESSIONAL') || tourLabel.includes('PERSONAL')) {
                        i = j - 1 // outer loop will i++, landing on this row
                        break
                    }
                    j++
                    continue
                }

                // j   = tour name row
                // j+1 = ship/platform/ofrp sub-header
                // j+2 = ship/platform/ofrp input
                // j+3 = months sub-header
                // j+4 = months input
                // j+5 = evols sub-header
                // j+6 = evols input
                // j+7 = blank
                const shipRow   = row(rows, j + 2)
                const monthsRow = row(rows, j + 4)
                const evolRow   = row(rows, j + 6)

                result.tourHistory.push({
                    period:          s(row(rows, j)[0]),
                    ship:            s(shipRow[0])   || undefined,
                    platform:        s(shipRow[1])   || undefined,
                    ofrpPhase:       s(shipRow[2])   || undefined,
                    monthsUW:        s(monthsRow[0]) || undefined,
                    monthsDeployed:  s(monthsRow[1]) || undefined,
                    monthsAsOOD:     s(monthsRow[2]) || undefined,
                    oodEvolutions:   s(evolRow[0])   || undefined,
                    connEvolutions:  s(evolRow[1])   || undefined,
                    joodEvolutions:  s(evolRow[2])   || undefined,
                })
                j += 8
            }
            // If broke from inner loop by hitting a section, i was set; otherwise advance
            if (i !== j - 1) i = j
            continue
        }

        // ── PROFESSIONAL QUALIFICATIONS ──────────────────────────────────────
        // Row i:   section header
        // Row i+1: sub-header (Field | Value)
        // Row i+2: [JPME label, JPME value]
        // Row i+3: [WTI label,  WTI value]
        if (colA === 'PROFESSIONAL QUALIFICATIONS') {
            result.jpme = s(row(rows, i + 2)[1]) || undefined
            result.wti  = s(row(rows, i + 3)[1]) || undefined
            i += 4
            continue
        }

        // ── PERSONAL CONSIDERATIONS ──────────────────────────────────────────
        // Row i:   section header
        // Row i+1: sub-header (Consideration | Notes)
        // Row i+2: [Co-Location label, value]
        // Row i+3: [EFM label, value]
        // Row i+4: [Education label, value]
        if (colA === 'PERSONAL CONSIDERATIONS') {
            result.coLocation = s(row(rows, i + 2)[1]) || undefined
            result.efm        = s(row(rows, i + 3)[1]) || undefined
            result.education  = s(row(rows, i + 4)[1]) || undefined
            i += 5
            continue
        }

        i++
    }

    return result
}
