import ExcelJS from 'exceljs';
import type { OracleCommand, Officer } from './types';
import { calculateTargetBoard } from './utils';

// Helper: Generate ID from name
function generateId(name: string): string {
    return String(name).toLowerCase().replace(/[^a-z0-9]/g, '') + '_' + String(name).length;
}

// Helper to parse a date string or serial number
function parseDate(value: any): string {
    if (!value) return "Unknown";

    // ExcelJS handles dates automatically as JS Date objects when possible
    if (value instanceof Date) {
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const day = String(value.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    if (typeof value === 'number') {
        // Check if it's YYYYMM (e.g. 202606)
        if (value > 200000 && value < 210000) {
            const str = String(value);
            const year = str.substring(0, 4);
            const month = str.substring(4, 6);
            return `${year}-${month}-01`;
        }
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

// Helper to get raw value from ExcelJS cell (handles rich text/formulas)
function getCellValue(cell: ExcelJS.Cell): any {
    if (!cell || cell.value === null) return null;
    if (cell.type === ExcelJS.ValueType.Formula && cell.result !== undefined) {
        return cell.result;
    }
    if (cell.type === ExcelJS.ValueType.RichText && cell.value && typeof cell.value === 'object' && 'richText' in cell.value) {
        return cell.value.richText.map(rt => rt.text).join('');
    }
    return cell.value;
}

export async function parseOracleExcel(fileData: ArrayBuffer): Promise<OracleCommand[]> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(fileData);

    const commands: OracleCommand[] = [];
    let commandIdCounter = 1;

    // Iterate over all sheets except exclusions
    workbook.eachSheet((worksheet, sheetId) => {
        const sheetName = worksheet.name;
        if (sheetName === "Summary" || sheetName.includes("Sheet")) return;

        // Convert worksheet to a 2D array of values for easier scanning
        const jsonData: any[][] = [];
        worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            const rowData: any[] = [];
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                rowData[colNumber - 1] = getCellValue(cell);
            });
            jsonData[rowNumber - 1] = rowData; // 0-indexed for array
        });

        if (sheetName === "CO-SM") {
            // Special handling for CO-SM sheet
            for (let i = 0; i < jsonData.length; i++) {
                if (!jsonData[i]) continue;

                const row = jsonData[i];
                const colA = row[0];

                // Heuristic: Command row usually contains " - " and looks like "NAME - UIC - NOTES"
                // AND Column B (index 1) should be empty/null (unlike Incumbent rows which have Lineal number)
                if (typeof colA === 'string' && colA.includes(" - ") && !row[1]) {
                    const parts = colA.split(" - ");
                    const commandName = parts[0].trim();
                    const uic = parts[1]?.trim() || "Unknown";

                    // Incumbent is on the next row (i+1)
                    if (i + 1 < jsonData.length && jsonData[i + 1]) {
                        const incumbentRow = jsonData[i + 1];
                        const incumbentName = incumbentRow[0]; // Col A

                        // Parse dates (using indices from inspection: 12=Start?, 16=End?)
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
                                    i: startDate,
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
        for (let i = 0; i < jsonData.length; i++) {
            if (!jsonData[i]) continue;

            const row = jsonData[i];
            const colB = row[1]; // Column B seems to be where names are

            if (typeof colB === 'string' && (colB.includes("USS") || colB.includes("LCS") || colB.includes("DDG"))) {
                // Potential hit block
                if (i + 4 < jsonData.length) {
                    const shipNameRaw = colB;
                    let name = shipNameRaw;
                    let uic = "N/A";
                    let platform = "N/A";

                    const platformRegex = /\(([A-Z]{2,4}\s*\d+)\)/;
                    const typeMatch = shipNameRaw.match(platformRegex);
                    if (typeMatch) {
                        platform = typeMatch[1];
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
                    const coRow = jsonData[i + 1] || [];
                    const coName = coRow[1] ? String(coRow[1]) : "Unknown";
                    const coPrd = coRow[8] ? parseDate(coRow[8]) : "Unknown";

                    // Row i+2: XO
                    const xoRow = jsonData[i + 2] || [];
                    const xoName = xoRow[1] ? String(xoRow[1]) : "Unknown";
                    const xoPrd = xoRow[8] ? parseDate(xoRow[8]) : "Unknown";

                    // Row i+3: Inbound XO
                    const inboundRow = jsonData[i + 3] || [];
                    const inboundName = inboundRow[1] ? String(inboundRow[1]) : "";
                    const inboundReport = inboundRow[8] ? parseDate(inboundRow[8]) : "";

                    // Row i+4: Slate Validation
                    const slateRow = jsonData[i + 4] || [];
                    const slateReq = slateRow[1] ? String(slateRow[1]) : "XO";

                    const targetBoard = calculateTargetBoard(inboundReport);

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
                        currentCO: { name: coName, prd: coPrd },
                        currentXO: { name: xoName, prd: xoPrd },
                        inboundXO: inboundName ? { name: inboundName, reportDate: inboundReport } : undefined,
                        nextSlateParams: { targetBoardDate: targetBoard, requirement: slateReq as "XO" | "CO" },
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

export async function parseBankExcel(fileData: ArrayBuffer): Promise<Officer[]> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(fileData);

    // Get first sheet
    const worksheet = workbook.worksheets[0];
    if (!worksheet) return [];

    // Map headers
    const headers: Record<string, number> = {};
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell, colNumber) => {
        const value = getCellValue(cell);
        if (value) headers[String(value).trim().toLowerCase()] = colNumber;
    });

    const officers: Officer[] = [];

    // Read rows starting from row 2
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header

        // Helper to get value by header name
        const getVal = (...possibleHeaders: string[]) => {
            for (const h of possibleHeaders) {
                const col = headers[h.toLowerCase()];
                if (col) return getCellValue(row.getCell(col));
            }
            return null;
        };

        const rawName = getVal('name', 'Name');
        const name = String(rawName || "Unknown");
        // Skip empty rows where name is also suspiciously missing or just whitespace
        if (!rawName || name.trim() === '') return;

        const rank = String(getVal('rank', 'Rank') || "LT");
        const designator = String(getVal('designator', 'desig') || "1110");
        const currentCommand = String(getVal('command', 'currentcommand', 'current command') || "Unassigned");

        const yearGroup = parseInt(String(getVal('yg', 'year group') || 0)) || 0;
        const billet = String(getVal('btitle', 'billet') || "");
        const csr = String(getVal('csr') || "");
        const assignedSlate = String(getVal('slate', 'assigned slate', 'look') || "");
        const listShift = String(getVal('list shift') || "");

        let prd = "Unknown";
        const prdVal = getVal('prd');
        if (prdVal) prd = parseDate(prdVal);

        let statusRaw = String(getVal('status', 'co-a milestone') || "Available");
        let status: any = "Available";

        if (statusRaw === "FF" || statusRaw === "Ready FF") status = "Ready FF";
        else if (statusRaw === "Available") status = "Available";
        else if (statusRaw === "Defer") status = "Defer";
        else if (statusRaw === "Family Planning") status = "Family Planning";
        else if (statusRaw === "War College") status = "War College";
        else if (statusRaw === "Joint Lock") status = "Joint Lock";
        else if (statusRaw === "Hold") status = "Hold";
        else if (statusRaw === "Retire") status = "Retire";
        else if (statusRaw === "Policy") status = "Policy";
        else if (statusRaw === "List Shift") status = "List Shift";
        else status = statusRaw || "Available";

        const priorityVal = getVal('h/p', 'priority');
        const preferencePriority = (function (val) {
            if (!val) return null;
            const v = String(val).toUpperCase();
            if (v.startsWith("H") || v === "LOCATION" || v === "HOMEPORT") return "Homeport";
            if (v === "P" || v === "PLATFORM") return "Platform";
            return null;
        })(priorityVal);

        officers.push({
            id: generateId(name),
            rank: rank as any, // bypassing strict enum for import
            name,
            designator: designator as any,
            currentCommand,
            prd,
            preferences: [],
            status,
            notes: "",
            yearGroup,
            billet,
            csr,
            assignedSlate,
            preferredLocations: [
                getVal('hp1', 'location 1', 'loc1'),
                getVal('hp2', 'location 2', 'loc2'),
                getVal('hp3', 'location 3', 'loc3'),
                getVal('hp4', 'location 4', 'loc4'),
                getVal('hp5', 'location 5', 'loc5')
            ].map(String).filter(v => v !== "null" && v !== ""),
            preferredPlatforms: [
                getVal('p1', 'platform 1', 'plat1'),
                getVal('p2', 'platform 2', 'plat2'),
                getVal('p3', 'platform 3', 'plat3')
            ].map(String).filter(v => v !== "null" && v !== ""),
            preferencePriority,
            listShift: listShift || undefined
        });
    });

    return officers;
}
