import {
  CommandInventoryCard,
  PipelineHealthCard,
  BankOfficersCard,
  CosmBankOfficersCard,
  FirefighterStatsCard,
  ActiveIssuesCard,
  ResolvedIssuesCard
} from "@/components/dashboard/stats-cards"

import heroBanner from "@/assets/hero-banner.png"


import { CommandAlerts } from "@/components/dashboard/command-alerts"
import { PersonnelAlerts } from "@/components/dashboard/personnel-alerts"
import { getOracleData, getOfficers } from '@/services/storage'
import { getMetrics } from "@/lib/metrics-service"

// Force dynamic rendering so  actually fetches fresh data

export default function DashboardPage() {
  const metrics = getMetrics()
  const currentOfficers = getOfficers()
  const oracleData = getOracleData()

  return (
    <div className="space-y-6">

      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-2xl -mx-4" style={{ width: 'calc(100% + 2rem)' }}>
        <img
          src={heroBanner}
          alt="DDG-124 USS Harvey C. Barnum Jr."
          className="w-full h-full object-cover object-center"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <p className="text-[#c9a227] text-xs font-semibold tracking-[0.3em] uppercase mb-1">
            PERS-41 · Surface Warfare Officer Assignments
          </p>
          <h1 className="text-4xl font-bold text-white tracking-tight drop-shadow-lg">
            Command Center
          </h1>
          <p className="text-white/70 text-sm mt-1">
            Welcome back, LCDR Kozlowski. Here is your current Oracle &amp; Bank status.
          </p>
        </div>
      </div>


      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column: Personnel & Billets */}
        <div className="space-y-4">
          <CommandInventoryCard oracleData={oracleData} />
          <PipelineHealthCard oracleData={oracleData} />
          <BankOfficersCard officers={currentOfficers} />
          <FirefighterStatsCard officers={currentOfficers} />
          <CosmBankOfficersCard officers={currentOfficers} />
        </div>

        {/* Right Column: Issues & Alerts */}
        <div className="flex flex-col gap-4 h-full">
          <div className="grid gap-4 sm:grid-cols-2">
            <ActiveIssuesCard oracleData={oracleData} officers={currentOfficers} />
            <ResolvedIssuesCard metrics={metrics} />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 flex-1 items-stretch">
            <CommandAlerts commands={oracleData} />
            <PersonnelAlerts officers={currentOfficers} />
          </div>
        </div>
      </div>
    </div>
  )
}
