import { promises as fs } from 'fs';

let input = (await fs.readFile(process.argv[2], 'utf8')).split('\n');

type Instruction = (vm: VM) => void;

type VM = {
  program: Instruction[];
  accumulator: number;
  executed: Record<number, boolean>;
  programCounter: number;
};

function cycle(vm: VM): 0 | 1 | 2 {
  let curCounter = vm.programCounter;

  if (vm.executed[curCounter]) {
    // loop
    return 2;
  }

  vm.executed[curCounter] = true;
  vm.programCounter++;

  if (vm.programCounter === vm.program.length) {
    // ended
    return 1;
  }

  vm.program[curCounter](vm);

  // continue
  return 0;
}

function parseInstr(instrs: string[]): VM {
  let vm: VM = {
    program: [],
    accumulator: 0,
    programCounter: 0,
    executed: {},
  };

  for (let line of instrs) {
    let parts = line.split(' ');
    let code = parts[0];
    let operand = Number(parts[1]);

    switch (code) {
      case 'nop':
        vm.program.push((vm) => {});
        break;
      case 'acc':
        vm.program.push((vm) => {
          vm.accumulator += operand;
        });
        break;
      case 'jmp':
        vm.program.push((vm) => {
          vm.programCounter += operand - 1;
        });
        break;

      default:
        throw Error(`Unknown instruction '${code}'`);
    }
  }

  return vm;
}

let vm = parseInstr(input);
while (cycle(vm) === 0) {}

console.log(vm.accumulator);

outer: for (let [i, line] of input.entries()) {
  let parts = line.split(' ');
  let code = parts[0];
  let operand = Number(parts[1]);

  let replacement: string;

  switch (code) {
    case 'jmp':
      replacement = `nop ${operand}`;
      break;
    case 'nop':
      replacement = `jmp ${operand}`;
      break;
    default:
  }

  if (replacement) {
    vm = parseInstr([...input.slice(0, i), replacement, ...input.slice(i + 1)]);

    let run = true;

    loop: while (run) {
      let result = cycle(vm);
      switch (result) {
        case 0:
          break;
        case 1:
          console.log({ i, replacement, acc: vm.accumulator }, 'fixed');
          break outer;
        case 2:
          break loop;
      }
    }
  }
}
