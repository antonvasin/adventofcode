import fs from 'fs';

let input = (await fs.promises.readFile(process.argv[2], 'utf8')).split('\n');

for (const line of input) {
  // line
}
