"use client"

import { useState } from "react"
import { parseOracleExcel, parseBankExcel, parseCosmExcel } from "@/lib/excel-parser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, FileSpreadsheet } from "lucide-react"

interface DataImportCardProps {
    title: string
    description: string
    onParse: (buffer: ArrayBuffer) => Promise<any[]> | any[]
    dataKey: "oracleData" | "officers" | "mergeBank" | "mergeCosm"
}

function DataImportCard({ title, description, onParse, dataKey }: DataImportCardProps) {
    const [file, setFile] = useState<File | null>(null)
    const [status, setStatus] = useState<"idle" | "parsing" | "uploading" | "success" | "error">("idle")
    const [message, setMessage] = useState("")

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
            setStatus("idle")
            setMessage("")
        }
    }

    const handleImport = async () => {
        if (!file) return;

        try {
            setStatus("parsing")
            const buffer = await file.arrayBuffer()
            const data = await onParse(buffer)

            if (data.length === 0) {
                setStatus("error")
                setMessage("No valid records found in the spreadsheet.")
                return;
            }

            setStatus("uploading")

            // Send to API
            const response = await fetch('/api/update-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [dataKey]: data }),
            });

            if (!response.ok) {
                throw new Error("Failed to save data to server.")
            }

            setStatus("success")
            setMessage(`Successfully imported ${data.length} records from ${file.name}.`)

        } catch (error) {
            console.error(error)
            setStatus("error")
            setMessage("An error occurred during import. Check console for details.")
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileChange}
                    />
                </div>

                {status === "error" && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{message}</AlertDescription>
                    </Alert>
                )}

                {status === "success" && (
                    <Alert className="text-green-600 border-green-600">
                        <FileSpreadsheet className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{message}</AlertDescription>
                    </Alert>
                )}

                <Button
                    onClick={handleImport}
                    disabled={!file || status === "parsing" || status === "uploading"}
                >
                    {(status === "parsing" || status === "uploading") && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {status === "parsing" ? "Parsing..." :
                        status === "uploading" ? "Saving..." :
                            "Import Data"}
                </Button>
            </CardContent>
        </Card>
    )
}

export default function DataSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Data Management</h1>
                <p className="text-muted-foreground">
                    Import annual updates and manage base data sources.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <DataImportCard
                    title="Import 'The Oracle' (Commands)"
                    description="Upload the Annual Command Succession Tracker (.xlsx). Replaces current command list."
                    onParse={parseOracleExcel}
                    dataKey="oracleData"
                />

                <DataImportCard
                    title="Import Officer Bank"
                    description="Upload the standard Officer Roster (.xlsx). Safely merges with existing CO-SM officers."
                    onParse={parseBankExcel}
                    dataKey="mergeBank"
                />

                <DataImportCard
                    title="Import CO-SM Bank"
                    description="Upload the CO-SM Roster (.xlsx) with 1-15 preferences. Safely merges with standard bank officers."
                    onParse={parseCosmExcel}
                    dataKey="mergeCosm"
                />
            </div>
        </div>
    )
}
