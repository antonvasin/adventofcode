export {};
const testInput = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
];

function mostCommon(input: string[], n: number) {
  let count = 0;
  for (const num of input) {
    if (num.charAt(n) === '1') {
      count++;
    }
  }

  const half = input.length / 2;

  return count > half ? '1' : count === half ? '1' : '0';
}

function run(input: string[]) {
  const length = input[0].length;

  const count: string[] = [];
  for (let i = 0; i < length; i++) {
    count[i] = mostCommon(input, i);
  }

  let gamma = '';
  let epsilon = '';
  for (const bit of count) {
    if (bit === '1') {
      gamma += '1';
      epsilon += '0';
    } else {
      gamma += '0';
      epsilon += '1';
    }
  }

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function run2(input: string[]) {
  const width = input[0].length;

  let oxygen = '';
  let result = [...input];
  for (let i = 0; i < width; i++) {
    const mcv = mostCommon(result, i);

    result = result.filter((num) => num.charAt(i) === mcv);

    if (result.length === 1) {
      oxygen = result[0];
      break;
    }
  }

  result = [...input];
  let oc2 = '';
  for (let i = 0; i < width; i++) {
    const lcv = mostCommon(result, i) === '1' ? '0' : '1';

    result = result.filter((num) => num.charAt(i) === lcv);

    if (result.length === 1) {
      oc2 = result[0];
      break;
    }
  }

  return parseInt(oxygen, 2) * parseInt(oc2, 2);
}

const file = (await Deno.readTextFile('./3-input.txt')).split('\n');

console.log(1, run(file));
console.log(2, run2(file));
