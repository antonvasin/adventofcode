import { promises as fs } from 'fs';

let input = (await fs.readFile(process.argv[2], 'utf8')).split('\n');

let differences: number[] = [];
let adapters = input.map(Number).sort((a, b) => a - b);
let myRating = Math.max(...adapters) + 3;

for (let [i, adapter] of adapters.entries()) {
  let next = adapters[i + 1];
  let diff = next - adapter;
  differences.push(diff);
}

console.log(
  (differences.filter((d) => d === 1).length + 1) * (differences.filter((d) => d === 3).length + 1),
);
