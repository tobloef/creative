import {
  clear,
  getMiddle,
  getSize,
  resize,
  setHover,
} from './canvas.js';
import {
  isInRect,
  round,
} from './math.js';

const BAR_WIDTH = 5;
const SELECTOR_WIDTH = 15;
const SELECTOR_HEIGHT = 15;
const SLIDER_SPACING = 30;
const SLIDER_MARGIN = 15;

let params = {};
let sliders = {};

export const getParamValues = () => {
  return Object.entries(params)
    .reduce((acc, [key, { value }]) => ({
      ...acc,
      [key]: value,
    }), {});
}

export const setup = async (ctx, sketch) => {
  setupParams(sketch);
  setupSliders();
  setupCanvasListeners(ctx);
  try {
    await setupMidi();
  } catch (error) {
    console.error("Error setting up MIDI.", error);
  }

  update(ctx);
};

const setupParams = (sketch) => {
  params = Object.entries(sketch.params)
    .reduce((acc, [key, props]) => {
      return {
        ...acc,
        [key]: {
          ...props,
          value: props.initial,
        },
      }
    }, {});
}

const setupSliders = () => {
  sliders = Object.entries(params)
    .map(([key, { value, min, max }], i) => {
      return ({
        i,
        prog: (value - min) / (max - min),
        moving: false,
        hovering: false,
        param: key,
      });
    });
}

const setupCanvasListeners = (ctx) => {
  ctx.canvas.addEventListener("mousemove", (e) => handleMouseMove(e, ctx), false);
  ctx.canvas.addEventListener("mouseup", (e) => handleMouseUp(e, ctx), false);
  ctx.canvas.addEventListener("mousedown", (e) => handleMouseDown(e, ctx), false);
  ctx.canvas.addEventListener("mouseleave", (e) => handleMouseDown(e, ctx), false);
}

const setupMidi = async () => {
  const midi = await navigator.requestMIDIAccess();
  for (const input of midi.inputs.values()) {
    input.onmidimessage = (e) => {
      const [ _, key, val ] = e.data;
      const slider = Object.values(sliders)
        .find((slider) => slider.i === key);
      if (slider != null) {
        setSliderProg(slider, val / 127);
      }
    };
  }
}

const update = (ctx) => {
  if (ctx.canvas == null) {
    return;
  }
  resize(ctx);
  draw(ctx);
  requestAnimationFrame(() => update(ctx));
}

const draw = (ctx) => {
  clear(ctx, "white");
  for (const slider of Object.values(sliders)) {
    drawSlider(ctx, slider);
  }
  for (const slider of Object.values(sliders)) {
    if (slider.hovering || slider.moving) {
      drawSliderTooltip(ctx, slider);
    }
  }
}

const getSliderStuff = (slider, ctx) => {
  const size = getSize(ctx);
  const sliderWidth = (Math.max(BAR_WIDTH, SELECTOR_WIDTH) + SLIDER_SPACING);
  const slidersStart = getMiddle(ctx).x - ((sliderWidth * Object.values(params).length) / 2);
  const x = slidersStart + slider.i * sliderWidth;
  const y = SLIDER_MARGIN;
  const barX = x - BAR_WIDTH/2;
  const barY = y;
  const selectorX = x - SELECTOR_WIDTH/2;
  const minY = y - SELECTOR_HEIGHT/2;
  const barHeight = size.h - SLIDER_MARGIN * 2 + 3;
  const selectorY = barHeight * (1 - slider.prog) + minY;

  return {
    barX,
    barY,
    selectorX,
    selectorY,
    barHeight,
  };
};

const drawSlider = (ctx, slider) => {
  const {
    barX,
    barY,
    selectorX,
    selectorY,
    barHeight,
  } = getSliderStuff(slider, ctx);

  ctx.fillStyle = "hsl(197, 0%, 80%)";
  ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
  ctx.fillStyle = "hsl(197, 0%, 30%)";
  ctx.fillRect(selectorX, selectorY, SELECTOR_WIDTH, SELECTOR_HEIGHT);
}

function drawSliderTooltip(ctx, slider) {
  const {
    selectorX,
    selectorY,
  } = getSliderStuff(slider, ctx);

  const fontSize = 15;
  const pad = 10;
  const margin = 3;
  const border = 1;

  const str = `${slider.param}: ${params[slider.param].value}`

  ctx.save();
  ctx.font = `${fontSize}px monospace`;
  ctx.textBaseline = "top";
  const width = ctx.measureText(str).width;
  const x = selectorX + (SELECTOR_WIDTH / 2) - (width / 2);
  let y = selectorY - fontSize - margin;
  if (y < pad) {
    y = selectorY + SELECTOR_HEIGHT + margin + pad;
  }
  ctx.fillStyle = "#000000";
  ctx.fillRect(x - pad - border, y - pad - border, width + pad + border * 2, fontSize + pad + border * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x - pad, y - pad, width + pad, fontSize + pad);
  ctx.fillStyle = "#000000";
  ctx.fillText(str, x - (pad / 2), y - (pad / 2));
  ctx.restore();
}

const handleMouseMove = (e, ctx) => {
  const mouseX = e.pageX - ctx.canvas.offsetLeft;
  const mouseY = e.pageY - ctx.canvas.offsetTop;

  let isHover = false;

  for (const slider of Object.values(sliders)) {
    const {
      selectorX,
      selectorY,
      barHeight,
      barY,
    } = getSliderStuff(slider, ctx);

    const hovering = isInRect(
      selectorX,
      selectorY,
      SELECTOR_WIDTH,
      SELECTOR_HEIGHT,
      mouseX,
      mouseY
    );

    slider.hovering = hovering;

    isHover = isHover || slider.moving || hovering;

    if (slider.moving) {
      const relative = mouseY - barY;
      const bounded = Math.min(Math.max(relative, 0), barHeight);
      const newProg = 1 - (bounded / barHeight);
      setSliderProg(slider, newProg);
    }
  }

  setHover(ctx, isHover);
};

const setSliderProg = (slider, prog) => {
  slider.prog = prog;
  const param = params[slider.param];
  const range = param.max - param.min;
  const newValue = range * slider.prog + param.min;
  param.value = round(newValue, param.decimals);
}

const handleMouseUp = (e, ctx) => {
  for (const slider of Object.values(sliders)) {
    slider.moving = false;
  }
};

const handleMouseDown = (e, ctx) => {
  const mouseX = e.pageX - ctx.canvas.offsetLeft;
  const mouseY = e.pageY - ctx.canvas.offsetTop;


  for (const slider of Object.values(sliders)) {
    const {
      selectorX,
      selectorY,
    } = getSliderStuff(slider, ctx);

    slider.moving = isInRect(
      selectorX,
      selectorY,
      SELECTOR_WIDTH,
      SELECTOR_HEIGHT,
      mouseX,
      mouseY
    );
  }
};
