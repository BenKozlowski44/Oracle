"use client"

import { OracleCommand } from "@/lib/types"
import { getPipelineHealth, getCurrentActiveSlate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

// ── Slate cycle math ─────────────────────────────────────────────────────────
function slateToNum(code: string): number {
    const m = code.match(/^(\d{2})-(\d)$/)
    if (!m) return 0
    return (2000 + parseInt(m[1])) * 4 + parseInt(m[2])
}

function numToSlate(n: number): string {
    const year = Math.floor((n - 1) / 4)
    const q = ((n - 1) % 4) + 1
    return `${String(year - 2000).padStart(2, '0')}-${q}`
}

function nextSlates(from: string, count: number): string[] {
    const base = slateToNum(from)
    return Array.from({ length: count }, (_, i) => numToSlate(base + i))
}

// ── Who fills this command at a given slate? ──────────────────────────────────
function getCellInfo(cmd: OracleCommand, slate: string): {
    label: string
    detail: string
    status: 'named' | 'upcoming' | 'overdue' | 'gap' | 'ok'
} {
    const slateNum = slateToNum(slate)
    const current = slateToNum(getCurrentActiveSlate())

    // Helper: is this slate the one that fills this slot?
    const targetNum = cmd.nextSlateParams?.targetBoardDate
        ? slateToNum(cmd.nextSlateParams.targetBoardDate)
        : 0

    // Current XO fills until fleet-up
    const currentXOName = cmd.currentXO?.name?.trim()
    // Inbound XO fills after current XO
    const inboundName = cmd.inboundXO?.name?.trim()
    // Slated XO is the next pipeline fill
    const slatedName = cmd.slatedXO?.name?.trim()

    const isPlaceholder = (n?: string) => {
        if (!n) return true
        const lower = n.toLowerCase()
        return ['forecast', 'tbd', 'vacant', 'unknown', 'n/a', 'none', 'open', 'fill', ''].includes(lower)
            || /^\d{2}-\d/.test(n)
    }

    // For the target slate cell — this is where next XO needs to be named
    if (targetNum === slateNum) {
        if (!isPlaceholder(slatedName)) {
            return { label: slatedName!, detail: `Named for ${cmd.nextSlateParams?.requirement}`, status: 'named' }
        }
        if (slateNum <= current) {
            return { label: 'OVERDUE', detail: `${cmd.nextSlateParams?.requirement} slot unfilled — slate passed`, status: 'overdue' }
        }
        return { label: 'NEEDED', detail: `${cmd.nextSlateParams?.requirement} must come from this slate`, status: 'upcoming' }
    }

    // A slate that is before the target — who is currently filling the command?
    if (slateNum < targetNum) {
        if (!isPlaceholder(inboundName)) {
            return { label: inboundName!, detail: 'Inbound XO onboard', status: 'ok' }
        }
        if (!isPlaceholder(currentXOName)) {
            return { label: currentXOName!, detail: 'Current XO onboard', status: 'ok' }
        }
        return { label: '—', detail: 'Covered', status: 'ok' }
    }

    // A future slate beyond the immediate need — future gap if nothing planned
    return { label: '—', detail: 'Future need unknown', status: 'gap' }
}

// ── Component ─────────────────────────────────────────────────────────────────
interface Props {
    oracleData: OracleCommand[]
}

const CELL_CLASSES: Record<string, string> = {
    named: 'bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/30',
    upcoming: 'bg-amber-400/15 text-amber-700 dark:text-amber-400 border-amber-400/40 font-semibold',
    overdue: 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/40 font-semibold',
    ok: 'bg-muted/30 text-muted-foreground',
    gap: 'text-muted-foreground/40',
}

export function PipelineGapsReport({ oracleData }: Props) {
    const [filter, setFilter] = useState<'all' | 'cdr' | 'cosm'>('all')

    const currentSlate = getCurrentActiveSlate()
    const slates = nextSlates(currentSlate, 8) // Show 8 upcoming slate cycles

    const filtered = oracleData.filter(cmd => {
        if (filter === 'cdr') return !cmd.tags?.includes('CO-SM')
        if (filter === 'cosm') return cmd.tags?.includes('CO-SM')
        return true
    }).sort((a, b) => {
        const aNum = a.nextSlateParams?.targetBoardDate ? slateToNum(a.nextSlateParams.targetBoardDate) : 9999
        const bNum = b.nextSlateParams?.targetBoardDate ? slateToNum(b.nextSlateParams.targetBoardDate) : 9999
        return aNum - bNum || a.name.localeCompare(b.name)
    })

    return (
        <div className="space-y-4">
            {/* Filter Bar */}
            <div className="flex gap-2 items-center print:hidden">
                {(['all', 'cdr', 'cosm'] as const).map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${filter === f
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'border-border text-muted-foreground hover:border-primary/50'
                            }`}
                    >
                        {f === 'all' ? 'All Commands' : f === 'cdr' ? 'CDR CMD' : 'CO-SM'}
                    </button>
                ))}
                <span className="ml-auto text-xs text-muted-foreground">{filtered.length} commands · {slates.length} slate cycles shown</span>
            </div>

            {/* Legend */}
            <div className="flex gap-4 text-xs text-muted-foreground print:hidden">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-green-500/20 border border-green-500/40 inline-block" /> Named officer</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-400/20 border border-amber-400/40 inline-block" /> Slate needed</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-500/20 border border-red-500/40 inline-block" /> Overdue</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-muted border border-border inline-block" /> Filled / covered</span>
            </div>

            {/* Grid Table */}
            <div className="overflow-x-auto rounded-md border">
                <table className="w-full text-xs border-collapse">
                    <thead>
                        <tr className="bg-muted/50 border-b">
                            <th className="text-left px-3 py-2 font-semibold sticky left-0 bg-muted/50 min-w-[180px] z-10">Command</th>
                            {slates.map(s => (
                                <th key={s} className={`px-2 py-2 font-semibold text-center whitespace-nowrap min-w-[90px] ${s === currentSlate ? 'bg-primary/10 text-primary' : ''}`}>
                                    {s}
                                    {s === currentSlate && <div className="text-[9px] font-normal text-primary/70">← current</div>}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((cmd, ri) => {
                            const health = getPipelineHealth(cmd)
                            return (
                                <tr key={cmd.id} className={ri % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                                    <td className={`sticky left-0 px-3 py-2 font-medium z-10 border-r ${ri % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}>
                                        <div className="flex items-center gap-1.5">
                                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${health.status === 'green' ? 'bg-green-500'
                                                    : health.status === 'yellow' ? 'bg-amber-400'
                                                        : 'bg-red-500'
                                                }`} />
                                            <span className="truncate max-w-[160px]" title={cmd.name}>{cmd.name}</span>
                                        </div>
                                        <div className="text-[9px] text-muted-foreground ml-3">{cmd.location} · {cmd.tags?.includes('CO-SM') ? 'CO-SM' : 'CDR CMD'}</div>
                                    </td>
                                    {slates.map(s => {
                                        const cell = getCellInfo(cmd, s)
                                        return (
                                            <td
                                                key={s}
                                                title={cell.detail}
                                                className={`px-2 py-2 text-center border-l align-middle ${CELL_CLASSES[cell.status] ?? ''} ${s === currentSlate ? 'border-l-primary/20' : ''}`}
                                            >
                                                <span className="truncate block max-w-[85px] mx-auto leading-tight" title={cell.label}>
                                                    {cell.label}
                                                </span>
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
