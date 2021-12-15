import { createMap, range, runPuzzle } from "./common.ts";
const testInput = "16,1,2,0,4,2,7,1,2,14";

type Input = number[];

const parse = (s: string) => s.split(",").map(Number);

function run(input: Input) {
  const sum = createMap(0);
  let cheapest;

  for (const position of range(Math.min(...input), Math.max(...input) - 1)) {
    for (const crab of input) {
      const fuel = Math.abs(position - crab); // how much to move
      sum[position] += fuel;
    }
  }

  return Object.entries(sum).sort(([_, a], [__, b]) => a - b)[0] as any;
}

runPuzzle(run, parse, "./7-input.txt", testInput);
