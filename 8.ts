import { promises as fs } from 'fs';

let input = (await fs.readFile(process.argv[2], 'utf8')).split('\n').map((s) => {
  let [ins, arg] = s.split(' ');
  return [ins, Number(arg)] as [string, number];
});

type Opcode = (vm: VM) => void;

type VM = {
  program: [string, number][];
  accumulator: number;
  executed: Record<number, boolean>;
  programCounter: number;
};

type Program = [string, number][];

let accumulator = 0;
let seen = new Set();

function run(i: number, program: Program) {
  let [code, operand] = program[i];

  if (seen.has(i)) {
    console.log({ accumulator });
    throw Error('Infinite loop detected!');
  } else {
    seen.add(i);
  }

  // console.log({ ins, arg });

  switch (code) {
    case 'nop':
      return i + 1;
    case 'acc':
      accumulator += operand;
      return i + 1;
    case 'jmp':
      return i + operand;
    default:
      throw Error(`Unknown instruction '${code}'`);
  }
}

let i = 0;

while (i !== input.length) {
  i = run(i, input);
}
