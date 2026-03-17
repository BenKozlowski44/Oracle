/**
 * use-oracle-handlers.ts
 *
 * Custom hook that owns all oracle-table action handlers.
 * Extracted from OracleTable so the parent component stays focused
 * on state, filtering, and rendering.
 */

import { OracleCommand, Officer, Metrics } from "@/lib/types"
import { saveError, notifySuccess } from "@/lib/notify"
import {
    saveOracleCommand,
    saveOfficers,
    saveMetrics,
    deleteOracleCommand,
} from "@/services/storage"
import { predictNextVacancyDate } from "@/lib/slate-logic"
import { validateCommand } from "@/lib/validators"
import { getCommandAlerts } from "@/lib/alerts"

// ── Context type ─────────────────────────────────────────────────────────────

export interface OracleHandlerContext {
    data: OracleCommand[]
    setData: (d: OracleCommand[]) => void
    metrics: Metrics
    setMetrics: (m: Metrics) => void
    officers: Officer[]
    setOfficers: (o: Officer[]) => void
    setIsEditOpen: (v: boolean) => void
    setEditingCommand: (c: OracleCommand | null) => void
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useOracleHandlers({
    data,
    setData,
    metrics,
    setMetrics,
    officers,
    setOfficers,
    setIsEditOpen,
    setEditingCommand,
}: OracleHandlerContext) {

    // ── Open edit dialog ──────────────────────────────────────────────────
    const handleEditClick = (cmd: OracleCommand) => {
        setEditingCommand(cmd)
        setIsEditOpen(true)
    }

    // ── Open edit dialog for a new command ───────────────────────────────
    const handleAddClick = (type: "CDR" | "COSM") => {
        const isCoSM = type === "COSM"
        const newCommand: OracleCommand = {
            id: `cmd_new_${Date.now()}`,
            name: isCoSM ? "New CO-SM Command" : "New Command",
            uic: "N/A",
            platform: isCoSM ? "CO-SM" : "DDG",
            location: "Norfolk, VA",
            tags: isCoSM ? ["CO-SM"] : [],
            currentCO: { name: "", prd: "" },
            currentXO: { name: "", prd: "" },
            nextSlateParams: { requirement: "CO", targetBoardDate: "TBD" },
            timeline: {},
        }
        setEditingCommand(newCommand)
        setIsEditOpen(true)
    }

    // ── Save (from edit dialog) ───────────────────────────────────────────
    const handleSaveCommand = async (updatedCommand: OracleCommand) => {
        // Validate before touching state or storage
        const validationErrors = validateCommand(updatedCommand)
        if (validationErrors.length > 0) {
            saveError(`Cannot save — fix the following:\n• ${validationErrors.join("\n• ")}`)
            return
        }

        // Track conflict resolution
        const originalCommand = data.find((c) => c.id === updatedCommand.id)
        let newMetrics = { ...metrics }

        if (originalCommand) {
            const originalAlerts = getCommandAlerts(originalCommand)
            const newAlerts = getCommandAlerts(updatedCommand)
            if (originalAlerts.length > newAlerts.length) {
                newMetrics.resolvedConflicts += originalAlerts.length - newAlerts.length
            }
        }

        setMetrics(newMetrics)

        const exists = data.some((c) => c.id === updatedCommand.id)
        const newData = exists
            ? data.map((cmd) => (cmd.id === updatedCommand.id ? updatedCommand : cmd))
            : [...data, updatedCommand]

        setData(newData)

        try {
            saveOracleCommand(updatedCommand)
            saveMetrics(newMetrics)
            notifySuccess("Command saved")
        } catch (error) {
            console.error("Error saving data:", error)
            saveError("Failed to save command — changes may not have persisted")
        }
    }

    // ── Delete (from edit dialog) ─────────────────────────────────────────
    const handleDeleteCommand = async (commandId: string) => {
        const newData = data.filter((c) => c.id !== commandId)
        setData(newData)
        setIsEditOpen(false)

        try {
            deleteOracleCommand(commandId)
            notifySuccess("Command deleted")
        } catch (error) {
            console.error(error)
            saveError("Failed to delete command")
        }
    }

    // ── Internal: validated save with fresh slate date ────────────────────
    const persistUpdate = (
        updatedCommand: OracleCommand,
        currentOfficers: Officer[],
        message: string
    ) => {
        // Always recompute targetBoardDate before persisting so the stored JSON
        // never drifts from the live calculation.
        const freshSlate = predictNextVacancyDate(updatedCommand)
        const commandToSave: OracleCommand =
            freshSlate !== "TBD"
                ? {
                      ...updatedCommand,
                      nextSlateParams: {
                          ...updatedCommand.nextSlateParams,
                          targetBoardDate: freshSlate,
                      },
                  }
                : updatedCommand

        const validationErrors = validateCommand(commandToSave)
        if (validationErrors.length > 0) {
            saveError(`Cannot save — fix the following:\n• ${validationErrors.join("\n• ")}`)
            return
        }

        const newData = data.map((c) =>
            c.id === commandToSave.id ? commandToSave : c
        )
        setData(newData)
        setIsEditOpen(false)

        try {
            saveOracleCommand(commandToSave)
            saveOfficers(currentOfficers)
            notifySuccess(message)
        } catch (error) {
            console.error(error)
            saveError("Failed to save: " + message)
        }
    }

    // ── CO Turnover ───────────────────────────────────────────────────────
    const handleCOTurnover = async (commandId: string, cocDate: string) => {
        const cmd = data.find((c) => c.id === commandId)
        if (!cmd) return

        // Archive current CO to bank as PCC
        const newPCC: Officer = {
            id: `pcc-${Date.now()}`,
            name: cmd.currentCO.name,
            rank: "CDR",
            designator: "1110",
            currentCommand: "PCC (Post-Command)",
            prd: "N/A",
            preferences: [],
            status: "PCC",
            notes: `CMD Tour: ${cmd.name}`,
            yearGroup: 0,
            cocDate: cocDate || undefined,
        }
        const newOfficers = [...(officers || []), newPCC]
        setOfficers(newOfficers)

        // Promote: P-CO fleets up if named, otherwise XO fleets up directly
        let newCO
        let newXO = cmd.currentXO
        let newProspectiveCO = cmd.prospectiveCO

        if (cmd.prospectiveCO && cmd.prospectiveCO.name !== "") {
            newCO = {
                name: cmd.prospectiveCO.name,
                prd: cmd.prospectiveCO.prd,
                timelineData: cmd.prospectiveCO.timelineData,
            }
            newProspectiveCO = undefined
        } else {
            newCO = {
                name: cmd.currentXO.name,
                prd: cmd.currentXO.prd,
                timelineData: cmd.currentXO.timelineData,
            }
            newXO = { name: "VACANT", prd: "TBD" }
        }

        const updatedCommand: OracleCommand = {
            ...cmd,
            currentCO: newCO,
            currentXO: newXO,
            prospectiveCO: newProspectiveCO,
        }

        await persistUpdate(updatedCommand, newOfficers, "CO Turnover Executed (PCC Archived)")
    }

    // ── XO Fleet Up (P-XO → XO, current XO → P-CO) ──────────────────────
    const handleXOFleetUp = async (commandId: string) => {
        const cmd = data.find((c) => c.id === commandId)
        if (!cmd) return

        if (!cmd.inboundXO) {
            alert("No Inbound XO (P-XO) to fleet up.")
            return
        }

        const newProspectiveCO = { name: cmd.currentXO.name, prd: cmd.currentXO.prd }
        const newXO = {
            name: cmd.inboundXO.name,
            prd: "TBD",
            timelineData: cmd.inboundXO.timelineData,
        }

        const updatedCommand: OracleCommand = {
            ...cmd,
            currentXO: newXO,
            inboundXO: undefined,
            prospectiveCO: newProspectiveCO,
            fleetUpProgress: { isic: false, tycom: false, pco: false, orders: false, coc: false },
        }

        await persistUpdate(updatedCommand, officers, "XO Fleet Up / P-CO Stashed")
    }

    // ── PCO Fleet Up (Prospective CO → Current CO) ────────────────────────
    const handlePCOFleetUp = async (commandId: string) => {
        const cmd = data.find((c) => c.id === commandId)
        if (!cmd) return

        if (!cmd.prospectiveCO?.name) {
            alert("No Prospective CO (PCO) in this slot.")
            return
        }

        // Archive current CO as PCC
        const newPCC: Officer = {
            id: `pcc_${Date.now()}`,
            rank: "CDR",
            name: cmd.currentCO.name,
            designator: "1110",
            currentCommand: "PCC (Post-Command)",
            prd: "N/A",
            preferences: [],
            status: "PCC",
            notes: `CMD Tour: ${cmd.name}`,
            yearGroup: 0,
        }
        const newOfficers = [...(officers || []), newPCC]
        setOfficers(newOfficers)

        const newCO = {
            name: cmd.prospectiveCO.name,
            prd: cmd.prospectiveCO.prd,
            timelineData: cmd.prospectiveCO.timelineData,
        }

        const updatedCommand: OracleCommand = {
            ...cmd,
            currentCO: newCO,
            prospectiveCO: undefined,
        }

        await persistUpdate(
            updatedCommand,
            newOfficers,
            `PCO Fleet-Up: ${cmd.prospectiveCO.name} now CO`
        )
    }

    return {
        handleEditClick,
        handleAddClick,
        handleSaveCommand,
        handleDeleteCommand,
        persistUpdate,
        handleCOTurnover,
        handleXOFleetUp,
        handlePCOFleetUp,
    }
}
