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

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
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

		const col = 255 - rel * 255;
		ctx.fillStyle = `rgba(${col},${col},${col},1)`;
		ctx.lineWidth = 1;
		ctx.strokeStyle = "rgba(0,0,0,1)";

		ctx.beginPath();
		ctx.arc(x, y, p.dotRadius * rel, 0, 2 * Math.PI, false);
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
	drawTest1(ctx, t, p);
}

const update = (ctx, t) => {
	if (ctx.canvas == null) {
		return;
	}
	const p = {
		dotCount: 1000,
		dotSpeed: 0.01,
		dotRadius: 14,
		circleRadius: 200,
		progSteps: 44,
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
