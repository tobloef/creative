const getMiddle = (ctx) => {
	return {
		x: ctx.canvas.width / 2,
		y: ctx.canvas.height / 2,
	};
}

const resize = (ctx) => {
  if (
  	ctx.canvas.width != ctx.canvas.clientWidth ||
    ctx.canvas.height != ctx.canvas.clientHeight
  ) {
    ctx.canvas.width = ctx.canvas.clientWidth;
    ctx.canvas.height = ctx.canvas.clientHeight;
  }
}

const drawTest = (ctx, t) => {
	const animSpeed = 0.005;
	const animRadius = 100;
	const middle = getMiddle(ctx);
	for (let i = 0; i < 14; i++) {
		ctx.beginPath();
		const offsetX = Math.sin(t * animSpeed * (i + 1) + i * 0.45);
		const offsetY = Math.cos(t * animSpeed * (i + 1) + i * 0.45);
		const x = middle.x + offsetX * animRadius;
		const y = middle.y + offsetY * animRadius;
		const radius = 22;
		const val = 0.5 * (offsetX > 0 ? Math.abs(offsetY) : 2 - Math.abs(offsetY));
		const val2 = Math.abs(offsetY) * (255 - 50) + 50;
		const val3 = val * radius;
		const val4 = (255/7) * Math.abs(-7 + i);
		ctx.arc(x, y, val3, 0, 2 * Math.PI, false);
		ctx.fillStyle = `rgb(${val4}, ${val4}, ${val4})`;
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "rgba(0,0,0,0.5)";
		ctx.stroke();
	}
}

const clear = (ctx) => {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

const draw = (ctx, t) => {
	clear(ctx);
	drawTest(ctx, t);
}

const update = (ctx, t = 0) => {
	if (ctx.canvas == null) {
		return;
	}
	resize(ctx);
	draw(ctx, t);
	requestAnimationFrame(() => update(ctx, t + 1));
}

const setup = () => {
	const canvas = document.querySelector("canvas");
	const ctx = canvas.getContext("2d");
	update(ctx);
};

setup();
