import { readFileFromDir } from '../utils';

const input = readFileFromDir(__dirname, 'input.txt');
const reports = input.split('\n');
let safeReportsCount = 0;

const areLevelsValid = (levels: number[], dampened?: boolean) => {
    let problemDampened = dampened ?? false;
    let isIncremental = levels[0] < levels[1];
    let safe = true;

    for (let index = 1; index < levels.length; index++) {
        const level = levels[index];
        const prevLevel = levels[index - 1];
        if (isIncremental && level <= prevLevel) {
            if (problemDampened) {
                safe = false;
                break;
            }

            problemDampened = true;

            const newReport1 = levels.filter((_, i) => i !== index);
            const newReport2 = levels.filter((_, i) => i !== index - 1);

            areLevelsValid(newReport1);
            areLevelsValid(newReport2);
        } else if (!isIncremental && level >= prevLevel) {
            if (problemDampened) {
                safe = false;
                break;
            }

            problemDampened = true;

            const newReport1 = levels.filter((_, i) => i !== index);
            const newReport2 = levels.filter((_, i) => i !== index - 1);

            areLevelsValid(newReport1);
            areLevelsValid(newReport2);
        }

        const difference = Math.abs(level - prevLevel);
        if (difference < 1 || difference > 3) {
            if (problemDampened) {
                safe = false;
                break;
            }

            problemDampened = true;

            const newReport1 = levels.filter((_, i) => i !== index);
            const newReport2 = levels.filter((_, i) => i !== index - 1);

            areLevelsValid(newReport1);
            areLevelsValid(newReport2);
        }
    }

    return safe;
};

for (const report of reports) {
    const levels = report.split(/\s+/).map(l => parseInt(l));
    if (areLevelsValid(levels)) {
        safeReportsCount++;
    }
}

console.log({ safeReportsCount });
