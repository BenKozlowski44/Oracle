import * as XLSXStyle from 'xlsx-js-style'
import * as fflate from 'fflate'
import { useState, useRef } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "sonner"
import type { Slate, Officer, OracleCommand } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trash2, Plus, Search, UserPlus, Edit, Upload } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { formatToMMMyy, cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { SlateRequirement, SlateCandidateProfile } from "@/lib/types"
import { CandidateInputForm } from "@/components/slating/candidate-input-form"
import { CandidateProfileView } from "@/components/slating/candidate-profile-view"
import { saveSlate } from "@/services/storage"

interface SlateDetailClientProps {
    id: string
    allSlates: Slate[]
    officers: Officer[]
    oracleData: OracleCommand[]
}

export function SlateDetailClient({ id, allSlates, officers, oracleData }: SlateDetailClientProps) {
    const navigate = useNavigate()
    const slate = allSlates.find(s => s.id === id)

    // Local state
    const [requirements, setRequirements] = useState(slate?.requirements || []);
    const [candidates, setCandidates] = useState<string[]>(slate?.candidates || []);
    const [candidateProfiles, setCandidateProfiles] = useState<SlateCandidateProfile[]>(slate?.candidateProfiles || []);

    // Dialog States
    const [isAddReqDialogOpen, setIsAddReqDialogOpen] = useState(false);
    const [isAddDirectCoDialogOpen, setIsAddDirectCoDialogOpen] = useState(false);
    const [isAddCosmDialogOpen, setIsAddCosmDialogOpen] = useState(false);
    const [isAddCandidateDialogOpen, setIsAddCandidateDialogOpen] = useState(false);
    const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

    // Profile Edit State
    const [editingOfficerId, setEditingOfficerId] = useState<string | null>(null);
    const [viewingOfficerId, setViewingOfficerId] = useState<string | null>(null);

    // Per-candidate upload state
    const [uploadTargetOfficerId, setUploadTargetOfficerId] = useState<string | null>(null);
    const [uploadingOfficerId, setUploadingOfficerId] = useState<string | null>(null);
    const perCandidateFileInputRef = useRef<HTMLInputElement>(null);

    // Selection States
    const [searchQuery, setSearchQuery] = useState("");
    const [directCoSearchQuery, setDirectCoSearchQuery] = useState("");
    const [cosmSearchQuery, setCosmSearchQuery] = useState("");
    const [candidateSearchQuery, setCandidateSearchQuery] = useState("");
    const [candidateTab, setCandidateTab] = useState<"firefighters" | "bank">("firefighters");
    const [selectedReqId, setSelectedReqId] = useState<string | null>(null);
    const [cosmFilter, setCosmFilter] = useState(false); // Toggle to show only CO-SM screened

    if (!slate) {
        return <div className="p-8 text-center text-muted-foreground">Slate not found</div>
    }

    const handleRemoveRequirement = async (reqId: string) => {
        const updatedReqs = requirements.filter(r => r.id !== reqId);
        setRequirements(updatedReqs);
        updateSlateData(updatedReqs, candidates, candidateProfiles);
    }

    const handleAddCommand = async (commandId: string) => {
        const cmd = oracleData.find(c => c.id === commandId);
        if (!cmd) return;

        // If the P-XO (inboundXO) is already named, the CDR CMD hole is at the
        // Slated XO level — use slatedXO.reportDate as the fill date.
        // Otherwise the hole is at the current XO level — use currentXO.prd.
        const inboundHasName = !!cmd.inboundXO?.name &&
            cmd.inboundXO.name !== '' &&
            cmd.inboundXO.name !== 'VACANT'

        const fillDate = inboundHasName
            ? (cmd.slatedXO?.reportDate || cmd.inboundXO?.timelineData?.k || cmd.currentXO?.prd || "")
            : (cmd.currentXO?.prd || "")

        // The "incumbent" is who the slated officer will relieve:
        //   - If P-XO named: they will be XO when the slated officer reports → use inboundXO name
        //   - Otherwise: the current XO is the one being relieved
        const incumbentName = inboundHasName
            ? (cmd.inboundXO?.name || cmd.currentXO?.name || "Unknown")
            : (cmd.currentXO?.name || "Unknown")

        const newReq: SlateRequirement = {
            id: `req-${cmd.id}-xo-${Date.now()}`,
            commandName: cmd.name,
            commandId: cmd.id,
            role: "XO",
            incumbent: incumbentName,
            incumbentPrd: fillDate,
            status: "Draft"
        };

        const updatedReqs = [...requirements, newReq];
        setRequirements(updatedReqs);
        updateSlateData(updatedReqs, candidates, candidateProfiles);
        setIsAddReqDialogOpen(false);
        setSearchQuery("");
    }

    const handleAddDirectCoCommand = async (commandId: string) => {
        const cmd = oracleData.find(c => c.id === commandId);
        if (!cmd) return;

        const newReq: SlateRequirement = {
            id: `req-${cmd.id}-co-${Date.now()}`,
            commandName: cmd.name,
            commandId: cmd.id,
            role: "CO",
            incumbent: cmd.currentCO?.name || "Unknown",
            incumbentPrd: cmd.currentCO?.prd || "",
            status: "Draft"
        };

        const updatedReqs = [...requirements, newReq];
        setRequirements(updatedReqs);
        updateSlateData(updatedReqs, candidates, candidateProfiles);
        setIsAddDirectCoDialogOpen(false);
        setDirectCoSearchQuery("");
    }

    const handleAddCosmCommand = async (commandId: string) => {
        const cmd = oracleData.find(c => c.id === commandId);
        if (!cmd) return;

        const newReq: SlateRequirement = {
            id: `req-${cmd.id}-cosm-${Date.now()}`,
            commandName: cmd.name,
            commandId: cmd.id,
            role: "CO-SM",
            incumbent: cmd.currentCO?.name || cmd.currentXO?.name || "Unknown",
            incumbentPrd: cmd.currentCO?.prd || cmd.currentXO?.prd || "",
            status: "Draft"
        };

        const updatedReqs = [...requirements, newReq];
        setRequirements(updatedReqs);
        updateSlateData(updatedReqs, candidates, candidateProfiles);
        setIsAddCosmDialogOpen(false);
        setCosmSearchQuery("");
    }

    const handleAddCandidate = async (officerId: string) => {
        if (candidates.includes(officerId)) return;

        const updatedCandidates = [...candidates, officerId];
        setCandidates(updatedCandidates);
        updateSlateData(requirements, updatedCandidates, candidateProfiles);
    }

    const handleRemoveCandidate = async (officerId: string) => {
        const updatedCandidates = candidates.filter(id => id !== officerId);
        setCandidates(updatedCandidates);
        updateSlateData(requirements, updatedCandidates, candidateProfiles);
    }

    const handleSaveProfile = (profile: SlateCandidateProfile) => {
        const existingIndex = candidateProfiles.findIndex(p => p.officerId === profile.officerId);
        let updatedProfiles = [...candidateProfiles];

        if (existingIndex >= 0) {
            updatedProfiles[existingIndex] = profile;
        } else {
            updatedProfiles.push(profile);
        }

        setCandidateProfiles(updatedProfiles);
        updateSlateData(requirements, candidates, updatedProfiles);
        setEditingOfficerId(null);
    }

    const openAssignDialog = (reqId: string) => {
        setSelectedReqId(reqId);
        setIsAssignDialogOpen(true);
    }

    const handleAssignCandidate = async (officerId: string | null) => {
        if (!selectedReqId) return;

        const updatedReqs = requirements.map(req => {
            if (req.id === selectedReqId) {
                if (!officerId) return { ...req, status: "Draft" as const, filledBy: undefined };
                return { ...req, status: "Filled" as const, filledBy: officerId };
            }
            return req;
        });

        setRequirements(updatedReqs);
        updateSlateData(updatedReqs, candidates, candidateProfiles);
        setIsAssignDialogOpen(false);
        setSelectedReqId(null);
    }

    const updateSlateData = async (reqs: SlateRequirement[], cands: string[], profiles: SlateCandidateProfile[]) => {
        await persistSlates(reqs, cands, profiles);
    }

    const persistSlates = async (reqs: SlateRequirement[], cands: string[], profiles: SlateCandidateProfile[]) => {
        try {
            const updatedSlate = { ...slate, requirements: reqs, candidates: cands, candidateProfiles: profiles }
            saveSlate(updatedSlate)
        } catch (error) {
            console.error("Failed to update slate:", error);
        }
    }

    const filledCount = requirements.filter(r => r.status === "Filled").length
    const totalCount = requirements.length

    // Split requirements by role
    const xoReqs = requirements.filter(r => r.role === 'XO')
    const directCoReqs = requirements.filter(r => r.role === 'CO')
    const cosmReqs = requirements.filter(r => r.role === 'CO-SM')

    // Search filters
    const availableCommands = oracleData
        .filter(c => !requirements.some(r => r.commandId === c.id))
        .filter(c => c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || (c.uic || "").includes(searchQuery));

    const availableDirectCoCommands = oracleData
        .filter(c => !directCoReqs.some(r => r.commandId === c.id))
        .filter(c => c.name?.toLowerCase().includes(directCoSearchQuery.toLowerCase()) || (c.uic || "").includes(directCoSearchQuery));

    const availableCosmCommands = oracleData
        .filter(c => c.tags?.includes("CO-SM"))
        .filter(c => !cosmReqs.some(r => r.commandId === c.id))
        .filter(c => c.name?.toLowerCase().includes(cosmSearchQuery.toLowerCase()) || (c.uic || "").includes(cosmSearchQuery));

    // Valid candidates from global pool (Bank)
    const firefighterOfficers = officers.filter(o => o.status === 'Ready FF')
    const bankOfficers = officers.filter(o => o.status !== 'Ready FF' && o.status !== 'PCC')

    const filterBySearch = (list: typeof officers) =>
        list.filter(o =>
            o.name?.toLowerCase().includes(candidateSearchQuery.toLowerCase()) ||
            (o.designator || "").includes(candidateSearchQuery)
        )

    const displayedCandidateTab = candidateTab === 'firefighters'
        ? filterBySearch(firefighterOfficers)
        : filterBySearch(bankOfficers)

    // Hydrate candidates for display
    const slateCandidates = candidates
        .map(cid => officers.find(o => o.id === cid))
        .filter((o): o is Officer => !!o);

    const handleDownloadTemplate = () => {
        const TOURS = [
            '1st Division Officer Tour', '2nd Division Officer Tour',
            'Post-Division Officer Tour', '1st Department Head Tour',
            '2nd Department Head Tour', 'Post-Department Head Tour',
        ]
        const OFRP_PHASES = [
            'Maintenance', 'Basic', 'Integrated', 'Sustainment',
            'Deployment Prep', 'Deployed', 'Post-Deployment', 'N/A (Shore/Staff)',
        ]
        const prefOptions = Array.from(new Set(
            (slate.requirements || [])
                .map(req => oracleData.find(c => c.id === req.commandId))
                .filter((c): c is OracleCommand => !!c && !!c.platform && !!c.location)
                .map(cmd => `${cmd.platform} - ${cmd.location}`)
        )).sort()

        const wb = XLSXStyle.utils.book_new()

        // ── Hidden Data sheet (dropdown sources) ────────────────────────────
        const maxLen = Math.max(prefOptions.length, OFRP_PHASES.length)
        const dataAoa: string[][] = Array.from({ length: maxLen }, (_, i) => [prefOptions[i] || '', OFRP_PHASES[i] || ''])
        const wsData = XLSXStyle.utils.aoa_to_sheet(dataAoa)
        XLSXStyle.utils.book_append_sheet(wb, wsData, 'Data')

        // ── Input sheet ──────────────────────────────────────────────────────
        const rows: ({ v: string | number; s?: object } | null)[][] = []
        let r = 1  // 1-indexed row counter to match Excel

        // Style helpers
        const SECTION_STYLE = { fill: { fgColor: { rgb: '1F3864' } }, font: { bold: true, color: { rgb: 'FFFFFF' }, sz: 11 }, alignment: { horizontal: 'left' } }
        const HEADER_STYLE  = { fill: { fgColor: { rgb: 'D9E1F2' } }, font: { bold: true, italic: true, sz: 9 }, alignment: { horizontal: 'left' } }
        const INPUT_STYLE   = { fill: { fgColor: { rgb: 'E6F0FF' } }, border: { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } }, alignment: { horizontal: 'left' }, protection: { locked: false } }
        const LABEL_STYLE   = { font: { sz: 10 }, alignment: { horizontal: 'left' } }

        const cell = (v: string | number, s?: object) => ({ v, s } as any)
        const sectionRow = (title: string) => { rows.push([cell(title, SECTION_STYLE)]); r++ }
        const headerRow = (...labels: string[]) => { rows.push(labels.map(l => cell(l, HEADER_STYLE))); r++ }
        const inputRow  = (cols: number) => { rows.push(Array.from({ length: cols }, () => cell('', INPUT_STYLE))); return r++ }
        const blankRow  = () => { rows.push([null]); r++ }
        const labelRow  = (label: string) => { rows.push([cell(label, LABEL_STYLE)]); r++ }

        // Track validation targets
        const validations: object[] = []
        let prefStartRow = 0, prefEndRow = 0
        const ofrpCells: string[] = []

        // Title
        rows.push([cell(`PERS-41 Candidate Preference Template — ${slate.name}`, { font: { bold: true, sz: 14 } })]); r++
        rows.push([cell(`Slate Window: ${slate.windowStart} — ${slate.windowEnd}`, { font: { italic: true, sz: 10, color: { rgb: '555555' } } })]); r++
        blankRow()

        // ── OFFICER INFORMATION ──────────────────────────────────────────────
        sectionRow('OFFICER INFORMATION')
        headerRow('Full Name', 'Rank', 'Designator', 'Availability Date (XO Pipeline Start)', '')
        inputRow(4)
        blankRow()

        // ── CONTACT INFORMATION ──────────────────────────────────────────────
        sectionRow('CONTACT INFORMATION')
        headerRow('Work Email', 'Home / Personal Email', 'Work Phone', 'Personal Cell', '')
        inputRow(4)
        headerRow('Mailing Address (Street, City, State ZIP)', '', '', '', '')
        inputRow(1) // will be merged later via !merges
        blankRow()

        // ── FLAG NOTIFIER ────────────────────────────────────────────────────
        sectionRow('FLAG NOTIFIER')
        headerRow('Flag Officer Name', 'Relationship / Context', '', '', '')
        inputRow(2)
        blankRow()

        // ── COMMAND PREFERENCES ──────────────────────────────────────────────
        sectionRow(`COMMAND PREFERENCES — Ranked 1–${prefOptions.length || 'N'}`)
        headerRow('Rank', 'Platform — Location (select from dropdown)', '', '', '')
        prefStartRow = r
        for (let i = 0; i < (prefOptions.length || 1); i++) {
            rows.push([cell(`Preference ${i + 1}`, LABEL_STYLE), cell('', INPUT_STYLE)])
            r++
        }
        prefEndRow = r - 1
        blankRow()

        // ── CONSIDERATIONS & NOTES ───────────────────────────────────────────
        sectionRow('CONSIDERATIONS & NOTES')
        labelRow('Amplifying info for Detailer — timing, family, career goals, etc.')
        rows.push([cell('', INPUT_STYLE)]); r++  // large merged input area
        blankRow()

        // ── TOUR HISTORY ─────────────────────────────────────────────────────
        sectionRow('TOUR HISTORY')
        for (const tour of TOURS) {
            rows.push([cell(tour, { font: { bold: true, sz: 10 }, fill: { fgColor: { rgb: 'E8F5E9' } } })]); r++
            headerRow('Ship / Command', 'Platform (DDG/CG/etc.)', 'OFRP Phase (majority)', '', '')
            const ofrpRow = inputRow(3)
            ofrpCells.push(`C${ofrpRow}`)
            headerRow('Months U/W', 'Months Deployed', 'Months stood as OOD', '', '')
            inputRow(3)
            headerRow('# OOD Evolutions', '# CONN Evolutions', '# JOOD Evolutions', '', '')
            inputRow(3)
            blankRow()
        }

        // ── PROFESSIONAL QUALIFICATIONS ──────────────────────────────────────
        sectionRow('PROFESSIONAL QUALIFICATIONS')
        headerRow('Field', 'Value', '', '', '')
        for (const field of ['JPME Completion / Plan', 'WTI Qualification (Type if applicable)']) {
            rows.push([cell(field, LABEL_STYLE), cell('', INPUT_STYLE)]); r++
        }
        blankRow()

        // ── PERSONAL CONSIDERATIONS ──────────────────────────────────────────
        sectionRow('PERSONAL CONSIDERATIONS')
        headerRow('Consideration', 'Notes', '', '', '')
        for (const field of ['Co-Location Request', 'EFM Considerations', 'Education / Pipeline']) {
            rows.push([cell(field, LABEL_STYLE), cell('', INPUT_STYLE)]); r++
        }

        // Build worksheet
        const ws = XLSXStyle.utils.aoa_to_sheet(rows)
        ws['!cols'] = [{ wch: 36 }, { wch: 32 }, { wch: 22 }, { wch: 22 }, { wch: 20 }]

        // Data validation: preference platform dropdown
        if (prefOptions.length > 0) {
            validations.push({
                type: 'list',
                sqref: `B${prefStartRow}:B${prefEndRow}`,
                formulae: [`Data!$A$1:$A$${prefOptions.length}`],
                allowBlank: true,
                showDropDown: false,
            })
        }
        // Data validation: OFRP phase dropdown on each tour row
        for (const sqref of ofrpCells) {
            validations.push({
                type: 'list',
                sqref,
                formulae: [`Data!$B$1:$B$${OFRP_PHASES.length}`],
                allowBlank: true,
                showDropDown: false,
            })
        }
        if (validations.length > 0) (ws as any)['!dataValidations'] = validations

        // Sheet protection — allow selecting locked + unlocked cells
        ;(ws as any)['!protect'] = { sheet: true, password: '', selectLockedCells: true, selectUnlockedCells: true }

        XLSXStyle.utils.book_append_sheet(wb, ws, 'Candidate Input')

        // ── Post-process: inject cell protection into styles.xml ─────────────
        // xlsx-js-style ignores the 'protection' style property at XML level,
        // so we manually patch the generated zip to unlock only blue input cells.
        const arr = XLSXStyle.write(wb, { type: 'array', bookType: 'xlsx' })
        const uint8 = new Uint8Array(arr as number[])
        const files = fflate.unzipSync(uint8) as Record<string, Uint8Array>

        if (files['xl/styles.xml']) {
            let stylesXml = fflate.strFromU8(files['xl/styles.xml'])
            // Find fillId for the blue input color (E6F0FF)
            const fillsSection = (stylesXml.match(/<fills[^>]*>([\s\S]*?)<\/fills>/) || ['', ''])[1]
            const fillParts = fillsSection.split('<fill>').slice(1)
            let blueFillId = -1
            for (let i = 0; i < fillParts.length; i++) {
                if (fillParts[i].includes('FFE6F0FF')) { blueFillId = i; break }
            }
            if (blueFillId >= 0) {
                // Convert self-closing xf with that fillId to include <protection locked="0"/>
                stylesXml = stylesXml.replace(
                    new RegExp(`(<xf [^>]*fillId="${blueFillId}"[^>]*?)\\/>`, 'g'),
                    (_: string, prefix: string) => `${prefix} applyProtection="1"><protection locked="0"/></xf>`
                )
            }
            files['xl/styles.xml'] = fflate.strToU8(stylesXml)
        }

        // Re-zip and trigger download
        const patched = fflate.zipSync(files as fflate.Zippable, { level: 6 })
        // fflate returns Uint8Array<ArrayBufferLike>; slice() to get plain ArrayBuffer for Blob
        const patchedBuf = patched.buffer.slice(patched.byteOffset, patched.byteOffset + patched.byteLength) as ArrayBuffer
        const blob = new Blob([patchedBuf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${slate.name.replace(/\s+/g, '_')}_candidate_template.xlsx`
        document.body.appendChild(link); link.click()
        document.body.removeChild(link); URL.revokeObjectURL(url)
    }

    const handleDownloadCoSmTemplate = () => {
        const TOURS = [
            '1st Division Officer Tour', '2nd Division Officer Tour',
            'Post-Division Officer Tour', '1st Department Head Tour',
            '2nd Department Head Tour', 'Post-Department Head Tour',
        ]
        const OFRP_PHASES = [
            'Maintenance', 'Basic', 'Integrated', 'Sustainment',
            'Deployment Prep', 'Deployed', 'Post-Deployment', 'N/A (Shore/Staff)',
        ]

        // CO-SM pref options = the CO-SM command names on this slate
        const prefOptions = Array.from(new Set(
            (slate.requirements || [])
                .filter(req => req.role === 'CO-SM')
                .map(req => req.commandName || oracleData.find(c => c.id === req.commandId)?.name || '')
                .filter(Boolean)
        )).sort()

        const wb = XLSXStyle.utils.book_new()

        // Hidden Data sheet for dropdowns
        const maxLen = Math.max(prefOptions.length, OFRP_PHASES.length)
        const dataAoa: string[][] = Array.from({ length: maxLen }, (_, i) => [prefOptions[i] || '', OFRP_PHASES[i] || ''])
        XLSXStyle.utils.book_append_sheet(wb, XLSXStyle.utils.aoa_to_sheet(dataAoa), 'Data')

        const rows: ({ v: string | number; s?: object } | null)[][] = []
        let r = 1

        const SECTION_STYLE = { fill: { fgColor: { rgb: '1F3864' } }, font: { bold: true, color: { rgb: 'FFFFFF' }, sz: 11 }, alignment: { horizontal: 'left' } }
        const HEADER_STYLE  = { fill: { fgColor: { rgb: 'D9E1F2' } }, font: { bold: true, italic: true, sz: 9 }, alignment: { horizontal: 'left' } }
        const INPUT_STYLE   = { fill: { fgColor: { rgb: 'E6F0FF' } }, border: { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } }, alignment: { horizontal: 'left' } }
        const LABEL_STYLE   = { font: { sz: 10 }, alignment: { horizontal: 'left' } }

        const cell = (v: string | number, s?: object) => ({ v, s } as any)
        const sectionRow = (title: string) => { rows.push([cell(title, SECTION_STYLE)]); r++ }
        const headerRow = (...labels: string[]) => { rows.push(labels.map(l => cell(l, HEADER_STYLE))); r++ }
        const inputRow  = (cols: number) => { rows.push(Array.from({ length: cols }, () => cell('', INPUT_STYLE))); return r++ }
        const blankRow  = () => { rows.push([null]); r++ }
        const labelRow  = (label: string) => { rows.push([cell(label, LABEL_STYLE)]); r++ }

        const validations: object[] = []
        let prefStartRow = 0, prefEndRow = 0
        const ofrpCells: string[] = []

        // Title
        rows.push([cell('PERS-41 CO-SM Candidate Preference Template — ' + slate.name, { font: { bold: true, sz: 14 } })]); r++
        rows.push([cell('Slate Window: ' + slate.windowStart + ' — ' + slate.windowEnd, { font: { italic: true, sz: 10, color: { rgb: '555555' } } })]); r++
        blankRow()

        sectionRow('OFFICER INFORMATION')
        headerRow('Full Name', 'Rank', 'Designator', 'Availability Date (CO-SM Pipeline Start)', '')
        inputRow(4); blankRow()

        sectionRow('CONTACT INFORMATION')
        headerRow('Work Email', 'Home / Personal Email', 'Work Phone', 'Personal Cell', '')
        inputRow(4)
        headerRow('Mailing Address (Street, City, State ZIP)', '', '', '', '')
        inputRow(1); blankRow()

        sectionRow('FLAG NOTIFIER')
        headerRow('Flag Officer Name', 'Relationship / Context', '', '', '')
        inputRow(2); blankRow()

        // CO-SM Command Preferences
        sectionRow('CO-SM COMMAND PREFERENCES — Ranked 1–' + (prefOptions.length || 'N'))
        headerRow('Rank', 'CO-SM Command (select from dropdown)', '', '', '')
        prefStartRow = r
        for (let i = 0; i < (prefOptions.length || 1); i++) {
            rows.push([cell('Preference ' + (i + 1), LABEL_STYLE), cell('', INPUT_STYLE)])
            r++
        }
        prefEndRow = r - 1; blankRow()

        sectionRow('CONSIDERATIONS & NOTES')
        labelRow('Amplifying info for Detailer — timing, family, career goals, etc.')
        rows.push([cell('', INPUT_STYLE)]); r++; blankRow()

        sectionRow('TOUR HISTORY')
        for (const tour of TOURS) {
            rows.push([cell(tour, { font: { bold: true, sz: 10 }, fill: { fgColor: { rgb: 'E8F5E9' } } })]); r++
            headerRow('Ship / Command', 'Platform (DDG/CG/etc.)', 'OFRP Phase (majority)', '', '')
            const ofrpRow = inputRow(3); ofrpCells.push('C' + ofrpRow)
            headerRow('Months U/W', 'Months Deployed', 'Months stood as OOD', '', '')
            inputRow(3)
            headerRow('# OOD Evolutions', '# CONN Evolutions', '# JOOD Evolutions', '', '')
            inputRow(3); blankRow()
        }

        sectionRow('PROFESSIONAL QUALIFICATIONS')
        headerRow('Field', 'Value', '', '', '')
        for (const f of ['JPME Completion / Plan', 'WTI Qualification (Type if applicable)']) {
            rows.push([cell(f, LABEL_STYLE), cell('', INPUT_STYLE)]); r++
        }
        blankRow()

        sectionRow('PERSONAL CONSIDERATIONS')
        headerRow('Consideration', 'Notes', '', '', '')
        for (const f of ['Co-Location Request', 'EFM Considerations', 'Education / Pipeline']) {
            rows.push([cell(f, LABEL_STYLE), cell('', INPUT_STYLE)]); r++
        }

        const ws = XLSXStyle.utils.aoa_to_sheet(rows)
        ws['!cols'] = [{ wch: 36 }, { wch: 32 }, { wch: 22 }, { wch: 22 }, { wch: 20 }]

        if (prefOptions.length > 0) {
            validations.push({ type: 'list', sqref: 'B' + prefStartRow + ':B' + prefEndRow,
                formulae: ['Data!$A$1:$A$' + prefOptions.length], allowBlank: true, showDropDown: false })
        }
        for (const sqref of ofrpCells) {
            validations.push({ type: 'list', sqref,
                formulae: ['Data!$B$1:$B$' + OFRP_PHASES.length], allowBlank: true, showDropDown: false })
        }
        if (validations.length > 0) (ws as any)['!dataValidations'] = validations
        XLSXStyle.utils.book_append_sheet(wb, ws, 'Candidate Input')

        const arr = XLSXStyle.write(wb, { type: 'array', bookType: 'xlsx' })
        const blob = new Blob([arr as BlobPart], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = slate.name.split(' ').join('_') + '_cosm_template.xlsx'
        document.body.appendChild(link); link.click()
        document.body.removeChild(link); URL.revokeObjectURL(url)
    }

    const handleFileUpload = async (_e: React.ChangeEvent<HTMLInputElement>) => {
        toast.info("Bulk profile import is not available in the standalone HTML version. Use the manual candidate input form instead.");
    }

    const handlePerCandidateUpload = async (_e: React.ChangeEvent<HTMLInputElement>) => {
        toast.info("Per-candidate file import is not available in the standalone HTML version. Use the manual candidate input form instead.");
        setUploadingOfficerId(null);
        setUploadTargetOfficerId(null);
        if (perCandidateFileInputRef.current) perCandidateFileInputRef.current.value = '';
    }


    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/slates">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{slate.name}</h1>
                    <p className="text-muted-foreground">
                        Fill Window: {formatToMMMyy(slate.windowStart)} - {formatToMMMyy(slate.windowEnd)}
                    </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <div className="flex gap-2 mr-4 border-r pr-4">
                        <Button variant="outline" size="sm" onClick={handleDownloadTemplate}>
                            CDR CMD Template
                        </Button>
                        {cosmReqs.length > 0 && (
                            <Button variant="outline" size="sm" onClick={handleDownloadCoSmTemplate}
                                className="border-[#c9a227]/40 text-[#c9a227] hover:bg-[#c9a227]/10">
                                CO-SM Template
                            </Button>
                        )}
                    </div>
                    <Link to={`/slates/${id}/alignment`}>
                        <Button variant="outline">Alignment Matrix</Button>
                    </Link>
                    <Link to={`/slates/${id}/brief`}>
                        <Button variant="outline">Detailer Slate</Button>
                    </Link>
                    <Badge variant="outline" className="text-sm px-3 py-1">
                        {filledCount} / {totalCount} Requirements Filled
                    </Badge>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Main Requirements Table */}
                <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Requirements</CardTitle>
                        <Dialog open={isAddReqDialogOpen} onOpenChange={setIsAddReqDialogOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Requirement
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]" aria-describedby={undefined}>
                                <DialogHeader>
                                    <DialogTitle>Add Command to Slate</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="relative">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search commands..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto border rounded-md">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Command</TableHead>
                                                    <TableHead>Current XO</TableHead>
                                                    <TableHead></TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {availableCommands.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                                                            No commands found.
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    availableCommands.slice(0, 50).map((cmd) => (
                                                        <TableRow key={cmd.id}>
                                                            <TableCell className="font-medium">
                                                                <div>{cmd.name}</div>
                                                                <div className="text-xs text-muted-foreground">{cmd.uic}</div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="text-sm">{cmd.currentXO?.name}</div>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <Button size="sm" variant="ghost" onClick={() => handleAddCommand(cmd.id)}>
                                                                    Add
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* ── Shared renderReqTable ────────────────────────────────── */}
                        {(() => {
                            const renderReqTable = (reqs: SlateRequirement[], title: string) => (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">{title}</h3>
                                        <Badge variant="secondary" className="text-xs">
                                            {reqs.length} Commands
                                        </Badge>
                                    </div>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Command</TableHead>
                                                <TableHead>Incumbent</TableHead>
                                                <TableHead>Rotate Date</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {reqs.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                                        No {title.toLowerCase()} in this slate.
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                reqs.map((req) => {
                                                    const filledOfficer = req.filledBy ? officers.find(o => o.id === req.filledBy) : null;
                                                    return (
                                                        <TableRow key={req.id}>
                                                            <TableCell className="font-medium">
                                                                <div>{req.commandName}</div>
                                                                {(() => {
                                                                    const cmd = oracleData.find(c => c.id === req.commandId);
                                                                    if (!cmd) return <div className="text-xs text-muted-foreground font-normal">{req.role}</div>;
                                                                    const tags = cmd.tags ? cmd.tags.filter(t => t !== "CO-SM" && t !== "CDR CMD").join(", ") : "";
                                                                    const locationInfo = [cmd.uic, cmd.location, tags].filter(Boolean).join(" • ");
                                                                    let roleDetails = `Role: ${req.role}`;
                                                                    if (cmd.tags?.includes("CO-SM") || title === "CO-SM") {
                                                                        const style = cmd.rotationStyle === "DirectCO" ? "Direct Input CO" : "Fleet Up CO";
                                                                        const length = cmd.tourLength ? `${cmd.tourLength} mos` : "";
                                                                        roleDetails += ` (${style} ${length}`.trim() + `)`;
                                                                    }
                                                                    if (cmd.notes) roleDetails += ` • ${cmd.notes}`;
                                                                    return (
                                                                        <div className="mt-1 space-y-0.5">
                                                                            {locationInfo && <div className="text-[11px] text-muted-foreground font-normal leading-tight">{locationInfo}</div>}
                                                                            <div className="text-xs text-muted-foreground font-normal leading-tight">{roleDetails}</div>
                                                                        </div>
                                                                    );
                                                                })()}
                                                            </TableCell>
                                                            <TableCell>{req.incumbent}</TableCell>
                                                            <TableCell>{formatToMMMyy(req.incumbentPrd)}</TableCell>
                                                            <TableCell>
                                                                {filledOfficer ? (
                                                                    <div className="flex flex-col">
                                                                        <Badge variant="default">Filled</Badge>
                                                                        <span className="text-xs mt-1 text-muted-foreground">{filledOfficer.name}</span>
                                                                    </div>
                                                                ) : (
                                                                    <Badge variant="secondary">Open</Badge>
                                                                )}
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <div className="flex justify-end gap-2">
                                                                    <Button
                                                                        size="sm"
                                                                        variant={req.status === "Filled" ? "outline" : "default"}
                                                                        onClick={() => openAssignDialog(req.id)}
                                                                    >
                                                                        {req.status === "Filled" ? "Edit" : "Assign"}
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="ghost"
                                                                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                                                        onClick={() => handleRemoveRequirement(req.id)}
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            );

                            return (
                                <>
                                    {/* ── CDR CMD ───────────────────────────── */}
                                    {renderReqTable(xoReqs, "CDR CMD")}

                                    {/* ── Direct CO Input ───────────────────── */}
                                    <div className="space-y-4 pt-2 border-t">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold">Direct CO Input</h3>
                                                <p className="text-xs text-muted-foreground">Officers appointed directly as CO (no fleet-up)</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className="text-xs">{directCoReqs.length} Commands</Badge>
                                                {/* Add Direct CO dialog */}
                                                <Dialog open={isAddDirectCoDialogOpen} onOpenChange={setIsAddDirectCoDialogOpen}>
                                                    <DialogTrigger asChild>
                                                        <Button size="sm" variant="outline">
                                                            <Plus className="mr-2 h-4 w-4" />
                                                            Add Direct CO
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[600px]" aria-describedby={undefined}>
                                                        <DialogHeader>
                                                            <DialogTitle>Add Direct CO Command</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="relative">
                                                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                                <Input
                                                                    placeholder="Search commands..."
                                                                    value={directCoSearchQuery}
                                                                    onChange={(e) => setDirectCoSearchQuery(e.target.value)}
                                                                    className="pl-8"
                                                                />
                                                            </div>
                                                            <div className="max-h-[300px] overflow-y-auto border rounded-md">
                                                                <Table>
                                                                    <TableHeader>
                                                                        <TableRow>
                                                                            <TableHead>Command</TableHead>
                                                                            <TableHead>Current CO</TableHead>
                                                                            <TableHead></TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        {availableDirectCoCommands.length === 0 ? (
                                                                            <TableRow>
                                                                                <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                                                                                    No commands found.
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        ) : (
                                                                            availableDirectCoCommands.slice(0, 50).map((cmd) => (
                                                                                <TableRow key={cmd.id}>
                                                                                    <TableCell className="font-medium">
                                                                                        <div>{cmd.name}</div>
                                                                                        <div className="text-xs text-muted-foreground">{cmd.uic}</div>
                                                                                    </TableCell>
                                                                                    <TableCell>
                                                                                        <div className="text-sm">{cmd.currentCO?.name}</div>
                                                                                    </TableCell>
                                                                                    <TableCell className="text-right">
                                                                                        <Button size="sm" variant="ghost" onClick={() => handleAddDirectCoCommand(cmd.id)}>
                                                                                            Add
                                                                                        </Button>
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            ))
                                                                        )}
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Command</TableHead>
                                                    <TableHead>Current CO</TableHead>
                                                    <TableHead>Rotate Date</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead className="text-right">Action</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {directCoReqs.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="h-16 text-center text-muted-foreground">
                                                            No direct CO inputs added.
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    directCoReqs.map((req) => {
                                                        const filledOfficer = req.filledBy ? officers.find(o => o.id === req.filledBy) : null;
                                                        const cmd = oracleData.find(c => c.id === req.commandId);
                                                        const locationInfo = cmd ? [cmd.uic, cmd.location].filter(Boolean).join(" • ") : "";
                                                        return (
                                                            <TableRow key={req.id}>
                                                                <TableCell className="font-medium">
                                                                    <div>{req.commandName}</div>
                                                                    {locationInfo && <div className="text-[11px] text-muted-foreground">{locationInfo}</div>}
                                                                </TableCell>
                                                                <TableCell>{req.incumbent}</TableCell>
                                                                <TableCell>{formatToMMMyy(req.incumbentPrd)}</TableCell>
                                                                <TableCell>
                                                                    {filledOfficer ? (
                                                                        <div className="flex flex-col">
                                                                            <Badge variant="default">Filled</Badge>
                                                                            <span className="text-xs mt-1 text-muted-foreground">{filledOfficer.name}</span>
                                                                        </div>
                                                                    ) : (
                                                                        <Badge variant="secondary">Open</Badge>
                                                                    )}
                                                                </TableCell>
                                                                <TableCell className="text-right">
                                                                    <div className="flex justify-end gap-2">
                                                                        <Button
                                                                            size="sm"
                                                                            variant={req.status === "Filled" ? "outline" : "default"}
                                                                            onClick={() => openAssignDialog(req.id)}
                                                                        >
                                                                            {req.status === "Filled" ? "Edit" : "Assign"}
                                                                        </Button>
                                                                        <Button
                                                                            size="sm"
                                                                            variant="ghost"
                                                                            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                                                            onClick={() => handleRemoveRequirement(req.id)}
                                                                        >
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    {/* ── CO-SM ─────────────────────────────── */}
                                    <div className="pt-2 border-t space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold">CO-SM</h3>
                                                <p className="text-xs text-muted-foreground">Special Mission commands (CO-SM screened officers)</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className="text-xs">{cosmReqs.length} Commands</Badge>
                                                <Dialog open={isAddCosmDialogOpen} onOpenChange={setIsAddCosmDialogOpen}>
                                                    <DialogTrigger asChild>
                                                        <Button size="sm" variant="outline">
                                                            <Plus className="mr-2 h-4 w-4" />
                                                            Add CO-SM
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[600px]" aria-describedby={undefined}>
                                                        <DialogHeader>
                                                            <DialogTitle>Add CO-SM Command</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="relative">
                                                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                                <Input
                                                                    placeholder="Search CO-SM commands..."
                                                                    value={cosmSearchQuery}
                                                                    onChange={(e) => setCosmSearchQuery(e.target.value)}
                                                                    className="pl-8"
                                                                />
                                                            </div>
                                                            <div className="max-h-[300px] overflow-y-auto border rounded-md">
                                                                <Table>
                                                                    <TableHeader>
                                                                        <TableRow>
                                                                            <TableHead>Command</TableHead>
                                                                            <TableHead>Current CO/XO</TableHead>
                                                                            <TableHead></TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        {availableCosmCommands.length === 0 ? (
                                                                            <TableRow>
                                                                                <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                                                                                    No CO-SM commands found.
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        ) : (
                                                                            availableCosmCommands.slice(0, 50).map((cmd) => (
                                                                                <TableRow key={cmd.id}>
                                                                                    <TableCell className="font-medium">
                                                                                        <div>{cmd.name}</div>
                                                                                        <div className="text-xs text-muted-foreground">{cmd.uic} • {cmd.location}</div>
                                                                                    </TableCell>
                                                                                    <TableCell>
                                                                                        <div className="text-sm">{cmd.currentCO?.name || cmd.currentXO?.name}</div>
                                                                                    </TableCell>
                                                                                    <TableCell className="text-right">
                                                                                        <Button size="sm" variant="ghost" onClick={() => handleAddCosmCommand(cmd.id)}>
                                                                                            Add
                                                                                        </Button>
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            ))
                                                                        )}
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                        {renderReqTable(cosmReqs, "CO-SM")}
                                    </div>
                                </>
                            );
                        })()}
                    </CardContent>

                </Card>

                {/* Candidates / Bench Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between padding-bottom-2">
                        <div className="space-y-1">
                            <CardTitle>Candidates</CardTitle>
                            <CardDescription>Available Pool</CardDescription>
                        </div>
                        <Dialog open={isAddCandidateDialogOpen} onOpenChange={setIsAddCandidateDialogOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                    <UserPlus className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]" aria-describedby={undefined}>
                                <DialogHeader>
                                    <DialogTitle>Manage Candidates</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="relative">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search officers..."
                                            value={candidateSearchQuery}
                                            onChange={(e) => setCandidateSearchQuery(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                    {/* Tabs */}
                                    <div className="flex gap-1 border-b pb-2">
                                        <button
                                            className={`px-3 py-1 text-sm rounded-t font-medium transition-colors ${candidateTab === 'firefighters' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                            onClick={() => setCandidateTab('firefighters')}
                                        >
                                            Firefighters ({firefighterOfficers.length})
                                        </button>
                                        <button
                                            className={`px-3 py-1 text-sm rounded-t font-medium transition-colors ${candidateTab === 'bank' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                            onClick={() => setCandidateTab('bank')}
                                        >
                                            Officer Bank ({bankOfficers.length})
                                        </button>
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto border rounded-md">
                                        <Table>
                                            <TableBody>
                                                {displayedCandidateTab.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell className="text-center h-24 text-muted-foreground">
                                                            No matching officers found.
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    displayedCandidateTab.map((officer: Officer) => {
                                                        const isAdded = candidates.includes(officer.id);
                                                        return (
                                                            <TableRow key={officer.id}>
                                                                <TableCell>
                                                                    <div>
                                                                        <div className="font-medium">
                                                                            {officer.name}
                                                                            {officer.screened?.includes("CO-SM") && (
                                                                                <Badge variant="secondary" className="ml-2 text-[10px] px-1 h-5">CO-SM</Badge>
                                                                            )}
                                                                        </div>
                                                                        <div className="text-sm text-muted-foreground">
                                                                            {officer.rank} • {officer.designator} • PRD: {formatToMMMyy(officer.prd)}
                                                                        </div>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell className="text-right">
                                                                    <Button
                                                                        size="sm"
                                                                        variant={isAdded ? "destructive" : "ghost"}
                                                                        onClick={() => isAdded ? handleRemoveCandidate(officer.id) : handleAddCandidate(officer.id)}
                                                                    >
                                                                        {isAdded ? "Remove" : "Add"}
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {slateCandidates.length === 0 ? (
                                <div className="text-center py-8 text-sm text-muted-foreground border border-dashed rounded-md">
                                    No candidates added.
                                    <br />
                                    Click + to add from Bank.
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {slateCandidates.map(c => {
                                        const profile = candidateProfiles.find(p => p.officerId === c.id);
                                        const hasProfile = !!profile;

                                        // Profile completeness scoring (6 sections)
                                        const completenessChecks = profile ? [
                                            {
                                                label: 'Contact Info',
                                                done: !!(profile.contactInfo?.workEmail || profile.contactInfo?.personalPhone)
                                            },
                                            {
                                                label: 'Flag Notifier',
                                                done: !!profile.flagContact?.name
                                            },
                                            {
                                                label: 'Command Preferences',
                                                done: profile.preferences.length > 0
                                            },
                                            {
                                                label: 'Tour History',
                                                done: !!(profile.tourHistory?.some(t => t.ship))
                                            },
                                            {
                                                label: 'JPME / WTI',
                                                done: !!(profile.jpme || profile.wti)
                                            },
                                            {
                                                label: 'Availability Date',
                                                done: !!profile.availabilityDate
                                            },
                                        ] : [];
                                        const completedCount = completenessChecks.filter(c => c.done).length;
                                        const totalCount = completenessChecks.length;
                                        const missingLabels = completenessChecks.filter(c => !c.done).map(c => c.label);
                                        const completenessColor = totalCount === 0 ? '' :
                                            completedCount === totalCount ? 'bg-green-100 text-green-800 border-green-200' :
                                                completedCount >= 4 ? 'bg-amber-100 text-amber-800 border-amber-200' :
                                                    'bg-rose-100 text-rose-800 border-rose-200';

                                        // Check if candidate is assigned to any requirement in this slate
                                        const assignedReq = requirements.find(r => r.filledBy === c.id);
                                        const isAssigned = !!assignedReq;

                                        return (
                                            <div key={c.id} className={cn("flex items-center justify-between p-2 border rounded-md group transition-all", isAssigned ? "bg-muted/10 opacity-60" : "bg-muted/40")}>
                                                <div>
                                                    <button
                                                        className="font-medium text-sm flex items-center gap-2 hover:underline cursor-pointer text-left"
                                                        onClick={() => setViewingOfficerId(c.id)}
                                                    >
                                                        {c.name}
                                                        {hasProfile && (
                                                            <Badge
                                                                variant="outline"
                                                                className={`text-[10px] h-5 px-1.5 border ${completenessColor}`}
                                                                title={missingLabels.length > 0 ? `Missing: ${missingLabels.join(', ')}` : 'Profile complete'}
                                                            >
                                                                {completedCount}/{totalCount}
                                                            </Badge>
                                                        )}
                                                        {isAssigned && <Badge variant="default" className="text-[10px] h-5 px-1">Slated</Badge>}
                                                    </button>
                                                    <div className="text-xs text-muted-foreground">
                                                        {c.rank} • {c.designator}
                                                        {isAssigned && assignedReq && <span className="ml-1 text-primary/80">• Assigned: {assignedReq.commandName}</span>}
                                                    </div>
                                                </div>
                                                <div className="flex gap-1">
                                                    {/* Per-candidate upload icon */}
                                                    <Button
                                                        variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground"
                                                        title="Upload Completed Form"
                                                        disabled={uploadingOfficerId === c.id}
                                                        onClick={() => {
                                                            setUploadTargetOfficerId(c.id);
                                                            perCandidateFileInputRef.current?.click();
                                                        }}
                                                    >
                                                        <Upload className={`h-3 w-3 ${uploadingOfficerId === c.id ? 'animate-pulse text-primary' : ''}`} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground"
                                                        onClick={() => setViewingOfficerId(c.id)}
                                                        title="View Profile"
                                                    >
                                                        <Edit className="h-3 w-3" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                                        onClick={() => handleRemoveCandidate(c.id)}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Candidate Profile Dialog */}
            <Dialog open={!!editingOfficerId} onOpenChange={(open) => !open && setEditingOfficerId(null)}>
                <DialogContent className="sm:max-w-2xl" aria-describedby={undefined}>
                    {editingOfficerId && (() => {
                        const officer = officers.find(o => o.id === editingOfficerId);
                        if (!officer) return null;
                        const profile = candidateProfiles.find(p => p.officerId === editingOfficerId);
                        // Get commands associated with this slate to pick from
                        const slateCommands = requirements.map(r => oracleData.find(od => od.id === r.commandId)).filter(Boolean) as any[];

                        return (
                            <CandidateInputForm
                                slateId={slate.id}
                                officer={officer}
                                commands={slateCommands}
                                initialProfile={profile}
                                onSave={handleSaveProfile}
                                onCancel={() => setEditingOfficerId(null)}
                            />
                        )
                    })()}
                </DialogContent>
            </Dialog>

            {/* Assign Dialog */}
            <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
                <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>Assign Candidate</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        {(() => {
                            // Filter candidates based on requirement type
                            let assignableCandidates = slateCandidates;
                            const targetReq = requirements.find(r => r.id === selectedReqId);

                            if (targetReq) {
                                const cmd = oracleData.find(c => c.id === targetReq.commandId);
                                const isCosmCommand = cmd?.tags?.includes("CO-SM");

                                if (!isCosmCommand) {
                                    // For Standard Commands, EXCLUDE CO-SM screened officers
                                    assignableCandidates = assignableCandidates.filter(c => !c.screened?.includes("CO-SM"));
                                }
                            }

                            // EXCLUDE candidates already assigned to another command
                            assignableCandidates = assignableCandidates.filter(c => {
                                const assignedReq = requirements.find(r => r.filledBy === c.id);
                                return !assignedReq || assignedReq.id === selectedReqId;
                            });

                            if (assignableCandidates.length === 0 && targetReq?.status !== "Filled") {
                                return (
                                    <div className="text-center text-muted-foreground">
                                        No eligible candidates in pool.
                                        {slateCandidates.length > 0 && <div className="text-xs mt-1">(CO-SM or Already Assigned restrictions apply)</div>}
                                    </div>
                                )
                            }

                            return (
                                <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-2">
                                    {targetReq?.status === "Filled" && (
                                        <Button
                                            variant="destructive"
                                            className="justify-start h-auto py-3"
                                            onClick={() => handleAssignCandidate(null)}
                                        >
                                            <div className="text-left font-medium">Unassign Current Officer</div>
                                        </Button>
                                    )}
                                    {assignableCandidates.map(c => (
                                        <Button
                                            key={c.id}
                                            variant="outline"
                                            className="justify-start h-auto py-3"
                                            onClick={() => handleAssignCandidate(c.id)}
                                        >
                                            <div className="text-left">
                                                <div className="font-medium">
                                                    {c.name}
                                                    {c.screened?.includes("CO-SM") && (
                                                        <Badge variant="secondary" className="ml-2 text-[10px] px-1 h-5">CO-SM</Badge>
                                                    )}
                                                </div>
                                                <div className="text-xs text-muted-foreground">{c.rank} • {c.designator}</div>
                                            </div>
                                        </Button>
                                    ))}
                                </div>
                            );
                        })()}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Hidden shared file input for per-candidate upload */}
            <input
                ref={perCandidateFileInputRef}
                type="file"
                accept=".xlsx"
                className="hidden"
                onChange={handlePerCandidateUpload}
            />

            {/* Candidate Profile Viewer */}
            {
                viewingOfficerId && (() => {
                    const officer = officers.find(o => o.id === viewingOfficerId);
                    const profile = candidateProfiles.find(p => p.officerId === viewingOfficerId);
                    if (!officer) return null;
                    return (
                        <CandidateProfileView
                            officer={officer}
                            profile={profile ?? {
                                id: '',
                                slateId: slate.id,
                                officerId: viewingOfficerId,
                                preferences: [],
                            }}
                            open={!!viewingOfficerId}
                            onClose={() => setViewingOfficerId(null)}
                            onSave={handleSaveProfile}
                        />
                    );
                })()
            }
        </div >
    )
}
