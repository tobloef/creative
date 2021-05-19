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

// From https://stackoverflow.com/a/3368118/4688606
export const roundRectPath = (ctx, x, y, w, h, r, noEnds = false) => {
  if (typeof r === "number") {
    r = { tl: r, tr: r, br: r, bl: r };
  } else {
    const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (const side in defaultRadius) {
      r[side] = r[side] || defaultRadius[side];
    }
  }
  for (const side in r) {
    if (w < 2 * r[side]) {
      r[side] = w / 2;
    }
    if (h < 2 * r[side]) {
      r[side] = h / 2;
    }
  }
  if (!noEnds) {
    ctx.beginPath();
  }
  ctx.moveTo(x + r.tl, y);
  ctx.lineTo(x + w - r.tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r.tr);
  ctx.lineTo(x + w, y + h - r.br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
  ctx.lineTo(x + r.bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r.bl);
  ctx.lineTo(x, y + r.tl);
  ctx.quadraticCurveTo(x, y, x + r.tl, y);
  if (!noEnds) {
    ctx.closePath();
  }
};