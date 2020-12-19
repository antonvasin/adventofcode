import { promises as fs } from 'fs';

let args = process.argv.slice(2);
let input = (await fs.readFile(args[0], 'utf8')).split('\n');
let part2 = args[1] === 'true';

let time = Number(input[0]);
let buses = input[1].split(',');

let next = new Map<number, number>();

for (let bus of buses) {
  if (bus === 'x') {
    continue;
  }

  let offset = Number(bus);

  let timeslot: number = 0;

  while (timeslot < time) {
    timeslot += offset;
  }

  next.set(offset, timeslot);
}

let minT = Infinity;
let id: number;

for (let [i, t] of next) {
  if (t < minT) {
    minT = t;
    id = i;
  }
}

console.log(id! * (minT - time));
