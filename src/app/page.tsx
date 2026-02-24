import {
  CommandInventoryCard,
  BankOfficersCard,
  CosmBankOfficersCard,
  FirefighterStatsCard,
  ActiveIssuesCard,
  ResolvedIssuesCard
} from "@/components/dashboard/stats-cards"

import { CommandAlerts } from "@/components/dashboard/command-alerts"
import { PersonnelAlerts } from "@/components/dashboard/personnel-alerts"
import { oracleData } from "@/lib/data"
import { getMetrics } from "@/lib/metrics-service"
import fs from 'fs'
import path from 'path'
import { Officer } from "@/lib/types"

// Force dynamic rendering so router.refresh() actually fetches fresh data
export const dynamic = 'force-dynamic'

function getOfficers(): Officer[] {
  const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts')
  const fileContent = fs.readFileSync(dataFilePath, 'utf8')
  const startMarker = 'export const officers: Officer[] ='
  const searchStartIndex = fileContent.indexOf(startMarker)

  if (searchStartIndex === -1) return []

  const openBracketIndex = fileContent.indexOf('[', searchStartIndex + startMarker.length)
  if (openBracketIndex === -1) return []

  let depth = 0
  let inString = false
  let quoteChar = ''
  let closeBracketIndex = -1

  for (let i = openBracketIndex; i < fileContent.length; i++) {
    const char = fileContent[i]
    if (inString) {
      if (char === quoteChar && fileContent[i - 1] !== '\\') inString = false
    } else {
      if (char === '"' || char === "'" || char === '`') {
        inString = true
        quoteChar = char
      } else if (char === '[') depth++
      else if (char === ']') {
        depth--
        if (depth === 0) {
          closeBracketIndex = i
          break
        }
      }
    }
  }

  if (closeBracketIndex === -1) return []
  const jsonString = fileContent.substring(openBracketIndex, closeBracketIndex + 1)

  try {
    const parseFn = new Function(`return ${jsonString}`)
    return parseFn() as Officer[]
  } catch (e) {
    return []
  }
}

export default async function DashboardPage() {
  const metrics = getMetrics()
  const currentOfficers = getOfficers()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
        <p className="text-muted-foreground">
          Welcome back LCDR Ben Kozlowski. Here is the current status of your Oracle and Bank.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column: Personnel & Billets */}
        <div className="space-y-4">
          <CommandInventoryCard oracleData={oracleData} />
          <BankOfficersCard officers={currentOfficers} />
          <CosmBankOfficersCard officers={currentOfficers} />
          <FirefighterStatsCard officers={currentOfficers} />
        </div>

        {/* Right Column: Issues & Alerts */}
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <ActiveIssuesCard oracleData={oracleData} officers={currentOfficers} />
            <ResolvedIssuesCard metrics={metrics} />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 h-full items-stretch">
            <CommandAlerts commands={oracleData} />
            <PersonnelAlerts officers={currentOfficers} />
          </div>
        </div>
      </div>
    </div>
  )
}


