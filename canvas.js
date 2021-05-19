export const getMiddle = (ctx) => {
  return {
    x: ctx.canvas.width / 2,
    y: ctx.canvas.height / 2,
  };
}

export const resize = (ctx) => {
  if (
    ctx.canvas.width !== ctx.canvas.clientWidth ||
    ctx.canvas.height !== ctx.canvas.clientHeight
  ) {
    ctx.canvas.width = ctx.canvas.clientWidth;
    ctx.canvas.height = ctx.canvas.clientHeight;
  }
}

export const clear = (ctx, backgroundColor = "white") => {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}