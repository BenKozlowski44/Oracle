import { NextResponse } from 'next/server'
import ExcelJS from 'exceljs'
import { readJson } from '@/services/data-service'
import type { Slate, Officer, OracleCommand, SlateRequirement, SlateCandidateProfile } from '@/lib/types'

// ── Helpers ──────────────────────────────────────────────────────────

/** Convert ISO date → YYMM number (e.g. "2027-07-01" → 2707) */
function toYYMM(iso?: string): number | string {
    if (!iso) return ''
    const d = new Date(iso)
    if (isNaN(d.getTime())) return ''
    const yy = d.getFullYear() % 100
    const mm = d.getMonth() + 1
    return yy * 100 + mm
}

/** Pull a "look" label from officer screened array (e.g. "2nd Look") */
function getLookLabel(officer: Officer): string {
    if (!officer.screened?.length) return ''
    const look = officer.screened.find(s => /look/i.test(s))
    return look ?? ''
}

/** Format tour history for billet history column */
function formatTourHistory(profile: SlateCandidateProfile | undefined): string {
    if (!profile?.tourHistory?.length) return ''
    return profile.tourHistory
        .map(t => [t.ship, t.platform, t.ofrpPhase].filter(Boolean).join(' — '))
        .join('\n')
}

/** Format flag contact */
function formatFlagContact(profile: SlateCandidateProfile | undefined): string {
    if (!profile?.flagContact?.name) return 'N/A'
    const rel = profile.flagContact.relationship ? `\n(${profile.flagContact.relationship})` : ''
    return `${profile.flagContact.name}${rel}`
}

/** Format top-N preferences as "#1: ...\n#2: ..." */
function formatPreferences(profile: SlateCandidateProfile | undefined, count = 3): string {
    if (!profile?.preferences?.length) return ''
    return profile.preferences
        .sort((a, b) => a.rank - b.rank)
        .slice(0, count)
        .map(p => `#${p.rank}: ${p.key}`)
        .join('\n')
}

/** Shared header row style */
function styleHeaderRow(row: ExcelJS.Row, fillColor: string, height = 53.25) {
    row.height = height
    row.eachCell({ includeEmpty: true }, cell => {
        cell.font = { bold: true, size: 20, color: { argb: 'FF000000' } }
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fillColor } }
        cell.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' }
        cell.border = {
            top: { style: 'thin' }, left: { style: 'thin' },
            bottom: { style: 'thin' }, right: { style: 'thin' },
        }
    })
}

/** Shared candidate cell border+wrap */
function styleDataCell(cell: ExcelJS.Cell) {
    cell.alignment = { wrapText: true, vertical: 'top' }
    cell.border = {
        top: { style: 'thin' }, left: { style: 'thin' },
        bottom: { style: 'thin' }, right: { style: 'thin' },
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// FORMAT A  —  "XO CO AFLOAT"
//   C1 Name | C2 Flag Notifier | C3 Slate | C4 Experience+History | C5 Timing | C6 Incumbent | C7 Pref/Notes
// ─────────────────────────────────────────────────────────────────────────────
function buildSheetA(
    ws: ExcelJS.Worksheet,
    sheetTitle: string,
    rows: Array<{ officer: Officer; profile?: SlateCandidateProfile; requirement: SlateRequirement; cmd?: OracleCommand }>,
) {
    ws.columns = [
        { width: 40 },  // C1 Name
        { width: 32 },  // C2 Flag Notifier
        { width: 36 },  // C3 Slate
        { width: 34 },  // C4 Experience & Billet History
        { width: 20 },  // C5 Timing
        { width: 30 },  // C6 Incumbent
        { width: 36 },  // C7 Preferences / Notes
    ]

    // Row 1 — title banner (merged)
    const titleRow = ws.addRow([sheetTitle])
    ws.mergeCells(`A${titleRow.number}:G${titleRow.number}`)
    titleRow.height = 40.5
    const titleCell = titleRow.getCell(1)
    titleCell.font = { bold: true, size: 36, color: { argb: 'FFFFFFFF' } }
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF000000' } }
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' }

    // Row 2 — column headers
    const headerRow = ws.addRow(['Name', 'Flag Notifier', 'Slate', 'Experience and Billet History', 'Timing', 'Incumbent', 'Preferences / Notes'])
    styleHeaderRow(headerRow, 'FF00B0F0', 96.75)

    // Data rows
    for (const { officer, profile, requirement, cmd } of rows) {
        const lookLabel = getLookLabel(officer)
        const jpme = profile?.jpme ?? ''
        const wti = profile?.wti ?? ''
        const availYYMM = toYYMM(profile?.availabilityDate)
        const rptYYMM = toYYMM(requirement.incumbentPrd)

        // C1 — Name (rich text)
        const nameParts: ExcelJS.RichText[] = [
            { text: officer.name + (lookLabel ? `\n${lookLabel}` : '') + '\n', font: { bold: true, size: 11, name: 'Arial' } },
        ]
        if (jpme) nameParts.push({ text: `\n${jpme}`, font: { size: 10, name: 'Arial', italic: true } })
        if (wti) nameParts.push({ text: `\n${wti}`, font: { size: 10, name: 'Arial', italic: true } })

        // C3 — Slate (command name bold, location regular)
        const commandLine = [
            cmd?.platform || requirement.commandName,
            cmd?.uic ? `(${cmd.uic})` : '',
            cmd?.location || '',
        ].filter(Boolean).join(' ')

        const slateParts: ExcelJS.RichText[] = [
            { text: commandLine, font: { bold: true, size: 11, name: 'Arial' } },
        ]

        // C5 — Timing
        const timingParts: ExcelJS.RichText[] = []
        if (availYYMM) {
            timingParts.push(
                { text: 'Pipeline\n', font: { underline: true, size: 10, name: 'Arial' } },
                { text: String(availYYMM), font: { size: 10, name: 'Arial' } },
            )
        }
        if (rptYYMM) {
            timingParts.push(
                { text: '\n\nRPT as XO\n', font: { underline: true, size: 10, name: 'Arial' } },
                { text: String(rptYYMM), font: { size: 10, name: 'Arial' } },
            )
        }

        // C7 — Preferences + Notes
        const prefLines = formatPreferences(profile)
        const notes = profile?.notes ?? ''
        const prefAndNotes = [prefLines, notes].filter(Boolean).join('\n\n')

        const dataRow = ws.addRow([
            { richText: nameParts },
            formatFlagContact(profile),
            { richText: slateParts },
            formatTourHistory(profile),
            timingParts.length ? { richText: timingParts } : '',
            requirement.incumbent ?? '',
            prefAndNotes,
        ])
        dataRow.height = 120
        dataRow.eachCell({ includeEmpty: true }, (cell, colNum) => {
            if (colNum <= 7) styleDataCell(cell)
        })
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// FORMAT B  —  "CO AFLOAT" / "CO SM"
//   C1 Name | C2 Flag Notifier | C3 Current Assign | C4 Intended Slate | C5 Billet History | C6 Incumbent | C7 RPT as XO/CO | C8 IZ O-6 | C9 Notes
// ─────────────────────────────────────────────────────────────────────────────
function buildSheetB(
    ws: ExcelJS.Worksheet,
    sheetTitle: string,
    rows: Array<{ officer: Officer; profile?: SlateCandidateProfile; requirement: SlateRequirement; cmd?: OracleCommand }>,
) {
    ws.columns = [
        { width: 40 },  // C1 Name
        { width: 32 },  // C2 Flag Notifier
        { width: 36 },  // C3 Current Assignment
        { width: 36 },  // C4 Intended Slate
        { width: 30 },  // C5 Billet History
        { width: 30 },  // C6 Incumbent
        { width: 14 },  // C7 RPT as XO/CO
        { width: 14 },  // C8 IZ O-6
        { width: 40 },  // C9 Notes
    ]

    // Row 1 — title banner
    const titleRow = ws.addRow([sheetTitle])
    ws.mergeCells(`A${titleRow.number}:I${titleRow.number}`)
    titleRow.height = 40.5
    const titleCell = titleRow.getCell(1)
    titleCell.font = { bold: true, size: 36, color: { argb: 'FFFFFFFF' } }
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF000000' } }
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' }

    // Row 2 — column headers
    const headerRow = ws.addRow(['Name', 'Flag Notifier', 'Current Assignment', 'Intended Slate', 'Billet History', 'Incumbent', 'RPT as XO/CO', 'IZ O-6', 'Notes'])
    styleHeaderRow(headerRow, 'FF00B0F0')

    // Data rows
    for (const { officer, profile, requirement, cmd } of rows) {
        const lookLabel = getLookLabel(officer)
        const jpme = profile?.jpme ?? ''

        // C1 — Name (bold name + look label + JPME)
        const nameParts: ExcelJS.RichText[] = [
            { text: officer.name, font: { bold: true, size: 11, name: 'Arial' } },
        ]
        if (lookLabel) nameParts.push({ text: `\n${lookLabel}`, font: { bold: true, size: 10, name: 'Arial' } })
        if (jpme) nameParts.push({ text: `\n\n${jpme}`, font: { size: 10, name: 'Arial', italic: true } })

        // C3 — Current Assignment from bank
        const currentAssign = [officer.currentCommand, officer.billet].filter(Boolean).join('\n')

        // C4 — Intended Slate
        const commandLine = [
            cmd?.platform || requirement.commandName,
            cmd?.uic ? `(${cmd.uic})` : '',
        ].filter(Boolean).join(' ')
        const fleetUpType = requirement.role === 'CO' ? 'Direct Input CO' : `${requirement.role} Fleet-Up`

        const dataRow = ws.addRow([
            { richText: nameParts },
            formatFlagContact(profile),
            currentAssign,
            `${commandLine}\n${fleetUpType}`,
            formatTourHistory(profile),
            requirement.incumbent ?? '',
            toYYMM(requirement.incumbentPrd),
            '',  // IZ O-6 — manual
            (profile?.notes ?? '') || formatPreferences(profile),
        ])
        dataRow.height = 100
        dataRow.eachCell({ includeEmpty: true }, (cell, colNum) => {
            if (colNum <= 9) styleDataCell(cell)
        })
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// ROUTE HANDLER
// ─────────────────────────────────────────────────────────────────────────────
export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: slateId } = await params

        const slates = readJson<Slate[]>('slates.json')
        const slate = slates.find(s => s.id === slateId)
        if (!slate) return NextResponse.json({ error: 'Slate not found' }, { status: 404 })

        const officers = readJson<Officer[]>('officers.json')
        const oracleData = readJson<OracleCommand[]>('oracle-data.json')

        const requirements = slate.requirements || []
        const profiles = slate.candidateProfiles || []

        // ── Bucket assigned candidates into 3 groups ─────────────────
        type RowData = { officer: Officer; profile?: SlateCandidateProfile; requirement: SlateRequirement; cmd?: OracleCommand }

        const xoAfloat: RowData[] = []
        const coAfloat: RowData[] = []
        const coSm: RowData[] = []

        for (const req of requirements) {
            if (!req.filledBy) continue
            const officer = officers.find(o => o.id === req.filledBy)
            if (!officer) continue
            const profile = profiles.find(p => p.officerId === req.filledBy)
            const cmd = oracleData.find(c => c.id === req.commandId)
            const entry: RowData = { officer, profile, requirement: req, cmd }

            const isCoSm = cmd?.tags?.includes('CO-SM') || req.role === 'CO-SM'
            if (isCoSm) {
                coSm.push(entry)
            } else if (req.role === 'XO') {
                xoAfloat.push(entry)
            } else {
                coAfloat.push(entry)
            }
        }

        // ── Build workbook ────────────────────────────────────────────
        const wb = new ExcelJS.Workbook()
        wb.creator = 'PERS-41 Oracle'
        wb.created = new Date()

        const slateName = slate.name.toUpperCase().replace(/^SLATE\s+/i, '')

        const wsXO = wb.addWorksheet('XO CO AFLOAT')
        buildSheetA(wsXO, `SLATE ${slateName} XO CO AFLOAT`, xoAfloat)

        const wsCO = wb.addWorksheet('CO AFLOAT')
        buildSheetB(wsCO, `SLATE ${slateName} CO AFLOAT`, coAfloat)

        const wsCoSm = wb.addWorksheet('CO SM')
        buildSheetB(wsCoSm, `SLATE ${slateName} CO SM`, coSm)

        // ── Stream workbook to response ───────────────────────────────
        const buffer = await wb.xlsx.writeBuffer()
        const filename = `${slate.name.replace(/\s+/g, '-')}-Briefing-Slate.xlsx`

        return new NextResponse(buffer as ArrayBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        })
    } catch (err) {
        console.error('[generate-excel]', err)
        return NextResponse.json({ error: 'Failed to generate Excel' }, { status: 500 })
    }
}
