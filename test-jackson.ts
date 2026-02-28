import { commands } from './src/lib/data';
import { predictNextVacancyDate } from './src/lib/utils';
const cmd = commands.find(c => c.name === "USS JACKSON");
console.log(cmd.inboundXO);
console.log("Vacancy Date:", predictNextVacancyDate(cmd));
