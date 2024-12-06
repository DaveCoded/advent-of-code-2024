/*
const exampleInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;
*/

import { readFileFromDir } from '../utils';

const input = readFileFromDir(__dirname, 'input.txt');

const [rulesInput, ordersInput] = input.split('\n\n');
const rules = rulesInput.split('\n').map(rule => rule.split('|').map(Number));
const orders = ordersInput.split('\n').map(order => order.split(',').map(Number));

const newOrders = [];

for (const order of orders) {
    let isSorted = false;
    let hasSwapped = false;
    let newOrder = [...order];

    while (!isSorted) {
        isSorted = true;

        for (let i = 0; i < newOrder.length - 1; i++) {
            const current = newOrder[i];
            const next = newOrder[i + 1];

            const relevantRules = rules.filter(rule => rule.includes(current));
            const numbersToAppearBefore = relevantRules
                .filter(rule => rule[1] === current)
                .map(rule => rule[0]);

            if (numbersToAppearBefore.includes(next)) {
                hasSwapped = true;
                // Swap
                newOrder[i] = next;
                newOrder[i + 1] = current;
                isSorted = false;
            }
        }
    }

    if (hasSwapped) {
        newOrders.push(newOrder);
    }
}

const sum = newOrders.reduce((acc, order) => {
    const milddleIndex = Math.floor(order.length / 2);
    return acc + order[milddleIndex];
}, 0);

console.log('🚀 ~ sum:', sum);
