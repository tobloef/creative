import {
  clear,
  resize,
} from './canvas.js';

let params = {};

const draw = (ctx) => {
  clear(ctx, "white");
}

const update = (ctx) => {
  if (ctx.canvas == null) {
    return;
  }
  resize(ctx);
  draw(ctx);
  requestAnimationFrame(() => update(ctx));
}

export const setup = (ctx, artwork) => {
  params = Object.entries(artwork.params)
    .reduce((acc, [key, props]) => {
      return {
        ...acc,
        [key]: props.default,
      }
    }, {});

  update(ctx);
};

export const getParams = () => {
  return params;
}