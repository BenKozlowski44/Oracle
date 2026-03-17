/**
 * lib/utils.ts
 *
 * Pure formatting and class-name utilities.
 * Oracle domain logic (slate prediction, pipeline health) lives in lib/slate-logic.ts.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO, isValid } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatToMMMyy(dateStr?: string) {
  if (!dateStr || dateStr === "N/A" || dateStr === "TBD") return dateStr || "N/A"

  const cleanStr = dateStr.trim()

  const date = parseISO(cleanStr)
  if (isValid(date)) {
    return format(date, "MMMyy").toUpperCase()
  }

  return cleanStr
}
