import { readFileFromDir } from '../utils';

const input = readFileFromDir(__dirname, 'example-2.txt');

const lines = input.split('\n');
const matrix = lines.map(line => line.split(''));

const rows = matrix.length;
const cols = matrix[0].length;
const word = 'MAS';
const wordLength = word.length;

let count = 0;

const directions: [number, number][] = [
    [-1, -1], // up-left
    [-1, 1], // up-right
    [1, 1], // down-right
    [1, -1] // down-left
];

function isWordPresent(startRow: number, startCol: number, direction: [number, number]): boolean {
    for (let k = 0; k < wordLength; k++) {
        console.log('looking for ', word[k]);
        const newRow = startRow + k * direction[0];
        console.log('🚀 ~ isWordPresent ~ newRow:', newRow);
        const newCol = startCol + k * direction[1];
        console.log('🚀 ~ isWordPresent ~ newCol:', newCol);

        // Check bounds
        if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
            console.log('out of bounds');
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
        if (matrix[i][j] === word[1]) {
            console.log(word[1], ' found at ', i, j);
            // Check if the word is present for directions[0] and directions[2]
            // or if the word is present for directions[1] and directions[3]
            if (
                (isWordPresent(i + 1, j + 1, directions[0]) &&
                    isWordPresent(i - 1, j - 1, directions[2])) ||
                (isWordPresent(i + 1, j - 1, directions[1]) &&
                    isWordPresent(i - 1, j + 1, directions[3]))
            ) {
                count++;
            }

            // for (const direction of directions) {
            //     if (isWordPresent(i, j, direction)) {
            //         count++;
            //     }
            // }
        }
    }
}

console.log('🚀 ~ count:', count);
