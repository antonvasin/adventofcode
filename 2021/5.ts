import { clear, MapDefault, runPuzzle } from "./common.ts";

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
  return input.split("\n").map((l) =>
    l.split(" -> ").map((n) => n.split(",").map(Number))
  );
}

function mark(input: number[][][]) {
  const marks = new MapDefault<string, number>(0);

  for (const [[fromX, fromY], [toX, toY]] of input) {
    if (fromX === toX) {
      if (fromY < toY) {
        for (let y = fromY; y <= toY; y++) {
          marks.update(`${fromX},${y}`, (k) => k + 1);
        }
      } else {
        for (let y = fromY; y >= toY; y--) {
          marks.update(`${fromX},${y}`, (k) => k + 1);
        }
      }
    } else if (fromY === toY) {
      if (fromX < toX) {
        for (let x = fromX; x <= toX; x++) {
          marks.update(`${x},${fromY}`, (k) => k + 1);
        }
      } else {
        for (let x = fromX; x >= toX; x--) {
          marks.update(`${x},${fromY}`, (k) => k + 1);
        }
      }
    }
  }

  return marks;
}

function _drawMap(marks: Map<string, number>) {
  let map = "";
  for (let y = 0; y < 10; y++) {
    let line = "";
    for (let x = 0; x < 10; x++) {
      const key = `${x},${y}`;

      if (marks.has(key)) {
        line += marks.get(key);
      } else {
        line += ".";
      }
    }

    map += "\n";
    map += line;
  }

  clear(true);
  console.log(map);
}

type Input = number[][][];

function run(input: Input) {
  const marks = mark(input);

  // _drawMap(marks);

  const danger = Array.from(marks.values()).filter((v) => v >= 2).length;

  return danger;
}

runPuzzle(run, parse, "./5-input.txt", testInput);
