import { useState } from "react"
import { parseBankExcel, parseCosmExcel } from "@/lib/excel-parser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, FileSpreadsheet, Download, Upload } from "lucide-react"
import { getOfficers, saveOfficers, exportAllData, restoreFromFile, chooseBackupFile } from "@/services/storage"
import type { Officer } from "@/lib/types"

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

    const handleRestore = async () => {
        if (!confirm("This will overwrite all current data with the backup file. Continue?")) return
        const ok = await restoreFromFile()
        if (ok) window.location.reload()
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Data Management</h1>
                <p className="text-muted-foreground">Import updates, manage backups, and configure auto-save.</p>
            </div>

            {/* Backup / Restore */}
            <Card>
                <CardHeader>
                    <CardTitle>Backup &amp; Restore</CardTitle>
                    <CardDescription>Export all data to a JSON file or restore from a previous backup.</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-3 flex-wrap">
                    <Button onClick={handleExport} variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Export Backup
                    </Button>
                    <Button onClick={handleRestore} variant="outline">
                        <Upload className="mr-2 h-4 w-4" /> Restore from File
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
