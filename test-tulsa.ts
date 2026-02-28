import { oracleData } from './src/lib/data';
import { predictNextVacancyDate } from './src/lib/utils';
const cmds = oracleData.filter(c => c.name.toUpperCase().includes("TULSA"));
if (cmds.length > 0) {
    for (const cmd of cmds) {
        console.log("Found:", cmd.name);
        console.log("Tulsa Slated XO:", cmd.slatedXO);
        console.log("Tulsa Inbound XO:", cmd.inboundXO);
        console.log("Tulsa Current XO:", cmd.currentXO);
        console.log("Calculated Target:", predictNextVacancyDate(cmd));
    }
} else {
    console.log("TULSA NOT FOUND");
}
