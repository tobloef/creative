import {
  clear,
  getMiddle,
} from '../canvas.js';

export const params = {
  dotCount: {
    default: 500,
    min: 0,
    max: 0,
  },
  dotSpeed: {
    default: 0.01,
    min: 0,
    max: 0,
  },
  dotRadius: {
    default: 14,
    min: 0,
    max: 0,
  },
  circleRadius: {
    default: 180,
    min: 0,
    max: 0,
  },
  progSteps: {
    default: 44,
    min: 0,
    max: 0,
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

    const col = 255 - rel * 255;
    ctx.fillStyle = `rgba(${col},${col},${col},1)`;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.arc(x, y, p.dotRadius * rel, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
  }
}