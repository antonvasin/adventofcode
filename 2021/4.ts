export {};
const testInput = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

type Boards = number[][][];

function run(input: string) {
  const [head, ...rest] = input.split('\n\n');
  const numbers = head.split(',').map(Number);
  const boards: Boards = rest.map((s) =>
    s.split('\n').map((s) => s.trim().split(/\s+/).map(Number)),
  );

  const marks: Boards = [];
  let winner: number | undefined = undefined;
  let winningNum: number | undefined = undefined;

  for (const num of numbers) {
    if (Number.isInteger(winner)) {
      break;
    }

    boards.forEach((board, b) => {
      if (Number.isInteger(winner)) {
        return;
      }

      marks[b] ||= [];

      board.forEach((line, l) => {
        marks[b][l] ||= [];
        if (Number.isInteger(winner)) {
          return;
        }

        const idx = line.findIndex((n) => n === num);

        if (idx > -1) {
          marks[b][l].push(idx);

          if (bingo(board, marks[b])) {
            winner = b;
            winningNum = num;
            return;
          }
        }
      });
    });
  }

  if (winner && winningNum) {
    const board = boards[winner];

    const sum = board.reduce(
      (sum, line, l) =>
        (sum += line
          .filter((_, i) => !marks[winner!][l].includes(i))
          .reduce((line, n) => (line += n), 0)),
      0,
    );

    console.log({ winner, winningNum }, boards[winner], marks[winner]);

    return sum * winningNum;
  } else {
    throw new Error('No winning board');
  }
}

function bingo(board: number[][], marks: number[][]) {
  // rows
  for (let r = 0; r < board.length; r++) {
    if (!marks[r]) {
      continue;
    }
    if (marks[r].length === board[r].length) {
      return true;
    }
  }

  // columns
  for (let c = 0; c < 5; c++) {
    if (marks.length !== board.length) {
      continue;
    }

    if (marks.every((r) => r.includes(c))) {
      return true;
    }
  }

  return false;
}

// console.log(run(testInput));
console.log(run(await Deno.readTextFile('./4-input.txt')));
