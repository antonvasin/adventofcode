import fs from 'fs';

let file = process.argv[2];

let input = await fs.promises.readFile(file, 'utf8');

let passports = [];
let curPassport = [];

input.split('\n').forEach((l, i) => {
  if (l.includes(':') || i === input.length - 1) {
    const f = l.split(' ');

    curPassport = curPassport.concat(f);
  } else {
    let passObj = {};

    curPassport.forEach((f) => {
      let [k, v] = f.split(':');

      passObj[k] = v;
    });

    passports.push(passObj);
    curPassport = [];
  }
});

let validCount = 0;

function valid(p) {
  // byr (Birth Year)
  // iyr (Issue Year)
  // eyr (Expiration Year)
  // hgt (Height)
  // hcl (Hair Color)
  // ecl (Eye Color)
  // pid (Passport ID)
  // cid (Country ID)
  return ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every((f) => p[f] != null);
}

for (const psprt of passports) {
  if (valid(psprt)) {
    validCount++;
  }
}

console.log(validCount);
