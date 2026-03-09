import { getOracleData }
const oracleData = getOracleData() from './src/lib/data';
import { predictNextVacancyDate } from './src/lib/utils';
const cmd = oracleData.find(c => c.name === "USS MONTGOMERY");
if (cmd) {
    console.log("Montgomery Predicted:", predictNextVacancyDate(cmd));
}
