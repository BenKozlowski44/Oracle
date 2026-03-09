"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorPageProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        console.error("[GlobalError]", error)
    }, [error])

    const isDataError = error.message.includes("Data file")
    const isCorrupted = error.message.includes("corrupted")

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-8">
            <div className="max-w-lg w-full space-y-6 text-center">
                <div className="flex justify-center">
                    <AlertTriangle className="h-16 w-16 text-destructive opacity-80" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">
                        {isDataError ? "Data File Error" : "Something went wrong"}
                    </h1>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {isDataError
                            ? isCorrupted
                                ? "A data file contains invalid JSON. Check the file path below and restore from a backup or re-import."
                                : "A required data file is missing. It may need to be restored from a backup or re-imported via Settings → Data Management."
                            : "An unexpected error occurred. Try refreshing — if the problem persists, check the server logs."}
                    </p>
                </div>

                {isDataError && (
                    <div className="rounded-md bg-muted p-4 text-left">
                        <p className="text-xs font-mono text-muted-foreground break-all leading-relaxed">
                            {error.message}
                        </p>
                    </div>
                )}

                <div className="flex justify-center gap-3">
                    <Button onClick={reset} variant="default">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Try again
                    </Button>
                    <Button variant="outline" onClick={() => window.location.href = "/"}>
                        Go to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    )
}
