import {
  clear,
  getMiddle,
  roundRectPath,
} from '../canvas.js';
import { TAU } from '../math.js';

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

    ctx.fillStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    roundRectPath(ctx, x - p.width/2, y - p.height/2, p.width, p.height, p.cornerRadius, true)
    ctx.stroke();

    ctx.setTransform(transform);
  }

  ctx.closePath();
  ctx.clip();

  clear(ctx, "white");

  ctx.fillStyle = "#e14c45";
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  const bigRectSize = 350;
  roundRectPath(ctx, mid.x - bigRectSize/2, mid.y - bigRectSize/2, bigRectSize, bigRectSize, 0)
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}