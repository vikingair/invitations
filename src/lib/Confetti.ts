const HALF_PI = Math.PI * 0.5;

const Ease = {
	outCubic: (t: number, b: number, c: number, d: number) => {
		t /= d;
		t--;
		return c * (t * t * t + 1) + b;
	}
};

export type ParticleMode = 'confetti' | 'petals';

export type DrawOptions = {
	mode?: ParticleMode;
	/** Particle colors to pick from. Confetti falls back to random colors. */
	colors?: string[];
};

const pick = <T>(list: T[]): T => list[Math.floor(Math.random() * list.length)];

/**
 * Draws particles into the given canvas.
 *
 * @returns a function that stops the animation
 */
export const drawIntoCanvas = (
	canvas: HTMLCanvasElement,
	{ mode = 'confetti', colors }: DrawOptions = {}
): (() => void) => {
	const ctx = canvas.getContext('2d');
	if (!ctx) return () => {};
	const validColors = colors?.filter(Boolean);
	const colorList = validColors?.length ? validColors : undefined;

	return mode === 'petals'
		? drawPetals(canvas, ctx, colorList)
		: drawConfetti(canvas, ctx, colorList);
};

class Point {
	x: number;
	y: number;

	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
}

function cubeBezier(p0: Point, c0: Point, c1: Point, p1: Point, t: number) {
	const p = new Point();
	const nt = 1 - t;

	p.x = nt * nt * nt * p0.x + 3 * nt * nt * t * c0.x + 3 * nt * t * t * c1.x + t * t * t * p1.x;
	p.y = nt * nt * nt * p0.y + 3 * nt * nt * t * c0.y + 3 * nt * t * t * c1.y + t * t * t * p1.y;

	return p;
}

const drawConfetti = (
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D,
	colors?: string[]
): (() => void) => {
	// canvas settings
	const viewWidth = 512,
		viewHeight = 350,
		timeStep = 1 / 60;

	canvas.width = viewWidth;
	canvas.height = viewHeight;

	class Particle {
		p0: Point;
		p1: Point;
		p2: Point;
		p3: Point;

		time: number;
		duration: number;
		color: string;
		w: number;
		h: number;

		// from update
		r: number;
		sy: number;
		x: number;
		y: number;

		complete: boolean;

		constructor(p0: Point, p1: Point, p2: Point, p3: Point) {
			this.p0 = p0;
			this.p1 = p1;
			this.p2 = p2;
			this.p3 = p3;
			this.time = 0;
			this.duration = 3 + Math.random() * 2;
			this.color = colors ? pick(colors) : '#' + Math.floor(Math.random() * 0xffffff).toString(16);

			this.w = 8;
			this.h = 6;

			this.complete = false;

			this.r = 0;
			this.sy = 0;
			this.x = 0;
			this.y = 0;
		}

		update() {
			this.time = Math.min(this.duration, this.time + timeStep);

			const f = Ease.outCubic(this.time, 0, 1, this.duration);
			const p = cubeBezier(this.p0, this.p1, this.p2, this.p3, f);

			const dx = p.x - this.x;
			const dy = p.y - this.y;

			this.r = Math.atan2(dy, dx) + HALF_PI;
			this.sy = Math.sin(Math.PI * f * 10);
			this.x = p.x;
			this.y = p.y;

			this.complete = this.time === this.duration;
		}
		draw() {
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.rotate(this.r);
			ctx.scale(1, this.sy);

			ctx.fillStyle = this.color;
			ctx.fillRect(-this.w * 0.5, -this.h * 0.5, this.w, this.h);

			ctx.restore();
		}
	}

	const particles: Particle[] = [];
	for (let i = 0; i < 128; i++) {
		const p0 = new Point(viewWidth * 0.5, viewHeight * 0.5);
		const p1 = new Point(Math.random() * viewWidth, Math.random() * viewHeight);
		const p2 = new Point(Math.random() * viewWidth, Math.random() * viewHeight);
		const p3 = new Point(Math.random() * viewWidth, viewHeight + 64);

		particles.push(new Particle(p0, p1, p2, p3));
	}

	let frame = 0;
	const loop = () => {
		particles.forEach((p) => p.update());
		ctx.clearRect(0, 0, viewWidth, viewHeight);
		particles.forEach((p) => p.draw());

		if (particles.every((p) => p.complete)) {
			return;
		}

		frame = requestAnimationFrame(loop);
	};

	frame = requestAnimationFrame(loop);

	return () => cancelAnimationFrame(frame);
};

const PETAL_SPAWN_SECONDS = 6;
const PETAL_SPAWN_PER_SECOND = 9;
const PETAL_INITIAL_COUNT = 28;

type Petal = {
	baseX: number;
	y: number;
	x: number;
	size: number;
	vy: number;
	swayAmp: number;
	swayFreq: number;
	phase: number;
	rotation: number;
	rotationSpeed: number;
	flipFreq: number;
	alpha: number;
	color: string;
};

const drawPetals = (
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D,
	colors: string[] = ['#ffffff']
): (() => void) => {
	let width = 0;
	let height = 0;
	let scale = 1;

	const resize = () => {
		const dpr = window.devicePixelRatio || 1;
		width = canvas.clientWidth;
		height = canvas.clientHeight;
		canvas.width = Math.round(width * dpr);
		canvas.height = Math.round(height * dpr);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		scale = Math.min(1.6, Math.max(0.8, Math.min(width, height) / 600));
	};
	resize();
	window.addEventListener('resize', resize);

	const createPetal = (y: number): Petal => {
		const baseX = Math.random() * width;
		return {
			baseX,
			x: baseX,
			y,
			size: (6 + Math.random() * 6) * scale,
			vy: (28 + Math.random() * 40) * scale,
			swayAmp: (12 + Math.random() * 30) * scale,
			swayFreq: 0.6 + Math.random() * 1.2,
			phase: Math.random() * Math.PI * 2,
			rotation: Math.random() * Math.PI * 2,
			rotationSpeed: (Math.random() - 0.5) * 2.4,
			flipFreq: 0.8 + Math.random() * 1.6,
			alpha: 0.75 + Math.random() * 0.25,
			color: pick(colors)
		};
	};

	const petals: Petal[] = [];
	for (let i = 0; i < PETAL_INITIAL_COUNT; i++) {
		petals.push(createPetal(-Math.random() * height * 0.6 - 20));
	}

	let elapsed = 0;
	let spawnBudget = 0;
	let last: number | undefined;
	let frame = 0;

	const drawPetal = (p: Petal) => {
		const s = p.size;
		ctx.save();
		ctx.translate(p.x, p.y);
		ctx.rotate(p.rotation);
		// fake a 3D tumble by squashing one axis
		ctx.scale(1, 0.35 + 0.65 * Math.abs(Math.cos(elapsed * p.flipFreq + p.phase)));
		ctx.globalAlpha = p.alpha;

		// teardrop shaped petal
		ctx.beginPath();
		ctx.moveTo(0, -s);
		ctx.bezierCurveTo(s * 0.85, -s * 0.55, s * 0.65, s * 0.75, 0, s);
		ctx.bezierCurveTo(-s * 0.65, s * 0.75, -s * 0.85, -s * 0.55, 0, -s);
		ctx.closePath();
		ctx.fillStyle = p.color;
		ctx.fill();
		ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
		ctx.lineWidth = 0.6;
		ctx.stroke();

		ctx.restore();
	};

	const loop = (now: number) => {
		const dt = last === undefined ? 0 : Math.min(0.05, (now - last) / 1000);
		last = now;
		elapsed += dt;

		if (elapsed < PETAL_SPAWN_SECONDS) {
			spawnBudget += dt * PETAL_SPAWN_PER_SECOND;
			while (spawnBudget >= 1) {
				spawnBudget--;
				petals.push(createPetal(-20 * scale));
			}
		}

		for (let i = petals.length - 1; i >= 0; i--) {
			const p = petals[i];
			p.y += p.vy * dt;
			p.x = p.baseX + Math.sin(p.phase + elapsed * p.swayFreq) * p.swayAmp;
			p.rotation += p.rotationSpeed * dt;
			if (p.y > height + p.size * 2) petals.splice(i, 1);
		}

		ctx.clearRect(0, 0, width, height);
		petals.forEach(drawPetal);

		if (elapsed >= PETAL_SPAWN_SECONDS && !petals.length) {
			window.removeEventListener('resize', resize);
			return;
		}
		frame = requestAnimationFrame(loop);
	};

	frame = requestAnimationFrame(loop);

	return () => {
		cancelAnimationFrame(frame);
		window.removeEventListener('resize', resize);
	};
};
