import fs from 'fs';

let input = await fs.promises.readFile(process.argv[2], 'utf8');
input = input.split('\n').slice(0, -1);

for (const line of input) {
  // line
}
