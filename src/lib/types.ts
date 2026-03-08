export type Rank = "ENS" | "LTJG" | "LT" | "LCDR" | "CDR" | "CAPT" | "ADM"

export type Designator = "1110" | "1310" | "1320" | "1120" | "3100" | "1830" | "1117"

export type BilletRole = "CO" | "XO" | "CO-SM" | "NO RELIEF"

export type OfficerStatus =
    | "Available"
    | "Verify PD2"
    | "Slated"
    | "Defer"
    | "PCC"
    | "Hold"
    | "Ready FF"
    | "Joint Lock"
    | "War College"
    | "Family Planning"
    | "List Shift"
    | "Retire"
    | "Policy"
    | "Declined"
    | "No Opportunity"
    | "De-screened"
    | "FF (EAST COAST)"
    | "FF (SDGO/Pearl/YOKO/ROTA)"
    | "FF (YOKO)"
    | "FF (NORFOLK DDG)"
    | "FF (SDGO over another)"
    | "FF (Everett)"

// Helper for Excel Columns
interface TimelineData {
    i?: string | null
    k?: string | null
    m?: string | null
    q?: string | null
}

export interface OracleCommand {
    id: string
    name: string
    uic: string
    platform?: string
    location: string
    currentCO: {
        name: string
        prd: string
        timelineData?: TimelineData
    }
    currentXO: {
        name: string
        prd: string
        timelineData?: TimelineData
    }
    inboundXO?: { // The "P-XO"
        name: string
        reportDate: string
        timelineData?: TimelineData
    }
    prospectiveCO?: { // The P-CO (Post-XO, Pre-CO)
        name: string
        prd: string
    }
    slatedXO?: { // The "Slated XO" (Row 5 - Forecast)
        name: string
        reportDate: string
        timelineData?: TimelineData
    }
    nextSlateParams: {
        targetBoardDate: string
        requirement: BilletRole // What are we filling? Usually XO for flow-up
    }
    // Timeline Visualization Fields (Source: Excel Cols I, K, M, R)
    timeline: {
        xoReport?: string // Col I: XO Report Date
        xoTurnover?: string // Col K: XO -> P-CO (Fleet Up)
        coc?: string // Col M: Change of Command (P-CO -> CO)
        coTurnover?: string // Col R: CO Departure (CO -> Bank)
    }
    fleetUpProgress?: {
        isic: boolean
        tycom: boolean
        pco: boolean
        orders: boolean
        coc: boolean
    }
    tags?: string[] // e.g. ["CO-SM"]
    rotationStyle?: "FleetUp" | "DirectCO"
    tourLength?: number
    notes?: string
}

export interface Officer {
    id: string
    rank: Rank
    name: string
    designator: Designator
    currentCommand: string
    prd: string // ISO Date string
    preferences: string[]
    status: OfficerStatus
    notes?: string
    screened?: string[] // e.g. ["CO-SM"]
    yearGroup: number
    assignedSlate?: string
    billet?: string
    csr?: string
    preferredLocations?: string[]
    preferredPlatforms?: string[]
    preferencePriority?: "Homeport" | "Platform" | null
    tentativeSlate?: string
    listShift?: string // Dedicated routing for the UI tabs
    cosmPreferences?: string[] // Up to 15 specific ranked preferences for CO-SM
    cocDate?: string // ISO date — the actual Change of Command date (separate from when relieve action is done)
}

export interface Metrics {
    resolvedConflicts: number
}

export interface Billet {
    id: string
    unitName: string
    uic: string
    location: string
    role: BilletRole
    fillDate: string // ISO Date string
    incumbent: string
    status: "Open" | "Filled" | "Pending"
    assignedOfficerId?: string
}

export interface SlateRequirement {
    id: string
    commandId: string
    commandName: string
    role: BilletRole // CO or XO
    incumbent: string
    incumbentPrd: string
    status: "Draft" | "Confirmed" | "Filled"
    filledBy?: string // Officer ID
}



export interface TourEntry {
    period: string       // e.g. "First Division Officer Tour"
    ship?: string        // Ship/Command name
    platform?: string    // e.g. DDG, CG, LCS
    ofrpPhase?: string   // Maintenance, Basic, Integrated, Sustainment, Deployed, etc.
    monthsUW?: string
    monthsDeployed?: string
    monthsAsOOD?: string
    oodEvolutions?: string   // # of times stood OOD watch
    connEvolutions?: string  // # of times stood CONN watch
    joodEvolutions?: string  // # of times stood JOOD watch
}

export interface SlateCandidateProfile {
    id: string
    slateId: string
    officerId: string
    // Preferences are now Platform + Location (e.g. "DDG-Norfolk")
    preferences: {
        key: string // "DDG-Norfolk"
        rank: number // 1 = Top Choice
    }[]
    experienceSummary: string
    availabilityDate: string // ISO Date
    notes: string
    flagContact?: {
        name: string
        relationship: string // e.g. "ISIC", "CO during DH tour", "Board member"
    }
    tourHistory?: TourEntry[]
    jpme?: string
    wti?: string
    contactInfo?: {
        workEmail?: string
        homeEmail?: string
        workPhone?: string
        personalPhone?: string
        mailingAddress?: string // Street, City, State ZIP
    }
}


export interface Slate {
    id: string
    name: string // e.g. "FY26-2"
    windowStart: string // ISO Date
    windowEnd: string // ISO Date
    requirements: SlateRequirement[]
    candidates: string[] // Officer IDs in the "Bench" for this slate
    candidateProfiles?: SlateCandidateProfile[] // New field
    status: "Active" | "Archived"
    approvals: {
        branchHead: boolean
        pers41: boolean
        swcc: boolean
        swoboss: boolean
    }
}

export type BoardResult = "Pending" | "Selected CO Afloat" | "Selected XO Afloat" | "Selected XO Afloat*" | "Selected XO-SM" | "Selected CO-SM" | "FOS" | "Deferred" | "Pulled"

export interface BoardCandidate {
    id: string // Unique ID for this board instance
    name: string
    rank: Rank | string
    designator: Designator | string
    commissioningDate?: string // Required to calculate YCS
    ycs: number // Calculated Years Commissioned Service at board time
    lookTracker: "1st Look" | "2nd Look" | "3rd Look"
    rawData?: Record<string, string> // To store all generic Excel columns

    // Board Prep Fields
    deferralRequested: boolean
    deferralApproved: boolean
    specialRequests?: string
    boardNotes?: string

    // Final Result
    result: BoardResult
}

export interface CdrCmdBoard {
    id: string
    fy: string // e.g. "FY28"
    boardDate: string // e.g. "2025-12-01"
    status: "Open" | "Closed"
    candidates: BoardCandidate[]
}
