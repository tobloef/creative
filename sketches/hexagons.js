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

const drawHexBorder = (ctx, radius, mid, rot, lineWidth) => {
  const hexPoints = getHexagonPoints(radius);

  const borderPoints = hexPoints
    .map((point) => movePoint(point, mid))
    .map((point) => rotatePoint(point, rot, mid));

  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = lineWidth;

  ctx.beginPath();
  ctx.moveTo(borderPoints[0].x, borderPoints[0].y);
  for (let i = 0; i < borderPoints.length; i++) {
    const point = borderPoints[(i + 1) % borderPoints.length]
    ctx.lineTo(point.x, point.y);
  }
  ctx.fill();
  ctx.stroke();
}

const drawDots = (ctx, width, mid, rot, lineWidth) => {
  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  ctx.lineWidth = lineWidth;

  const point = rotatePoint({
    x: mid.x + width / 2,
    y: mid.y,
  }, rot, mid);

  const arcRot = degToRad(rot + 90);
  ctx.beginPath();
  ctx.arc(
    point.x,
    point.y,
    lineWidth / 2,
    arcRot,
    arcRot + Math.PI
  )
  ctx.fill();
}

const drawConnection = (ctx, width, mid, rot, lineWidth) => {
  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  ctx.lineWidth = lineWidth;

  ctx.beginPath();

  const startPointRot = rot;
  const point1 = rotatePoint({
    x: mid.x + width / 2,
    y: mid.y,
  }, startPointRot, mid);
  ctx.moveTo(point1.x, point1.y);

  const point2 = rotatePoint({
    x: mid.x + width / 4,
    y: mid.y,
  }, startPointRot, mid);
  ctx.lineTo(point2.x, point2.y);

  const endPointRot = rot + 60;
  const point3 = rotatePoint({
    x: mid.x + width / 4,
    y: mid.y,
  }, endPointRot, mid);
  ctx.lineTo(point3.x, point3.y);

  const point4 = rotatePoint({
    x: mid.x + width / 2,
    y: mid.y,
  }, endPointRot, mid);
  ctx.lineTo(point4.x, point4.y);

  ctx.stroke();
}

const drawHexDecorations = (ctx, radius, mid, rot, lineWidth) => {
  const width = radius * Math.sqrt(3);
  drawDots(ctx, width, mid, 60 * 0 + rot, lineWidth);
  drawDots(ctx, width, mid, 60 * 3 + rot, lineWidth);
  drawConnection(ctx, width, mid, 60 * 1 + rot, lineWidth);
  drawConnection(ctx, width, mid, 60 * 4 + rot, lineWidth);
}

export const draw = (ctx, dt, p) => {
  clear(ctx);

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

      const borderLineSize = p.hexLineSize * scaling;
      drawHexBorder(ctx, p.radius, hexMid, rotation, borderLineSize);

      const lineSize = Math.min(p.pathLineSize  * scaling, p.radius / 2);
      drawHexDecorations(ctx, p.radius, hexMid, rotation, lineSize)
    }

  }
}