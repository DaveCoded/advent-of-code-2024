import { readFileFromDir } from '../utils';

const input = readFileFromDir(__dirname, 'input.txt');
const grid = input.split('\n').map(l => l.split(''));

const numRows = grid.length;
const numCols = grid[0].length;

type Vector = [number, number];
const antennas: Record<string, Vector[]> = {};

// find all antennas
for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
        const cell = grid[i][j];

        if (cell === '.') {
            continue;
        }

        if (!antennas[cell]) {
            antennas[cell] = [];
        }

        // j is the x-axis, i is the y-axis
        antennas[cell].push([j, i]);
    }
}

const keys = Object.keys(antennas);
const antinodes = new Set<string>();

for (const key of keys) {
    const antenna = antennas[key];

    for (let i = 0; i < antenna.length; i++) {
        // Add antenna as an antinode
        antinodes.add(antenna[i].join(','));

        for (let j = i + 1; j < antenna.length; j++) {
            const [x1, y1] = antenna[i];
            const [x2, y2] = antenna[j];

            const dx = x2 - x1;
            const dy = y2 - y1;

            const invDx = -dx;
            const invDy = -dy;

            recurse([x2 + dx, y2 + dy], dx, dy);
            recurse([x1 + invDx, y1 + invDy], invDx, invDy);
        }
    }
}

function recurse(point: Vector, dx: number, dy: number) {
    const [x, y] = point;

    if (x < 0 || x >= numCols || y < 0 || y >= numRows) {
        return;
    }

    antinodes.add(`${x},${y}`);

    recurse([x + dx, y + dy], dx, dy);
}

console.log(antinodes.size);
