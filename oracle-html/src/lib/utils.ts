/**
 * lib/utils.ts
 *
 * Pure formatting and class-name utilities.
 * Oracle domain logic (slate prediction, pipeline health) lives in lib/slate-logic.ts.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, isValid, parse } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatToMMMyy(dateStr?: string) {
  if (!dateStr || dateStr === "N/A" || dateStr === "TBD") return dateStr || "N/A"

  const cleanStr = dateStr.trim()

  // If already in MMMyy format (e.g. "JAN27"), return uppercased as-is
  if (/^[A-Za-z]{3}\d{2}$/.test(cleanStr)) return cleanStr.toUpperCase()

  // Parse YYYY-MM-DD directly from the string to avoid UTC timezone shift.
  // parseISO / new Date("2027-01-01") treats the string as UTC midnight, which
  // in US timezones (UTC-5/6) rolls back to the previous month/year (e.g. DEC26).
  const isoMatch = cleanStr.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (isoMatch) {
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    const monthIdx = parseInt(isoMatch[2], 10) - 1
    const year = isoMatch[1].slice(-2)
    return `${monthNames[monthIdx]}${year}`
  }

  // Fallback: let date-fns try to parse other formats (MMMyy, MMMyyyy)
  const parsed = parse(cleanStr, "MMMyy", new Date())
  if (isValid(parsed)) return format(parsed, "MMMyy").toUpperCase()
  const parsed2 = parse(cleanStr, "MMMyyyy", new Date())
  if (isValid(parsed2)) return format(parsed2, "MMMyy").toUpperCase()

  return cleanStr
}
