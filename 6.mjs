import fs from 'fs';

let input = await fs.promises.readFile(process.argv[2], 'utf8');
input = input.split('\n');

let answers = {};
let g = 0;

let count = 0;

for (let line of input) {
  if (!answers[g]) {
    answers[g] = {};
  }

  if (line === '') {
    g++;
  } else {
    for (let c of line) {
      if (!answers[g][c]) {
        count++;
        answers[g][c] = true;
      }
    }
  }
}

console.log(count);
