import { promises as fs } from 'fs';

let args = process.argv.slice(2);
let input = (await fs.readFile(args[0], 'utf8')).split('\n');
let part2 = args[1] === 'true';

let x = 0;
let y = 0;
let angle = 90;

let wayX = 10;
let wayY = 1;

for (let l of input) {
  let dir = l.substring(0, 1);
  let value = Number(l.substring(1));

  if (!part2) {
    switch (dir) {
      case 'N':
        y += value;
        break;

      case 'E':
        x += value;
        break;

      case 'S':
        y -= value;
        break;

      case 'W':
        x -= value;
        break;

      case 'F':
        switch (angle) {
          case 0:
            y += value;
            break;
          case 90:
            x += value;
            break;
          case 180:
            y -= value;
            break;
          case 270:
            x -= value;
            break;

          default:
            console.error('non right angle', angle);
            break;
        }
        break;

      case 'R':
        angle = (angle + value) % 360;
        break;
      case 'L':
        angle = (angle - value + 360) % 360;
        break;
    }
  } else {
    let rotate: [number, number, number, number][] = [
      //   0: x y -> x y
      [1, 0, 0, 1],
      //  90: x y -> -y x
      [0, -1, 1, 0],
      // 180: x y -> -x -y
      [-1, 0, 0, -1],
      // 270: x y -> y -x
      [0, 1, -1, 0],
    ];

    let newWayX;
    let newWayY;
    let orient;

    switch (dir) {
      case 'N':
        wayY += value;
        break;

      case 'E':
        wayX += value;
        break;

      case 'S':
        wayY -= value;
        break;

      case 'W':
        wayX -= value;
        break;

      case 'R':
        orient = (4 + -value / 90) % 4;
        newWayX = rotate[orient][0] * wayX + rotate[orient][1] * wayY;
        newWayY = rotate[orient][2] * wayX + rotate[orient][3] * wayY;
        wayX = newWayX;
        wayY = newWayY;
        break;

      case 'L':
        orient = (value / 90) % 4;
        newWayX = rotate[orient][0] * wayX + rotate[orient][1] * wayY;
        newWayY = rotate[orient][2] * wayX + rotate[orient][3] * wayY;
        wayX = newWayX;
        wayY = newWayY;
        break;

      case 'F':
        x += wayX * value;
        y += wayY * value;
        break;
    }
  }
}

console.log(Math.abs(x) + Math.abs(y));
