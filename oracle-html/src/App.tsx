import { HashRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { AppHeader } from '@/components/AppHeader'
import { BackupReconnectModal } from '@/components/BackupReconnectModal'
import { registerToastHandlers } from '@/lib/notify'
import { toast } from 'sonner'
import { chooseBackupFile, getBackupStatus } from '@/services/storage'
import { getOracleData, writeData } from '@/services/storage'
import navalBg from '@/assets/naval-bg.png'
import { HudBar } from '@/components/HudBar'

// ─── Lazy page imports ─────────────────────────────────────────────────────
import DashboardPage from '@/pages/page'
import OraclePage from '@/pages/oracle/page'
import BankPage from '@/pages/bank/page'
import SlatesPage from '@/pages/slates/page'
import SlateDetailPage from '@/pages/slates/[id]/page'
import SlateGeneratorPage from '@/pages/slate-generator/page'
import ArchivedSlatesPage from '@/pages/slates/archived/page'
import SlateBriefPage from '@/pages/slates/[id]/brief/page'
import SlateAlignmentPage from '@/pages/slates/[id]/alignment/page'
import BoardsPage from '@/pages/boards/page'
import BoardDetailPage from '@/pages/boards/[id]/page'
import PccPage from '@/pages/pcc/page'
import ReportsPage from '@/pages/reports/page'
import SettingsPage from '@/pages/settings/page'
import ToolsPage from '@/pages/tools/page'

export default function App() {
  const [backupModal, setBackupModal] = useState<'restore' | 'first-time' | 'reconnect' | null>(null)

  useEffect(() => {
    // wire notify handlers to sonner toast
    registerToastHandlers(
      (msg) => toast.success(msg),
      (msg) => toast.error(msg)
    )

    // One-time migration: sync prd fields from timelineData for all oracle commands.
    if (!localStorage.getItem('__migrated_prd_v1')) {
      const commands = getOracleData()
      const migrated = commands.map(cmd => ({
        ...cmd,
        currentCO: {
          ...cmd.currentCO,
          prd: cmd.currentCO.timelineData?.q || cmd.currentCO.prd,
        },
        currentXO: {
          ...cmd.currentXO,
          prd: cmd.currentXO.timelineData?.k || cmd.currentXO.prd,
        },
        ...(cmd.prospectiveCO ? {
          prospectiveCO: {
            ...cmd.prospectiveCO,
            prd: cmd.prospectiveCO.timelineData?.q || cmd.prospectiveCO.prd,
          },
        } : {}),
      }))
      writeData('oracle-data', migrated)
      localStorage.setItem('__migrated_prd_v1', 'true')
    }

    // ── Session Start Wizard (NMCI / fresh session detection) ──────────────
    // sessionStorage is cleared on tab/browser close but survives page reloads,
    // making it the correct signal for "this is a fresh session that needs setup."
    //
    // Priority 1: after restore + reload → show Step 2 (connect auto-save)
    if (sessionStorage.getItem('__oracle_needs_autosave') === 'true') {
      setTimeout(() => setBackupModal('reconnect'), 300)
      return
    }

    // Priority 2: fresh session (no bootstrap flag) → show Step 1 (restore)
    if (!sessionStorage.getItem('__oracle_bootstrapped')) {
      setTimeout(() => setBackupModal('restore'), 300)
      return
    }

    // Priority 3: bootstrapped but auto-save handle lost (shouldn't normally happen)
    setTimeout(() => {
      const { handleActive } = getBackupStatus()
      if (!handleActive) {
        // silently skip — session is already bootstrapped
      }
    }, 600)
  }, [])

  const handleConnect = async () => {
    await chooseBackupFile()
    sessionStorage.removeItem('__oracle_needs_autosave')
    sessionStorage.setItem('__oracle_bootstrapped', 'true')
    setBackupModal(null)
  }

  const handleSkip = () => {
    sessionStorage.setItem('__oracle_bootstrapped', 'true')
    setBackupModal(null)
  }

  return (
    <HashRouter>
        <div
          className="min-h-screen text-foreground relative"
          style={{
            backgroundImage: `url(${navalBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-background/85 pointer-events-none" />
          <div className="relative z-10">
        <AppHeader />
        <nav className="bg-[#07111f] border-b border-[#c9a227]/30 px-6 py-0 flex items-center gap-1 text-xs font-semibold tracking-widest uppercase shadow-lg">
          {/* Gold top accent line */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/40 to-transparent pointer-events-none" />
          {[
            ['/', 'Command Center'],
            ['/oracle', 'Oracle'],
            ['/bank', 'Bank'],
            ['/slate-generator', 'Slate Generator'],
            ['/slates', 'Active Slates'],
            ['/slates/archived', 'Archived Slates'],
            ['/boards', 'Board'],
            ['/pcc', 'PCC'],
            ['/reports', 'Reports'],
            ['/tools', 'Tools'],
            ['/settings', 'Settings'],
          ].map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                isActive
                  ? 'relative px-3 py-3.5 text-[#c9a227] border-b-2 border-[#c9a227] transition-colors duration-150'
                  : 'relative px-3 py-3.5 text-[#8a9bb0] hover:text-[#c9a227] border-b-2 border-transparent transition-colors duration-150'
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <main className="p-4 pb-10">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/oracle" element={<OraclePage />} />
            <Route path="/bank" element={<BankPage />} />
            <Route path="/slates" element={<SlatesPage />} />
            <Route path="/slates/archived" element={<ArchivedSlatesPage />} />
            <Route path="/slates/:id" element={<SlateDetailPage />} />
            <Route path="/slates/:id/brief" element={<SlateBriefPage />} />
            <Route path="/slates/:id/alignment" element={<SlateAlignmentPage />} />
            <Route path="/slate-generator" element={<SlateGeneratorPage />} />
            <Route path="/boards" element={<BoardsPage />} />
            <Route path="/boards/:id" element={<BoardDetailPage />} />
            <Route path="/pcc" element={<PccPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/tools" element={<ToolsPage />} />
          </Routes>
        </main>

        {backupModal && (
          <BackupReconnectModal
            mode={backupModal}
            onConnect={handleConnect}
            onSkip={handleSkip}
          />
        )}

        <HudBar />
        <Toaster richColors position="bottom-right" />
      </div>{/* /relative z-10 */}
      </div>{/* /background image div */}
    </HashRouter>
  )
}
