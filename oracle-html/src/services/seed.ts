/**
 * seed.ts — Seeds localStorage with the data embedded at build time.
 *
 * Strategy: use a hash of the embedded data as the seed version key.
 * This means:
 *  - On first open (NMCI fresh browser): always seeds ✅
 *  - When oracle.html is rebuilt with new data: the hash changes →
 *    automatically re-seeds on next open (new data wins) ✅
 *  - Between sessions on the SAME oracle.html build: user edits are
 *    preserved (hash unchanged, seed is skipped) ✅
 */
import oracleData from '@/seeds/oracle-data.json'
import officers from '@/seeds/officers.json'
import slates from '@/seeds/slates.json'
import boards from '@/seeds/boards.json'
import metrics from '@/seeds/metrics.json'
import cosmData from '@/seeds/cosm-data.json'

// A simple djb2-style hash of a string — fast, no crypto needed
function quickHash(str: string): string {
  let h = 5381
  for (let i = 0; i < str.length; i++) {
    h = (h * 33) ^ str.charCodeAt(i)
  }
  return (h >>> 0).toString(36)  // unsigned 32-bit, base-36
}

// Compute hash from the oracle data (the largest / most-changed dataset)
const DATA_HASH = quickHash(JSON.stringify(oracleData) + JSON.stringify(officers))
const SEED_KEY = `__oracle_seed_${DATA_HASH}`

export function seedIfEmpty(): void {
  // Already seeded for THIS exact build — preserve any user edits
  if (localStorage.getItem(SEED_KEY)) return

  // New build (or fresh browser) — load embedded data
  localStorage.setItem('oracle-data', JSON.stringify(oracleData))
  localStorage.setItem('officers', JSON.stringify(officers))
  localStorage.setItem('slates', JSON.stringify(slates))
  localStorage.setItem('boards', JSON.stringify(boards))
  localStorage.setItem('metrics', JSON.stringify(metrics))
  localStorage.setItem('cosm-data', JSON.stringify(cosmData))
  localStorage.setItem(SEED_KEY, new Date().toISOString())

  // Remove old seed keys from previous builds to stay clean
  for (const key of Object.keys(localStorage)) {
    if (key.startsWith('__oracle_seed_') && key !== SEED_KEY) {
      localStorage.removeItem(key)
    }
  }
  // Also remove the old v1 key if present
  localStorage.removeItem('__seeded_v1')

  console.log(`[Oracle] Seeded from build data (hash: ${DATA_HASH})`)
}

/**
 * forceReseed — wipes all Oracle data from localStorage and reloads
 * from the embedded build-time data. Called from Settings "Reset" button.
 */
export function forceReseed(): void {
  localStorage.removeItem('oracle-data')
  localStorage.removeItem('officers')
  localStorage.removeItem('slates')
  localStorage.removeItem('boards')
  localStorage.removeItem('metrics')
  localStorage.removeItem('cosm-data')
  // Remove ALL seed keys so seedIfEmpty() runs fresh
  for (const key of Object.keys(localStorage)) {
    if (key.startsWith('__oracle_seed_')) localStorage.removeItem(key)
  }
  localStorage.removeItem('__seeded_v1')
  seedIfEmpty()
  console.log('[Oracle] Force re-seeded from embedded build data')
}
