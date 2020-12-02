import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface(fs.createReadStream('./input-2.txt'));

let i = 0;

function validate(line) {
  let count = 0;

  let from, to, char, dashIdx, pass;
  for (let i = 0, len = line.length; i < len; i++) {
    if (line.charAt(i) === '-') {
      from = Number(line.substring(0, i));
      dashIdx = i;
    } else if (line.charAt(i) === ' ') {
      to = Number(line.substring(dashIdx + 1, i));
      char = line.charAt(i + 1);
    } else if (line.charAt(i) === ':') {
      pass = line.substring(i + 2);
      break;
    }
  }

  for (const c of pass) {
    if (c === char) {
      count++;
    }
  }

  // console.log({ from, to, char, pass });

  if (count >= from && count <= to) {
    return true;
  }

  return false;
}

for await (const line of rl) {
  if (validate(line)) {
    i++;
  }
}

// console.log(validate('10-300 a: abcde'));
console.log('total is: ', i);
