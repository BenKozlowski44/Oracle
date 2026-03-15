import { HashRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { AppHeader } from '@/components/AppHeader'
import { BackupReconnectModal } from '@/components/BackupReconnectModal'
import { registerToastHandlers } from '@/lib/notify'
import { toast } from 'sonner'
import { chooseBackupFile, restoreFromFile, getBackupStatus } from '@/services/storage'

// ─── Lazy page imports ─────────────────────────────────────────────────────
import DashboardPage from '@/pages/page'
import OraclePage from '@/pages/oracle/page'
import BankPage from '@/pages/bank/page'
import SlatesPage from '@/pages/slates/page'
import SlateDetailPage from '@/pages/slates/[id]/page'
import SlateGeneratorPage from '@/pages/slate-generator/page'
import ArchivedSlatesPage from '@/pages/slates/archived/page'
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

    // If localStorage is empty (cache cleared), offer restore
    const seeded = localStorage.getItem('__seeded_v1')
    if (!seeded) {
      if (window.confirm('No local data found. Would you like to restore from a backup file?')) {
        restoreFromFile().then(ok => {
          if (ok) window.location.reload()
        })
      }
      return
    }

    // Show backup modal after a short delay so app renders first
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
      <div className="min-h-screen bg-background text-foreground">
        <AppHeader />
        <nav className="border-b px-4 py-2 flex items-center gap-4 text-sm font-medium">
          {[
            ['/', 'Command Center'],
            ['/oracle', 'Oracle'],
            ['/bank', 'Bank'],
            ['/slates', 'Slates'],
            ['/slate-generator', 'Slate Generator'],
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
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
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
      </div>
    </HashRouter>
  )
}
