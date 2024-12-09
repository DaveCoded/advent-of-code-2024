import { readFileFromDir } from '../utils';

const input = readFileFromDir(__dirname, 'example.txt');

// Expand this into files with ids
// Starting with a block of files, numbers alternately represent blocks of files, and blocks of free space
// Each file in a block has the same id, starting from 0
// 31232 represents 000.11...22 where dots represent free space
// If space is represented with 0, that means there's no free space

const expandLine = (input: string) => {
    let result = '';
    let lastId = -1;

    for (let i = 0; i < input.length; i++) {
        const digit = parseInt(input[i]);

        if (i % 2 === 0) {
            // We have a file block
            // Only every other i represents a file block id
            result += `${i / 2}`.repeat(digit);
        } else {
            // We have a block of empty space
            result += `.`.repeat(digit);
        }

        if (i === input.length - 1) {
            lastId = i / 2;
        }
    }

    return { result, lastId };
};

const { result: expandedLine, lastId } = expandLine(input);

console.log({ expandedLine, lastId });

// loop backwards through the characters of expanded
// if you have a file, represented by a number, move it to the first free space, starting from the start of the string
// numbers may be several digits, so work out what the last number will be first, and then work backwards
