import { HashRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { registerToastHandlers } from '@/lib/notify'
import { toast } from 'sonner'
import { chooseBackupFile, restoreFromFile } from '@/services/storage'

// ─── Lazy page imports ─────────────────────────────────────────────────────
import OraclePage from '@/pages/oracle/page'
import BankPage from '@/pages/bank/page'
import SlatesPage from '@/pages/slates/page'
import SlateDetailPage from '@/pages/slates/[id]/page'
import ArchivedSlatesPage from '@/pages/slates/archived/page'
import BoardsPage from '@/pages/boards/page'
import BoardDetailPage from '@/pages/boards/[id]/page'
import PccPage from '@/pages/pcc/page'
import ReportsPage from '@/pages/reports/page'
import SettingsPage from '@/pages/settings/page'
import ToolsPage from '@/pages/tools/page'

export default function App() {
  const [backupReady, setBackupReady] = useState(false)

  useEffect(() => {
    // wire notify handlers to sonner toast
    registerToastHandlers(
      (msg) => toast.success(msg),
      (msg) => toast.error(msg)
    )

    // Prompt for backup file on first launch
    const granted = localStorage.getItem('__backupGranted')
    if (!granted) {
      setTimeout(() => {
        if (window.confirm(
          'Welcome to Oracle!\n\nWould you like to choose a backup file location? ' +
          'Your data will be automatically saved there after every change.'
        )) {
          chooseBackupFile().then(ok => {
            if (ok) setBackupReady(true)
          })
        }
      }, 500)
    } else {
      setBackupReady(true)
    }

    // If localStorage is empty (cache cleared), offer restore
    const seeded = localStorage.getItem('__seeded_v1')
    if (!seeded) {
      if (window.confirm('No local data found. Would you like to restore from a backup file?')) {
        restoreFromFile().then(ok => {
          if (ok) window.location.reload()
        })
      }
    }
  }, [])

  return (
    <HashRouter>
      <div className="min-h-screen bg-background text-foreground">
        <nav className="border-b px-4 py-2 flex items-center gap-4 text-sm font-medium">
          <span className="font-bold text-base mr-2">Oracle</span>
          {[
            ['/', 'Dashboard'],
            ['/oracle', 'CDR CMD'],
            ['/bank', 'Bank'],
            ['/slates', 'Slates'],
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
          {!backupReady && (
            <button
              onClick={() => chooseBackupFile().then(ok => ok && setBackupReady(true))}
              className="ml-auto text-xs text-amber-600 hover:underline"
            >
              ⚠ Set backup location
            </button>
          )}
        </nav>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<OraclePage />} />
            <Route path="/oracle" element={<OraclePage />} />
            <Route path="/bank" element={<BankPage />} />
            <Route path="/slates" element={<SlatesPage />} />
            <Route path="/slates/:id" element={<SlateDetailPage />} />
            <Route path="/slates/archived" element={<ArchivedSlatesPage />} />
            <Route path="/boards" element={<BoardsPage />} />
            <Route path="/boards/:id" element={<BoardDetailPage />} />
            <Route path="/pcc" element={<PccPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/tools" element={<ToolsPage />} />
          </Routes>
        </main>

        <Toaster richColors position="bottom-right" />
      </div>
    </HashRouter>
  )
}
