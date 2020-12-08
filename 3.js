import fs from 'fs';

const input = (await fs.promises.readFile('./input-3.txt', 'utf-8')).split('\n');
const trees = [];

for (const [i, s] of input.entries()) {
  trees[i] = [];
  for (let j = 0; j < s.length; j++) {
    const c = s[j];
    trees[i][j] = c === '#';
  }
}

function check(right, down) {
  let count = 0;
  for (let t = 0; t * down < trees.length; t++) {
    const traversed = t * down;
    const column = (t * right) % trees[traversed].length;

    if (trees[traversed][column]) {
      count++;
    }
  }
  return count;
}

console.log(check(3, 1));

console.log(check(1, 1) * check(3, 1) * check(5, 1) * check(7, 1) * check(1, 2));
