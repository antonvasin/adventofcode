const testInput = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2'];

function partOne(input: string[] = testInput) {
  let pos = 0;
  let depth = 0;

  const parsedInput: [string, number][] = input
    .map((s) => s.split(' '))
    .map(([c, v]) => [c, Number(v)]);

  for (const [cmd, val] of parsedInput) {
    switch (cmd) {
      case 'forward':
        pos += val;
        break;
      case 'down':
        depth += val;
        break;
      case 'up':
        depth -= val;
        break;
      default:
        break;
    }
  }

  return pos * depth;
}

function partTwo(input: string[] = testInput) {
  let pos = 0;
  let depth = 0;
  let aim = 0;

  const parsedInput: [string, number][] = input
    .map((s) => s.split(' '))
    .map(([c, v]) => [c, Number(v)]);

  for (const [cmd, val] of parsedInput) {
    switch (cmd) {
      case 'down':
        aim += val;
        break;
      case 'up':
        aim -= val;
        break;
      case 'forward':
        pos += val;
        depth += aim * val;
        break;

      default:
        break;
    }
  }

  return pos * depth;
}

export {};
const file = (await Deno.readTextFile('./2-input.txt')).split('\n');
const input = file;
console.log(Deno.args[0] === '2' ? partTwo(input) : partOne(input));
