import { parse } from 'https://deno.land/std/flags/mod.ts';
import clear from 'https://deno.land/x/clear/mod.ts';
export { clear };

type Puzzle<T, O = string | number | boolean> = (input: T, ...args: any[]) => O;

type Parser<T> = (input: string) => T;

export async function runPuzzle<T>(
  puzzles: Puzzle<T> | Puzzle<T>[] = () => true,
  parseInput: Parser<T>,
  inputFilename: string,
  testInput: string,
) {
  const args = parse(Deno.args, {
    default: {
      test: false,
      part: 1,
    },
  });

  const input = args.test ? testInput : await Deno.readTextFile(inputFilename);
  const parsed = parseInput(input);

  const part = args.part - 1;
  const puzzle = Array.isArray(puzzles) ? puzzles[part] || puzzles[0] : puzzles;
  console.log('\nAnswer is', puzzle(parsed, ...args['_']));
}

export class MapDefault<K, V> extends Map<K, V> {
  private defaultVal: V;

  constructor(defaultVal: V, entries?: readonly (readonly [K, V])[] | null) {
    super(entries);
    this.defaultVal = defaultVal;
  }

  get(key: K) {
    if (!this.has(key)) {
      this.set(key, this.defaultVal);
    }

    return super.get(key);
  }

  update(key: K, cb: (v: V) => V) {
    const v = this.get(key);

    if (this.has(key) && typeof v !== 'undefined') {
      return this.set(key, cb(v));
    }
  }
}
