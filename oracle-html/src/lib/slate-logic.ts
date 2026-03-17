/**
 * lib/slate-logic.ts
 *
 * Oracle domain logic for slate prediction and pipeline health.
 * Extracted from utils.ts so that utils.ts can remain a pure formatting
 * helper module (cn, formatToMMMyy) with no domain knowledge.
 *
 * Do NOT import this file from lib/utils.ts — components should import
 * directly from this module.
 */

import { format, parseISO, isValid, parse, addMonths } from "date-fns"
import { type OracleCommand } from "./types"
import { isPlaceholderName } from "./constants"

// ── Internal helpers ─────────────────────────────────────────────────────────

/** Convert a slate code like "26-4" to a monotonic integer for ordering. */
function slateToNum(code: string): number {
  const m = code.match(/^(\d{2})-(\d)$/)
  if (!m) return 0
  return (2000 + parseInt(m[1])) * 4 + parseInt(m[2])
}

// ── Exports ──────────────────────────────────────────────────────────────────

/**
 * Returns the currently active slate label (e.g. "26-2") based on today's date.
 * Quarters map as: Jan–Mar → Q2, Apr–Jun → Q3, Jul–Sep → Q4, Oct–Dec → Q1 of next year.
 */
export function getCurrentActiveSlate(today: Date = new Date()): string {
  const month = today.getMonth() + 1 // 1-12
  let year = today.getFullYear() % 100

  let quarter = 0
  if (month >= 1 && month <= 3) {       // Jan-Mar
    quarter = 2
  } else if (month >= 4 && month <= 6) { // Apr-Jun
    quarter = 3
  } else if (month >= 7 && month <= 9) { // Jul-Sep
    quarter = 4
  } else if (month >= 10 && month <= 12) { // Oct-Dec
    quarter = 1
    year = year + 1 // e.g. Oct-Dec 2026 works on 27-1
  }

  const yearStr = year.toString().padStart(2, "0")
  return `${yearStr}-${quarter}`
}

export type PipelineStatus = "green" | "yellow" | "red"

/**
 * Evaluates the pipeline health of a command based on how far away the
 * next slate target is from today's active slate.
 */
export function getPipelineHealth(cmd: OracleCommand): {
  status: PipelineStatus
  label: string
  detail: string
  approaching: boolean
} {
  const targetSlate = cmd.nextSlateParams?.targetBoardDate
  const req = cmd.nextSlateParams?.requirement ?? "XO"
  const currentNum = slateToNum(getCurrentActiveSlate())
  const targetNum = targetSlate ? slateToNum(targetSlate) : 0
  const distance = targetNum - currentNum // cycles ahead of today

  if (!targetSlate || targetSlate === "TBD" || distance <= 0) {
    return {
      status: "red",
      label: "Overdue",
      detail: distance <= 0
        ? `Slate ${targetSlate} has passed — ${req} slot unfilled`
        : `No slate target — check pipeline dates`,
      approaching: false,
    }
  }

  if (distance === 1) {
    return {
      status: "yellow",
      label: "Act Now",
      detail: `⚠️ ${req} needed via Slate ${targetSlate} — closing soon!`,
      approaching: true,
    }
  }

  return {
    status: "green",
    label: "Healthy",
    detail: `${req} needed via Slate ${targetSlate} (${distance} slates ahead)`,
    approaching: false,
  }
}

/**
 * Maps a fill-vacancy date to the board slate that should slate the
 * replacement. The slate is exactly one calendar cycle before the fill date.
 * Results older than the current active slate are clamped to that slate.
 */
export function calculateTargetBoard(dateStr?: string): string {
  if (!dateStr || dateStr === "Unknown" || dateStr === "TBD") return "TBD"

  let date: Date | null = null
  let d = parseISO(dateStr)
  if (isValid(d)) {
    date = d
  } else if (dateStr.length === 5) {
    d = parse(dateStr, "MMMyy", new Date())
    if (isValid(d)) date = d
  }

  if (!date) return "TBD"

  const month = date.getMonth() + 1 // 1-12
  let year = (date.getFullYear() % 100) - 1

  let quarter = 0
  if (month >= 3 && month <= 5) {       // MAR-MAY
    quarter = 1
  } else if (month >= 6 && month <= 8) { // JUN-AUG
    quarter = 2
  } else if (month >= 9 && month <= 11) { // SEP-NOV
    quarter = 3
  } else if (month === 12 || month === 1 || month === 2) { // DEC-FEB
    quarter = 4
    if (month === 1 || month === 2) {
      year = year - 1
    }
  }

  const yearStr = year.toString().padStart(2, "0")
  const calculatedSlate = `${yearStr}-${quarter}`
  const activeSlate = getCurrentActiveSlate()

  if (calculatedSlate < activeSlate) return activeSlate

  return calculatedSlate
}

/**
 * Predicts the next slate on which a vacancy must be filled for the given
 * command, following the Fleet-Up or Direct CO pipeline logic.
 */
export function predictNextVacancyDate(command: OracleCommand): string {
  const parseAnyDate = (dateStr?: string): Date | null => {
    if (!dateStr || dateStr === "Unknown" || dateStr === "TBD" || dateStr === "N/A") return null
    let d = parseISO(dateStr)
    if (isValid(d)) return d
    if (dateStr.length === 5) {
      d = parse(dateStr, "MMMyy", new Date())
      if (isValid(d)) return d
    }
    return null
  }

  // CO-SM override: if a manual SWO fill date is set, use it directly
  if (command.nextSWOFillDate) {
    const swoDate = parseAnyDate(command.nextSWOFillDate)
    if (swoDate) return calculateTargetBoard(format(swoDate, "yyyy-MM-dd"))
  }

  let baseDate: Date | null = null

  const isFilled = (dateStr?: string) => {
    if (!dateStr || dateStr === "Unknown" || dateStr === "TBD" || dateStr === "N/A" || dateStr === "VACANT") return false
    return true
  }

  if (command.rotationStyle === "DirectCO") {
    // DIRECT CO PIPELINE — trace through community fills to find when a SWO is needed.
    const isNonSWOCurrentCO = command.currentCO?.fillCommunity && command.currentCO.fillCommunity !== "1110"
    const pCOName = command.prospectiveCO?.name
    const pCOHasRealName = !!pCOName && !isPlaceholderName(pCOName)
    const isNonSWOProspectiveCO = command.prospectiveCO?.fillCommunity && command.prospectiveCO.fillCommunity !== "1110"

    if (pCOHasRealName && isFilled(command.prospectiveCO?.prd)) {
      baseDate = parseAnyDate(command.prospectiveCO!.prd)
    } else if (isNonSWOCurrentCO && !pCOHasRealName) {
      baseDate = parseAnyDate(command.currentCO!.prd)
        ?? parseAnyDate(command.currentCO?.timelineData?.q ?? undefined)
    } else if (isFilled(command.prospectiveCO?.timelineData?.i ?? undefined)) {
      baseDate = parseAnyDate(command.prospectiveCO?.timelineData?.i ?? undefined)
    }

    if (!baseDate && isFilled(command.currentCO?.prd)) {
      baseDate = parseAnyDate(command.currentCO!.prd)
    }
  } else {
    // FLEET UP PIPELINE (Standard)
    const isNonSWOInbound = command.inboundXO?.fillCommunity && command.inboundXO.fillCommunity !== "1110"
    const inboundArrival = (command.inboundXO?.reportDate || command.inboundXO?.timelineData?.i) ?? undefined
    const hasInboundXO = !isNonSWOInbound && isFilled(inboundArrival) && !!command.inboundXO?.name && !isPlaceholderName(command.inboundXO?.name)

    if (isNonSWOInbound) {
      const swoNeededDate = command.inboundXO?.timelineData?.k ?? undefined
      if (isFilled(swoNeededDate)) {
        baseDate = parseAnyDate(swoNeededDate)
      } else {
        const deptDate = command.inboundXO?.timelineData?.q ?? undefined
        if (isFilled(deptDate)) baseDate = parseAnyDate(deptDate)
      }
    } else if (!hasInboundXO) {
      if (isFilled(command.currentXO?.prd)) {
        baseDate = parseAnyDate(command.currentXO!.prd)
      }
      if (!baseDate && isFilled(command.currentXO?.timelineData?.k ?? undefined)) {
        baseDate = parseAnyDate(command.currentXO?.timelineData?.k ?? undefined)
      }
      if (!baseDate && isFilled(command.currentCO?.prd)) {
        baseDate = parseAnyDate(command.currentCO!.prd)
      }
      if (!baseDate && isFilled(command.slatedXO?.reportDate)) {
        baseDate = parseAnyDate(command.slatedXO!.reportDate)
      }
    } else {
      // SAFE PIPELINE: Inbound XO is a real SWO — next hole is the Slated XO.
      const slatedName = command.slatedXO?.name || ""
      const slatedIsRealPerson = !isPlaceholderName(slatedName) && /[a-zA-Z]{2,}/.test(slatedName)
      const slatedFleetUp = command.slatedXO?.timelineData?.k

      if (slatedIsRealPerson && isFilled(slatedFleetUp ?? undefined)) {
        baseDate = parseAnyDate(slatedFleetUp ?? undefined)
      } else if (isFilled(command.slatedXO?.reportDate)) {
        baseDate = parseAnyDate(command.slatedXO!.reportDate)
      }

      if (!baseDate) {
        const inboundI = command.inboundXO?.timelineData?.i
        const inboundArrivalFallback = parseAnyDate(inboundI ?? undefined)
        if (inboundArrivalFallback) {
          baseDate = addMonths(inboundArrivalFallback, 18)
        }
      }
    }
  }

  if (!baseDate) return "TBD"
  return calculateTargetBoard(format(baseDate, "yyyy-MM-dd"))
}

/**
 * Returns the RPT sub-label date for the CO-SM table badge (DirectCO or fleet-up).
 */
export function getCoSmRptDisplay(
  command: OracleCommand
): { label: string; date: string } | null {
  const isDirectCO = command.rotationStyle === "DirectCO"

  if (isDirectCO) {
    const isNonSWOCurrentCO = command.currentCO?.fillCommunity && command.currentCO.fillCommunity !== "1110"
    const pCOHasRealName = !!command.prospectiveCO?.name && !isPlaceholderName(command.prospectiveCO.name)

    let date: string | null = null

    if (isNonSWOCurrentCO && !pCOHasRealName) {
      date = command.currentCO?.prd || command.currentCO?.timelineData?.q || null
    } else if (pCOHasRealName && command.prospectiveCO?.timelineData?.q) {
      date = command.prospectiveCO.timelineData.q
    } else {
      date = command.prospectiveCO?.timelineData?.i || command.slatedCO?.timelineData?.i || null
    }

    return date ? { label: "CO RPT", date } : null
  } else {
    const isNonSWOInbound = command.inboundXO?.fillCommunity && command.inboundXO.fillCommunity !== "1110"

    if (isNonSWOInbound) {
      const date = command.inboundXO?.timelineData?.k || command.inboundXO?.timelineData?.q || null
      return date ? { label: "SWO XO RPT", date } : null
    }

    const inboundHasName = !!command.inboundXO?.name && !isPlaceholderName(command.inboundXO.name)

    const date = inboundHasName
      ? (command.slatedXO?.reportDate || command.inboundXO?.timelineData?.k || null)
      : (command.inboundXO?.timelineData?.i || command.slatedXO?.reportDate || null)

    return date ? { label: "XO RPT", date } : null
  }
}

/**
 * Returns the XO RPT date for the CDR CMD table badge.
 */
export function getCdrCmdXoRptDate(command: OracleCommand): string | null {
  const isNonSWOInbound = command.inboundXO?.fillCommunity && command.inboundXO.fillCommunity !== "1110"
  if (isNonSWOInbound) {
    return command.inboundXO?.timelineData?.k || null
  }

  const inboundHasName = !!command.inboundXO?.name && !isPlaceholderName(command.inboundXO.name)

  if (inboundHasName) {
    return command.slatedXO?.reportDate || command.inboundXO?.timelineData?.k || null
  }

  return command.inboundXO?.timelineData?.i || command.slatedXO?.reportDate || null
}
