import { oracleData } from './src/lib/data';
import { predictNextVacancyDate } from './src/lib/utils';
const cmd = oracleData.find(c => c.name === "USS CHARLESTON");
console.log("Charleston Record Target:", cmd?.nextSlateParams.targetBoardDate);
console.log("Charleston Calculated Target:", predictNextVacancyDate(cmd));
