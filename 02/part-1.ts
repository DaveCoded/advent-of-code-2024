// read input
// each line is a "report"
// every "level" separated by a space
// Keep a count of which reports have safe levels

import { readFileFromDir } from '../utils';

// a report is safe if all levels either increase or decrease
// and increment is 1, 2, or 3 (between 0 and 4)

const input = readFileFromDir(__dirname, 'input.txt');
const reports = input.split('\n');

let safeReportsCount = 0;

for (const report of reports) {
    const levels = report.split(/\s+/).map(l => parseInt(l));
    let isIncremental = levels[0] < levels[1];
    let safe = true;

    for (let index = 1; index < levels.length; index++) {
        const level = levels[index];
        const prevLevel = levels[index - 1];
        if (isIncremental && level <= prevLevel) safe = false;
        else if (!isIncremental && level >= prevLevel) safe = false;

        const difference = Math.abs(level - prevLevel);
        if (difference < 1 || difference > 3) safe = false;
    }

    if (safe) safeReportsCount++;
}

console.log('🚀 ~ safeReportsCount:', safeReportsCount);
