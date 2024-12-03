import { readFileFromDir } from '../utils';

const input = readFileFromDir(__dirname, 'input.txt');

const regex = /mul\((\d{1,3})\,(\d{1,3})\)/g;

let match;
const products = [];
while ((match = regex.exec(input)) !== null) {
    const captureGroupsProduct = parseInt(match[1]) * parseInt(match[2]);
    products.push(captureGroupsProduct);
}

const sum = products.reduce((a, b) => a + b, 0);

console.log('🚀 ~ result:', sum);
