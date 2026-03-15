import { ShieldAlert, ShieldCheck, ShieldOff, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BackupReconnectModalProps {
  /** "first-time" = never configured, "reconnect" = previously set up */
  mode: "first-time" | "reconnect"
  onConnect: () => void
  onSkip: () => void
}

export function BackupReconnectModal({ mode, onConnect, onSkip }: BackupReconnectModalProps) {
  const isReconnect = mode === "reconnect"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card border rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">

        {/* Header */}
        <div className={`px-6 py-5 flex items-start gap-4 ${isReconnect ? "bg-amber-500/10 border-b border-amber-500/20" : "bg-blue-500/10 border-b border-blue-500/20"}`}>
          {isReconnect
            ? <ShieldAlert className="h-8 w-8 text-amber-500 shrink-0 mt-0.5" />
            : <Save className="h-8 w-8 text-blue-500 shrink-0 mt-0.5" />
          }
          <div>
            <h2 className="text-lg font-bold tracking-tight">
              {isReconnect ? "Reconnect Backup File" : "Set Up Auto-Save"}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isReconnect
                ? "A backup file was configured in a previous session."
                : "Keep your data safe by choosing a backup location."}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {isReconnect ? (
            <>
              <p className="text-sm leading-relaxed">
                Your backup file connection resets every time <strong>oracle.html</strong> is opened.
                Click <strong>Reconnect</strong> to re-link your backup file for this session —
                your data will then auto-save after every change.
              </p>
              {/* Warning block */}
              <div className="flex gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
                <ShieldOff className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-red-600">If you skip:</p>
                  <ul className="mt-1 space-y-1 text-muted-foreground list-disc list-inside">
                    <li>Changes are saved in <em>browser memory only</em></li>
                    <li>Clearing browser cache will erase all data</li>
                    <li>No durable file backup will be created</li>
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
            {isReconnect ? "Reconnect Backup File" : "Choose Backup Location"}
          </Button>
        </div>
      </div>
    </div>
  )
}
