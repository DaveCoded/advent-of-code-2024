import { readFileFromDir } from '../utils';

const input = readFileFromDir(__dirname, 'input.txt');
const grid = input.split('\n').map(l => l.split(''));

const numRows = grid.length;
const numCols = grid[0].length;

const trailheads = [];
for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
        if (grid[i][j] === '0') {
            trailheads.push([i, j]);
        }
    }
}

const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
];

let numPaths = 0;

for (const [i, j] of trailheads) {
    recurse(i, j);
}

function recurse(x: number, y: number, target = 0) {
    if (x < 0 || x >= numRows || y < 0 || y >= numCols) {
        return;
    }

    if (grid[x][y] !== `${target}`) return;

    if (target === 9) {
        numPaths++;
        return;
    }

    for (const [dx, dy] of directions) {
        recurse(x + dx, y + dy, target + 1);
    }
}

console.log(numPaths);
