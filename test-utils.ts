import { calculateTargetBoard, getCurrentActiveSlate } from './src/lib/utils';
import { oracleData } from './src/lib/data';
import { predictNextVacancyDate } from './src/lib/utils';

console.log("Current Active Slate:", getCurrentActiveSlate());

const testDates = ["2027-06-25", "2027-10-15", "2027-12-05", "2028-02-15", "2028-04-10"];
console.log("--- Fill Date -> Target Board Tests ---");
for (const d of testDates) {
    console.log(`${d} ->`, calculateTargetBoard(d));
}

console.log("--- Pipeline Prediction Tests ---");
const tulsa = oracleData.find(c => c.name.includes("TULSA"));
if (tulsa) {
    console.log("Tulsa Target:", predictNextVacancyDate(tulsa));
}

const charleston = oracleData.find(c => c.name.includes("CHARLESTON"));
if (charleston) {
    console.log("Charleston Target:", predictNextVacancyDate(charleston));
}
