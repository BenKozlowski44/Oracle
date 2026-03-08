import type { Officer, Billet, OracleCommand, Slate, Metrics, CdrCmdBoard } from "./types"

import boardsJson from "../data/boards.json"
import slatesJson from "../data/slates.json"
import officersJson from "../data/officers.json"
import oracleDataJson from "../data/oracle-data.json"

// Mutable exports — in-memory mutations work exactly as before (module cache is shared).
// Persistence is via the update-data API which writes to the individual JSON files.
export const boards: CdrCmdBoard[] = boardsJson as CdrCmdBoard[]
export const slates: Slate[] = slatesJson as Slate[]
export const officers: Officer[] = officersJson as Officer[]
export const oracleData: OracleCommand[] = oracleDataJson as OracleCommand[]

export const billets: Billet[] = []
export const metrics: Metrics = { resolvedConflicts: 0 }