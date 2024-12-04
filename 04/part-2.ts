import { readFileFromDir } from '../utils';

const input = readFileFromDir(__dirname, 'example-2.txt');

const lines = input.split('\n');
const matrix = lines.map(line => line.split(''));

const rows = matrix.length;
const cols = matrix[0].length;

let count = 0;

// Loop throuh the matrix
// If 'A' is found, check if 'M' and 'S' are found diagonally across from each other from both sides
// for instance, if 'A' is found at matrix[i][j], and 'M' is found at matrix[i-1][j-1], check if 'S' is found at matrix[i+2][j+2]
