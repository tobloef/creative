import {
  clear,
  getMiddle,
  getSize,
  resize,
} from '../canvas.js';
import perlin from '../perlin.js';
import { throttle } from '../util.js';

export const name = "noise";

export const params = {
  pixelSize: {
    initial: 3,
    min: 1,
    max: 5,
    decimals: 0,
  },
  zoom: {
    initial: 50,
    min: 1,
    max: 100,
    decimals: 0,
  },
}


let setupDone = false;
let noiseCtx;

const renderNoise = (ctx, dt, p) => {
  const size = getSize(ctx);
  clear(ctx, "white");
  for (let x = 0; x < size.w; x += p.pixelSize) {
    for (let y = 0; y < size.h; y += p.pixelSize) {
      const val = perlin.perlin2(x / p.zoom, y / p.zoom);
      ctx.fillStyle = `hsl(0, 0%, ${val * 100}%)`;
      ctx.fillRect(x, y, p.pixelSize, p.pixelSize);
    }
  }
};

const setup = (ctx) => {
  perlin.seed(Math.random());
  const noiseCanvas = document.createElement("canvas");
  noiseCanvas.style.position = "fixed";
  noiseCanvas.style.visibility = "hidden";
  document.body.append(noiseCanvas);
  noiseCtx = noiseCanvas.getContext("2d");
  setupDone = true;
};

let oldPJson;
let updateNoise = () => {};
const throttledUpdateNoise = throttle(() => updateNoise(), 500);

export const draw = (ctx, dt, p) => {
  if (!setupDone) {
    setup()
  }

  updateNoise = () => {
    oldPJson = JSON.stringify(p);
    renderNoise(noiseCtx, dt, p);
  };

  resize(ctx, noiseCtx, throttledUpdateNoise);

  if (JSON.stringify(p) !== oldPJson) {
    throttledUpdateNoise();
  }

  ctx.drawImage(noiseCtx.canvas, 0, 0);
}