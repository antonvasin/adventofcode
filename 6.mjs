import fs from 'fs';

let input = await fs.promises.readFile(process.argv[2], 'utf8');
input = input.split('\n');

let groups = [{}];
let people = [0];

let g = 0;
for (let line of input) {
  if (line === '') {
    groups.push({});
    people.push(0);

    g++;
  } else {
    for (let c of line) {
      if (!groups[g][c]) {
        groups[g][c] = 0;
      }
      groups[g][c]++;
    }
    people[g]++;
  }
}

let sum1 = 0;
let sum2 = 0;

for (const [i, gr] of groups.entries()) {
  for (let count of Object.values(gr)) {
    if (count === people[i]) {
      sum2++;
    }
  }

  sum1 += Object.values(gr).length;
}

console.log({ sum1, sum2 });
