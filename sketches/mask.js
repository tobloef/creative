import {
  clear,
  drawPath,
  fill,
  getMiddle,
} from '../canvas.js';
import { TAU } from '../math.js';
import { roundRect } from '../paths.js';

export const name = "mask";

export const params = {
  count: {
    initial: 4,
    min: 1,
    max: 20,
    decimals: 0,
  },
  width: {
    initial: 175,
    min: 1,
    max: 300,
    decimals: 0,
  },
  height: {
    initial: 90,
    min: 1,
    max: 300,
    decimals: 0,
  },
  cornerRadius: {
    initial: 20,
    min: 0,
    max: 50,
    decimals: 0,
  },
  circleRadius: {
    initial: 175,
    min: 1,
    max: 300,
    decimals: 0,
  },
  rotationSpeed: {
    initial: 80,
    min: 0,
    max: 200,
    decimals: 1,
  }
}

let prog = 0;

export const draw = (ctx, dt, p) => {
  prog += dt * p.rotationSpeed;

  clear(ctx, "#eeeeee");
  const mid = getMiddle(ctx);

  ctx.save();

  ctx.beginPath();

  for (let i = 0; i < p.count; i++) {
    let x;
    let y;
    if (p.count === 1) {
      x = mid.x;
      y = mid.y;
    } else {
      const circleX = Math.sin((TAU / p.count) * i) * p.circleRadius;
      const circleY = Math.cos((TAU / p.count) * i) * p.circleRadius;
      x = mid.x + circleX;
      y = mid.y + circleY;
    }

    const transform = ctx.getTransform();

    ctx.translate(x, y);
    ctx.rotate((TAU / 360) * prog + (Math.PI/2) * i);
    ctx.translate(-x, -y);

    const path = roundRect(x - p.width/2, y - p.height/2, p.width, p.height, p.cornerRadius)
    fill(
      path,
      {
        stroke: "black",
        lineWidth: 2,
      }
    )(ctx);

    ctx.setTransform(transform);
  }

  ctx.closePath();
  ctx.clip();

  clear(ctx, "white");

  const bigRectSize = 350;
  const path = roundRect(mid.x - bigRectSize/2, mid.y - bigRectSize/2, bigRectSize, bigRectSize, 0);
  fill(
    drawPath(path),
    {
      fill: "#e14c45",
      stroke: "black",
      lineWidth: 1,
    }
  )(ctx);

  ctx.restore();
}