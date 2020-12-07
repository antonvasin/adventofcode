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

const SHINY_GOLD = 'shiny gold';

function countOuter(color) {
  let countOuter = 0;
  for (const [clr] of rules) {
    if (hasColor(clr, color)) {
      countOuter++;
    }
  }
  return countOuter;
}

function countBags(color) {
  let countInner = 0;

  if (rules.get(color) === undefined) {
    return 0;
  }

  for (let [clr, count] of rules.get(color)) {
    countInner += count + count * countBags(clr);
  }

  return countInner;
}

console.log({ countOuter: countOuter(SHINY_GOLD), countInner: countBags(SHINY_GOLD) });
