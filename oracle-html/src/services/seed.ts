/**
 * seed.ts — Seeds localStorage with the data embedded at build time.
 *
 * Two-tier seeding strategy:
 *
 * TIER 1 — Oracle commands & Officers (inventory data, updated from Excel):
 *   Uses a content hash. When oracle.html is rebuilt with new inventory data
 *   (new build, new hash), these are refreshed automatically — including on NMCI.
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

export function seedIfEmpty(): void {
  // ── TIER 1: Inventory data (oracle-data + officers) ───────────────────────
  // Refresh these when a new build embeds updated inventory data
  if (!localStorage.getItem(INVENTORY_SEED_KEY)) {
    localStorage.setItem('oracle-data', JSON.stringify(oracleData))
    localStorage.setItem('officers', JSON.stringify(officers))
    localStorage.setItem('cosm-data', JSON.stringify(cosmData))
    localStorage.setItem(INVENTORY_SEED_KEY, new Date().toISOString())

    // Clean up old inventory seed keys
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith('__oracle_inventory_') && key !== INVENTORY_SEED_KEY) {
        localStorage.removeItem(key)
      }
    }
    // Remove legacy v1 key if present
    localStorage.removeItem('__seeded_v1')

    console.log(`[Oracle] Inventory seeded (hash: ${DATA_HASH})`)
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
