import {
  clear,
  getMiddle,
  getSize,
  resize,
} from '../canvas.js';
import perlin from '../perlin.js';
import {
  degToRad,
  movePoint,
  rotatePoint,
} from '../math.js';
import { randomInt } from '../util.js';

export const name = 'hexagons';

export const params = {
  radius: {
    initial: 50,
    min: 10,
    max: 200,
    decimals: 1,
  },
  rotation: {
    initial: 0,
    min: 0,
    max: 5,
    decimals: 0,
  },
  hexLineSize: {
    initial: 0.5,
    min: 0.1,
    max: 20,
    decimals: 2,
  },
  pathLineSize: {
    initial: 15,
    min: 1,
    max: 50,
    decimals: 2,
  },
}

const getHexagonPoint = (radius, i) => {
  const angleDeg = 60 * i - 30;
  const angleRad = degToRad(angleDeg);
  return {
    x: radius * Math.cos(angleRad),
    y: radius * Math.sin(angleRad),
  }
}

const getHexagonPoints = (radius) => {
  const points = [];
  for (let i = 0; i < 6; i++) {
    points.push(getHexagonPoint(radius, i))
  }
  return points;
}

const randomRots = [];
for (let x = 0; x < 100; x++) {
  randomRots[x] = [];
  for (let y = 0; y < 100; y++) {
    randomRots[x][y] = 60 * randomInt(0, 5);
  }
}

export const draw = (ctx, dt, p) => {
  clear(ctx);

  const hexPoints = getHexagonPoints(p.radius);

  const size = getSize(ctx);
  const hexCount = {
    w: Math.round(size.w / p.radius),
    h: Math.round(size.h / p.radius),
  };

  const scaling = (1/100) * p.radius;

  for (let hexX = 0; hexX < hexCount.w + 1; hexX++) {
    for (let hexY = 0; hexY < hexCount.h + 1; hexY++) {
      const size = {
        w: p.radius * Math.sqrt(3),
        h: p.radius * 2,
      }
      const spacing = {
        x: size.w,
        y: size.h * 3/4,
      }
      const offset = {
        x: ((hexY + 1) % 2) * size.w/2,
        y: 0
      }
      const hexMid = {
        x: spacing.x * hexX + offset.x,
        y: spacing.y * hexY + offset.y,
      };

      const rotation = randomRots[hexX][hexY] + (p.rotation * 60);

      const borderPoints = hexPoints
        .map((point) => movePoint(point, hexMid))
        .map((point) => rotatePoint(point, rotation, hexMid));

      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = p.hexLineSize * scaling;

      ctx.beginPath();
      ctx.moveTo(borderPoints[0].x, borderPoints[0].y);
      for (let i = 0; i < borderPoints.length; i++) {
        const point = borderPoints[(i + 1) % borderPoints.length]
        ctx.lineTo(point.x, point.y);
      }
      //ctx.fill();
      ctx.stroke();

      const lineSize = Math.min(p.pathLineSize  * scaling, p.radius / 2);

      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";
      ctx.lineWidth = lineSize;

      const rotOff1 = 60 * 0 + rotation;
      const pp1 = rotatePoint({
        x: hexMid.x + size.w / 2,
        y: hexMid.y,
      }, rotOff1, hexMid);

      const rot1 = degToRad(rotation + 90);
      ctx.beginPath();
      ctx.arc(
        pp1.x,
        pp1.y,
        lineSize / 2,
        rot1,
        rot1 + Math.PI
      )
      ctx.fill();

      const rotOff2 = 60 * 3 + rotation;
      const pp2 = rotatePoint({
        x: hexMid.x + size.w / 2,
        y: hexMid.y,
      }, rotOff2, hexMid);

      const rot2 = degToRad(rotation + 270);
      ctx.beginPath();
      ctx.arc(
        pp2.x,
        pp2.y,
        lineSize / 2,
        rot2,
        rot2 + Math.PI
      )
      ctx.fill();



      ctx.beginPath();

      const rotOff3 = 60 * 1 + rotation;
      const pp3 = rotatePoint({
        x: hexMid.x + size.w / 2,
        y: hexMid.y,
      }, rotOff3, hexMid);
      ctx.moveTo(pp3.x, pp3.y);

      const rotOff4 = 60 * 1 + rotation;
      const pp4 = rotatePoint({
        x: hexMid.x + size.w / 4,
        y: hexMid.y,
      }, rotOff4, hexMid);
      ctx.lineTo(pp4.x, pp4.y);

      const rotOff5 = 60 * 2 + rotation;
      const pp5 = rotatePoint({
        x: hexMid.x + size.w / 4,
        y: hexMid.y,
      }, rotOff5, hexMid);
      ctx.lineTo(pp5.x, pp5.y);

      const rotOff6 = 60 * 2 + rotation;
      const pp6 = rotatePoint({
        x: hexMid.x + size.w / 2,
        y: hexMid.y,
      }, rotOff6, hexMid);
      ctx.lineTo(pp6.x, pp6.y);

      ctx.stroke();



      ctx.beginPath();

      const rotOff7 = 60 * 4 + rotation;
      const pp7 = rotatePoint({
        x: hexMid.x + size.w / 2,
        y: hexMid.y,
      }, rotOff7, hexMid);
      ctx.moveTo(pp7.x, pp7.y);

      const rotOff8 = 60 * 4 + rotation;
      const pp8 = rotatePoint({
        x: hexMid.x + size.w / 4,
        y: hexMid.y,
      }, rotOff8, hexMid);
      ctx.lineTo(pp8.x, pp8.y);

      const rotOff9 = 60 * 5 + rotation;
      const pp9 = rotatePoint({
        x: hexMid.x + size.w / 4,
        y: hexMid.y,
      }, rotOff9, hexMid);
      ctx.lineTo(pp9.x, pp9.y);

      const rotOff10 = 60 * 5 + rotation;
      const pp10 = rotatePoint({
        x: hexMid.x + size.w / 2,
        y: hexMid.y,
      }, rotOff10, hexMid);
      ctx.lineTo(pp10.x, pp10.y);

      ctx.stroke();
    }

  }
}