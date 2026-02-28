import ExcelJS from 'exceljs';
import path from 'path';
import { Officer } from './types';

const FILE_PATH = path.join(process.cwd(), 'data', 'Adding Bank Officers FF.xlsx');

export async function updateOfficerInExcel(officer: Officer): Promise<{ success: boolean; message?: string }> {
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(FILE_PATH);

        // Access the first worksheet
        const worksheet = workbook.worksheets[0];
        if (!worksheet) {
            return { success: false, message: "Sheet 1 not found." };
        }

        let rowFound = false;

        // Iterate rows to find the officer
        worksheet.eachRow((row, rowNumber) => {
            if (rowFound) return;

            // Name is in Column 2 (Index 2 in 1-based indexing)
            // Header Check: Row 1 has headers. Data starts Row 2.
            if (rowNumber === 1) return;

            const nameCell = row.getCell(2).value;
            const currentName = nameCell ? String(nameCell).trim() : "";

            if (currentName === officer.name) {
                // Found match! Update all mapped properties

                if (officer.yearGroup) row.getCell(3).value = officer.yearGroup;
                if (officer.designator) row.getCell(4).value = Number(officer.designator) || officer.designator;
                if (officer.rank) row.getCell(5).value = officer.rank;
                if (officer.csr !== undefined) row.getCell(6).value = officer.csr;
                if (officer.billet !== undefined) row.getCell(7).value = officer.billet;
                if (officer.currentCommand !== undefined) row.getCell(8).value = officer.currentCommand;

                // PRD format conversion from YYYY-MM-DD to YYYYMM integer
                if (officer.prd) {
                    try {
                        const prdNum = parseInt(officer.prd.split('-').slice(0, 2).join(''), 10);
                        if (!isNaN(prdNum)) {
                            row.getCell(9).value = prdNum;
                        }
                    } catch (e) {
                        // Keep existing if parse error
                    }
                }

                // Status -> CO-A MILESTONE
                if (officer.status !== undefined) row.getCell(11).value = officer.status;

                // Notes
                if (officer.notes !== undefined) row.getCell(12).value = officer.notes;

                // Preferred Locations (HP1 - HP5 mapped to Cols 13 - 17)
                const locs = officer.preferredLocations || [];
                for (let i = 0; i < 5; i++) {
                    row.getCell(13 + i).value = locs[i] || "";
                }

                // Preferred Platforms (P1 - P3 mapped to Cols 18 - 20)
                const plats = officer.preferredPlatforms || [];
                for (let i = 0; i < 3; i++) {
                    row.getCell(18 + i).value = plats[i] || "";
                }

                // Preference Priority (H/P mapped to Col 21)
                if (officer.preferencePriority) {
                    row.getCell(21).value = officer.preferencePriority === "Homeport" ? "H" : (officer.preferencePriority === "Platform" ? "P" : "");
                }

                // New Bank Tab Assignment explicitly bound to Col 22
                row.getCell(22).value = officer.listShift || "";

                rowFound = true;
                console.log(`Updated all fields for ${officer.name} in Excel row ${rowNumber}.`);
            }
        });

        if (rowFound) {
            await workbook.xlsx.writeFile(FILE_PATH);
            return { success: true };
        } else {
            return { success: false, message: `Officer '${officer.name}' not found in Excel file.` };
        }

    } catch (error: any) {
        console.error("Error updating Excel file:", error);
        return { success: false, message: error.message };
    }
}

export async function appendOfficersToExcel(newOfficers: Officer[]): Promise<{ success: boolean; message?: string }> {
    try {
        if (!newOfficers || newOfficers.length === 0) return { success: true };

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(FILE_PATH);

        const worksheet = workbook.worksheets[0];
        if (!worksheet) {
            return { success: false, message: "Sheet 1 not found." };
        }

        // Find the next available row by checking Name column (idx 2)
        let nextRow = 2; // Data starts at 2
        worksheet.eachRow((row, rowNumber) => {
            const nameCell = row.getCell(2).value;
            if (nameCell) {
                nextRow = rowNumber + 1;
            }
        });

        // Ensure we don't start before row 2 in a hypothetical empty sheet
        if (nextRow < 2) nextRow = 2;

        for (const officer of newOfficers) {
            const row = worksheet.getRow(nextRow);

            row.getCell(2).value = officer.name;
            if (officer.yearGroup) row.getCell(3).value = officer.yearGroup;
            if (officer.designator) row.getCell(4).value = Number(officer.designator) || officer.designator;
            if (officer.rank) row.getCell(5).value = officer.rank;
            if (officer.csr !== undefined) row.getCell(6).value = officer.csr;
            if (officer.billet !== undefined) row.getCell(7).value = officer.billet;
            if (officer.currentCommand !== undefined) row.getCell(8).value = officer.currentCommand;

            if (officer.prd) {
                try {
                    const prdNum = parseInt(officer.prd.split('-').slice(0, 2).join(''), 10);
                    if (!isNaN(prdNum)) {
                        row.getCell(9).value = prdNum;
                    }
                } catch (e) { }
            }

            if (officer.status !== undefined) row.getCell(11).value = officer.status;
            if (officer.notes !== undefined) row.getCell(12).value = officer.notes;

            const locs = officer.preferredLocations || [];
            for (let i = 0; i < 5; i++) {
                row.getCell(13 + i).value = locs[i] || "";
            }

            const plats = officer.preferredPlatforms || [];
            for (let i = 0; i < 3; i++) {
                row.getCell(18 + i).value = plats[i] || "";
            }

            if (officer.preferencePriority) {
                row.getCell(21).value = officer.preferencePriority === "Homeport" ? "H" : (officer.preferencePriority === "Platform" ? "P" : "");
            }

            row.getCell(22).value = officer.listShift || "";

            console.log(`[Excel-Writer] Appended new officer ${officer.name} at row ${nextRow}`);
            nextRow++;

            // Commit row changes
            row.commit();
        }

        await workbook.xlsx.writeFile(FILE_PATH);
        return { success: true };

    } catch (error: any) {
        console.error("Error appending to Excel file:", error);
        return { success: false, message: error.message };
    }
}


// Convert MMMyy (e.g., "JUN25") or YYYY-MM-DD back to Excel serial date or YYYYMM
// based on what's appropriate for Oracle tracking
function jsDateToExcelSerial(dateString: string): number | string {
    if (!dateString || dateString === "Unknown" || dateString === "TBD") return dateString;

    try {
        // Option 1: Handle YYYY-MM-DD directly
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            const date = new Date(dateString);
            // Excel serial date starting from 1900-01-01
            const returnDateTime = 25569.0 + ((date.getTime() - (date.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));
            return Math.floor(returnDateTime);
        }

        // Option 2: It's an MMMyy string like JUN25 from visualization/input
        // The parser parses dates into YYYY-MM-DD whenever it can anyway, so this edge case is small
        return dateString;
    } catch {
        return dateString;
    }
}


const ORACLE_FILE_PATH = path.join(process.cwd(), 'oracle_data.xlsx');

export async function updateCommandInExcel(command: import('./types').OracleCommand): Promise<{ success: boolean; message?: string }> {
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(ORACLE_FILE_PATH);

        let commandFound = false;

        // 1. IS CO-SM?
        if (command.tags?.includes("CO-SM")) {
            const worksheet = workbook.worksheets.find(w => w.name === "CO-SM");
            if (worksheet) {
                worksheet.eachRow((row, rowNumber) => {
                    if (commandFound) return;
                    const cellA = String(row.getCell(1).value || "");

                    // Look for the "NAME - UIC - " pattern
                    if (cellA.includes(" - ") && cellA.startsWith(command.name)) {
                        commandFound = true;

                        // Incumbent overrides are on the NEXT row
                        const incumbentRow = worksheet.getRow(rowNumber + 1);

                        if (command.currentCO.name) {
                            incumbentRow.getCell(1).value = command.currentCO.name; // Col A
                        }

                        if (command.currentCO.prd) {
                            // Assuming End Date was matched to PRD and is Col Q (idx 17)
                            incumbentRow.getCell(17).value = jsDateToExcelSerial(command.currentCO.prd);
                        }

                        console.log(`[Excel-Writer] Updated CO-SM Command ${command.name} near row ${rowNumber}`);
                    }
                });
            }
        } else {
            // 2. IS STANDARD
            // Standard commands are searched across all non-summary sheets
            workbook.worksheets.forEach(worksheet => {
                if (commandFound || worksheet.name === "Summary" || worksheet.name.includes("Sheet") || worksheet.name === "CO-SM") return;

                worksheet.eachRow((row, rowNumber) => {
                    if (commandFound) return;
                    const colA = String(row.getCell(1).value || "").toUpperCase();
                    const colB = String(row.getCell(2).value || "").toUpperCase();
                    const targetName = command.name.toUpperCase();

                    if (
                        colA.includes(targetName) || colB.includes(targetName) ||
                        (command.uic !== "N/A" && (colA.includes(command.uic) || colB.includes(command.uic)))
                    ) {
                        // Potential hit block

                        // Row i+1: CO
                        const coRow = worksheet.getRow(rowNumber + 1);
                        coRow.getCell(2).value = command.currentCO.name;
                        coRow.getCell(9).value = jsDateToExcelSerial(command.currentCO.prd);

                        // Row i+2: XO
                        const xoRow = worksheet.getRow(rowNumber + 2);
                        xoRow.getCell(2).value = command.currentXO.name;
                        xoRow.getCell(9).value = jsDateToExcelSerial(command.currentXO.prd);

                        // Row i+3: Inbound XO
                        const inboundRow = worksheet.getRow(rowNumber + 3);
                        inboundRow.getCell(2).value = command.inboundXO?.name || "";
                        inboundRow.getCell(9).value = jsDateToExcelSerial(command.inboundXO?.reportDate || "");

                        // Row i+4: Slate parameters
                        const slateRow = worksheet.getRow(rowNumber + 4);
                        slateRow.getCell(2).value = command.nextSlateParams.requirement;
                        slateRow.getCell(5).value = command.nextSlateParams.targetBoardDate;

                        commandFound = true;
                        console.log(`[Excel-Writer] Updated Standard Command ${command.name} in worksheet ${worksheet.name} at block starting row ${rowNumber}`);
                    }
                });
            });
        }

        if (commandFound) {
            await workbook.xlsx.writeFile(ORACLE_FILE_PATH);
            return { success: true };
        } else {
            return { success: false, message: `Command '${command.name}' not found in Excel file.` };
        }

    } catch (error: any) {
        console.error("Error updating Oracle Excel file:", error);
        return { success: false, message: error.message };
    }
}

export async function deleteCommandFromExcel(command: import('./types').OracleCommand): Promise<{ success: boolean; message?: string }> {
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(ORACLE_FILE_PATH);

        let commandDeleted = false;

        // 1. IS CO-SM?
        if (command.tags?.includes("CO-SM")) {
            const worksheet = workbook.worksheets.find(w => w.name === "CO-SM");
            if (worksheet) {
                let startRow = -1;
                worksheet.eachRow((row, rowNumber) => {
                    if (startRow !== -1) return;
                    const cellA = String(row.getCell(1).value || "");
                    if (cellA.includes(" - ") && cellA.startsWith(command.name)) {
                        startRow = rowNumber;
                    }
                });

                if (startRow !== -1) {
                    let nextCommandRow = worksheet.rowCount + 1;
                    // Scan forward to find the next command 
                    for (let r = startRow + 1; r <= worksheet.rowCount; r++) {
                        const cellA = String(worksheet.getRow(r).getCell(1).value || "");
                        if (cellA.includes(" - ")) {
                            nextCommandRow = r;
                            break; // Found the next command block
                        }
                    }
                    const numRowsToDelete = nextCommandRow - startRow;
                    worksheet.spliceRows(startRow, numRowsToDelete);
                    commandDeleted = true;
                    console.log(`[Excel-Writer] Deleted CO-SM Command ${command.name} (Rows ${startRow} to ${nextCommandRow - 1}).`);
                }
            }
        } else {
            // 2. IS STANDARD
            // Standard commands are searched across all non-summary sheets
            for (const worksheet of workbook.worksheets) {
                if (commandDeleted || worksheet.name === "Summary" || worksheet.name.includes("Sheet") || worksheet.name === "CO-SM") continue;

                let startRow = -1;
                worksheet.eachRow((row, rowNumber) => {
                    if (startRow !== -1) return;
                    const colA = String(row.getCell(1).value || "").toUpperCase();
                    const colB = String(row.getCell(2).value || "").toUpperCase();
                    const targetName = command.name.toUpperCase();

                    if (
                        colA.includes(targetName) || colB.includes(targetName) ||
                        (command.uic !== "N/A" && (colA.includes(command.uic) || colB.includes(command.uic)))
                    ) {
                        startRow = rowNumber;
                    }
                });

                if (startRow !== -1) {
                    let nextCommandRow = worksheet.rowCount + 1;
                    const knownSubLabels = ["CO", "XO", "INBOUND XO", "TARGET BOARD", "SLATE", "INCUMBENT", "REQUIREMENT", "PLANNED SLATE", "PRIMARY", "SECONDARY"];

                    // Scan forward to find the next command footprint
                    for (let r = startRow + 1; r <= worksheet.rowCount; r++) {
                        const colA = String(worksheet.getRow(r).getCell(1).value || "").toUpperCase().trim();
                        const colB = String(worksheet.getRow(r).getCell(2).value || "").toUpperCase().trim();

                        // We assume a row is the start of a new command block if it has text in Col A/B 
                        // that is NOT a sub-row label. 
                        const isNewLabelA = colA && !knownSubLabels.includes(colA);
                        const isNewLabelB = !colA && colB && !knownSubLabels.includes(colB);

                        if (isNewLabelA || isNewLabelB) {
                            nextCommandRow = r;
                            break;
                        }
                    }

                    const numRowsToDelete = nextCommandRow - startRow;
                    worksheet.spliceRows(startRow, numRowsToDelete);
                    commandDeleted = true;
                    console.log(`[Excel-Writer] Deleted Standard Command ${command.name} in worksheet ${worksheet.name} (Rows ${startRow} to ${nextCommandRow - 1}).`);
                }
            }
        }

        if (commandDeleted) {
            await workbook.xlsx.writeFile(ORACLE_FILE_PATH);
            return { success: true };
        } else {
            return { success: false, message: `Command '${command.name}' not found in Excel file to delete.` };
        }
    } catch (error: any) {
        console.error("Error deleting command from Excel file:", error);
        return { success: false, message: error.message };
    }
}

