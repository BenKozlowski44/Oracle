import { oracleData } from './src/lib/data';
import { predictNextVacancyDate } from './src/lib/utils';
const cmd = oracleData.find(c => c.name === "USS MONTGOMERY");
console.log("Montgomery Predicted:", predictNextVacancyDate(cmd));
