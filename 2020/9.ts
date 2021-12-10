import { promises as fs } from 'fs';

let preamble = Number(process.argv[3] || 25);
let input = (await fs.readFile(process.argv[2], 'utf8')).split('\n').map(Number);

let found = input.find((num, n) => {
  if (n < preamble) {
    return false;
  }

  for (let i = n - preamble; i < n - 1; i++) {
    let l = input[i];

    for (let j = i + 1; j < n; j++) {
      let r = input[j];

      // found valid pair, moving to next number
      if (l !== r && l + r === num) {
        return false;
        // checked every other pair for this number
      } else if (j === n - 1 && i === n - 2) {
        return true;
      }
    }
  }
});

let highLowSum = 0;

outer: for (let [i, num] of input.entries()) {
  let sum = num;
  let low = num;
  let high = num;

  for (let n = 1; n < input.length; n++) {
    let cur = input[i + n];
    sum += cur;
    if (high < cur) {
      high = cur;
    }

    if (low > cur) {
      low = cur;
    }

    if (sum === found) {
      highLowSum = high + low;
      break outer;
    }

    if (sum > found) {
      break;
    }
  }
}

console.log({ found, highLowSum });
