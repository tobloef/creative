export const getMiddle = (ctx) => {
  const size = getSize(ctx);
  return {
    x: size.w / 2,
    y: size.h / 2,
  };
}

export const resize = (ctx) => {
  const size = getSize(ctx);
  if (
    ctx.canvas.width !== size.w ||
    ctx.canvas.height !== size.h
  ) {
    ctx.canvas.width = size.w;
    ctx.canvas.height = size.h;
  }
}

export const clear = (ctx, backgroundColor = "white") => {
  ctx.fillStyle = backgroundColor;
  const size = getSize(ctx);
  ctx.fillRect(0, 0, size.w, size.h);
}

  export const setHover = (ctx, isHover) => {
  ctx.canvas.style.cursor = isHover ? "pointer" : "default";
}

export const getSize = (ctx) => {
  return {
    w: ctx.canvas.clientWidth,
    h: ctx.canvas.clientHeight,
  };
}