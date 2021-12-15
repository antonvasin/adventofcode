import { createMap, range, runPuzzle } from "./common.ts";
const testInput = "16,1,2,0,4,2,7,1,2,14";

type Input = number[];

const parse = (s: string) => s.split(",").map(Number);

function run(input: Input) {
  const sum = createMap(0);

  for (const position of range(Math.min(...input), Math.max(...input) - 1)) {
    for (const crab of input) {
      const fuel = Math.abs(position - crab); // how much to move
      sum[position] += fuel;
    }
  }

  const cheapest = Object.entries(sum).sort(([_, a], [__, b]) => a - b)[0];

  return `position ${cheapest[0]}, fuel ${cheapest[1]}`;
}

function fib(n: number): number {
  return n === 0 ? 0 : n === 1 ? 1 : n + fib(n - 1);
}

console.log(fib(3));

function run2(input: Input) {
  const sum = createMap(0);

  for (const position of range(Math.min(...input), Math.max(...input) - 1)) {
    for (const crab of input) {
      const diff = Math.abs(position - crab);
      const fuel = fib(diff);

      sum[position] += fuel;
    }
  }

  const cheapest = Object.entries(sum).sort(([_, a], [__, b]) => a - b)[0];

  return `position ${cheapest[0]}, fuel ${cheapest[1]}`;
}

runPuzzle([run, run2], parse, "./7-input.txt", testInput);
