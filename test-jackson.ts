import { oracleData } from './src/lib/data';
import { predictNextVacancyDate } from './src/lib/utils';
const cmd = oracleData.find(c => c.name === "USS JACKSON");
if (cmd) {
    console.log(cmd.inboundXO);
    console.log("Vacancy Date:", predictNextVacancyDate(cmd));
}
