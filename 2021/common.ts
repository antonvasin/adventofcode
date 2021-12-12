type Puzzle = (input: string) => any;

export async function runPuzzle(
  part1: Puzzle,
  part2: Puzzle,
  inputFilename: string,
  testInput: string,
) {
  const input = Deno.args[1] === 'test' ? testInput : await Deno.readTextFile(inputFilename);

  if (Deno.args[0] !== '2') {
    console.log(part1(input));
  } else {
    console.log(part2(input));
  }
}
