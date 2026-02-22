const XLSX = require('xlsx');
const fs = require('fs');

function excelDateToJSDate(serial) {
    if (!serial || isNaN(serial)) return null;
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    return date_info.toISOString().split('T')[0];
}

const filename = 'oracle_data.xlsx';
const workbook = XLSX.readFile(filename);
const sheet = workbook.Sheets['CO-SM'];
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

// Header is likely row index 1 (0-based) based on inspection
// ['SHIP', 'Lineal', 'XO TL', 'CO TL', 'TOL', 'P/L', '', 'DAYS', 'XO', '', 'T.O.', '', 'COC', '', 'CO', '', 'COC']

const commands = [];

// Start from row index 2 (Data starts)
for (let i = 2; i < data.length; i++) {
    const row = data[i];
    if (!row || !row[0]) continue; // Skip empty rows

    const shipRaw = row[0].toString();

    // Identify Command Row: Look for " - " which separates Name and UIC in this sheet
    // e.g. "CONSTITUTION - 01024 - 2 year CO only"
    if (!shipRaw.includes(" - ")) continue;

    const parts = shipRaw.split(' - ').map(s => s.trim());
    const name = parts[0];
    const uic = parts.length > 1 ? parts[1] : "N/A";

    // Clean up UIC if it contains notes
    // Sometimes parts[1] might be the UIC, sometimes it's "2 year..."
    // Usually UIC is a 5-digit number.
    let cleanUic = uic;
    if (!/^\d{5}$/.test(cleanUic) && parts.length > 2) {
        // Try to find a 5-digit part
        const uicPart = parts.find(p => /^\d{5}$/.test(p));
        if (uicPart) cleanUic = uicPart;
    }

    // Infer Location
    let location = "Special Mission";
    const nameUpper = name.toUpperCase();
    if (nameUpper.includes("BAHRAIN")) location = "Bahrain";
    else if (nameUpper.includes("ROTA")) location = "Rota";
    else if (nameUpper.includes("MAYPORT")) location = "Mayport";
    else if (nameUpper.includes("SAN DIEGO") || nameUpper.includes("SDGO")) location = "San Diego";
    else if (nameUpper.includes("NORFOLK")) location = "Norfolk";
    else if (nameUpper.includes("PEARL") || nameUpper.includes("PH")) location = "Pearl Harbor";
    else if (nameUpper.includes("SASEBO")) location = "Sasebo";
    else if (nameUpper.includes("YOKOSUKA")) location = "Yokosuka";
    else if (nameUpper.includes("EVERETT")) location = "Everett";
    else if (nameUpper.includes("GUAM")) location = "Guam";

    const command = {
        id: `cmd_cosm_${cleanUic !== "N/A" ? cleanUic : Date.now() + i}`,
        name: name,
        uic: cleanUic,
        location: location,
        platform: "Special Mission",
        tags: ["CO-SM"],
        currentCO: {
            name: "Unparsed", // Placeholder
            prd: "2026-01-01" // Placeholder
        },
        currentXO: {
            name: "Unparsed",
            prd: "2026-01-01"
        },
        inboundXO: undefined,
        prospectiveCO: undefined,
        nextSlateParams: {
            targetBoardDate: "TBD",
            requirement: "CO-SM"
        },
        timeline: {}
    };

    commands.push(command);
}

console.log(JSON.stringify(commands, null, 2));
