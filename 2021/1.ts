const testInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

const file = (await Deno.readTextFile('./1-input.txt')).split('\n').map(Number);

function partOne(input: number[] = testInput) {
  let prev = undefined;
  let countInc = 0;

  for (const m of input) {
    if (prev) {
      if (m > prev) {
        countInc++;
      }
    }
    prev = m;
  }

  console.log('Inc', countInc);
}

function partTwo(input: number[] = testInput) {
  const threeMeasure = [];

  for (let i = 0; i < input.length; i++) {
    const element = input[i];
    const next = input[i + 1];
    const nextNext = input[i + 2];
    if (next && nextNext) {
      threeMeasure.push(element + next + nextNext);
    }
  }

  partOne(threeMeasure);
}

switch (Number(Deno.args[0])) {
  case 2:
    partTwo(file);
    break;

  case 1:
  default:
    partOne(file);
    break;
}
