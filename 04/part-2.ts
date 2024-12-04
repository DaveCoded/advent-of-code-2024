import { readFileFromDir } from "../utils";

const input = readFileFromDir(__dirname, 'input.txt');

const lines = input.trim().split('\n');
const matrix = lines.map(line => line.split(''));

const rows = matrix.length;
const cols = matrix[0].length;

let count = 0;

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    if (matrix[i][j] === 'A') {
      // Check all four pairs of diagonals
      const hasTopLeftBottomRight =
        i - 1 >= 0 &&
        j - 1 >= 0 &&
        matrix[i - 1][j - 1] === 'M' &&
        i + 1 < rows &&
        j + 1 < cols &&
        matrix[i + 1][j + 1] === 'S';

      const hasTopRightBottomLeft =
        i - 1 >= 0 &&
        j + 1 < cols &&
        matrix[i - 1][j + 1] === 'M' &&
        i + 1 < rows &&
        j - 1 >= 0 &&
        matrix[i + 1][j - 1] === 'S';

      const hasBottomLeftTopRight =
        i + 1 < rows &&
        j - 1 >= 0 &&
        matrix[i + 1][j - 1] === 'M' &&
        i - 1 >= 0 &&
        j + 1 < cols &&
        matrix[i - 1][j + 1] === 'S';

      const hasBottomRightTopLeft =
        i + 1 < rows &&
        j + 1 < cols &&
        matrix[i + 1][j + 1] === 'M' &&
        i - 1 >= 0 &&
        j - 1 >= 0 &&
        matrix[i - 1][j - 1] === 'S';

      // Count if at least two pairs are valid
      const validPairs = [
        hasTopLeftBottomRight,
        hasTopRightBottomLeft,
        hasBottomLeftTopRight,
        hasBottomRightTopLeft,
      ].filter(Boolean).length;

      if (validPairs >= 2) {
        count++;
      }
    }
  }
}

console.log(`The number of "MAS" crosses is: ${count}`);
