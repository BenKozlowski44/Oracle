import { SlatingBoard } from "@/components/slating/slating-board"
import { getOfficers, getOracleData } from "@/lib/data"

export default function SlatingPage() {
    const officers = getOfficers()
    const oracleData = getOracleData()
    return (
        <div className="space-y-4 h-full flex flex-col">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Slating Board</h1>
                <p className="text-muted-foreground">
                    Match available talent from The Bank to requirements in The Oracle.
                </p>
            </div>
            <div className="flex-1 min-h-0">
                <SlatingBoard initialOfficers={officers} initialCommands={oracleData} />
            </div>
        </div>
    )
}
