import { promises as fs } from 'fs';

let input = (await fs.readFile(process.argv[2], 'utf8')).split('\n');

type Instruction = (vm: VM) => void;

type VM = {
  program: Instruction[];
  accumulator: number;
  executed: Record<number, boolean>;
  programCounter: number;
};

function cycle(vm: VM) {
  let curCounter = vm.programCounter;

  if (vm.executed[curCounter]) {
    return false;
  }

  vm.executed[curCounter] = true;
  vm.programCounter++;

  if (vm.programCounter === vm.program.length) {
    return false;
  }

  vm.program[curCounter](vm);

  return true;
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
while (cycle(vm)) {}
console.log(vm.accumulator);
