/**
 * seed.ts — Seeds localStorage with current data on first launch.
 * If localStorage already has data, does nothing (preserves user changes).
 */
import oracleData from '@/seeds/oracle-data.json'
import officers from '@/seeds/officers.json'
import slates from '@/seeds/slates.json'
import boards from '@/seeds/boards.json'
import metrics from '@/seeds/metrics.json'

const KEYS = {
  oracle: 'oracle-data',
  officers: 'officers',
  slates: 'slates',
  boards: 'boards',
  metrics: 'metrics',
  seeded: '__seeded_v1',
}

export function seedIfEmpty(): void {
  // Only seed once — if the user has changed data, preserve it
  if (localStorage.getItem(KEYS.seeded)) return

  localStorage.setItem(KEYS.oracle, JSON.stringify(oracleData))
  localStorage.setItem(KEYS.officers, JSON.stringify(officers))
  localStorage.setItem(KEYS.slates, JSON.stringify(slates))
  localStorage.setItem(KEYS.boards, JSON.stringify(boards))
  localStorage.setItem(KEYS.metrics, JSON.stringify(metrics))
  localStorage.setItem(KEYS.seeded, 'true')

  console.log('[Oracle] First launch — seed data loaded into localStorage')
}
