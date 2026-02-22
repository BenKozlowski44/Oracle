
import { parseBankExcel } from "./src/lib/excel-parser";
import * as fs from "fs";
import * as path from "path";

const analyzeFile = (filename: string) => {
    try {
        const filePath = path.join(process.cwd(), filename);
        if (!fs.existsSync(filePath)) {
            console.log(`${filename} does not exist.`);
            return;
        }
        const buffer = fs.readFileSync(filePath);
        const officers = parseBankExcel(buffer.buffer as ArrayBuffer);

        const count = officers.length;
        const firefighters = officers.filter(o => {
            const slate = o.assignedSlate?.toLowerCase() || "";
            return slate.includes("3rd look") || slate.includes("no command");
        }).length;
        const bank = count - firefighters;

        console.log(`\nFile: ${filename}`);
        console.log(`Total Officers: ${count}`);
        console.log(`Bank (Available): ${bank}`);
        console.log(`Firefighters (3rd Look/No Cmd): ${firefighters}`);
    } catch (e) {
        console.error(`Error analyzing ${filename}:`, e);
    }
}

analyzeFile("mock_bank_data.xlsx");
analyzeFile("data/Adding Bank Officers FF.xlsx");
