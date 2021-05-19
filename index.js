import * as art from "./art.js";
import * as params from "./params.js";
import * as sketch from "./sketches/fading-circles.js";

const mainCtx = document
	.querySelector(".main canvas")
	.getContext("2d");
art.setup(mainCtx, sketch);

const paramsCtx = document
	.querySelector(".params canvas")
	.getContext("2d");
params.setup(paramsCtx, sketch);

