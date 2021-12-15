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

const cache = createMap(0);

function fib(n: number): number {
  if (n === 0 || n === 1) {
    return n;
  }

  if (cache[n]) {
    return cache[n];
  }

  const result = n + fib(n - 1);
  cache[n] = result;
  return result;
}

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
