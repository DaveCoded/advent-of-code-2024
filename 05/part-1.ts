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

/**
 * Find the sum of the middle numbers of the valid orders
 * An order is valid if it conforms to a list of rules
 * Each rule is a pair of numbers, where the first number must precede the second
 * The first number doesn't need to be immediately before the second, just before
 */

const input = readFileFromDir(__dirname, 'input.txt');

const [rulesInput, ordersInput] = input.split('\n\n');
const rules = rulesInput.split('\n').map(rule => rule.split('|').map(Number));
const orders = ordersInput.split('\n').map(order => order.split(',').map(Number));

const validOrders = [];

for (const order of orders) {
    let isValid = true;

    for (let i = 0; i < order.length; i++) {
        const update = order[i];

        const relevantRules = rules.filter(rule => rule.includes(update));
        const numbersToAppearBefore = relevantRules
            .filter(rule => rule[1] === update)
            .map(rule => rule[0]);
        const numbersToAppearAfter = relevantRules
            .filter(rule => rule[0] === update)
            .map(rule => rule[1]);

        // check if any numbers after update are in numbersToAppearBefore
        if (numbersToAppearBefore.some(num => order.slice(i).includes(num))) {
            isValid = false;
            break;
        }

        // check if any numbers before update are in numbersToAppearAfter
        if (numbersToAppearAfter.some(num => order.slice(0, i).includes(num))) {
            isValid = false;
            break;
        }
    }

    if (isValid) {
        validOrders.push(order);
    }
}

const sum = validOrders.reduce((acc, order) => {
    const milddleIndex = Math.floor(order.length / 2);
    return acc + order[milddleIndex];
}, 0);

console.log('🚀 ~ sum:', sum);
