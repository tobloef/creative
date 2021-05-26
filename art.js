import {
  resize,
} from './canvas.js';
import { getParamValues } from './params.js';

const update = (ctx, sketch, prevTime) => {
  if (ctx.canvas == null) {
    return;
  }
  resize(ctx);
  const p = getParamValues(sketch);
  const curTime = performance.now();
  const dt = (curTime - prevTime) / 1000;
  sketch.draw(ctx, dt, p);
  requestAnimationFrame(() => {
    update(ctx, sketch, curTime);
  });
}

export const setup = async (ctx, sketch) => {
  if (sketch.setup != null) {
    sketch.setup(ctx);
  }
  update(ctx, sketch, performance.now());
};
