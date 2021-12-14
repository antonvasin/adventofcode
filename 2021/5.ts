import { clear, createMap, runPuzzle } from "./common.ts";

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

function _drawMap(marks: Record<string, number>) {
  let map = "";
  for (let y = 0; y < 10; y++) {
    let line = "";
    for (let x = 0; x < 10; x++) {
      const key = `${x},${y}`;

      if (marks[key] !== 0) {
        line += marks[key];
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

function mark(input: number[][][], diagonal = false) {
  const marks = createMap(0);

  for (const [[fromX, fromY], [toX, toY]] of input) {
    if (fromX === toX) {
      if (fromY < toY) {
        for (let y = fromY; y <= toY; y++) {
          marks[`${fromX},${y}`]++;
        }
      } else {
        for (let y = fromY; y >= toY; y--) {
          marks[`${fromX},${y}`]++;
        }
      }
    } else if (fromY === toY) {
      if (fromX < toX) {
        for (let x = fromX; x <= toX; x++) {
          marks[`${x},${fromY}`]++;
        }
      } else {
        for (let x = fromX; x >= toX; x--) {
          marks[`${x},${fromY}`]++;
        }
      }
    } else if (diagonal) {
      if (fromX < toX) {
        let yInc = 1;
        if (fromY > toY) {
          yInc = -1;
        }
        let y = fromY;
        for (let x = fromX; x <= toX; x++) {
          marks[`${x},${y}`]++;
          y += yInc;
        }
      } else {
        let yInc = 1;
        if (fromY > toY) {
          yInc = -1;
        }
        let y = fromY;
        for (let x = fromX; x >= toX; x--) {
          marks[`${x},${y}`]++;
          y += yInc;
        }
      }
    }
  }

  return marks;
}

type Input = number[][][];

function parse(input: string) {
  return input.split("\n").map((l) =>
    l.split(" -> ").map((n) => n.split(",").map(Number))
  );
}

function run(input: Input) {
  const marks = mark(input);

  // _drawMap(marks);

  const danger = Array.from(Object.values(marks)).filter((v) => v >= 2).length;

  return danger;
}

function run2(input: Input) {
  const marks = mark(input, true);
  // _drawMap(marks);

  return Array.from(Object.values(marks)).filter((v) => v >= 2).length;
}

runPuzzle([run, run2], parse, "./5-input.txt", testInput);
