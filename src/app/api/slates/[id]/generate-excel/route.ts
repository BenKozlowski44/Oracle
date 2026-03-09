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

/** Format tour history — newline-separated list */
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

// ── Shared styling helpers ────────────────────────────────────────────

/** Standard data cell styling — matches reference exactly */
function styleDataCell(cell: ExcelJS.Cell, bold = false) {
    cell.font = { size: 20, name: 'Arial', bold, color: { argb: 'FF000000' } }
    cell.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' }
    cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
    }
}

/** Style a full row as header (cyan, medium borders, size 20) */
function styleHeaderRow(row: ExcelJS.Row, height: number) {
    row.height = height
    row.eachCell({ includeEmpty: true }, cell => {
        cell.font = { bold: true, size: 20, name: 'Arial' }
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF00B0F0' } }
        cell.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' }
        cell.border = {
            top: { style: 'medium' },
            bottom: { style: 'medium' },
            left: { style: 'medium' },
            right: { style: 'medium' },
        }
    })
}

/** Style the title banner row (black bg, white Calibri 36, bottom-medium border) */
function styleTitleRow(row: ExcelJS.Row, numCols: number) {
    row.height = 40.5
    const cell = row.getCell(1)
    cell.font = { bold: true, size: 36, name: 'Calibri', color: { argb: 'FFFFFFFF' } }
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF000000' } }
    cell.alignment = { horizontal: 'center', vertical: 'middle' }
    cell.border = { bottom: { style: 'medium' } }
    // Also style remaining merged cells (needed for ExcelJS border rendering)
    for (let c = 2; c <= numCols; c++) {
        const mc = row.getCell(c)
        mc.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF000000' } }
        mc.border = { bottom: { style: 'medium' } }
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// FORMAT A — "XO CO AFLOAT"
// C1 Name | C2 Flag Notifier | C3 Slate | C4 Experience+History | C5 Timing | C6 Incumbent | C7 Pref/Notes
// ─────────────────────────────────────────────────────────────────────────────
function buildSheetA(
    ws: ExcelJS.Worksheet,
    sheetTitle: string,
    rows: Array<{ officer: Officer; profile?: SlateCandidateProfile; requirement: SlateRequirement; cmd?: OracleCommand }>,
) {
    ws.columns = [
        { width: 40 },   // C1 Name
        { width: 32 },   // C2 Flag Notifier
        { width: 36 },   // C3 Slate
        { width: 34 },   // C4 Experience & Billet History
        { width: 20 },   // C5 Timing
        { width: 30 },   // C6 Incumbent
        { width: 36 },   // C7 Preferences / Notes
    ]

    // Row 1 — title banner
    const titleRow = ws.addRow([sheetTitle, '', '', '', '', '', ''])
    ws.mergeCells(`A${titleRow.number}:G${titleRow.number}`)
    styleTitleRow(titleRow, 7)

    // Row 2 — column headers
    const headerRow = ws.addRow(['Name', 'Flag Notifier', 'Slate', 'Experience and Billet History', 'Timing', 'Incumbent', 'Preferences / Notes'])
    styleHeaderRow(headerRow, 96.75)

    // Data rows
    for (const { officer, profile, requirement, cmd } of rows) {
        const lookLabel = getLookLabel(officer)
        const jpme = profile?.jpme ?? ''
        const wti = profile?.wti ?? ''

        // C1 Name — bold name line, regular JPME/WTI
        const nameParts: ExcelJS.RichText[] = [
            { text: officer.name + (lookLabel ? `\n${lookLabel}` : ''), font: { bold: true, size: 20, name: 'Arial', color: { argb: 'FF000000' } } },
        ]
        if (jpme) nameParts.push({ text: `\n\n${jpme}`, font: { size: 20, name: 'Arial', color: { argb: 'FF000000' } } })
        if (wti) nameParts.push({ text: `\n${wti}`, font: { size: 20, name: 'Arial', color: { argb: 'FF000000' } } })

        // C3 Slate — bold: command + UIC + location
        const slateLine = [
            cmd?.platform || requirement.commandName,
            cmd?.uic ? `(${cmd.uic})` : '',
            cmd?.location || '',
        ].filter(Boolean).join('\n')
        const slateParts: ExcelJS.RichText[] = [
            { text: slateLine, font: { bold: true, size: 20, name: 'Arial', color: { argb: 'FF000000' } } },
        ]

        // C5 Timing — underline for labels
        const availYYMM = toYYMM(profile?.availabilityDate)
        const rptYYMM = toYYMM(requirement.incumbentPrd)
        const timingParts: ExcelJS.RichText[] = []
        if (availYYMM) {
            timingParts.push(
                { text: 'Pipeline\n', font: { underline: true, size: 20, name: 'Arial', color: { argb: 'FF000000' } } },
                { text: String(availYYMM), font: { size: 20, name: 'Arial', color: { argb: 'FF000000' } } },
            )
        }
        if (rptYYMM) {
            timingParts.push(
                { text: '\n\nRPT as XO\n', font: { underline: true, size: 20, name: 'Arial', color: { argb: 'FF000000' } } },
                { text: String(rptYYMM), font: { size: 20, name: 'Arial', color: { argb: 'FF000000' } } },
            )
        }

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
        dataRow.height = 309.6
        dataRow.eachCell({ includeEmpty: true }, (_cell, colNum) => {
            if (colNum <= 7) styleDataCell(_cell)
        })
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// FORMAT B — "CO AFLOAT" / "CO SM"
// C1 Name | C2 Flag Notifier | C3 Current Assign | C4 Intended Slate | C5 Billet History | C6 Incumbent | C7 RPT | C8 IZ O-6 | C9 Notes
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
    const titleRow = ws.addRow([sheetTitle, '', '', '', '', '', '', '', ''])
    ws.mergeCells(`A${titleRow.number}:I${titleRow.number}`)
    styleTitleRow(titleRow, 9)

    // Row 2 — column headers
    const headerRow = ws.addRow(['Name', 'Flag Notifier', 'Current Assignment', 'Intended Slate', 'Billet History', 'Incumbent', 'RPT as XO/CO', 'IZ O-6', 'Notes'])
    styleHeaderRow(headerRow, 53.25)

    // Data rows
    for (const { officer, profile, requirement, cmd } of rows) {
        const lookLabel = getLookLabel(officer)
        const jpme = profile?.jpme ?? ''

        // C1 Name — bold name, regular JPME
        const nameParts: ExcelJS.RichText[] = [
            { text: officer.name + (lookLabel ? `\n${lookLabel}` : ''), font: { bold: true, size: 20, name: 'Arial', color: { argb: 'FF000000' } } },
        ]
        if (jpme) nameParts.push({ text: `\n\n${jpme}`, font: { size: 20, name: 'Arial', color: { argb: 'FF000000' } } })

        // C3 Current assignment from bank
        const currentAssign = [officer.currentCommand, officer.billet].filter(Boolean).join('\n')

        // C4 Intended Slate (bold in reference)
        const commandLine = [
            cmd?.platform || requirement.commandName,
            cmd?.uic ? `(${cmd.uic})` : '',
        ].filter(Boolean).join(' ')
        const fleetUpType = requirement.role === 'CO' ? 'Direct Input CO' : `${requirement.role} Fleet-Up`
        const intendedSlate = `${commandLine}\n${fleetUpType}`

        const notesText = [profile?.notes, formatPreferences(profile)].filter(Boolean).join('\n\n') || ''

        const dataRow = ws.addRow([
            { richText: nameParts },
            formatFlagContact(profile),
            currentAssign,
            intendedSlate,        // C4 — will be bolded below
            formatTourHistory(profile),
            requirement.incumbent ?? '',
            toYYMM(requirement.incumbentPrd),
            '',                   // C8 IZ O-6 — manual
            notesText,
        ])
        dataRow.height = 135
        dataRow.eachCell({ includeEmpty: true }, (cell, colNum) => {
            if (colNum <= 9) {
                // C4 Intended Slate is bold in reference
                styleDataCell(cell, colNum === 4)
            }
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

        const wb = new ExcelJS.Workbook()
        wb.creator = 'PERS-41 Oracle'
        wb.created = new Date()

        const slateName = slate.name.toUpperCase().replace(/^SLATE\s+/i, '')

        buildSheetA(wb.addWorksheet('XO CO AFLOAT'), `SLATE ${slateName} XO CO AFLOAT`, xoAfloat)
        buildSheetB(wb.addWorksheet('CO AFLOAT'), `SLATE ${slateName} CO AFLOAT`, coAfloat)
        buildSheetB(wb.addWorksheet('CO SM'), `SLATE ${slateName} CO SM`, coSm)

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
