import { readFileFromDir } from '../utils';

const input = readFileFromDir(__dirname, 'input.txt');

const lines = input.split('\n');
const matrix = lines.map(line => line.split(''));

const rows = matrix.length;
const cols = matrix[0].length;
const word = 'XMAS';
const wordLength = word.length;

let count = 0;

const directions: [number, number][] = [
    [0, 1], // right
    [0, -1], // left
    [1, 0], // down
    [-1, 0], // up
    [-1, -1], // up-left
    [-1, 1], // up-right
    [1, -1], // down-left
    [1, 1] // down-right
];

function isWordPresent(startRow: number, startCol: number, direction: [number, number]): boolean {
    for (let k = 0; k < wordLength; k++) {
        const newRow = startRow + k * direction[0];
        const newCol = startCol + k * direction[1];

        // Check bounds
        if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
            return false;
        }

        // Check character match
        if (matrix[newRow][newCol] !== word[k]) {
            return false;
        }
    }
    return true;
}

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (matrix[i][j] === word[0]) {
            for (const direction of directions) {
                if (isWordPresent(i, j, direction)) {
                    count++;
                }
            }
        }
    }
}

console.log('🚀 ~ count:', count);
