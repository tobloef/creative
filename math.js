export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

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