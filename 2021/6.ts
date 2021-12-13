import { runPuzzle } from './common.ts';

const testInput = `3,4,3,1,2`;

type Input = number[];

function parse(input: string) {
  return input.split(',').map(Number);
}

function run(input: Input, day = 1) {
  console.log({ day });

  const result = [...input];

  for (let d = 0; d < day; d++) {
    const lengthBefore = result.length;

    for (let i = 0; i < result.length; i++) {
      if (i >= lengthBefore) {
        break;
      }

      if (result[i] === 0) {
        result[i] = 6;
        result.push(8);
      } else {
        result[i] -= 1;
      }
    }
  }

  return result.length;
}

runPuzzle([run, () => true], parse, './6-input.txt', testInput);
