import fs from 'fs';
import path from 'path';
import { getOracleData }
const oracleData = getOracleData() from './src/lib/data';
import { predictNextVacancyDate } from './src/lib/utils';
import { OracleCommand } from './src/lib/types';

export const migrateBoards = () => {
    const dataPath = path.join(process.cwd(), 'src/lib/data.ts');
    let content = fs.readFileSync(dataPath, 'utf8');

    // Make sure we have the latest math
    const updatedData = oracleData.map(cmd => {
        const nextBoard = predictNextVacancyDate(cmd);
        return {
            ...cmd,
            nextSlateParams: {
                ...cmd.nextSlateParams,
                targetBoardDate: nextBoard
            }
        };
    });

    // We can just text-replace the oracleData block since it's the last export in the file normally
    const startString = "export const oracleData: OracleCommand[] = ";
    const startIdx = content.indexOf(startString);
    
    if (startIdx === -1) {
        console.error("Could not find oracleData block.");
        return;
    }

    const newBlock = `${startString}${JSON.stringify(updatedData, null, 4)}\n`;
    const beforeBlock = content.substring(0, startIdx);
    
    fs.writeFileSync(dataPath, beforeBlock + newBlock);
    console.log(`Successfully migrated ${updatedData.length} records.`);
}

migrateBoards();
