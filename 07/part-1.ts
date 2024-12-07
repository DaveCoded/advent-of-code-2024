import { readFileFromDir } from '../utils';

const input = readFileFromDir(__dirname, 'input.txt');

// split equations by line
const lines = input.split('\n');

// split equations by colon
const equations: [number, number[]][] = lines.map(line => {
    const [value, numbers] = line.split(':');
    return [parseInt(value), numbers.trim().split(' ').map(Number)];
});

let sum = 0;

// if an equation is true, add the value to sum
// for an equation to be true, take the input numbers from left to right
// try every combination of + and * operators to find the value
// if found, return true, else return false

// So for this example: [7290: 6 8 6 15]
// Try 6 + 8 + 6 + 15
// Try 6 * 8 + 6 + 15
// Try 6 + 8 * 6 + 15
// Try 6 + 8 + 6 * 15
// Try 6 * 8 * 6 + 15
// Try 6 * 8 + 6 * 15
// Try 6 + 8 * 6 * 15
// Try 6 * 8 * 6 * 15

// For [7290: 6 8 15]
// Try 6 + 8 + 15
// Try 6 * 8 + 15
// Try 6 + 8 * 15
// Try 6 * 8 * 15

const generateOperatorCombinations = (length: number) => {
    const combinations: string[][] = [];
    const total = Math.pow(2, length);

    for (let i = 0; i < total; i++) {
        const binary = i.toString(2).padStart(length, '0');
        const operators = binary.split('').map(bit => (bit === '0' ? '+' : '*'));
        combinations.push(operators);
    }

    return combinations;
};

for (const eq of equations) {
    const [value, numbers] = eq;
    const operators = generateOperatorCombinations(numbers.length - 1);

    for (const operator of operators) {
        let result = numbers[0];
        for (let i = 0; i < operator.length; i++) {
            if (operator[i] === '+') {
                result += numbers[i + 1];
            } else {
                result *= numbers[i + 1];
            }
        }

        if (result === value) {
            sum += value;
            break;
        }
    }
}

console.log('Sum:', sum);
