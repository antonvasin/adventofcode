import { parse } from "https://deno.land/std/flags/mod.ts";
import clear from "https://deno.land/x/clear/mod.ts";
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
  console.log("\nAnswer is", puzzle(parsed, ...args["_"]));
}

type DefaultValueMap<T> = Record<string, T>;

export function createMap<V, T extends DefaultValueMap<V>>(
  defaultVal: V,
  initial: T = {} as T,
): DefaultValueMap<V> {
  const handler: ProxyHandler<T> = {
    get(target, name: string) {
      return Object.prototype.hasOwnProperty.call(target, name)
        ? target[name]
        : JSON.parse(JSON.stringify(defaultVal)) as V;
    },
  };

  return new Proxy(initial, handler);
}
