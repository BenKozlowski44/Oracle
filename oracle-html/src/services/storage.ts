/**
 * storage.ts — replaces all Next.js API routes with localStorage operations.
 * Keys match the original JSON filenames for clarity.
 */
import type { OracleCommand, Officer, Slate, Metrics } from '@/lib/types'

const KEYS = {
  oracle: 'oracle-data',
  officers: 'officers',
  slates: 'slates',
  boards: 'boards',
  metrics: 'metrics',
} as const

// ─── Generic read/write ────────────────────────────────────────────────────

export function readData<T>(key: string): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : ([] as unknown as T)
  } catch {
    return [] as unknown as T
  }
}

export function writeData<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
  // Trigger auto-backup after every write
  autoBackup()
}

// ─── Oracle Commands ───────────────────────────────────────────────────────

export function getOracleData(): OracleCommand[] {
  return readData<OracleCommand[]>(KEYS.oracle)
}

export function saveOracleCommand(command: OracleCommand): void {
  const data = getOracleData()
  const exists = data.some(c => c.id === command.id)
  const updated = exists
    ? data.map(c => c.id === command.id ? command : c)
    : [...data, command]
  writeData(KEYS.oracle, updated)
}

export function deleteOracleCommand(id: string): void {
  const updated = getOracleData().filter(c => c.id !== id)
  writeData(KEYS.oracle, updated)
}

// ─── Officers ──────────────────────────────────────────────────────────────

export function getOfficers(): Officer[] {
  return readData<Officer[]>(KEYS.officers)
}

export function saveOfficers(officers: Officer[]): void {
  writeData(KEYS.officers, officers)
}

export function saveOfficer(officer: Officer): void {
  const officers = getOfficers()
  const exists = officers.some(o => o.id === officer.id)
  const updated = exists
    ? officers.map(o => o.id === officer.id ? officer : o)
    : [...officers, officer]
  writeData(KEYS.officers, updated)
}

export function deleteOfficer(id: string): void {
  const updated = getOfficers().filter(o => o.id !== id)
  writeData(KEYS.officers, updated)
}

// ─── Slates ────────────────────────────────────────────────────────────────

export function getSlates(): Slate[] {
  return readData<Slate[]>(KEYS.slates)
}

export function saveSlate(slate: Slate): void {
  const slates = getSlates()
  const exists = slates.some(s => s.id === slate.id)
  const updated = exists
    ? slates.map(s => s.id === slate.id ? slate : s)
    : [...slates, slate]
  writeData(KEYS.slates, updated)
}

export function deleteSlate(id: string): void {
  const updated = getSlates().filter(s => s.id !== id)
  writeData(KEYS.slates, updated)
}

// ─── Boards ────────────────────────────────────────────────────────────────

export function getBoards(): unknown[] {
  return readData<unknown[]>(KEYS.boards)
}

export function saveBoards(boards: unknown[]): void {
  writeData(KEYS.boards, boards)
}

// ─── Metrics ───────────────────────────────────────────────────────────────

export function getMetrics(): Metrics | null {
  const raw = localStorage.getItem(KEYS.metrics)
  return raw ? JSON.parse(raw) : null
}

export function saveMetrics(metrics: Metrics): void {
  writeData(KEYS.metrics, metrics)
}

// ─── Full export / import ──────────────────────────────────────────────────

export function exportAllData(): string {
  const snapshot = {
    exportedAt: new Date().toISOString(),
    [KEYS.oracle]: getOracleData(),
    [KEYS.officers]: getOfficers(),
    [KEYS.slates]: getSlates(),
    [KEYS.boards]: getBoards(),
    [KEYS.metrics]: getMetrics(),
  }
  return JSON.stringify(snapshot, null, 2)
}

export function importAllData(json: string): void {
  const data = JSON.parse(json)
  if (data[KEYS.oracle]) writeData(KEYS.oracle, data[KEYS.oracle])
  if (data[KEYS.officers]) writeData(KEYS.officers, data[KEYS.officers])
  if (data[KEYS.slates]) writeData(KEYS.slates, data[KEYS.slates])
  if (data[KEYS.boards]) writeData(KEYS.boards, data[KEYS.boards])
  if (data[KEYS.metrics]) writeData(KEYS.metrics, data[KEYS.metrics])
}

// ─── Auto-backup (File System Access API) ─────────────────────────────────

let backupFileHandle: FileSystemFileHandle | null = null

export async function chooseBackupFile(): Promise<boolean> {
  try {
    // @ts-expect-error — File System Access API not yet in all TS libs
    const handle = await window.showSaveFilePicker({
      suggestedName: 'oracle-backup.json',
      types: [{ description: 'JSON Backup', accept: { 'application/json': ['.json'] } }]
    })
    backupFileHandle = handle
    localStorage.setItem('__backupGranted', 'true')
    await writeBackupNow()
    return true
  } catch {
    return false
  }
}

export async function restoreFromFile(): Promise<boolean> {
  try {
    // @ts-expect-error
    const [handle] = await window.showOpenFilePicker({
      types: [{ description: 'JSON Backup', accept: { 'application/json': ['.json'] } }]
    })
    const file = await handle.getFile()
    const text = await file.text()
    importAllData(text)
    return true
  } catch {
    return false
  }
}

async function writeBackupNow(): Promise<void> {
  if (!backupFileHandle) return
  try {
    // @ts-expect-error
    const writable = await backupFileHandle.createWritable()
    await writable.write(exportAllData())
    await writable.close()
  } catch {
    // Silently fail — localStorage is still the primary store
  }
}

function autoBackup(): void {
  if (backupFileHandle) {
    writeBackupNow()
  }
}
