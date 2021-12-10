const testInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

const file = (await Deno.readTextFile('./1-input.txt')).split('\n').map(Number);

let prev = undefined;
let countInc = 1;

for (const m of file) {
  if (prev) {
    if (m > prev) {
      countInc++;
    }
  }
  prev = m;
}

console.log('Inc', countInc);
