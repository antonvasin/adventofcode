import { parse } from 'https://deno.land/std/flags/mod.ts';

type Puzzle<T, O = string | number | boolean> = (input: T, ...args: any[]) => O;

type Parser<T> = (input: string) => T;

export async function runPuzzle<T>(
  puzzles: Puzzle<T>[] = [() => true],
  parseInput: Parser<T>,
  inputFilename: string,
  testInput: string,
) {
  const args = parse(Deno.args, {
    default: {
      test: false,
      part: 1,
    },
  });

  const input = args.test ? testInput : await Deno.readTextFile(inputFilename);
  const parsed = parseInput(input);

  const part = args.part - 1;
  const puzzle = puzzles[part] || puzzles[0];
  console.log(puzzle(parsed, ...args['_']));
}
