import fs from 'fs';
const {
  promises: { readFile },
} = fs;

const input = await readFile('./input-1.txt', 'utf-8');
const ary = input.split('\n').map(Number);

let pair;

for (const i of ary) {
  for (const j of ary) {
    if (i !== j && i + j === 2020) {
      pair = [i, j];
      break;
    }
  }
}

console.log('pair: ', pair[0] * pair[1]);

let triple;

for (const i of ary) {
  for (const j of ary) {
    for (const k of ary) {
      if (i !== j && i !== k && k !== j && i + j + k === 2020) {
        triple = [i, j, k];
        break;
      }
    }
  }
}

console.log('triple: ', triple[0] * triple[1] * triple[2]);
