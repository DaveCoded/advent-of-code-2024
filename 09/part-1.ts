import { readFileFromDir } from '../utils';

const input = readFileFromDir(__dirname, 'input.txt');

const expandLine = (input: string) => {
    let result: (number | null)[] = [];
    let id = 0;

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        const digit = parseInt(char);

        if (i % 2 === 0) {
            for (let j = 0; j < digit; j++) {
                result.push(id);
            }
            id++;
        } else {
            for (let j = 0; j < digit; j++) {
                result.push(null);
            }
        }
    }

    return result;
};

const result = expandLine(input);

let i = 0;
let j = result.length - 1;

while (i < j) {
    while (result[i] !== null) {
        i++;
    }

    while (result[j] === null) {
        j--;
    }

    if (i < j) {
        const temp = result[i];
        result[i] = result[j];
        result[j] = temp;
    }
}

let sum = 0;
let idx = 0;

while (result[idx] !== null) {
    sum += (result[idx] as number) * idx;
    idx++;
}

console.log(sum);
