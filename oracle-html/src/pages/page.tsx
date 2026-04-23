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
import { getOracleData, getOfficers, getMetrics } from '@/services/storage'
import { getOperatorName } from '@/pages/settings/page'
import { useRef, useLayoutEffect, useState, useEffect } from "react"

export default function DashboardPage() {
  // Re-read metrics whenever saveMetrics fires a storage event
  const [metrics, setMetrics] = useState(() => getMetrics() ?? { resolvedConflicts: 0 })
  useEffect(() => {
    const refresh = () => setMetrics(getMetrics() ?? { resolvedConflicts: 0 })
    window.addEventListener('storage', refresh)
    return () => window.removeEventListener('storage', refresh)
  }, [])
  const [currentOfficers, setCurrentOfficers] = useState(() => getOfficers())
  useEffect(() => {
    const refresh = () => setCurrentOfficers(getOfficers())
    window.addEventListener('oracle-officers-updated', refresh)
    return () => window.removeEventListener('oracle-officers-updated', refresh)
  }, [])

  const [oracleData, setOracleData] = useState(() => getOracleData())
  useEffect(() => {
    const refresh = () => setOracleData(getOracleData())
    window.addEventListener('oracle-data-updated', refresh)
    return () => window.removeEventListener('oracle-data-updated', refresh)
  }, [])

  // Measure left column height and apply to right column's alerts section
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightTopRef = useRef<HTMLDivElement>(null)
  const [alertsMaxH, setAlertsMaxH] = useState(400)

  useLayoutEffect(() => {
    const measure = () => {
      if (!leftColRef.current || !rightTopRef.current) return
      const leftH = leftColRef.current.offsetHeight
      const topH = rightTopRef.current.offsetHeight
      const gap = 16 // gap-4
      setAlertsMaxH(Math.max(leftH - topH - gap, 150))
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (leftColRef.current) observer.observe(leftColRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="space-y-6">

      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-2xl -mx-4" style={{ width: 'calc(100% + 2rem)' }}>
        <img
          src={heroBanner}
          alt="DDG-124 USS Harvey C. Barnum Jr."
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <p className="text-[#c9a227] text-xs font-semibold tracking-[0.3em] uppercase mb-1">
            PERS-41 · Surface Warfare Officer Assignments
          </p>
          <h1 className="text-4xl font-bold text-white tracking-tight drop-shadow-lg">
            Command Center
          </h1>
          <p className="text-white/70 text-sm mt-1">
            Welcome back, {getOperatorName()}. Here is your current Oracle &amp; Bank status.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 items-start">
        {/* Left Column */}
        <div className="space-y-4" ref={leftColRef}>
          <CommandInventoryCard oracleData={oracleData} />
          <PipelineHealthCard oracleData={oracleData} />
          <BankOfficersCard officers={currentOfficers} />
          <FirefighterStatsCard officers={currentOfficers} />
          <CosmBankOfficersCard officers={currentOfficers} />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          {/* Top cards row — measured to subtract from available alerts height */}
          <div className="grid gap-4 sm:grid-cols-2" ref={rightTopRef}>
            <ActiveIssuesCard oracleData={oracleData} officers={currentOfficers} />
            <ResolvedIssuesCard metrics={metrics} />
          </div>
          {/* Alert cards — capped at left column bottom */}
          <div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            style={{ height: alertsMaxH, overflow: 'hidden' }}
          >
            <CommandAlerts commands={oracleData} />
            <PersonnelAlerts officers={currentOfficers} />
          </div>
        </div>
      </div>
    </div>
  )
}
