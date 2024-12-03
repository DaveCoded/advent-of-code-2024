import { readFileFromDir, sortNumsInPlaceAsc } from '../utils';

const input = readFileFromDir(__dirname, 'input.txt');
const lines = input.split('\n');

const leftList: number[] = [];
const rightList: number[] = [];

lines.forEach(line => {
    const [leftValue, rightValue] = line.split(/\s+/).map(l => parseInt(l));
    leftList.push(leftValue);
    rightList.push(rightValue);
});

let similarityScore = 0;

for (let i = 0; i < leftList.length; i++) {
    const leftValue = leftList[i];
    let count = 0;

    for (let j = 0; j < rightList.length; j++) {
        const rightValue = rightList[j];
        if (leftValue === rightValue) {
            count++;
        }
    }

    similarityScore += leftValue * count;
}

console.log({ similarityScore });
