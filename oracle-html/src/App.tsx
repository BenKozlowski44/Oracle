import { HashRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { AppHeader } from '@/components/AppHeader'
import { BackupReconnectModal } from '@/components/BackupReconnectModal'
import { registerToastHandlers } from '@/lib/notify'
import { toast } from 'sonner'
import { chooseBackupFile, restoreFromFile, getBackupStatus } from '@/services/storage'
import navalBg from '@/assets/naval-bg.png'

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
  const [backupModal, setBackupModal] = useState<'first-time' | 'reconnect' | null>(null)

  useEffect(() => {
    // wire notify handlers to sonner toast
    registerToastHandlers(
      (msg) => toast.success(msg),
      (msg) => toast.error(msg)
    )

    // If actual data is missing from localStorage (cache cleared), offer restore
    // NOTE: __seeded_v1 is intentionally never written by seed.ts, so we check
    // for the presence of actual oracle data instead
    const hasData = localStorage.getItem('oracle-data') !== null
    if (!hasData) {
        // No local data — automatically offer file restore via the file picker
        restoreFromFile().then(ok => {
            if (ok) window.location.reload()
        })
        return
    }

    // Show backup modal after a short delay so app renders first
    // Runs regardless of whether the restore prompt was shown
    setTimeout(() => {
      const { everGranted, handleActive } = getBackupStatus()
      if (handleActive) return // already connected — nothing to do
      if (everGranted) {
        setBackupModal('reconnect')  // had it before — prompt to reconnect
      } else {
        setBackupModal('first-time') // never set up — offer to configure
      }
    }, 600)
  }, [])

  const handleConnect = async () => {
    await chooseBackupFile()
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

        <main className="p-4">
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
            onSkip={() => setBackupModal(null)}
          />
        )}

        <Toaster richColors position="bottom-right" />
      </div>{/* /relative z-10 */}
      </div>{/* /background image div */}
    </HashRouter>
  )
}
