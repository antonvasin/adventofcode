import clear from 'https://deno.land/x/clear/mod.ts';
import { runPuzzle } from './common.ts';

export {};
const testInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

function parse(input: string) {
  return input.split('\n').map((l) => l.split(' -> ').map((n) => n.split(',').map(Number)));
}

function count(marks: Map<string, number>, key: string) {
  const prev = marks.get(key);
  return marks.set(key, prev ? prev + 1 : 1);
}

function mark(input: number[][][]) {
  const marks = new Map<string, number>();

  for (const [from, to] of input) {
    // vertical line, x1 == x2
    if (from[0] === to[0]) {
      const [fromY, toY] = [from[1], to[1]].sort();

      for (let y = fromY; y <= toY; y++) {
        count(marks, `${from[0]},${y}`);
      }
      // horizontal line, y1 == y2
    } else if (from[1] === to[1]) {
      const [fromX, toX] = [from[0], to[0]].sort();

      for (let x = fromX; x <= toX; x++) {
        count(marks, `${x},${from[1]}`);
      }
    }
  }

  return marks;
}

function _drawMap(marks: Map<string, number>) {
  let map = '';
  for (let y = 0; y < 1000; y++) {
    let line = '';
    for (let x = 0; x < 1000; x++) {
      const key = `${x},${y}`;

      if (marks.has(key)) {
        line += marks.get(key);
      } else {
        line += '.';
      }
    }

    map += '\n';
    map += line;
  }

  clear();
  console.log(map);
}

type Input = number[][][];

function run(input: Input) {
  const marks = mark(input);

  // _drawMap(marks);

  const danger = Array.from(marks.entries()).filter(([_, v]) => v > 1);

  return danger.length;
}

runPuzzle(run, parse, './5-input.txt', testInput);
