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
].map((s) => parseInt(s, 2));

function run(input: number[]) {
  const length = Math.max(...input).toString(2).length;
  console.log('length', length);

  const count: number[] = Array(length).fill(0);

  // for each number in input
  for (let i = 0; i < input.length; i++) {
    const num = input[i];

    // count occurance of 0 and 1 in each bit position
    // 5 bit positons: 01010
    // for each positions chech wheter the bit is 1
    for (let j = 0; j < length; j++) {
      // get mask for each position by shifting left by j bits
      const mask = 1 << j;

      // if bit is 1 then increase counter
      if (num & mask) {
        count[length - 1 - j]++;
      }
    }
  }

  let gamma = '';
  let epsilon = '';
  for (const bit of count) {
    if (bit > input.length / 2) {
      gamma += '1';
      epsilon += '0';
    } else {
      gamma += '0';
      epsilon += '1';
    }
  }

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

const file = (await Deno.readTextFile('./3-input.txt')).split('\n').map((s) => parseInt(s, 2));

console.log(run(file));
