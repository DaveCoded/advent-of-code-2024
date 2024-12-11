import { readFileFromDir } from '../utils';

const input = readFileFromDir(__dirname, 'input.txt');

/**
 * attempt to move the blocks all at once
 * change data structure to array of arrays:
 *  - e.g. [[0, 0, 0], [null, null], [1], [null, null, null], [2, 2]]
 * start with the last block of numbers
 * check the first block of nulls
 * if they're the same length you can swap them
 * if there are more numbers than nulls, don't swap
 * look for the next id (decrement count)
 * if there are more nulls than numbers, change the numbers to nulls and the first n nulls to numbers. Add num-n nulls to the next block of space
 * keep going until id is 0
 */

const expandLine = (input: string) => {
    let result: (number | null)[][] = [];
    let id = 0;

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        const digit = parseInt(char);

        if (i % 2 === 0) {
            result.push(Array(digit).fill(id));
            id++;
        } else {
            if (digit === 0) continue;
            result.push(Array(digit).fill(null));
        }
    }

    return result;
};

let result = expandLine(input);

let id = 0;

// set id to last file id
for (let i = result.length - 1; i >= 0; i--) {
    const block = result[i];
    if (block[0] === null) continue;
    id = block[0];
    break;
}

// loop backwards through the blocks to find the rightmost block of non-null numbers
// loop forwards through the blocks to find the leftmost block of nulls
// swap them if the lengths are the same
// if there are more numbers than nulls, don't swap
// if there are more nulls than numbers, change the numbers to nulls and the first n nulls to numbers. Add num-n nulls to the next block of space

while (id > 0) {
    let i = result.length - 1;

    while (i >= 0 && result[i][0] !== id) {
        i--;
    }

    const numberBlock = result[i];
    const numFiles = numberBlock.length;

    // starting from the left, try to find a block of nulls that is the same length or greater
    const j = result.findIndex(block => block[0] === null && block.length >= numFiles);

    if (j === -1 || i < j) {
        id--;
        continue;
    }

    const nullBlock = result[j];
    const numNulls = nullBlock.length;

    if (numFiles === numNulls) {
        result[i] = nullBlock;
        result[j] = numberBlock;
    } else {
        // reduce nullBlock by numFiles
        nullBlock.splice(0, numFiles);
        // remove block of moved files with nulls
        result.splice(i, 1, Array(numFiles).fill(null));
        // insert block of moved files
        result.splice(j, 0, numberBlock);
    }

    // concatenate all adjacent null blocks
    let k = 0;
    while (k < result.length - 1) {
        if (result[k][0] === null && result[k + 1][0] === null) {
            result[k] = result[k].concat(result[k + 1]);
            result.splice(k + 1, 1);
        } else {
            k++;
        }
    }

    id--;
}

let sum = 0;

// flatten result
const flatResult = result.flat();

for (let i = 0; i < flatResult.length; i++) {
    const block = flatResult[i];
    if (block === null) continue;
    sum += block * i;
}

console.log(sum);
