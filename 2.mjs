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

  // console.log({ from, to, char, pass });

  let pos1valid = false;
  let pos2valid = false;

  for (let i = 0, len = pass.length; i < len; i++) {
    if (i + 1 === from && pass.charAt(i) === char) {
      pos1valid = true;
    }

    if (i + 1 === to && pass.charAt(i) === char) {
      pos2valid = true;
    }
  }

  if (pos1valid && pos2valid) {
    return false;
  }

  return pos1valid || pos2valid;

  // first part

  // for (const c of pass) {
  //   if (c === char) {
  //     count++;
  //   }
  // }

  // if (count >= from && count <= to) {
  //   return true;
  // }

  // return false;
}

for await (const line of rl) {
  if (validate(line)) {
    i++;
  }
}
console.log('total is: ', i);

// console.log(validate('10-300 a: abcde')); // true
// console.log(validate('1-3 a: abcde')); // true
// console.log(validate('1-2 c: abcde')); // false
