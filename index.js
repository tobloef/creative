const getMiddle = (ctx) => {
	return {
		x: ctx.canvas.width / 2,
		y: ctx.canvas.height / 2,
	};
}

const resize = (ctx) => {
  if (
  	ctx.canvas.width !== ctx.canvas.clientWidth ||
    ctx.canvas.height !== ctx.canvas.clientHeight
  ) {
    ctx.canvas.width = ctx.canvas.clientWidth;
    ctx.canvas.height = ctx.canvas.clientHeight;
  }
}

const drawTest1 = (ctx, t, p) => {
	const mid = getMiddle(ctx);
	for (let i = p.dotCount - 1; i > 0; i--) {
		const rel = (1 / p.dotCount) * (i + 1);
		const prog = rel * Math.PI * p.progSteps;
		const dotPosX = Math.sin(prog + t * p.dotSpeed) + Math.cos(t * p.dotSpeed);
		const dotPosY = Math.cos(prog + t * p.dotSpeed) + Math.sin(t * p.dotSpeed);
		const x = mid.x + dotPosX * p.circleRadius * rel;
		const y = mid.y + dotPosY * p.circleRadius * rel;

		const val = 255 - rel * 255;
		ctx.fillStyle = `rgba(${val},${val},${val},1)`;
		ctx.lineWidth = 1;
		ctx.strokeStyle = "rgba(0,0,0,1)";

		ctx.beginPath();
		ctx.arc(x, y, p.dotRadius, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
	}
}

const drawTest2 = (ctx, t, p) => {
	ctx.fillStyle = `rgba(255,255,255,1)`;
	ctx.lineWidth = 1;
	ctx.strokeStyle = "rgba(0,0,0,1)";

	const mid = getMiddle(ctx);


	const x1 = mid.x + Math.sin(t * 0.01) * 100;
	const y1 = mid.y + Math.cos(t * 0.01) * 100;
	const x2 = mid.x + Math.sin(t * 0.01) * (100 - p.dotRadius*2);
	const y2 = mid.y + Math.cos(t * 0.01) * (100 - p.dotRadius*2);


	ctx.beginPath();
	ctx.arc(x1, y1, p.dotRadius, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(x2, y2, p.dotRadius, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(mid.x, mid.y, p.dotRadius, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.stroke();
}

const clear = (ctx) => {
	ctx.fillStyle = `rgba(0,0,0)`;
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

const draw = (ctx, t, p) => {
	clear(ctx);
	drawTest1(ctx, t, p);
}

const update = (ctx, t) => {
	if (ctx.canvas == null) {
		return;
	}
	const p = {
		dotCount: 200,
		dotSpeed: 0.01,
		dotRadius: 20,
		circleRadius: 140,
		progSteps: 35,
	};
	resize(ctx);
	draw(ctx, t, p);
	requestAnimationFrame(() => update(ctx, t + 1));
}

const circle = new Image();
circle.src = "circle.png";

const setup = () => {
	const canvas = document.querySelector("canvas");
	const ctx = canvas.getContext("2d");

	circle.onload = () => {
		update(ctx, 0);
	}
};

setup();
