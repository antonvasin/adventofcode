import { promises as fs } from 'fs';

let args = process.argv.slice(2);
let input = (await fs.readFile(args[0], 'utf8')).split('\n');
let part2 = args[1] === 'true';

type World = string[][];

let maxNeighbours = part2 ? 5 : 4;

function neighbours(world: Map<string, boolean>, k: string) {
  let count = 0;
  let [r, c] = k.split(',').map(Number);

  for (let rOffset = -1; rOffset <= 1; rOffset++) {
    for (let cOffset = -1; cOffset <= 1; cOffset++) {
      if (rOffset === 0 && cOffset === 0) {
        continue;
      }

      if (!part2) {
        let curR = r + rOffset;
        let curC = c + cOffset;

        if (curR < 0 || curC < 0 || curR >= world.size || curC >= 100) {
          continue;
        }

        if (world.get(`${curR},${curC}`) === true) {
          count++;
        }
      } else {
        for (let i = 0; ; i++) {
          let curR = r + rOffset * i;
          let curC = c + cOffset * i;

          if (curR < 0 || curC < 0 || curR >= world.size || curC >= 100) {
            break;
          }

          if (world.get(`${curR}${curC}`) === true) {
            count++;
            break;
          }
        }
      }
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
      if (neighbours(prev, k) >= maxNeighbours) {
        occupied.set(k, false);
        changed = true;
      }
    } else {
      if (neighbours(prev, k) === 0) {
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
