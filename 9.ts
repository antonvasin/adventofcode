import { promises as fs } from 'fs';

let preamble = Number(process.argv[3] || 25);
let input = (await fs.readFile(process.argv[2], 'utf8')).split('\n').map(Number);

let found: number;
outer: for (let n = preamble; n < input.length; n++) {
  let num = input[n];

  for (let i = n - preamble; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      let l = input[i];
      let r = input[j];

      // found valid pair, moving to next number
      if (l !== r && l + r === num) {
        continue outer;
        // checked every other pair for this number
      } else if (j === n - 1 && i === n - 2) {
        found = num;
        break outer;
      }
    }
  }
}

console.log({ found });
