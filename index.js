import * as art from "./art.js";
import * as params from "./params.js";
import * as mask from "./sketches/mask.js";
import * as fadingCircles from "./sketches/fading-circles.js";

const sketchMap = {
	mask,
	fadingCircles,
};

const main = async () => {
	checkMobile();

	const sketchName = new URLSearchParams(window.location.search).get("sketch");
	const sketch = sketchMap[sketchName] || mask;

	await setupParams(sketch);
	await setupMain(sketch);
};

const checkMobile = () => {
	if (/Mobi/.test(navigator.userAgent)) {
		alert("The website doesn't work very well in mobile browsers. Sorry about that!")
	}
}

const setupMain = async (sketch) => {
	const mainCtx = document
		.querySelector(".main canvas")
		.getContext("2d");
	await art.setup(mainCtx, sketch);
}

const setupParams = async (sketch) => {
	const paramsCtx = document
		.querySelector(".params canvas")
		.getContext("2d");
	await params.setup(paramsCtx, sketch);
}

// noinspection JSIgnoredPromiseFromCall
main();