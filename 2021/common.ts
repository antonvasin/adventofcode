type Puzzle<T, O = string | number | boolean> = (input: T) => O;

type Parser<T> = (input: string) => T;

export async function runPuzzle<T>(
  part1: Puzzle<T> = () => true,
  part2: Puzzle<T> = () => true,
  parse: Parser<T>,
  inputFilename: string,
  testInput: string,
) {
  const input = Deno.args[1] === 'test' ? testInput : await Deno.readTextFile(inputFilename);
  const parsed = parse(input);

  if (Deno.args[0] !== '2') {
    console.log(part1(parsed));
  } else {
    console.log(part2(parsed));
  }
}
