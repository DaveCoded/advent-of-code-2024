import { readFileFromDir } from '../utils';

const input = readFileFromDir(__dirname, 'input.txt');

console.time('execution');

const lines = input.split('\n');
const equations: [number, number[]][] = lines.map(line => {
    const [value, numbers] = line.split(':');
    return [parseInt(value), numbers.trim().split(' ').map(Number)];
});

let sum = 0;

// BRUTE FORCE STRATEGY
// function generateOperatorCombinations(length: number): string[][] {
//     const operators = ['+', '*', '||'];
//     const combinations = [];
//     const total = Math.pow(3, length);

//     for (let i = 0; i < total; i++) {
//         const ternary = i.toString(3).padStart(length, '0');
//         const combination = ternary.split('').map(digit => operators[Number(digit)]);
//         combinations.push(combination);
//     }

//     return combinations;
// }

// for (const eq of equations) {
//     const [value, numbers] = eq;
//     const operators = generateOperatorCombinations(numbers.length - 1);

//     for (const operator of operators) {
//         let result = numbers[0];
//         for (let i = 0; i < operator.length; i++) {
//             if (operator[i] === '+') {
//                 result += numbers[i + 1];
//             } else if (operator[i] === '||') {
//                 // concatenate the numbers
//                 result = parseInt(result.toString() + numbers[i + 1].toString());
//             } else {
//                 result *= numbers[i + 1];
//             }
//         }

//         if (result === value) {
//             sum += value;
//             break;
//         }
//     }
// }

// console.log('Sum:', sum);

// RECURSIVE STRATEGY WITH EARLY RETURNS
function evaluate(numbers: number[], target: number, index = 1, current = numbers[0]): boolean {
    if (index === numbers.length) {
        return current === target;
    }

    const next = numbers[index];

    if (evaluate(numbers, target, index + 1, current + next)) {
        return true;
    }

    if (evaluate(numbers, target, index + 1, current * next)) {
        return true;
    }

    const concatenated = parseInt(current.toString() + next.toString());
    if (evaluate(numbers, target, index + 1, concatenated)) {
        return true;
    }

    return false;
}

for (const [value, numbers] of equations) {
    if (evaluate(numbers, value)) {
        sum += value;
    }
}

console.log(sum);
console.timeEnd('execution');
