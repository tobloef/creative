import {
  clear,
  getMiddle,
} from '../canvas.js';

export const name = "fadingCircles";

export const params = {
  dotCount: {
    initial: 500,
    min: 10,
    max: 1000,
    decimals: 0,
  },
  dotSpeed: {
    initial: 0.7,
    min: 0,
    max: 2,
    decimals: 3,
  },
  dotRadius: {
    initial: 14,
    min: 1,
    max: 50,
    decimals: 0,
  },
  circleRadius: {
    initial: 180,
    min: 10,
    max: 300,
    decimals: 0,
  },
  aroundSteps: {
    initial: 44,
    min: 1,
    max: 100,
    decimals: 0,
  },
}

let prog = 0;

export const draw = (ctx, dt, p) => {
  prog += dt * p.dotSpeed;
  clear(ctx, "black");
  const mid = getMiddle(ctx);
  for (let i = p.dotCount - 1; i > 0; i--) {
    const rel = (1 / p.dotCount) * (i + 1);
    const around = rel * Math.PI * p.aroundSteps;
    const dotPosX = Math.sin(around + prog) + Math.cos(prog);
    const dotPosY = Math.cos(around + prog) + Math.sin(prog);
    const x = mid.x + dotPosX * p.circleRadius * rel;
    const y = mid.y + dotPosY * p.circleRadius * rel;

    const l = 100 - rel * 100;
    ctx.fillStyle = `hsla(0, 0%, ${l}%, 1)`;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.arc(x, y, p.dotRadius * rel, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
  }
}