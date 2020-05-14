import { Operation } from './module.mjs';

const [, , ...operands] = process.argv;
let numbers = operands.map((operand) => parseInt(operand));

let operation = new Operation(...numbers);
console.log(operation.sum());