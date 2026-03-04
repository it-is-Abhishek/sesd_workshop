#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const program = new commander_1.Command();
program
    .command("add <n1> <n2>")
    .description("Add two numbers")
    .action((n1, n2) => {
    const result = parseFloat(n1) + parseFloat(n2);
    console.log(`Result: ${result}`);
});
program
    .command("subtract <n1> <n2>")
    .description("Subtract n2 from n1")
    .action((n1, n2) => {
    const result = parseFloat(n1) - parseFloat(n2);
    console.log(`Result: ${result}`);
});
program
    .command("multiply <n1> <n2>")
    .description("Multiply two numbers")
    .action((n1, n2) => {
    const result = parseFloat(n1) * parseFloat(n2);
    console.log(`Result: ${result}`);
});
program
    .command("divide <n1> <n2>")
    .description("Divide n1 by n2")
    .action((n1, n2) => {
    if (parseFloat(n2) === 0) {
        console.log("Error: Cannot divide by zero");
        return;
    }
    const result = parseFloat(n1) / parseFloat(n2);
    console.log(`Result: ${result}`);
});
program.parse();
