import { ShieldAlert, ShieldCheck, ShieldOff, Save, X, FolderOpen, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { restoreFromFile } from "@/services/storage"

interface BackupReconnectModalProps {
  /** "restore" = Step 1 on NMCI (restore from file), "first-time" = never configured, "reconnect" = previously set up */
  mode: "restore" | "first-time" | "reconnect"
  onConnect: () => void
  onSkip: () => void
}

export function BackupReconnectModal({ mode, onConnect, onSkip }: BackupReconnectModalProps) {
  const [restoring, setRestoring] = useState(false)

  const isReconnect = mode === "reconnect"
  const isRestore = mode === "restore"

  const handleRestore = async () => {
    setRestoring(true)
    const ok = await restoreFromFile()
    if (ok) {
      window.location.reload()
    } else {
      setRestoring(false)
    }
  }

  // ── Step 1: Restore from Backup ──────────────────────────────────────────
  if (isRestore) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="bg-card border rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">

          {/* Step indicator */}
          <div className="px-6 pt-5 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-semibold text-primary">
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">1</span>
              Restore Data
            </span>
            <span className="flex-1 h-px bg-border mx-1" />
            <span className="flex items-center gap-1.5 text-muted-foreground/60">
              <span className="w-5 h-5 rounded-full border border-border flex items-center justify-center text-[10px]">2</span>
              Connect Auto-Save
            </span>
          </div>

          {/* Header */}
          <div className="px-6 py-5 flex items-start gap-4 bg-primary/10 border-b border-primary/20 mt-4">
            <FolderOpen className="h-8 w-8 text-primary shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-bold tracking-tight">Restore Your Data</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Select your <strong>oracle-backup.json</strong> file to load your saved data.
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-4">
            <p className="text-sm leading-relaxed">
              Oracle loads build-time defaults on each fresh open. To restore your work,
              select the <strong>oracle-backup.json</strong> file saved on your computer.
              The app will reload and your data will be fully restored.
            </p>
            <div className="flex gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3">
              <ShieldOff className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Skipping this step means you'll be working with <strong>build-time defaults</strong>,
                not your saved data.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-5 flex justify-end gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="text-muted-foreground"
              disabled={restoring}
            >
              <X className="mr-1.5 h-4 w-4" />
              Skip (first launch / no backup)
            </Button>
            <Button onClick={handleRestore} size="sm" disabled={restoring}>
              <FolderOpen className="mr-1.5 h-4 w-4" />
              {restoring ? "Restoring…" : "Restore from Backup"}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // ── Step 2 / Standard modes: Connect / Reconnect Auto-Save ───────────────
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card border rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">

        {/* Step indicator — only for the post-restore reconnect case */}
        {isReconnect && sessionStorage.getItem('__oracle_needs_autosave') === 'true' && (
          <div className="px-6 pt-5 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 text-muted-foreground/60">
              <span className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">✓</span>
              Restore Data
            </span>
            <span className="flex-1 h-px bg-border mx-1" />
            <span className="flex items-center gap-1.5 font-semibold text-primary">
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">2</span>
              Connect Auto-Save
            </span>
          </div>
        )}

        {/* Header */}
        <div className={`px-6 py-5 flex items-start gap-4 ${isReconnect ? "bg-amber-500/10 border-b border-amber-500/20 mt-4" : "bg-blue-500/10 border-b border-blue-500/20"}`}>
          {isReconnect
            ? <RotateCcw className="h-8 w-8 text-amber-500 shrink-0 mt-0.5" />
            : <Save className="h-8 w-8 text-blue-500 shrink-0 mt-0.5" />
          }
          <div>
            <h2 className="text-lg font-bold tracking-tight">
              {isReconnect ? "Connect Auto-Save" : "Set Up Auto-Save"}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isReconnect
                ? "Link your backup file so changes auto-save this session."
                : "Keep your data safe by choosing a backup location."}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {isReconnect ? (
            <>
              <p className="text-sm leading-relaxed">
                Your data has been restored. Now click <strong>Connect Auto-Save</strong> to
                re-link <strong>oracle-backup.json</strong> — every change you make will
                be automatically written to that file.
              </p>
              <div className="flex gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
                <ShieldOff className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-red-600">If you skip:</p>
                  <ul className="mt-1 space-y-1 text-muted-foreground list-disc list-inside">
                    <li>Changes are saved in <em>browser memory only</em></li>
                    <li>Closing the browser will erase today's changes</li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm leading-relaxed">
                Choose a location on your computer to save an <strong>oracle-backup.json</strong> file.
                Oracle will automatically write all your data there after every change.
              </p>
              <div className="flex gap-3 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-3">
                <ShieldCheck className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Your data is currently saved in browser memory only. A backup file means
                  you can restore everything even if the browser cache is cleared.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex justify-end gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSkip}
            className="text-muted-foreground"
          >
            <X className="mr-1.5 h-4 w-4" />
            {isReconnect ? "Skip (not recommended)" : "Skip for now"}
          </Button>
          <Button onClick={onConnect} size="sm">
            <Save className="mr-1.5 h-4 w-4" />
            {isReconnect ? "Connect Auto-Save" : "Choose Backup Location"}
          </Button>
        </div>
      </div>
    </div>
  )
}
