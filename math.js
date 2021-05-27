export const isInRect = (rectX, rectY, rectW, rectH, pointX, pointY) => {
  return (
    pointX > (rectX) &&
    pointX < (rectX + rectW) &&
    pointY > (rectY) &&
    pointY < (rectY + rectH)
  );
};

export const round = (num, decimals) => {
  const x = Math.pow(10, decimals);
  return Math.round((num + Number.EPSILON) * x) / x;
}

export const TAU = Math.PI * 2;

export const degToRad = (deg) => Math.PI / 180 * deg;

export const movePoint = (point, move) => {
  return {
    x: point.x + move.x,
    y: point.y + move.y,
  };
}

export const rotatePoint = (point, angleDeg, center) => {
  const angleRad = degToRad(angleDeg);
  const relX = point.x - center.x;
  const relY = point.y - center.y;
  return {
    x: Math.cos(angleRad) * relX - Math.sin(angleRad) * relY + center.x,
    y: Math.sin(angleRad) * relX + Math.cos(angleRad) * relY + center.y,
  }
}