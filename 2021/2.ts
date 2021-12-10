const testInputTwo = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2'];

function twoPartOne(input: string[] = testInputTwo) {
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

  console.log('Answer', pos * depth);
}

async function readFile(url: string) {
  return (await Deno.readTextFile(url)).split('\n');
}

twoPartOne(await readFile('./2-input.txt'));
