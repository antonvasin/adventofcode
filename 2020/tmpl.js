import { promises as fs } from 'fs';

let args = process.argv.slice(2);
let input = (await fs.readFile(args[0], 'utf8')).split('\n');
let part2 = args[1] === 'true';

for (const line of input) {
  // line
}
