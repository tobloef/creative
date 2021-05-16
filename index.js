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
	for (let i = p.dotCount - 1; i > 0; i--) {
		const rel = (1 / p.dotCount) * (i + 1);
		const prog = rel * Math.PI * 35;
		const dotPosX = Math.sin(prog) + Math.cos(t * p.dotSpeed);
		const dotPosY = Math.cos(prog) + Math.sin(t * p.dotSpeed);
		const x = mid.x + dotPosX * (0 + (p.circleRadius * rel));
		const y = mid.y + dotPosY * (0 + (p.circleRadius * rel));
		
		const val = 255 - rel * 255;
		ctx.fillStyle = `rgba(${val},${val},${val},1)`;
		ctx.lineWidth = 1;
		ctx.strokeStyle = "rgba(0,0,0,1)";

		ctx.beginPath();
		ctx.arc(
			x,
			y,
			p.dotRadius,
			0,
			2 * Math.PI,
			false
		);
		ctx.fill();
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
		dotCount: 200,
		dotSpeed: 0.02,
		dotRadius: 20,
		circleRadius: 140,
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
