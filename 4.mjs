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

function length(v, count) {
  return String(v).length === count;
}

function between(v, min, max) {
  return Number(v) >= min && Number(v) <= max;
}

let validationMap = {
  byr: (v) => length(v, 4) && between(v, 1920, 2002),
  iyr: (v) => length(v, 4) && between(v, 2010, 2020),
  eyr: (v) => length(v, 4) && between(v, 2020, 2030),
  hgt: (v) => {
    const height = v.substring(0, v.length - 2);
    const unit = v.substr(-2);

    switch (unit) {
      case 'cm':
        return between(height, 150, 193);
        break;

      case 'in':
        return between(height, 59, 76);
        break;

      default:
        return false;
    }
  },
  hcl: (v) => v.match(/^#([0-9a-fA-F]{6})$/g),
  ecl: (v) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v),
  pid: (v) => v.match(/^\d{9}$/),
  cid: () => true,
};

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
  return ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every((k) => {
    let v = p[k];
    if (v == null) {
      // console.error('missing value', k);
      return false;
    }

    // for part 1
    // return true;

    let isValid = validationMap[k](v);

    // if (!isValid) {
    //   console.error('invalid value: ', { k, v });
    // } else if (k === 'hgt') {
    //   console.info('valid value: ', { k, v });
    // }

    return isValid;
  });
}

for (const psprt of passports) {
  if (valid(psprt)) {
    validCount++;
  }
}

console.log(validCount);
