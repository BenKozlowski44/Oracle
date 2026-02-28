import { oracleData } from './src/lib/data';
import { predictNextVacancyDate } from './src/lib/utils';
const cmd = oracleData.find(c => c.name === "USS CHARLESTON");
console.log("Charleston Predicted:", predictNextVacancyDate(cmd));
console.log("Inbound XO:", cmd.inboundXO);
console.log("Slated XO:", cmd.slatedXO);
console.log("Current XO:", cmd.currentXO);
