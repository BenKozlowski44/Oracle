import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO, isValid, parse, subMonths } from "date-fns"
import { type OracleCommand } from "./types"

export const CURRENT_ACTIVE_SLATE = "26-2";

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
  const calculatedSlate = `${yearStr}-${quarter}`;

  // Clamp older target boards to the current active slate
  if (calculatedSlate < CURRENT_ACTIVE_SLATE) {
    return CURRENT_ACTIVE_SLATE;
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
  let isFromReportDate = false;

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
      if (baseDate) isFromReportDate = false;
    }

    // Fallback: If Current XO PRD is missing/TBD, we check the CO to see when *they* leave (since XO fleets up)
    if (!baseDate && isFilled(command.currentCO?.prd)) {
      baseDate = parseAnyDate(command.currentCO!.prd);
      if (baseDate) isFromReportDate = false;
    }

    // Safety Fallback: If Current XO/CO are BOTH TBD, we cautiously look forward to the Slated forecast so the math doesn't crash
    if (!baseDate && isFilled(command.slatedXO?.reportDate)) {
      baseDate = parseAnyDate(command.slatedXO!.reportDate);
      if (baseDate) isFromReportDate = true;
    }

  } else {
    // SAFE PIPELINE: Inbound XO is filled. The *next* hole is the Slated XO.
    // We calculate the Slated XO board primarily off the Inbound XO's arrival date.
    if (isFilled(command.inboundXO?.reportDate)) {
      baseDate = parseAnyDate(command.inboundXO!.reportDate);
      if (baseDate) isFromReportDate = true;
    }

    // Fallback: If Inbound XO has a name but an invalid date, check if there is a Slated forecast
    if (!baseDate && isFilled(command.slatedXO?.reportDate)) {
      baseDate = parseAnyDate(command.slatedXO!.reportDate);
      if (baseDate) isFromReportDate = true;
    }
  }

  if (!baseDate) return "TBD";

  const boardDate = isFromReportDate ? baseDate : subMonths(baseDate, 18);
  const boardDateStr = format(boardDate, "yyyy-MM-dd");

  return calculateTargetBoard(boardDateStr);
}
