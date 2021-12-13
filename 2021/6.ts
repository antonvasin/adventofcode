import { runPuzzle } from './common.ts';

const testInput = `3,4,3,1,2`;

type Input = number[];

function parse(input: string) {
  return input.split(',').map(Number);
}

function run(input: Input, day = 1) {
  let fish: Record<number, number> = {};

  for (const n of input) {
    fish[n] ||= 0;
    fish[n]++;
  }

  for (let d = 1; d <= day; d++) {
    const old = { ...fish };
    fish = {};

    for (const [k, v] of Object.entries(old)) {
      const key = Number(k);
      if (key === 0) {
        fish[6] ||= 0;
        fish[6] += v;
        fish[8] ||= 0;
        fish[8] += v;

        continue;
      }

      fish[key - 1] ||= 0;
      fish[key - 1] += v;
    }
  }

  return Object.entries(fish).reduce((acc, [_, v]) => (acc += v), 0);
}

runPuzzle(run, parse, './6-input.txt', testInput);
