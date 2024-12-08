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
        for (let j = i + 1; j < antenna.length; j++) {
            const [x1, y1] = antenna[i];
            const [x2, y2] = antenna[j];

            const dx = x2 - x1;
            const dy = y2 - y1;

            const xA1 = x1 - dx;
            const yA1 = y1 - dy;

            const xA2 = x2 + dx;
            const yA2 = y2 + dy;

            if (xA1 >= 0 && xA1 < numCols && yA1 >= 0 && yA1 < numRows) {
                antinodes.add(`${xA1},${yA1}`);
            }

            if (xA2 >= 0 && xA2 < numCols && yA2 >= 0 && yA2 < numRows) {
                antinodes.add(`${xA2},${yA2}`);
            }
        }
    }
}

console.log(antinodes);
