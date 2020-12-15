import { promises as fs } from 'fs';

let args = process.argv.slice(2);
let input = (await fs.readFile(args[0], 'utf8')).split('\n');
let part2 = args[1] === 'true';

class Ship {
  angle: number;
  x: number;
  y: number;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.angle = 90;
  }

  rotate(angle: number) {
    this.angle += angle;
    if (this.angle < 0) {
      this.angle += 360;
    } else if (this.angle >= 360) {
      this.angle -= 360;
    }
  }

  forward(value: number) {
    switch (this.angle) {
      case 0:
        this.y += value;
        break;
      case 90:
        this.x += value;
        break;
      case 180:
        this.y -= value;
        break;
      case 270:
        this.x -= value;
        break;
      default:
        console.error('non right angle');
        break;
    }
  }

  distance() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
}

let ship = new Ship();

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
      ship.forward(value);
      break;

    case 'R':
      ship.rotate(value);
      break;
    case 'L':
      ship.rotate(-value);
      break;
  }
}

console.log('end', ship.distance());
