import * as art from "./art.js";
import * as params from "./params.js";
import * as mask from "./sketches/mask.js";
import * as fadingCircles from "./sketches/fading-circles.js";

if (/Mobi/.test(navigator.userAgent)) {
	alert("The website doesn't work very well in mobile browsers. Sorry about that!")
}

const sketchMap = {
	mask,
	fadingCircles,
};
const sketchName = new URLSearchParams(window.location.search).get("sketch");
const sketch = sketchMap[sketchName] || mask;

const mainCtx = document
	.querySelector(".main canvas")
	.getContext("2d");
art.setup(mainCtx, sketch);

const paramsCtx = document
	.querySelector(".params canvas")
	.getContext("2d");
params.setup(paramsCtx, sketch);

