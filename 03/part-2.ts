import { readFileFromDir } from '../utils';

const input = readFileFromDir(__dirname, 'input.txt');

const regex = /mul\((\d{1,3})\,(\d{1,3})\)|do\(\)|don\'t\(\)/g;

const products = [];
let enabled = true;
let match;

while ((match = regex.exec(input)) !== null) {
    if (match[0] === 'do()') enabled = true;
    if (match[0] === "don't()") enabled = false;

    if (enabled && match[0].startsWith('mul')) {
        const captureGroupsProduct = parseInt(match[1]) * parseInt(match[2]);
        products.push(captureGroupsProduct);
    }
}

const sum = products.reduce((a, b) => a + b, 0);
console.log('🚀 ~ sum:', sum);
