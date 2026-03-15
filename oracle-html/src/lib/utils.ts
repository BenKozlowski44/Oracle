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

// Convert a slate code like "26-4" to a monotonic integer for ordering
function slateToNum(code: string): number {
  const m = code.match(/^(\d{2})-(\d)$/)
  if (!m) return 0
  return (2000 + parseInt(m[1])) * 4 + parseInt(m[2])
}

export type PipelineStatus = 'green' | 'yellow' | 'red'

export function getPipelineHealth(cmd: OracleCommand): {
  status: PipelineStatus
  label: string
  detail: string
  approaching: boolean
} {
  const targetSlate = cmd.nextSlateParams?.targetBoardDate
  const req = cmd.nextSlateParams?.requirement ?? 'XO'
  const currentNum = slateToNum(getCurrentActiveSlate())
  const targetNum = targetSlate ? slateToNum(targetSlate) : 0
  const distance = targetNum - currentNum   // cycles ahead of today

  // Past or current slate — overdue, needs action immediately
  if (!targetSlate || targetSlate === 'TBD' || distance <= 0) {
    return {
      status: 'red',
      label: 'Overdue',
      detail: distance <= 0
        ? `Slate ${targetSlate} has passed — ${req} slot unfilled`
        : `No slate target — check pipeline dates`,
      approaching: false
    }
  }

  // Next slate — act now before it closes
  if (distance === 1) {
    return {
      status: 'yellow',
      label: 'Act Now',
      detail: `⚠️ ${req} needed via Slate ${targetSlate} — closing soon!`,
      approaching: true
    }
  }

  // 2+ slates ahead — healthy lead time
  return {
    status: 'green',
    label: 'Healthy',
    detail: `${req} needed via Slate ${targetSlate} (${distance} slates ahead)`,
    approaching: false
  }
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

  // CO-SM override: if a manual SWO fill date is set, use it directly
  if (command.nextSWOFillDate) {
    const swoDate = parseAnyDate(command.nextSWOFillDate)
    if (swoDate) {
      return calculateTargetBoard(format(swoDate, 'yyyy-MM-dd'))
    }
  }

  let baseDate: Date | null = null;

  // Helper to determine if a slot is truly empty/TBD
  const isFilled = (dateStr?: string) => {
    if (!dateStr || dateStr === "Unknown" || dateStr === "TBD" || dateStr === "N/A" || dateStr === "VACANT") return false;
    return true;
  };

  if (command.rotationStyle === "DirectCO") {
    // DIRECT CO PIPELINE — trace through community fills to find when a SWO is needed.
    const isNonSWOCurrentCO = command.currentCO?.fillCommunity && command.currentCO.fillCommunity !== '1110'
    const pCOName = command.prospectiveCO?.name
    const pCOHasRealName = !!pCOName && pCOName !== "" && pCOName !== "Forecast"
    const isNonSWOProspectiveCO = command.prospectiveCO?.fillCommunity && command.prospectiveCO.fillCommunity !== '1110'

    if (pCOHasRealName && isFilled(command.prospectiveCO?.prd)) {
      // A real officer is named as P-CO (SWO or non-SWO).
      // Either way the next vacancy is after the P-CO departs.
      baseDate = parseAnyDate(command.prospectiveCO!.prd)
    } else if (isNonSWOCurrentCO && !pCOHasRealName) {
      // Current CO is a non-SWO and no P-CO named yet.
      // SWO is needed when the current non-SWO CO departs — prefer prd, fall back to timelineData.q
      baseDate = parseAnyDate(command.currentCO!.prd)
        ?? parseAnyDate(command.currentCO?.timelineData?.q ?? undefined)
    } else if (isFilled(command.prospectiveCO?.timelineData?.i ?? undefined)) {
      // Current CO is SWO, no named P-CO — vacancy is when the new CO needs to ARRIVE (timelineData.i),
      // not when they'd depart (prd). This correctly drives the slate off the report date.
      baseDate = parseAnyDate(command.prospectiveCO?.timelineData?.i ?? undefined)
    }

    if (!baseDate && isFilled(command.currentCO?.prd)) {
      baseDate = parseAnyDate(command.currentCO!.prd)
    }
  } else {
    // FLEET UP PIPELINE (Standard)
    const isNonSWOInbound = command.inboundXO?.fillCommunity && command.inboundXO.fillCommunity !== '1110'
    // A P-XO is considered "filled" if they have a name AND any arrival date (reportDate or timelineData.i)
    const inboundArrival = (command.inboundXO?.reportDate || command.inboundXO?.timelineData?.i) ?? undefined
    const hasInboundXO = !isNonSWOInbound && isFilled(inboundArrival) && !!command.inboundXO?.name && command.inboundXO?.name !== "VACANT";

    if (isNonSWOInbound) {
      // NON-SWO COMMUNITY FILL in P-XO: The SWO vacancy opens when the non-SWO fleets up (k date)
      // e.g. a 1310 fill arrives DEC26 and fleets up JUN28 — SWO needed JUN28
      const swoNeededDate = command.inboundXO?.timelineData?.k ?? undefined
      if (isFilled(swoNeededDate)) {
        baseDate = parseAnyDate(swoNeededDate)
      } else {
        // Fallback: use their departure date
        const deptDate = command.inboundXO?.timelineData?.q ?? undefined
        if (isFilled(deptDate)) baseDate = parseAnyDate(deptDate)
      }
    } else if (!hasInboundXO) {
      // IMMEDIATE HOLE: The Inbound XO seat is empty. We need to fill it based on when the Current XO leaves.
      if (isFilled(command.currentXO?.prd)) {
        baseDate = parseAnyDate(command.currentXO!.prd);
      }

      // Fallback: currentXO.prd may be empty but timelineData.k (fleet-up date) is auto-calculated
      if (!baseDate && isFilled(command.currentXO?.timelineData?.k ?? undefined)) {
        baseDate = parseAnyDate(command.currentXO?.timelineData?.k ?? undefined)
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
      // SAFE PIPELINE: Inbound XO is a real SWO. The *next* hole is the Slated XO.
      // If the slated XO is a real named officer (not just a slate label like "26-3"),
      // look PAST them to their fleet-up date — that's when the next hole opens.
      const slatedName = command.slatedXO?.name || "";
      const slatedIsRealPerson = /[a-zA-Z]{2,}/.test(slatedName) && !slatedName.match(/^\d{2}-\d/);
      const slatedFleetUp = command.slatedXO?.timelineData?.k;

      if (slatedIsRealPerson && isFilled(slatedFleetUp ?? undefined)) {
        // Named officer slated — next hole opens when they fleet up
        baseDate = parseAnyDate(slatedFleetUp ?? undefined);
      } else if (isFilled(command.slatedXO?.reportDate)) {
        // Slate label or no fleet-up data — use report date as before
        baseDate = parseAnyDate(command.slatedXO!.reportDate);
      }

      // 2. Fallback: If no explicit Slated forecast, mathematically predict it as Inbound XO arrival + 18mo
      if (!baseDate) {
        const inboundI = command.inboundXO?.timelineData?.i
        const inboundArrivalFallback = parseAnyDate(inboundI ?? undefined)
        if (inboundArrivalFallback) {
          baseDate = addMonths(inboundArrivalFallback, 18);
        }
      }
    }
  }

  if (!baseDate) return "TBD";

  // The baseDate is the exact vacancy/fill date (either PRD or ReportDate).
  // We pass it directly into the math engine, which correctly maps FillDate -> TargetSlate intrinsically.
  const boardDateStr = format(baseDate, "yyyy-MM-dd");

  return calculateTargetBoard(boardDateStr);
}

/**
 * Returns the RPT sub-label date for CO-SM table badge (DirectCO or fleet-up).
 * Logic is an exact lift of the inline IIFE from oracle-table.tsx — no change in behavior.
 */
export function getCoSmRptDisplay(
  command: OracleCommand
): { label: string; date: string } | null {
  const isDirectCO = command.rotationStyle === 'DirectCO'

  if (isDirectCO) {
    const isNonSWOCurrentCO = command.currentCO?.fillCommunity && command.currentCO.fillCommunity !== '1110'
    const pCOHasRealName = !!command.prospectiveCO?.name &&
      command.prospectiveCO.name !== '' &&
      command.prospectiveCO.name !== 'Forecast'

    let date: string | null = null

    if (isNonSWOCurrentCO && !pCOHasRealName) {
      // Non-SWO incumbent, no named P-CO: SWO needed when current CO departs
      date = command.currentCO?.prd || command.currentCO?.timelineData?.q || null
    } else if (pCOHasRealName && command.prospectiveCO?.timelineData?.q) {
      // Named P-CO (any community): show their departure as next need
      date = command.prospectiveCO.timelineData.q
    } else {
      // No named P-CO: show when the new CO needs to ARRIVE (timelineData.i)
      date = command.prospectiveCO?.timelineData?.i || command.slatedCO?.timelineData?.i || null
    }

    return date ? { label: 'CO RPT', date } : null

  } else {
    const isNonSWOInbound = command.inboundXO?.fillCommunity && command.inboundXO.fillCommunity !== '1110'

    if (isNonSWOInbound) {
      // Non-SWO fill in P-XO: show when a SWO is actually needed (fleet-up date)
      const date = command.inboundXO?.timelineData?.k || command.inboundXO?.timelineData?.q || null
      return date ? { label: 'SWO XO RPT', date } : null
    }

    // If P-XO is already named, next hole opens when they fleet-up → slatedXO.reportDate
    // If P-XO is not yet named, immediate need is when someone needs to arrive → timelineData.i
    const inboundHasName = !!command.inboundXO?.name &&
      command.inboundXO.name !== '' &&
      command.inboundXO.name !== 'VACANT'

    const date = inboundHasName
      ? (command.slatedXO?.reportDate || command.inboundXO?.timelineData?.k || null)
      : (command.inboundXO?.timelineData?.i || command.slatedXO?.reportDate || null)

    return date ? { label: 'XO RPT', date } : null
  }
}

/**
 * Returns the XO RPT date for the CDR CMD table badge.
 * Logic is an exact lift of the inline expression from oracle-table.tsx — no change in behavior.
 */
export function getCdrCmdXoRptDate(command: OracleCommand): string | null {
  return command.inboundXO?.timelineData?.i || command.slatedXO?.reportDate || null
}

