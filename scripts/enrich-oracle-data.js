const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const EXCEL_FILE = 'oracle_data.xlsx';
const DATA_FILE = path.join(__dirname, 'src', 'lib', 'data.ts');

function excelDateToJSDate(serial) {
    if (!serial || isNaN(serial)) return null;
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    return date_info.toISOString().split('T')[0];
}

function cleanName(nameStr) {
    if (!nameStr) return "";
    let clean = nameStr.toString().replace(/CDR |LCDR |CAPT /g, "");
    const paramIndex = clean.indexOf('(');
    if (paramIndex > -1) clean = clean.substring(0, paramIndex);
    return clean.trim().toLowerCase();
}

function run() {
    console.log("Reading data.ts...");
    let content = fs.readFileSync(DATA_FILE, 'utf8');

    const oracleRegex = /export const oracleData: OracleCommand\[\] = ([\s\S]*?)(export const|$)/;
    const match = oracleRegex.exec(content);

    if (!match) { console.error("Could not find oracleData"); return; }

    let jsonStr = match[1].trim();
    if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);

    let oracleData;
    try {
        oracleData = JSON.parse(jsonStr);
    } catch (e) { console.error("JSON parse error:", e); return; }

    console.log(`Loaded ${oracleData.length} commands.`);

    console.log("Reading Excel...");
    const workbook = xlsx.readFile(EXCEL_FILE);

    const nameMap = new Map();
    // Also store by Command:Slate
    const commandSlateMap = new Map();

    workbook.SheetNames.forEach(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        if (!sheet) return;

        const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

        let currentCommand = null;

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (!row || row.length === 0) continue;

            const col0 = row[0];
            if (!col0) continue;

            // Heuristic for Command Header: 
            // - Has text in Col 0
            // - NO date data in Col 8 (I) and Col 10 (K)
            // - Usually uppercase?
            const hasTimelineData = row[8] || row[10];

            if (!hasTimelineData) {
                // Potential Command Header
                // Check if it looks like a command (e.g. includes USS or similar format)
                // Or just assume it is if no data
                // Clean it to match oracleData names
                // e.g. "STOUT (DDG 55)" -> "uss stout" or just "stout"
                let cmdName = cleanName(col0);
                if (cmdName.includes(',')) {
                    // Likely a name (e.g. "Last, First") that just has missing data?
                    // But names usually have data.
                    // Let's assume names have commas, ships don't (usually)
                    // Exception: "Paul Hamilton"
                } else {
                    currentCommand = cmdName;
                    // console.log(`Found Command Block: ${currentCommand}`);
                }
            } else {
                // Data Row
                const cols = {
                    i: excelDateToJSDate(row[8]),
                    k: excelDateToJSDate(row[10]),
                    m: excelDateToJSDate(row[12]),
                    q: excelDateToJSDate(row[16])
                };

                const nameKey = cleanName(col0);

                // Add to global name map
                nameMap.set(nameKey, cols);

                // Variational keys
                if (nameKey.includes(',')) {
                    const parts = nameKey.split(',').map(s => s.trim());
                    if (parts.length >= 2) nameMap.set(`${parts[0]} ${parts[1]}`, cols);
                }

                // If inside a command block, identify Slates
                if (currentCommand) {
                    // Check if it's a slate row (e.g. starts with digit or "FY")
                    // Regex for "26-2", "FY26", "25-1"
                    if (/^\d{2}-\d/.test(nameKey) || /^fy\d{2}/.test(nameKey)) {
                        // Key by Command + Slate
                        commandSlateMap.set(`${currentCommand}:${nameKey}`, cols);
                        // Also set generic "Slate" key for this command?
                        // Assuming only one slate row per block usually
                        commandSlateMap.set(`${currentCommand}:slate`, cols);
                        commandSlateMap.set(`${currentCommand}:slate_name`, nameKey); // Store the name too
                    }
                }
            }
        }
    });

    console.log(`Indexed ${nameMap.size} names.`);
    console.log(`Indexed ${commandSlateMap.size} specific slate entries.`);

    let enrichCount = 0;

    oracleData.forEach(cmd => {
        // cleaned command name
        // "USS STOUT" -> "uss stout" -> "stout"
        // Excel: "STOUT (DDG 55)" -> "stout"
        let cmdKey = cleanName(cmd.name);
        if (cmdKey.startsWith("uss ")) cmdKey = cmdKey.substring(4).trim();

        // Try to match exact or with "uss" stripped
        // The excel cleanName strips parens too.

        // Enrich People
        ['currentCO', 'currentXO', 'inboundXO'].forEach(role => {
            const person = cmd[role];
            if (person && person.name && !person.name.toLowerCase().includes("vacant")) {
                let searchName = cleanName(person.name);
                let data = nameMap.get(searchName);

                if (!data && searchName.includes(',')) {
                    const parts = searchName.split(',').map(s => s.trim());
                    if (parts.length >= 2) data = nameMap.get(`${parts[0]} ${parts[1]}`);
                }

                if (data) {
                    person.timelineData = data;
                }
            }
        });

        // Enrich Slated XO
        // Key: cmdKey + ":slate"
        const slateData = commandSlateMap.get(`${cmdKey}:slate`);
        const slateName = commandSlateMap.get(`${cmdKey}:slate_name`); // The actual name "26-2"

        if (slateData) {
            cmd.slatedXO = {
                name: slateName || "Forecast",
                reportDate: slateData.i || "", // Use XO Report date
                timelineData: slateData
            };
            enrichCount++;
            /* console.log(`Enriched Slated XO for ${cmd.name}: ${slateName}`); */
        } else {
            // Apply default if not exists (preserve manual edits, but ensure row exists)
            if (!cmd.slatedXO) {
                cmd.slatedXO = {
                    name: "Forecast",
                    reportDate: "",
                    timelineData: { i: "", k: "", m: "", q: "" }
                };
            }
        }
    });

    console.log(`Enriched ${enrichCount} Slated XO entries.`);

    const replaceExport = (fileContent, varName, data) => {
        const startMarker = `export const ${varName}:`;
        const startIndex = fileContent.indexOf(startMarker);
        if (startIndex === -1) return fileContent;

        const nextExportIndex = fileContent.indexOf('export const', startIndex + startMarker.length);
        const endIndex = nextExportIndex === -1 ? fileContent.length : nextExportIndex;
        const typeAnnotation = 'OracleCommand[]';
        const newBlock = `export const ${varName}: ${typeAnnotation} = ${JSON.stringify(data, null, 4)}${endIndex === fileContent.length ? '' : '\n\n'}`;
        return fileContent.substring(0, startIndex) + newBlock + fileContent.substring(endIndex);
    };

    const newContent = replaceExport(content, 'oracleData', oracleData);
    fs.writeFileSync(DATA_FILE, newContent);
    console.log("Updated data.ts");
}

run();
