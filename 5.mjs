import fs from 'fs';

let input = await fs.promises.readFile(process.argv[2], 'utf8');
input = input.split('\n').slice(0, -1);

let passes = {};
let highest = 0;

// part 1
for (let pass of input) {
  let column = parseInt(pass.substring(7).replace(/L/g, 0).replace(/R/g, 1), 2);
  let row = parseInt(pass.substring(0, 7).replace(/F/g, 0).replace(/B/g, 1), 2);
  let id = row * 8 + column;

  passes[id] = { row, column, id };

  if (id > highest) {
    highest = id;
  }
}

console.log('Highest is:', highest);

// part 2
let gap = false;
let init = true;
for (let i = 0; i < 1024; i++) {
  let found = passes.hasOwnProperty(i);
  if (init && found) {
    init = false;
    gap = false;
    continue;
  }

  if (gap && found) {
    console.log('Missing is:', i - 1);
    break;
  }

  gap = !found;
}
