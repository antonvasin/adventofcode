import fs from 'fs';

let input = (await fs.promises.readFile(process.argv[2], 'utf8')).split('\n');

let rules = new Map();

for (const line of input) {
  let [color, rule] = line.slice(0, -1).split(' bags contain ');
  if (rule.match(/\d+/)) {
    rule = rule
      .split(', ')
      .map((r) => [r.slice(2).split(' ').slice(0, 2).join(' '), Number(r.slice(0, 2))]);
    // console.log('has bags', color, rule);
  } else {
    rule = undefined;
    // console.log('has no bags', color, rule);
  }

  // console.log({ color, rule });
  rules.set(color, rule);
}

let seen = new Map();
function hasColor(outer, inner) {
  if (outer == inner) {
    return false;
  }

  if (seen.has(outer)) {
    return seen.get(outer);
  }

  let rule = rules.get(outer);

  if (rule === undefined) {
    seen.set(outer, false);
    return false;
  }

  for (let [color, count] of rule) {
    if (color === inner) {
      seen.set(color, true);
      return true;
    }

    seen.set(color, hasColor(color, inner));
    if (seen.get(color) === true) {
      return true;
    }
  }

  return seen.get(outer);
}

let shinyGold = 'shiny gold';
let count = 0;
for (const [color] of rules) {
  if (hasColor(color, shinyGold)) {
    count++;
  }
}

console.log(count);
