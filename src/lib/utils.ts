import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO, isValid, parse, subMonths, addMonths } from "date-fns"
import { type OracleCommand } from "./types"

export function getCurrentActiveSlate(today: Date = new Date()): string {
  const month = today.getMonth() + 1; // 1-12
  let year = today.getFullYear() % 100;

  let quarter = 0;
  if (month >= 1 && month <= 3) { // Jan-Mar
    quarter = 2;
  } else if (month >= 4 && month <= 6) { // Apr-Jun
    quarter = 3;
  } else if (month >= 7 && month <= 9) { // Jul-Sep
    quarter = 4;
  } else if (month >= 10 && month <= 12) { // Oct-Dec
    quarter = 1;
    year = year + 1; // e.g. Oct-Dec 2026 works on 27-1
  }

  const yearStr = year.toString().padStart(2, '0');
  return `${yearStr}-${quarter}`;
}

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
  let year = (date.getFullYear() % 100) - 1; // Target Slate is always exactly 1 calendar loop before the fill vacancy

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
  const calculatedSlate = `${yearStr}-${quarter}`;
  const activeSlate = getCurrentActiveSlate();

  // Clamp older target boards to the dynamically determined active slate
  if (calculatedSlate < activeSlate) {
    return activeSlate;
  }

  return calculatedSlate;
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

  // Helper to determine if a slot is truly empty/TBD
  const isFilled = (dateStr?: string) => {
    if (!dateStr || dateStr === "Unknown" || dateStr === "TBD" || dateStr === "N/A" || dateStr === "VACANT") return false;
    return true;
  };

  const hasInboundXO = isFilled(command.inboundXO?.reportDate) && command.inboundXO?.name && command.inboundXO?.name !== "VACANT";

  if (!hasInboundXO) {
    // IMMEDIATE HOLE: The Inbound XO seat is empty. We need to fill it based on when the Current XO leaves.
    if (isFilled(command.currentXO?.prd)) {
      baseDate = parseAnyDate(command.currentXO!.prd);
    }

    // Fallback: If Current XO PRD is missing/TBD, we check the CO to see when *they* leave (since XO fleets up)
    if (!baseDate && isFilled(command.currentCO?.prd)) {
      baseDate = parseAnyDate(command.currentCO!.prd);
    }

    // Safety Fallback: If Current XO/CO are BOTH TBD, we cautiously look forward to the Slated forecast so the math doesn't crash
    if (!baseDate && isFilled(command.slatedXO?.reportDate)) {
      baseDate = parseAnyDate(command.slatedXO!.reportDate);
    }

  } else {
    // SAFE PIPELINE: Inbound XO is filled. The *next* hole is the Slated XO.
    // 1. If explicit forecast available:
    if (isFilled(command.slatedXO?.reportDate)) {
      baseDate = parseAnyDate(command.slatedXO!.reportDate);
    }

    // 2. Fallback: If no explicit Slated forecast, mathematically predict it as Inbound XO + 18mo
    if (!baseDate && isFilled(command.inboundXO?.reportDate)) {
      const inboundArrival = parseAnyDate(command.inboundXO!.reportDate);
      if (inboundArrival) {
        // The vacancy opens approximately 18 months after the Inbound XO arrives (CO fleet up cycle)
        baseDate = addMonths(inboundArrival, 18);
      }
    }
  }

  if (!baseDate) return "TBD";

  // The baseDate is the exact vacancy/fill date (either PRD or ReportDate).
  // We pass it directly into the math engine, which correctly maps FillDate -> TargetSlate intrinsically.
  const boardDateStr = format(baseDate, "yyyy-MM-dd");

  return calculateTargetBoard(boardDateStr);
}
