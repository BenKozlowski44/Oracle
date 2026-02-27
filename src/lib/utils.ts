import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO, isValid, parse, addMonths } from "date-fns"
import { type OracleCommand } from "./types"

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
  if (month >= 3 && month <= 5) { // MAR-MAY
    quarter = 1;
  } else if (month >= 6 && month <= 8) { // JUN-AUG
    quarter = 2;
  } else if (month >= 9 && month <= 11) { // SEP-NOV
    quarter = 3;
  } else if (month === 12 || month === 1 || month === 2) { // DEC-FEB
    quarter = 4;
    // If the report date is Jan or Feb, it technically belongs to the *previous* year's slate cycle
    // e.g. Feb 2026 report belongs to the 25-4 slate. Dec 2025 belongs to the 25-4 slate.
    if (month === 1 || month === 2) {
      year = year - 1;
    }
  }

  const yearStr = year.toString().padStart(2, '0');
  return `${yearStr}-${quarter}`;
}

export function predictNextVacancyDate(command: OracleCommand): string {
  const parseAnyDate = (dateStr?: string): Date | null => {
    if (!dateStr || dateStr === "Unknown" || dateStr === "TBD" || dateStr === "N/A") return null;
    let d = parseISO(dateStr);
    if (isValid(d)) return d;
    if (dateStr.length === 5) {
      d = parse(dateStr, 'MMMyy', new Date());
      if (isValid(d)) return d;
    }
    return null;
  }

  let baseDate: Date | null = null;
  let isFromReportDate = false;

  if (command.slatedXO?.reportDate && command.slatedXO.reportDate !== "N/A" && command.slatedXO.reportDate !== "TBD") {
    baseDate = parseAnyDate(command.slatedXO.reportDate);
    isFromReportDate = true;
  } else if (command.inboundXO?.reportDate && command.inboundXO.reportDate !== "N/A" && command.inboundXO.reportDate !== "TBD") {
    baseDate = parseAnyDate(command.inboundXO.reportDate);
    isFromReportDate = true;
  } else if (command.currentXO?.prd && command.currentXO.prd !== "N/A" && command.currentXO.prd !== "Unknown") {
    baseDate = parseAnyDate(command.currentXO.prd);
    isFromReportDate = false;
  } else if (command.currentCO?.prd && command.currentCO.prd !== "N/A" && command.currentCO.prd !== "Unknown") {
    baseDate = parseAnyDate(command.currentCO.prd);
    isFromReportDate = false;
  }

  if (!baseDate) return "TBD";

  const vacancyDate = isFromReportDate ? addMonths(baseDate, 18) : baseDate;
  const vacancyDateStr = format(vacancyDate, "yyyy-MM-dd");

  return calculateTargetBoard(vacancyDateStr);
}
