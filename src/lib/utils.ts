import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO, isValid, parse } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatToMMMyy(dateStr?: string) {
  if (!dateStr || dateStr === "N/A" || dateStr === "TBD") return dateStr || "N/A"

  // Clean up string just in case
  const cleanStr = dateStr.trim()

  // Try ISO parsing first
  let date = parseISO(cleanStr)
  if (isValid(date)) {
    return format(date, "MMMyy").toUpperCase()
  }

  // If it's already customized string or invalid, return as is
  return cleanStr
}

export function calculateTargetBoard(dateStr?: string): string {
  if (!dateStr || dateStr === "Unknown" || dateStr === "TBD") return "TBD";

  // Attempt to parse string directly if length is 5 e.g 'DEC26'
  let date: Date | null = null;
  let d = parseISO(dateStr);
  if (isValid(d)) {
    date = d;
  } else if (dateStr.length === 5) {
    d = parse(dateStr, 'MMMyy', new Date());
    if (isValid(d)) date = d;
  }

  if (!date) return "TBD";

  const month = date.getMonth() + 1; // 1-12
  let year = date.getFullYear() % 100;

  let quarter = 0;
  if (month >= 3 && month <= 5) {
    quarter = 1;
  } else if (month >= 6 && month <= 8) {
    quarter = 2;
  } else if (month >= 9 && month <= 11) {
    quarter = 3;
  } else if (month === 12 || month === 1 || month === 2) {
    quarter = 4;
    if (month === 1 || month === 2) {
      year = year - 1; // Maps to previous year's slate
    }
  }

  const yearStr = year.toString().padStart(2, '0');
  return `${yearStr}-${quarter}`;
}
