"use client"

import { useEffect, useState } from "react"
import { WifiOff } from "lucide-react"

/**
 * Polls the health endpoint every 30 seconds.
 * Shows a sticky warning banner when the API is unreachable so the user
 * knows saves won't persist before they lose work.
 */
export function ServerStatusBanner() {
    const [offline, setOffline] = useState(false)
    const [checking, setChecking] = useState(true)

    const check = async () => {
        try {
            const res = await fetch("/api/health", { method: "GET", cache: "no-store" })
            setOffline(!res.ok)
        } catch {
            setOffline(true)
        } finally {
            setChecking(false)
        }
    }

    useEffect(() => {
        check()
        const id = setInterval(check, 30_000)
        return () => clearInterval(id)
    }, [])

    if (checking || !offline) return null

    return (
        <div className="sticky top-0 z-50 flex items-center gap-3 bg-red-600 text-white px-4 py-2.5 text-sm font-medium shadow-lg">
            <WifiOff className="h-4 w-4 flex-shrink-0" />
            <span>
                <strong>Server Offline —</strong> Changes won&apos;t be saved until the server is running.
                Open a terminal in the Oracle folder and run <code className="bg-red-700 px-1 py-0.5 rounded text-xs font-mono">npm run dev</code>, or double-click <strong>Start Oracle.command</strong>.
            </span>
        </div>
    )
}
