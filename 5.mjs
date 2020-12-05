import fs from 'fs';

let input = await fs.promises.readFile(process.argv[2], 'utf8');
input = input.split('\n').slice(0, -1);

let passes = [];
let highest = 0;

input.forEach((pass, i) => {
  let column = parseInt(pass.substring(7).replace(/L/g, 0).replace(/R/g, 1), 2);
  let row = parseInt(pass.substring(0, 7).replace(/F/g, 0).replace(/B/g, 1), 2);
  let id = row * 8 + column;

  passes[i] = { row, column, id };

  if (id > highest) {
    highest = id;
  }

  // console.log(passes[i]);
});

console.log('highest is: ', highest);
