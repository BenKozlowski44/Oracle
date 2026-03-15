import { PageHeader } from '@/components/PageHeader'
import { useState, useEffect } from "react"
import { parseBankExcel, parseCosmExcel } from "@/lib/excel-parser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, FileSpreadsheet, Download, Upload, RefreshCw, ShieldCheck, ShieldAlert, ShieldOff, Save } from "lucide-react"
import { getOfficers, saveOfficers, exportAllData, restoreFromFile, chooseBackupFile, forceReseed, getBackupStatus, manualBackup } from "@/services/storage"
import type { Officer } from "@/lib/types"
import type { BackupStatus } from "@/services/storage"

function BackupStatusCard() {
    const [status, setStatus] = useState<BackupStatus>(getBackupStatus())
    const [saving, setSaving] = useState(false)
    const [saveMsg, setSaveMsg] = useState("")

    // Poll every 5 seconds so timestamp updates after auto-saves
    useEffect(() => {
        const id = setInterval(() => setStatus(getBackupStatus()), 5000)
        return () => clearInterval(id)
    }, [])

    const handleManualBackup = async () => {
        setSaving(true)
        const ok = await manualBackup()
        setSaving(false)
        setSaveMsg(ok ? "Saved successfully!" : "No backup file connected — set a location first.")
        setTimeout(() => setSaveMsg(""), 4000)
        setStatus(getBackupStatus())
    }

    const handleSetLocation = async () => {
        await chooseBackupFile()
        setStatus(getBackupStatus())
    }

    const { handleActive, everGranted, lastBackupAt } = status

    const StatusIcon = handleActive
        ? ShieldCheck
        : everGranted
            ? ShieldAlert
            : ShieldOff

    const statusColor = handleActive
        ? "text-green-500"
        : everGranted
            ? "text-amber-500"
            : "text-red-500"

    const statusLabel = handleActive
        ? "Backup Active"
        : everGranted
            ? "Not Connected This Session"
            : "No Backup Configured"

    return (
        <Card className="border-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <StatusIcon className={`h-5 w-5 ${statusColor}`} />
                    Auto-Save Status
                </CardTitle>
                <CardDescription>
                    Live status of your backup file connection for this session.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="space-y-1">
                        <p className="text-muted-foreground font-medium uppercase text-xs tracking-wide">Status</p>
                        <p className={`font-semibold ${statusColor}`}>{statusLabel}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-muted-foreground font-medium uppercase text-xs tracking-wide">Previously Configured</p>
                        <p className="font-semibold">{everGranted ? "Yes" : "No"}</p>
                    </div>
                    <div className="space-y-1 col-span-2">
                        <p className="text-muted-foreground font-medium uppercase text-xs tracking-wide">Last Successful Backup</p>
                        <p className="font-semibold">
                            {lastBackupAt
                                ? new Date(lastBackupAt).toLocaleString()
                                : "Never recorded"}
                        </p>
                    </div>
                </div>

                {saveMsg && (
                    <p className={`text-sm font-medium ${saveMsg.includes("successfully") ? "text-green-600" : "text-amber-600"}`}>
                        {saveMsg}
                    </p>
                )}

                <div className="flex gap-2 flex-wrap">
                    {handleActive ? (
                        <Button onClick={handleManualBackup} disabled={saving} size="sm">
                            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            {saving ? "Saving..." : "Save Now"}
                        </Button>
                    ) : (
                        <Button onClick={handleSetLocation} size="sm">
                            {everGranted ? "Reconnect Backup File" : "Set Backup Location"}
                        </Button>
                    )}
                </div>

                {!handleActive && everGranted && (
                    <p className="text-xs text-muted-foreground">
                        ⚠️ The backup file handle is reset every time oracle.html is opened. Click "Reconnect Backup File" to re-link your backup for this session.
                    </p>
                )}
            </CardContent>
        </Card>
    )
}


interface DataImportCardProps {
    title: string
    description: string
    onParse: (buffer: ArrayBuffer) => Promise<Officer[]> | Officer[]
    mode: "bank" | "cosm"
}

function DataImportCard({ title, description, onParse, mode }: DataImportCardProps) {
    const [file, setFile] = useState<File | null>(null)
    const [status, setStatus] = useState<"idle" | "parsing" | "saving" | "success" | "error">("idle")
    const [message, setMessage] = useState("")

    const handleImport = async () => {
        if (!file) return
        try {
            setStatus("parsing")
            const buffer = await file.arrayBuffer()
            const parsed = await onParse(buffer)
            if (parsed.length === 0) {
                setStatus("error")
                setMessage("No valid records found.")
                return
            }
            setStatus("saving")
            const existing = getOfficers()
            let merged: Officer[]
            if (mode === "bank") {
                // Merge: keep CO-SM officers, replace/add standard bank officers
                const cosmOnly = existing.filter((o: Officer) => o.listType === "cosm")
                const bankParsed = parsed.filter(o => o.listType !== "cosm")
                merged = [...cosmOnly, ...bankParsed]
            } else {
                // CO-SM merge: keep standard bank officers, replace/add CO-SM
                const bankOnly = existing.filter((o: Officer) => o.listType !== "cosm")
                const cosmParsed = parsed.filter(o => o.listType === "cosm")
                merged = [...bankOnly, ...cosmParsed]
            }
            saveOfficers(merged)
            setStatus("success")
            setMessage(`Successfully imported ${parsed.length} records from ${file.name}.`)
        } catch (err) {
            console.error(err)
            setStatus("error")
            setMessage("An error occurred. Check console for details.")
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input type="file" accept=".xlsx,.xls" onChange={e => setFile(e.target.files?.[0] ?? null)} />
                {status === "error" && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{message}</AlertDescription></Alert>}
                {status === "success" && <Alert className="text-green-600 border-green-600"><FileSpreadsheet className="h-4 w-4" /><AlertTitle>Success</AlertTitle><AlertDescription>{message}</AlertDescription></Alert>}
                <Button onClick={handleImport} disabled={!file || status === "parsing" || status === "saving"}>
                    {(status === "parsing" || status === "saving") && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {status === "parsing" ? "Parsing..." : status === "saving" ? "Saving..." : "Import Data"}
                </Button>
            </CardContent>
        </Card>
    )
}

export default function DataSettingsPage() {
    const handleExport = () => {
        const json = exportAllData()
        const blob = new Blob([json], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `oracle-backup-${new Date().toISOString().slice(0, 10)}.json`
        a.click()
        URL.revokeObjectURL(url)
    }

    const handleReloadFromBuild = () => {
        if (!confirm(
            'RELOAD FROM BUILD DATA\n\n' +
            'This will replace your current data with the data that was embedded\n' +
            'when oracle.html was last built on your Mac.\n\n' +
            'Use this to:\n' +
            '• Load the latest Mac data on a new computer (e.g. NMCI)\n' +
            '• Reset to the last known-good snapshot after an accidental change\n\n' +
            'Your current unsaved changes will be lost. Continue?'
        )) return
        forceReseed()
        window.location.reload()
    }

    return (
        <div className="space-y-6">
            <PageHeader
                label="PERS-41 · Oracle"
                title="Data Management"
                description="Import updates, manage backups, and configure auto-save."
            />

            <BackupStatusCard />

            {/* Backup / Restore */}
            <Card>
                <CardHeader>
                    <CardTitle>Backup &amp; Restore</CardTitle>
                    <CardDescription>
                        Export your data as a JSON file, restore from a backup, or reload the data
                        that was embedded into oracle.html at build time.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-3 flex-wrap">
                    <Button onClick={handleExport} variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Export Backup
                    </Button>
                    <Button onClick={async () => {
                        if (!confirm("This will overwrite all current data with the backup file. Continue?")) return
                        const ok = await restoreFromFile()
                        if (ok) window.location.reload()
                    }} variant="outline">
                        <Upload className="mr-2 h-4 w-4" /> Restore from File
                    </Button>
                    <Button onClick={handleReloadFromBuild} variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" /> Reload from Build Data
                    </Button>
                    <Button onClick={() => chooseBackupFile()} variant="outline">
                        Set Auto-Save Location
                    </Button>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <DataImportCard
                    title="Import Officer Bank"
                    description="Upload the standard Officer Roster (.xlsx). Safely merges with existing CO-SM officers."
                    onParse={parseBankExcel}
                    mode="bank"
                />
                <DataImportCard
                    title="Import CO-SM Bank"
                    description="Upload the CO-SM Roster (.xlsx) with 1-15 preferences. Safely merges with standard bank officers."
                    onParse={parseCosmExcel}
                    mode="cosm"
                />
            </div>
        </div>
    )
}
