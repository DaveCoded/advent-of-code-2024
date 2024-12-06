import { readFileFromDir } from '../utils';

const exampleInput = readFileFromDir(__dirname, 'input.txt');

const directions = [
    [-1, 0], // up
    [0, 1], // right
    [1, 0], // down
    [0, -1] // left
];

// Parse input into a matrix
const lines = exampleInput.trim().split('\n');
const matrix = lines.map(line => line.split(''));

// Find the starting position of the guard
let guardRow = 0;
let guardCol = 0;

for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
        if (matrix[i][j] === '^') {
            guardRow = i;
            guardCol = j;
        }
    }
}

let startingDirection = 0;

// Keep a count of unique positions the guard visits
const visited = new Set();
visited.add(`${guardRow},${guardCol}`);

while (true) {
    const nextRow = guardRow + directions[startingDirection][0];
    const nextCol = guardCol + directions[startingDirection][1];

    // Check if the guard will be out of bounds
    if (nextRow < 0 || nextRow >= lines.length || nextCol < 0 || nextCol >= lines[0].length) {
        break;
    }

    // Check if the guard will hit an obstacle
    if (matrix[nextRow][nextCol] === '#') {
        // Turn right
        startingDirection = (startingDirection + 1) % 4;
    }

    // Move forward in the direction the guard is facing
    guardRow += directions[startingDirection][0];
    guardCol += directions[startingDirection][1];

    visited.add(`${guardRow},${guardCol}`);
}

console.log('🚀 ~ count:', visited.size);
