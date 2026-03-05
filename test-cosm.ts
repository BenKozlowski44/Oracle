import { oracleData } from './src/lib/data';
import { predictNextVacancyDate } from './src/lib/utils';
const cmd = oracleData.find(c => c.name === "CONSTITUTION");
if (cmd) {
    console.log("CONSTITUTION Record Target:", cmd?.nextSlateParams.targetBoardDate);
    console.log("CONSTITUTION Calculated Target:", predictNextVacancyDate(cmd));
}
