import { readJson } from '@/services/data-service'
import type { Officer, Billet, OracleCommand, Slate, Metrics, CdrCmdBoard } from './types'

// Fresh-read functions — each call reads directly from disk.
// Use these in server components so data is never stale after API mutations.
export const getSlates = () => readJson<Slate[]>('slates.json')
export const getOfficers = () => readJson<Officer[]>('officers.json')
export const getOracleData = () => readJson<OracleCommand[]>('oracle-data.json')
export const getBoards = () => readJson<CdrCmdBoard[]>('boards.json')

// Static exports kept for compatibility (non-persisted, app-lifetime values)
export const billets: Billet[] = []
export const metrics: Metrics = { resolvedConflicts: 0 }