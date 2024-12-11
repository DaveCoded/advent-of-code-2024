/**
 * On each "blink":
 * 1. If stone is 0, it becomes 1
 * 2. Even number of digits gets split into two stones
 *  2.1. Extra zeroes trimmed from second stone (1000, becomes 10 and 0)
 * 3. Otherwise, multiply by 2024
 */

import { readFileFromDir } from '../utils';

const input = readFileFromDir(__dirname, 'input.txt');
const stones = input.split(' ').map(Number);

const hasEvenChars = (num: number) => num.toString().length % 2 === 0;

const blink = (stones: number[], numBlinks = 1, iterations = 0): number[] => {
    if (iterations === numBlinks) return stones;
    const newStones: number[] = [];

    for (let i = 0; i < stones.length; i++) {
        const stone = stones[i];
        if (stone === 0) {
            newStones.push(1);
        } else if (hasEvenChars(stone)) {
            // convert to string and split in half
            const stoneStr = stone.toString();
            const half = stoneStr.length / 2;
            const firstHalfStr = stoneStr.slice(0, half);
            const secondHalfStr = stoneStr.slice(half);
            newStones.push(Number(firstHalfStr));

            if (secondHalfStr.split('').every(char => char === '0')) {
                newStones.push(0);
            } else if (secondHalfStr.startsWith('0')) {
                newStones.push(Number(secondHalfStr.slice(1)));
            } else {
                newStones.push(Number(secondHalfStr));
            }
        } else {
            newStones.push(stone * 2024);
        }
    }

    return blink(newStones, numBlinks, iterations + 1);
};

const result = blink(stones, 25);
const numStones = result.length;
console.log(numStones);
