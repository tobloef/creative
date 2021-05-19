import {
  resize,
} from './canvas.js';
import { getParams } from './params.js';

const update = (ctx, artwork, t) => {
  if (ctx.canvas == null) {
    return;
  }
  resize(ctx);
  const p = getParams(artwork);
  artwork.draw(ctx, t, p);
  requestAnimationFrame(() => {
    update(ctx, artwork, t + 1);
  });
}

export const setup = (ctx, artwork) => {
  update(ctx, artwork, 0);
};
