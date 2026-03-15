// Browser-compatible metrics service — reads/writes via localStorage
import type { Metrics } from './types'
import { readData, writeData } from '@/services/storage'

const DEFAULT_METRICS: Metrics = {
    resolvedConflicts: 0,
}

export function getMetrics(): Metrics {
    try {
        const data = readData<Metrics>('metrics')
        return data ?? DEFAULT_METRICS
    } catch {
        return DEFAULT_METRICS
    }
}

export function saveMetrics(metrics: Metrics): void {
    writeData('metrics', metrics)
}
