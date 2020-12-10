import { promises as fs } from 'fs';

let input = (await fs.readFile(process.argv[2], 'utf8')).split('\n');

let voltages = input.map(Number).sort((a, b) => a - b);
// reverse idx
let seen: Record<number, number> = {};

let diffs = {
  ones: 1,
  threes: 1,
};

for (let [i, voltage] of voltages.entries()) {
  seen[voltage] = i;
  let next = voltages[i + 1];
  let diff = next - voltage;

  switch (diff) {
    case 1:
      diffs.ones++;
      break;
    case 3:
      diffs.threes++;
      break;
    default:
  }
}

let ways: Record<number, number> = {};
ways[voltages.length - 1] = 1;

// N is our voltage
//
// traverse from back to front, filling memoize obj
//
// from the bottom of the list
// check if +1 +2 or +3 exists
//   if so then add previously known value to the sum
// in the end memoize value for current element
for (let i = voltages.length - 2; i >= 0; i--) {
  let sum = 0;

  for (let diff = 1; diff <= 3; diff++) {
    let pos = seen[voltages[i] + diff];

    if (pos) {
      sum += ways[pos];
    }
  }

  ways[i] = sum;
}

let countTotal = 0;

// known sums at the top (1, 2, 3) are the ways to connect from 0 to N
for (let v = 1; v <= 3; v++) {
  let pos = seen[v];
  if (pos >= 0) {
    countTotal += ways[pos];
  }
}

console.log({
  result: diffs.ones * diffs.threes,
  countTotal,
});
