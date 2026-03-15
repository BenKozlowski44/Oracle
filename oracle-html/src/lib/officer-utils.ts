import type { Officer } from './types'

/**
 * Determines if an officer is classified as a Firefighter.
 * Shared by stats-cards dashboard widget and the-bank tab filter.
 */
export function isFirefighter(o: Officer): boolean {
    // Early exits — these override everything
    if (
        o.status === 'Slated' ||
        o.listShift === 'Slated' ||
        o.status === 'Declined' ||
        o.status === 'No Opportunity' ||
        o.status === 'De-screened' ||
        o.listShift === 'Declined/Descreened'
    ) return false

    if (o.listShift === 'CO-SM' || o.screened?.includes('CO-SM')) return false

    const slate = o.assignedSlate?.toLowerCase() ?? ''
    const shift = o.listShift ?? ''

    return (
        shift === 'Firefighters' ||
        o.status === 'Ready FF' ||
        slate.includes('3rd look') ||
        slate.includes('no command')
    )
}

/**
 * Normalises a year group coming from the source system,
 * which appends a trailing zero (e.g. 20130 → 2013).
 */
export function normaliseYearGroup(raw: number): number {
    return raw > 9999 ? Math.floor(raw / 10) : raw
}
