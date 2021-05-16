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

const drawTest = (ctx, t, p) => {
	const mid = getMiddle(ctx);
	for (let i = 0; i < p.dotCount; i++) {
		ctx.beginPath();
		const rel = (1 / p.dotCount) * (i + 1);
		const prog = (t + 2000) * (p.dotSpeed * (1 + rel));
		const dotPosX = Math.sin(prog);
		const dotPosY = Math.cos(prog);
		const x = mid.x + dotPosX * (20 + (p.circleRadius * rel));
		const y = mid.y + dotPosY * (20 + (p.circleRadius * rel));
		ctx.arc(x, y, p.dotRadius, 0, 2 * Math.PI, false);
		ctx.fillStyle = `rgba(255,255,255,1)`;
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "rgba(0,0,0,1)";
		ctx.stroke();
	}
}

const clear = (ctx) => {
	ctx.fillStyle = `rgba(0,0,0)`;
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

const draw = (ctx, t, p) => {
	clear(ctx);
	drawTest(ctx, t, p);
}

const update = (ctx, t) => {
	if (ctx.canvas == null) {
		return;
	}
	const p = {
		dotCount: 100,
		dotSpeed: 0.02,
		dotRadius: 5,
		circleRadius: 80,
	};
	resize(ctx);
	draw(ctx, t, p);
	requestAnimationFrame(() => update(ctx, t + 1));
}

const setup = () => {
	const canvas = document.querySelector("canvas");
	const ctx = canvas.getContext("2d");
	update(ctx, 0);
};

setup();
