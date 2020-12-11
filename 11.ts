import { promises as fs } from 'fs';

let input = (await fs.readFile(process.argv[2], 'utf8')).split('\n');

type World = string[][];

function tick(world: World): World {
  let next: World = [...world.map((r) => [...r])];

  for (let [i, line] of world.entries()) {
    for (let j = 0; j < line.length; j++) {
      let c = line[j];

      switch (c) {
        case 'L':
          if (neighbours(world, i, j) === 0) {
            next[i][j] = '#';
          }
          break;

        case '#':
          if (neighbours(world, i, j) >= 4) {
            next[i][j] = 'L';
          }
          break;

        default:
      }
    }
  }

  return next;
}

function neighbours(world: World, i: number, j: number) {
  let count = 0;

  outer: for (let m = -1; m < 2; m++) {
    for (let n = -1; n < 2; n++) {
      if (m === 0 && n === 0) {
        continue;
      }

      let curI = i + m;
      let curJ = j + n;

      if (curI < 0 || curI >= world.length) {
        continue;
      }

      if (curJ < 0 || curJ >= world[curI].length) {
        continue;
      }

      if (world[curI][curJ] === '#') {
        count++;
      }
    }
  }

  return count;
}

function same(l: World, r: World) {
  return l.every((s, i) => r[i].join('') === s.join(''));
}

function print(world: World) {
  // console.clear();
  console.log(world.map((r) => r.join('')).join('\n') + '\n');
}

let w: World = input.map((s) => s.split(''));

let prev = w;
let cur = w;
let run = true;
for (let i = 0; run; i++) {
  prev = cur;
  cur = tick(cur);
  let areTheSame = same(prev, cur);

  // console.log(`\n\n ${i}${areTheSame ? ' (same)' : ''}:\n`);
  // print(cur);

  if (areTheSame) {
    run = false;
  }
}

let count = cur.reduce((acc, l) => (acc += l.filter((s) => s === '#').length), 0);

console.log({ count });
