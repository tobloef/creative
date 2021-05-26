// From https://stackoverflow.com/a/3368118/4688606
export const roundRect = (x, y, w, h, r) => {
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

  return (ctx) => {
    ctx.moveTo(x + r.tl, y);
    ctx.lineTo(x + w - r.tr, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r.tr);
    ctx.lineTo(x + w, y + h - r.br);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
    ctx.lineTo(x + r.bl, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r.bl);
    ctx.lineTo(x, y + r.tl);
    ctx.quadraticCurveTo(x, y, x + r.tl, y);
  };
};