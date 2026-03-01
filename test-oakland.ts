import { oracleData } from './src/lib/data';
import { predictNextVacancyDate, calculateTargetBoard } from './src/lib/utils';
const cmd = oracleData.find(c => c.name.includes("OAKLAND"));
if (cmd) {
    console.log("Found:", cmd.name);
    console.log("Oakland Slated XO:", cmd.slatedXO);
    console.log("Oakland Inbound XO:", cmd.inboundXO);
    console.log("Oakland Current XO:", cmd.currentXO);
    console.log("Oakland Current CO:", cmd.currentCO);
    console.log("Calculated Target:", predictNextVacancyDate(cmd));

    // Test calculateTargetBoard explicitly with a few DEC27 dates
    console.log("2027-12-01 Target:", calculateTargetBoard("2027-12-01"));
} else {
    console.log("OAKLAND NOT FOUND");
}
