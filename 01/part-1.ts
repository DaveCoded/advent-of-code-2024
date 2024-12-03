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

sortNumsInPlaceAsc(leftList);
sortNumsInPlaceAsc(rightList);

const differences = [];

for (let index = 0; index < leftList.length; index++) {
    const leftValue = leftList[index];
    const rightValue = rightList[index];

    const absDifference = Math.abs(leftValue - rightValue);
    differences.push(absDifference);
}

const result = differences.reduce((prev, curr) => prev + curr, 0);
console.log({ result });
