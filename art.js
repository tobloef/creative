import {
  resize,
} from './canvas.js';
import { getParamValues } from './params.js';

const update = (ctx, sketch, t) => {
  if (ctx.canvas == null) {
    return;
  }
  resize(ctx);
  const p = getParamValues(sketch);
  sketch.draw(ctx, t, p);
  requestAnimationFrame(() => {
    update(ctx, sketch, t + 1);
  });
}

export const setup = (ctx, sketch) => {
  update(ctx, sketch, 0);
};
