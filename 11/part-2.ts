import { readFileFromDir } from '../utils';

const input = readFileFromDir(__dirname, 'input.txt');
const hasEvenChars = (num: number) => num.toString().length % 2 === 0;
const isAllZeroes = (str: string) => str.split('').every(char => char === '0');
const setStone = (stones: Map<number, number>, stone: number, count: number) => {
    stones.set(stone, (stones.get(stone) || 0) + count);
};

const blink = (stones: Map<number, number>, numBlinks: number) => {
    for (let i = 0; i < numBlinks; i++) {
        const newStones = new Map<number, number>();

        for (const [stone, count] of stones.entries()) {
            if (stone === 0) {
                // Increase number of "1" stones by "0" stones
                setStone(newStones, 1, count);
            } else if (hasEvenChars(stone)) {
                const stoneStr = stone.toString();
                const half = stoneStr.length / 2;
                const firstHalf = Number(stoneStr.slice(0, half));
                const secondHalf = stoneStr.slice(half);
                setStone(newStones, firstHalf, count);

                // Trim zeroes
                const secondHalfNum = isAllZeroes(secondHalf) ? 0 : +secondHalf;
                setStone(newStones, secondHalfNum, count);
            } else {
                const newStone = stone * 2024;
                setStone(newStones, newStone, count);
            }
        }

        stones = newStones;
    }
    return stones;
};

// Create map from puzzle input: { stone: count }
const initialStones = input.split(' ').map(Number);
const initialMap = new Map<number, number>();
for (const stone of initialStones) {
    initialMap.set(stone, (initialMap.get(stone) || 0) + 1);
}

const result = blink(initialMap, 75);
const numStones = Array.from(result.values()).reduce((a, b) => a + b, 0);
console.log(numStones);
