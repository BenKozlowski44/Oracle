import { oracleData } from './src/lib/data';
import { predictNextVacancyDate } from './src/lib/utils';
const cmd = oracleData.find(c => c.name === "USS MONTGOMERY");
console.log("Montgomery Predicted:", predictNextVacancyDate(cmd));
console.log("hasInboundXO check:", cmd.inboundXO?.reportDate && cmd.inboundXO.reportDate !== "N/A" && cmd.inboundXO.reportDate !== "TBD" && cmd.inboundXO?.name);
