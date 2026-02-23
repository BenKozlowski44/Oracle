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
import { officers, billets, oracleData, metrics } from "@/lib/data"

export default function DashboardPage() {
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
          <BankOfficersCard officers={officers} />
          <CosmBankOfficersCard officers={officers} />
          <FirefighterStatsCard officers={officers} />
        </div>

        {/* Right Column: Issues & Alerts */}
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <ActiveIssuesCard oracleData={oracleData} />
            <ResolvedIssuesCard metrics={metrics} />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 h-full items-stretch">
            <CommandAlerts commands={oracleData} />
            <PersonnelAlerts officers={officers} />
          </div>
        </div>
      </div>
    </div>
  )
}


