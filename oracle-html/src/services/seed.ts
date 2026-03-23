/**
 * seed.ts — Seeds localStorage with the data embedded at build time.
 *
 * Two-tier seeding strategy:
 *
 * TIER 1 — Oracle commands & Officers (inventory data, updated from Excel):
 *   Uses a content hash. When oracle.html is rebuilt with new inventory data,
 *   performs a MERGE — existing records (matched by id) are kept as-is to
 *   preserve user edits. Only brand-new records from the seed are added.
 *
 * TIER 2 — Slates, Boards, Metrics (user-created work product):
 *   Only seeded if the key is completely absent from localStorage.
 *   NEVER overwritten on rebuild — preserves everything the user has created.
 */
import oracleData from '@/seeds/oracle-data.json'
import officers from '@/seeds/officers.json'
import slates from '@/seeds/slates.json'
import boards from '@/seeds/boards.json'
import metrics from '@/seeds/metrics.json'
import cosmData from '@/seeds/cosm-data.json'

// djb2-style hash — fast, no crypto needed
function quickHash(str: string): string {
  let h = 5381
  for (let i = 0; i < str.length; i++) {
    h = (h * 33) ^ str.charCodeAt(i)
  }
  return (h >>> 0).toString(36)
}

// Hash only changes when the inventory data files change
const DATA_HASH = quickHash(JSON.stringify(oracleData) + JSON.stringify(officers))
const INVENTORY_SEED_KEY = `__oracle_inventory_${DATA_HASH}`

/**
 * Merge seed records into existing localStorage records.
 * - Existing records (matched by id) are KEPT AS-IS — user edits survive.
 * - New records from the seed that don't exist yet are ADDED.
 */
function mergeById<T extends { id: string }>(existing: T[], seed: T[]): T[] {
  const existingIds = new Set(existing.map(r => r.id))
  const newFromSeed = seed.filter(r => !existingIds.has(r.id))
  return [...existing, ...newFromSeed]
}

export function seedIfEmpty(): void {
  // ── GUARD: skip Tier 1 if data was just restored from a backup file ────────
  // importAllData stamps this flag before triggering a reload so the seed
  // doesn't touch the freshly-restored data.
  if (localStorage.getItem('__oracle_just_restored') === 'true') {
    localStorage.removeItem('__oracle_just_restored')
    // Stamp the inventory key so subsequent reloads don't try to merge either
    localStorage.setItem(INVENTORY_SEED_KEY, new Date().toISOString())
    // Clean up any old inventory seed keys from previous builds
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith('__oracle_inventory_') && key !== INVENTORY_SEED_KEY) {
        localStorage.removeItem(key)
      }
    }
    console.log('[Oracle] Inventory preserved — data restored from backup file')
    // Still fall through to Tier 2 (only seeds if key is absent — restored
    // data already has slates/boards/metrics so these will all be skipped)
  } else if (!localStorage.getItem(INVENTORY_SEED_KEY)) {
    // ── TIER 1: Inventory data (oracle-data + officers) ─────────────────────
    // On new hash: merge seed into existing data, adding only new records.
    // Existing records are preserved so user edits (locations, names, etc.) survive.

    // Oracle commands — merge
    const rawOracle = localStorage.getItem('oracle-data')
    if (rawOracle) {
      try {
        const existing = JSON.parse(rawOracle) as typeof oracleData
        const merged = mergeById(existing, oracleData as typeof oracleData)
        localStorage.setItem('oracle-data', JSON.stringify(merged))
      } catch {
        localStorage.setItem('oracle-data', JSON.stringify(oracleData))
      }
    } else {
      localStorage.setItem('oracle-data', JSON.stringify(oracleData))
    }

    // Officers — merge
    const rawOfficers = localStorage.getItem('officers')
    if (rawOfficers) {
      try {
        const existing = JSON.parse(rawOfficers) as typeof officers
        const merged = mergeById(existing, officers as typeof officers)
        localStorage.setItem('officers', JSON.stringify(merged))
      } catch {
        localStorage.setItem('officers', JSON.stringify(officers))
      }
    } else {
      localStorage.setItem('officers', JSON.stringify(officers))
    }

    // cosm-data — merge
    const rawCosm = localStorage.getItem('cosm-data')
    if (rawCosm) {
      try {
        const existing = JSON.parse(rawCosm) as typeof cosmData
        const merged = mergeById(existing, cosmData as typeof cosmData)
        localStorage.setItem('cosm-data', JSON.stringify(merged))
      } catch {
        localStorage.setItem('cosm-data', JSON.stringify(cosmData))
      }
    } else {
      localStorage.setItem('cosm-data', JSON.stringify(cosmData))
    }

    localStorage.setItem(INVENTORY_SEED_KEY, new Date().toISOString())

    // Clean up old inventory seed keys
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith('__oracle_inventory_') && key !== INVENTORY_SEED_KEY) {
        localStorage.removeItem(key)
      }
    }
    localStorage.removeItem('__seeded_v1')

    console.log(`[Oracle] Inventory merged (hash: ${DATA_HASH})`)
  }

  // ── TIER 2: User work product (slates, boards, metrics) ───────────────────
  // Only seed if the key is completely absent — NEVER overwrite user changes
  if (!localStorage.getItem('slates')) {
    localStorage.setItem('slates', JSON.stringify(slates))
    console.log('[Oracle] Slates seeded (first launch)')
  }
  if (!localStorage.getItem('boards')) {
    localStorage.setItem('boards', JSON.stringify(boards))
    console.log('[Oracle] Boards seeded (first launch)')
  }
  if (!localStorage.getItem('metrics')) {
    localStorage.setItem('metrics', JSON.stringify(metrics))
    console.log('[Oracle] Metrics seeded (first launch)')
  }
}

/**
 * forceReseed — Wipes ALL Oracle data and reloads from embedded build data.
 * Only called explicitly from Settings "Reload from Build Data" button.
 */
export function forceReseed(): void {
  const keys = ['oracle-data', 'officers', 'slates', 'boards', 'metrics', 'cosm-data']
  keys.forEach(k => localStorage.removeItem(k))
  for (const key of Object.keys(localStorage)) {
    if (key.startsWith('__oracle_inventory_') || key.startsWith('__oracle_seed_')) {
      localStorage.removeItem(key)
    }
  }
  localStorage.removeItem('__seeded_v1')
  seedIfEmpty()
  console.log('[Oracle] Force re-seeded from embedded build data')
}
