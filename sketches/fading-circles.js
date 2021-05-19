import {
  clear,
  getMiddle,
} from '../canvas.js';

export const params = {
  dotCount: {
    initial: 500,
    min: 10,
    max: 1000,
    decimals: 0,
  },
  dotSpeed: {
    initial: 0.01,
    min: 0.001,
    max: 0.02,
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
  progSteps: {
    initial: 44,
    min: 1,
    max: 100,
    decimals: 0,
  },

  colorH: {
    initial: 0,
    min: 0,
    max: 360,
    decimals: 0,
  },
  colorS: {
    initial: 0,
    min: 0,
    max: 100,
    decimals: 0,
  },
  colorL: {
    initial: 100,
    min: 0,
    max: 100,
    decimals: 0,
  },
  colorA: {
    initial: 1,
    min: 0,
    max: 1,
    decimals: 2,
  },
}

export const draw = (ctx, t, p) => {
  clear(ctx, "black");
  const mid = getMiddle(ctx);
  for (let i = p.dotCount - 1; i > 0; i--) {
    const rel = (1 / p.dotCount) * (i + 1);
    const prog = rel * Math.PI * p.progSteps;
    const dotPosX = Math.sin(prog + t * p.dotSpeed) + Math.cos(t * p.dotSpeed);
    const dotPosY = Math.cos(prog + t * p.dotSpeed) + Math.sin(t * p.dotSpeed);
    const x = mid.x + dotPosX * p.circleRadius * rel;
    const y = mid.y + dotPosY * p.circleRadius * rel;

    const l = p.colorL - rel * p.colorL;
    ctx.fillStyle = `hsla(${p.colorH}, ${p.colorS}%, ${l}%, ${p.colorA})`;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.arc(x, y, p.dotRadius * rel, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
  }
}