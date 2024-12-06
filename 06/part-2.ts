import { readFileFromDir } from '../utils';

const input = readFileFromDir(__dirname, 'input.txt');
const matrix = input.split('\n').map(line => line.split(''));

const numRows = matrix.length;
const numCols = matrix[0].length;

let guardRowStart = 0;
let guardColStart = 0;

for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
        if (matrix[i][j] === '^') {
            guardRowStart = i;
            guardColStart = j;
        }
    }
}

const DIRECTIONS = [
    [-1, 0], // up
    [0, 1], // right
    [1, 0], // down
    [0, -1] // left
];

const visited: Set<string> = new Set();
let guardRow = guardRowStart;
let guardCol = guardColStart;
let directionIndex = 0;

while (true) {
    visited.add(`${guardRow},${guardCol}`);

    const nextRow = guardRow + DIRECTIONS[directionIndex][0];
    const nextCol = guardCol + DIRECTIONS[directionIndex][1];

    // Check if the guard will be out of bounds
    if (!(nextRow >= 0 && nextRow < numRows && nextCol >= 0 && nextCol < numRows)) {
        break;
    }

    // Check if the guard will hit an obstacle
    if (matrix[nextRow][nextCol] === '#') {
        directionIndex = (directionIndex + 1) % 4;
    } else {
        guardRow = nextRow;
        guardCol = nextCol;
    }
}

function willLoop(obsRow: number, obsCol: number): boolean {
    if (matrix[obsRow][obsCol] === '#') {
        return false;
    }

    // Modify matrix temporarily
    matrix[obsRow][obsCol] = '#';
    let specRow = guardRowStart;
    let specCol = guardColStart;
    let specDir = 0;

    const seen: Set<string> = new Set();
    while (true) {
        const key = `${specRow},${specCol},${specDir}`;
        if (seen.has(key)) {
            // Reset matrix
            matrix[obsRow][obsCol] = '.';
            return true;
        }

        seen.add(key);

        const nextRow = specRow + DIRECTIONS[specDir][0];
        const nextCol = specCol + DIRECTIONS[specDir][1];

        if (!(nextRow >= 0 && nextRow < numRows && nextCol >= 0 && nextCol < numRows)) {
            // Reset matrix
            matrix[obsRow][obsCol] = '.';
            return false;
        }

        if (matrix[nextRow][nextCol] === '#') {
            specDir = (specDir + 1) % 4;
        } else {
            specRow = nextRow;
            specCol = nextCol;
        }
    }
}

let answer = 0;

for (const coord of visited) {
    const [obsRow, obsCol] = coord.split(',').map(Number);
    const doesLoop = willLoop(obsRow, obsCol);
    if (doesLoop) {
        answer++;
    }
}

console.log(answer);
