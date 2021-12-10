const testInputOne = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

const inputOne = (await Deno.readTextFile('./1-input.txt')).split('\n').map(Number);

function onePartOne(input: number[] = testInputOne) {
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

function onePartTwo(input: number[] = testInputOne) {
  const threeMeasure = [];

  for (let i = 0; i < input.length; i++) {
    const element = input[i];
    const next = input[i + 1];
    const nextNext = input[i + 2];
    if (next && nextNext) {
      threeMeasure.push(element + next + nextNext);
    }
  }

  onePartOne(threeMeasure);
}

switch (Number(Deno.args[0])) {
  case 2:
    onePartTwo(inputOne);
    break;

  case 1:
  default:
    onePartOne(inputOne);
    break;
}
