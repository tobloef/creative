import * as art from "./art.js";
import * as params from "./params.js";
import * as artwork from "./artworks/fading-circles.js";

const mainCtx = document
	.querySelector(".main canvas")
	.getContext("2d");
art.setup(mainCtx, artwork);

const paramsCtx = document
	.querySelector(".params canvas")
	.getContext("2d");
params.setup(paramsCtx, artwork);

