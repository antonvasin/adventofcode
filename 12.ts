import { promises as fs } from 'fs';

let args = process.argv.slice(2);
let input = (await fs.readFile(args[0], 'utf8')).split('\n');
let part2 = args[1] === 'true';

type Ship = {
  angle: number;
  x: number;
  y: number;
};

function rotate(ship: Ship, angle: number) {
  let newAngle = ship.angle + angle;

  if (newAngle < 0) {
    newAngle += 360;
  } else if (newAngle >= 360) {
    newAngle -= 360;
  }

  return { ...ship, angle: newAngle };
}

function forward(ship: Ship, value: number) {
  switch (ship.angle) {
    case 0:
      return { ...ship, y: ship.y + value };
    case 90:
      return { ...ship, x: ship.x + value };
    case 180:
      return { ...ship, y: ship.y - value };
    case 270:
      return { ...ship, x: ship.x - value };

    default:
      console.error('non right angle');
      return ship;
  }
}

function distance(ship: Ship) {
  return Math.abs(ship.x) + Math.abs(ship.y);
}

let ship: Ship = {
  x: 0,
  y: 0,
  angle: 90,
};

for (let l of input) {
  let dir = l.substring(0, 1);
  let value = Number(l.substring(1));

  switch (dir) {
    case 'N':
      ship.y += value;
      break;

    case 'E':
      ship.x += value;
      break;

    case 'S':
      ship.y -= value;
      break;

    case 'W':
      ship.x -= value;
      break;

    case 'F':
      ship = forward(ship, value);
      break;

    case 'R':
      ship = rotate(ship, value);
      break;
    case 'L':
      ship = rotate(ship, -value);
      break;
  }
}

console.log(distance(ship));
