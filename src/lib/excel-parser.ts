import * as XLSX from 'xlsx';
import type { OracleCommand, Officer } from './types';
import { calculateTargetBoard } from './utils';

// Helper: Generate ID from name
function generateId(name: string): string {
    return String(name).toLowerCase().replace(/[^a-z0-9]/g, '') + '_' + String(name).length;
}

// ... (existing helpers)

// Helper to convert Excel serial date to JS Date string (YYYY-MM-DD)
function excelDateToJSDate(serial: number): string {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);

    const year = date_info.getFullYear();
    const month = String(date_info.getMonth() + 1).padStart(2, '0');
    const day = String(date_info.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Helper to parse a date string or serial number
function parseDate(value: any): string {
    if (!value) return "Unknown";
    if (typeof value === 'number') {
        // Check if it's YYYYMM (e.g. 202606)
        if (value > 200000 && value < 210000) {
            const str = String(value);
            const year = str.substring(0, 4);
            const month = str.substring(4, 6);
            return `${year}-${month}-01`;
        }
        return excelDateToJSDate(value);
    }
    // Handle string YYYYMM
    if (typeof value === 'string' && /^\d{6}$/.test(value)) {
        const year = value.substring(0, 4);
        const month = value.substring(4, 6);
        return `${year}-${month}-01`;
    }
    // If it's a string, try to parse it or return as is
    return String(value);
}

export function parseOracleExcel(fileData: ArrayBuffer): OracleCommand[] {
    const workbook = XLSX.read(fileData, { type: 'array' });
    const commands: OracleCommand[] = [];
    let commandIdCounter = 1;

    // Iterate over all sheets except exclusions
    workbook.SheetNames.forEach(sheetName => {
        if (sheetName === "Summary" || sheetName.includes("Sheet")) return;

        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

        if (sheetName === "CO-SM") {
            // Special handling for CO-SM sheet
            for (let i = 0; i < jsonData.length; i++) {
                const row = jsonData[i];
                const colA = row[0];

                // Heuristic: Command row usually contains " - " and looks like "NAME - UIC - NOTES"
                // AND Column B (index 1) should be empty/null (unlike Incumbent rows which have Lineal number)
                if (typeof colA === 'string' && colA.includes(" - ") && !row[1]) {
                    const parts = colA.split(" - ");
                    const commandName = parts[0].trim();
                    const uic = parts[1]?.trim() || "Unknown";

                    // Incumbent is on the next row (i+1)
                    if (i + 1 < jsonData.length) {
                        const incumbentRow = jsonData[i + 1];
                        const incumbentName = incumbentRow[0]; // Col A

                        // Parse dates (using indices from inspection: 12=Start?, 16=End?)
                        // Row 2 Headers: ... COC (idx 12) ... COC (idx 16)
                        const startDate = parseDate(incumbentRow[12]);
                        const endDate = parseDate(incumbentRow[16]);

                        // Construct OracleCommand
                        const id = generateId(commandName);
                        const cmd: OracleCommand = {
                            id: id,
                            name: commandName,
                            uic: uic,
                            location: "Special Mission",
                            tags: ["CO-SM"],
                            platform: "CO-SM",
                            currentCO: {
                                name: incumbentName || "Vacant",
                                prd: endDate,
                                timelineData: {
                                    i: startDate, // approximating start
                                    k: startDate,
                                    m: startDate,
                                    q: endDate
                                }
                            },
                            currentXO: { name: "N/A", prd: "N/A", timelineData: { i: "", k: "", m: "", q: "" } },
                            inboundXO: { name: "N/A", reportDate: "", timelineData: { i: "", k: "", m: "", q: "" } },
                            nextSlateParams: { targetBoardDate: "TBD", requirement: "CO" },
                            timeline: {
                                xoReport: "",
                                xoTurnover: "",
                                coc: startDate,
                                coTurnover: endDate
                            },
                            slatedXO: { name: "N/A", reportDate: "", timelineData: { i: "", k: "", m: "", q: "" } }
                        };
                        commands.push(cmd);
                    }
                }
            }
            return;
        }

        // Standard Sheets Logic
        // Iterate rows
        // We look for blocks where a row has a SHIP NAME in column B (index 1) usually
        // And then we expect the next 4 rows to follow the pattern

        for (let i = 0; i < jsonData.length; i++) {
            const row = jsonData[i];
            const colB = row[1]; // Column B seems to be where names are

            // Heuristic: Check if this looks like a Ship Name row
            // It usually has "USS" or is a string 
            if (typeof colB === 'string' && (colB.includes("USS") || colB.includes("LCS") || colB.includes("DDG"))) {
                // Potential hit. 
                // Let's see if we have enough rows below
                if (i + 4 < jsonData.length) {
                    const shipNameRaw = colB;
                    // Extract UIC if present
                    let name = shipNameRaw;
                    let uic = "N/A";
                    let platform = "N/A";

                    // Platform extraction
                    const platformRegex = /\(([A-Z]{2,4}\s*\d+)\)/;
                    const typeMatch = shipNameRaw.match(platformRegex);
                    if (typeMatch) {
                        platform = typeMatch[1];
                        // Clean name here too
                        name = name.replace(typeMatch[0], '').trim().replace(/\s*-\s*$/, '');
                    } else {
                        if (shipNameRaw.includes("DDG")) platform = "DDG";
                        else if (shipNameRaw.includes("LCS")) platform = "LCS";
                        else if (shipNameRaw.includes("LSD")) platform = "LSD";
                        else if (shipNameRaw.includes("LPD")) platform = "LPD";
                        else if (shipNameRaw.includes("CG")) platform = "CG";
                        else if (shipNameRaw.includes("MCM")) platform = "MCM";
                    }

                    const uicMatch = shipNameRaw.match(/[-–]?\s*(\d{5})\s*$/);
                    if (uicMatch) {
                        uic = uicMatch[1];
                        name = shipNameRaw.replace(uicMatch[0], '').trim();
                    }

                    // Row i+1: CO
                    const coRow = jsonData[i + 1];
                    const coName = coRow && coRow[1] ? String(coRow[1]) : "Unknown";
                    const coPrd = coRow && coRow[8] ? parseDate(coRow[8]) : "Unknown"; // adjustments for col I?

                    // Row i+2: XO
                    const xoRow = jsonData[i + 2];
                    const xoName = xoRow && xoRow[1] ? String(xoRow[1]) : "Unknown";
                    const xoPrd = xoRow && xoRow[8] ? parseDate(xoRow[8]) : "Unknown";

                    // Row i+3: Inbound XO
                    const inboundRow = jsonData[i + 3];
                    const inboundName = inboundRow && inboundRow[1] ? String(inboundRow[1]) : "";
                    const inboundReport = inboundRow && inboundRow[8] ? parseDate(inboundRow[8]) : "";

                    // Row i+4: Slate Validation
                    const slateRow = jsonData[i + 4];
                    const slateReq = slateRow && slateRow[1] ? String(slateRow[1]) : "XO";

                    // Compute the Target Board dynamically based on the Inbound XO report date per user feature request
                    const targetBoard = calculateTargetBoard(inboundReport);
                    // Note: Column indices might vary. Based on previous parsing, slate info was often in col E (4) or F (5)

                    // Standardize Location
                    let location = sheetName;
                    if (location.includes("Norfolk")) location = "Norfolk, VA";
                    if (location.includes("San Diego")) location = "San Diego, CA";
                    if (location.includes("Mayport")) location = "Mayport, FL";
                    if (location.includes("Pearl")) location = "Pearl Harbor, HI";
                    if (location.includes("Everett")) location = "Everett, WA";
                    if (location.includes("Sasebo")) location = "Sasebo, JP";
                    if (location.includes("Rota")) location = "Rota, SP";
                    if (location.includes("Bahrain")) location = "Manama, BH";

                    const command: OracleCommand = {
                        id: `cmd_${Date.now()}_${commandIdCounter++}`,
                        name: name,
                        uic: uic,
                        platform: platform,
                        location: location,
                        currentCO: {
                            name: coName,
                            prd: coPrd
                        },
                        currentXO: {
                            name: xoName,
                            prd: xoPrd
                        },
                        inboundXO: inboundName ? {
                            name: inboundName,
                            reportDate: inboundReport
                        } : undefined,
                        nextSlateParams: {
                            targetBoardDate: targetBoard,
                            requirement: slateReq as "XO" | "CO"
                        },
                        timeline: {}
                    };

                    commands.push(command);
                    i += 4; // Skip the block
                }
            }
        }
    });

    return commands;
}

export function parseBankExcel(fileData: ArrayBuffer): Officer[] {
    const workbook = XLSX.read(fileData, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // Read as JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

    return jsonData.map((row: any) => {
        // Map Excel columns to Officer interface
        // Expecting keys: Name, Rank, Designator, CurrentCommand, PRD
        // Adjust keys based on actual file headers if needed (case insensitive matching?)

        const name = String(row['Name'] || row['name'] || "Unknown");
        const rank = row['Rank'] || row['rank'] || "LT"; // Default
        const designator = String(row['Designator'] || row['designator'] || row['Desig'] || "1110");
        const currentCommand = row['Command'] || row['CurrentCommand'] || row['Current Command'] || row['command'] || "Unassigned";

        // New Fields
        const yearGroup = parseInt(row['YG'] || row['Year Group'] || row['yg'] || 0);
        const billet = row['BTITLE'] || row['Billet'] || row['billet'];
        const csr = row['CSR'] || row['csr'];
        const assignedSlate = String(row['Slate'] || row['Assigned Slate'] || row['slate'] || row['LOOK'] || "");
        const listShift = String(row['List Shift'] || row['list shift'] || "");
        let prd = "Unknown";
        if (row['PRD']) {
            prd = parseDate(row['PRD']);
        }

        let statusRaw = row['Status'] || row['status'] || row['CO-A MILESTONE'] || "Available";
        let status: any = "Available";

        if (statusRaw === "FF" || statusRaw === "Ready FF") {
            status = "Ready FF";
        } else if (statusRaw === "Available") {
            status = "Available";
        } else if (statusRaw === "Defer") {
            status = "Defer";
        } else if (statusRaw === "Family Planning") {
            status = "Family Planning";
        } else if (statusRaw === "War College") {
            status = "War College";
        } else if (statusRaw === "Joint Lock") {
            status = "Joint Lock";
        } else if (statusRaw === "Hold") {
            status = "Hold";
        } else if (statusRaw === "Retire") {
            status = "Retire";
        } else if (statusRaw === "Policy") {
            status = "Policy";
        } else if (statusRaw === "List Shift") {
            status = "List Shift";
        } else {
            // Fallback for empty or unknown
            status = statusRaw || "Available";
        }

        return {
            id: generateId(name),
            rank: rank,
            name: name,
            designator: designator,
            currentCommand: currentCommand,
            prd: prd,
            preferences: [],
            status: status,
            notes: "",
            yearGroup: yearGroup,
            billet: billet,
            csr: csr,
            assignedSlate: assignedSlate,
            preferredLocations: [
                row['HP1'] || row['Location 1'] || row['Loc1'],
                row['HP2'] || row['Location 2'] || row['Loc2'],
                row['HP3'] || row['Location 3'] || row['Loc3'],
                row['HP4'] || row['Location 4'] || row['Loc4'],
                row['HP5'] || row['Location 5'] || row['Loc5']
            ].filter(Boolean),
            preferredPlatforms: [
                row['P1'] || row['Platform 1'] || row['Plat1'],
                row['P2'] || row['Platform 2'] || row['Plat2'],
                row['P3'] || row['Platform 3'] || row['Plat3']
            ].filter(Boolean),
            preferencePriority: (function (val) {
                if (!val) return null;
                const v = String(val).toUpperCase();
                if (v.startsWith("H") || v === "LOCATION" || v === "HOMEPORT") return "Homeport";
                if (v === "P" || v === "PLATFORM") return "Platform";
                return null;
            })(row['H/P'] || row['Priority']),
            listShift: listShift || undefined
        } as Officer;
    });
}
