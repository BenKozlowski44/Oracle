import { useState, useEffect, useCallback } from 'react'
import { Wifi, WifiOff, Clock, Database } from 'lucide-react'
import { getBackupStatus, chooseBackupFile } from '@/services/storage'
import type { BackupStatus } from '@/services/storage'

declare const __BUILD_DATE__: string

function formatTime(iso: string | null): string {
    if (!iso) return 'Never'
    const d = new Date(iso)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function HudBar() {
    const [status, setStatus] = useState<BackupStatus>(getBackupStatus)
    const [connecting, setConnecting] = useState(false)

    const refresh = useCallback(() => setStatus(getBackupStatus()), [])

    useEffect(() => {
        // Poll every 20 s so the "last saved" clock stays fresh
        const id = setInterval(refresh, 20_000)
        // Also pick up auto-backup writes from other tabs or autoBackup interval
        window.addEventListener('storage', refresh)
        return () => { clearInterval(id); window.removeEventListener('storage', refresh) }
    }, [refresh])

    const handleConnect = async () => {
        setConnecting(true)
        try {
            await chooseBackupFile()
            refresh()
        } finally {
            setConnecting(false)
        }
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-1.5
                        bg-[#020a14]/95 border-t border-[#c9a227]/20 backdrop-blur-sm
                        text-[10px] font-mono tracking-wide select-none">

            {/* Gold top hairline (mirrors the nav bar accent) */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent pointer-events-none" />

            {/* ── LEFT: Backup status ───────────────────────────────── */}
            <div className="flex items-center gap-2.5 min-w-[220px]">
                {status.handleActive ? (
                    <>
                        {/* Pulsing green dot */}
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                        </span>
                        <span className="text-emerald-400 uppercase tracking-widest">Backup Connected</span>
                        <span className="text-[#4a5a6a]">·</span>
                        <span className="flex items-center gap-1 text-[#8a9bb0]">
                            <Clock className="h-2.5 w-2.5" />
                            {formatTime(status.lastBackupAt)}
                        </span>
                    </>
                ) : (
                    <>
                        {/* Static red dot */}
                        <span className="relative flex h-2 w-2">
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
                        </span>
                        <span className="text-rose-400 uppercase tracking-widest">
                            {status.everGranted ? 'Backup Disconnected' : 'No Backup'}
                        </span>
                        <button
                            onClick={handleConnect}
                            disabled={connecting}
                            className="ml-1 px-2 py-0.5 rounded border border-[#c9a227]/50 text-[#c9a227]
                                       hover:bg-[#c9a227]/10 active:bg-[#c9a227]/20 transition-colors
                                       text-[9px] tracking-widest uppercase font-semibold disabled:opacity-50"
                        >
                            {connecting ? 'Connecting…' : status.everGranted ? 'Reconnect' : 'Set Up'}
                        </button>
                    </>
                )}
            </div>

            {/* ── CENTER: App identity ──────────────────────────────── */}
            <div className="text-[#c9a227]/40 tracking-[0.25em] uppercase text-[9px] font-semibold">
                Oracle · CDR CMD Management
            </div>

            {/* ── RIGHT: Build info ─────────────────────────────────── */}
            <div className="flex items-center gap-2 text-[#4a5a6a] min-w-[220px] justify-end">
                <Database className="h-2.5 w-2.5" />
                <span>Build {__BUILD_DATE__}</span>
            </div>
        </div>
    )
}
