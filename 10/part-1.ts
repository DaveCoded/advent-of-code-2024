import { readFileFromDir } from '../utils';

const input = readFileFromDir(__dirname, 'input.txt');
const grid = input.split('\n').map(l => l.split(''));

const numRows = grid.length;
const numCols = grid[0].length;

// Find coords of all trailheads (0)
// List directions
// For each trailhead, try every direction (up, down, left, right)
// If out of bounds, skip
// If a 1 is found, try every direction again
// If a 2 is found, try every direction again, etc.
// If the trail leads to a 9, increment the counter

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

const nines: any = {};

for (const [i, j] of trailheads) {
    recurse(i, j, 0, [i, j]);
}

function recurse(x: number, y: number, target: number, trailHead: [number, number]) {
    if (x < 0 || x >= numRows || y < 0 || y >= numCols) {
        return;
    }

    if (grid[x][y] !== `${target}`) {
        return;
    }

    if (target === 9) {
        if (!nines[`${trailHead}`]) {
            nines[`${trailHead}`] = new Set();
            nines[`${trailHead}`].add(`[${x},${y}]`);
        } else {
            nines[`${trailHead}`].add(`[${x},${y}]`);
        }
        return;
    }

    for (const [dx, dy] of directions) {
        recurse(x + dx, y + dy, target + 1, trailHead);
    }
}

const answer = Object.values(nines).reduce((acc, set: any) => acc + set.size, 0);
console.log('🚀 ~ answer:', answer);
