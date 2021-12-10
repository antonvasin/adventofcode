import { promises as fs } from 'fs';

let args = process.argv.slice(2);
let input = (await fs.readFile(args[0], 'utf8')).split('\n');
let part2 = args[1] === 'true';
let maxNeighbours = part2 ? 5 : 4;

type World = Map<string, boolean>;
let nghbrs = new Map<string, string[]>();

function neighbours(world: World, k: string) {
  if (nghbrs.has(k)) {
    return nghbrs.get(k) as string[];
  }

  let [r, c] = k.split(',').map(Number);
  let ret: string[] = [];

  for (let rOffset = -1; rOffset <= 1; rOffset++) {
    for (let cOffset = -1; cOffset <= 1; cOffset++) {
      if (rOffset === 0 && cOffset === 0) {
        continue;
      }

      if (!part2) {
        let curR = r + rOffset;
        let curC = c + cOffset;

        let pos = `${curR},${curC}`;
        ret.push(pos);
      } else {
        for (let i = 1; ; i++) {
          let curR = r + rOffset * i;
          let curC = c + cOffset * i;
          let pos = `${curR},${curC}`;

          if (curR < 0 || curC < 0 || curR > 100 || curC > 100) {
            break;
          }

          if (world.has(pos) === true) {
            ret.push(pos);
            break;
          }
        }
      }
    }
  }

  nghbrs.set(k, ret);
  return ret;
}

function countNeighbours(world: World, k: string) {
  let count = 0;

  let adjacent = neighbours(world, k);

  for (let n of adjacent) {
    if (world.get(n) === true) {
      count++;
    }
  }

  return count;
}

let occupied: Map<string, boolean> = new Map();

for (let [r, s] of input.entries()) {
  for (let [c, v] of s.split('').entries()) {
    switch (v) {
      case 'L':
        occupied.set(`${r},${c}`, false);
        break;
      case '#':
        occupied.set(`${r},${c}`, true);

        break;
      default:
    }
  }
}

for (;;) {
  let changed = false;
  let prev = new Map(occupied);

  for (let [k, occ] of prev) {
    if (occ) {
      if (countNeighbours(prev, k) >= maxNeighbours) {
        occupied.set(k, false);
        changed = true;
      }
    } else {
      if (countNeighbours(prev, k) === 0) {
        occupied.set(k, true);
        changed = true;
      }
    }
  }

  if (!changed) {
    break;
  }
}

let count = 0;
for (let [k, v] of occupied) {
  if (v) {
    count++;
  }
}

console.log({ count });
