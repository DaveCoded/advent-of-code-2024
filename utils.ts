import fs from 'fs';
import path from 'path';

export const readFileFromDir = (dir: string, fileName: string) => {
    const inputPath = path.join(dir, fileName);
    return fs.readFileSync(inputPath, 'utf-8');
};

export const sortNumsInPlaceAsc = <T extends number>(arr: T[]): T[] => arr.sort((a, b) => a - b);
