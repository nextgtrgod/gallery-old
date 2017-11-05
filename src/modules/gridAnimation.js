import getMousePos from './getMousePos';

// helpers
const getDistance = (x1, x2, y1, y2) => {
	const dx = x1 - x2;
	const dy = y1 - y2;
	return Math.sqrt(dx * dx + dy * dy);
};


let instance = null;

export default class gridAnimation {
	constructor() {
		if (!instance) { instance = this };

		this.items = [];

		let WIDTH = window.innerWidth;
		let HEIGHT = window.innerHeight;

		this.params = {
			width: WIDTH,
			height: HEIGHT,
			center: {
				x: WIDTH / 2,
				y: HEIGHT / 2
			},
			mousePos: {
				x: WIDTH / 2,
				y: HEIGHT / 2
			},
			tilt: {
				x: 16,
				y: 16
			}
		}
	
		window.addEventListener('resize', () => {
			let WIDTH = window.innerWidth;
			let HEIGHT = window.innerHeight;
		}, false);

		document.addEventListener('mousemove', e => {
			this.params.mousePos = getMousePos(e);
		});

		(document.getElementsByTagName('html')[0].className)
			.includes('any-chrome') && this.animate();

		return instance;
	}

	subscribe = (node) => {
		this.items.push(node);
	}

	unsubscribe = (node) => {
		this.items = this.items.filter(item => item !== node);
	}

	animate = () => {
		this.items.map(item => {
			const transX = 2 * this.params.tilt.x / this.params.width * this.params.mousePos.x - this.params.tilt.x;
			const transY = 2 * this.params.tilt.y / this.params.height * this.params.mousePos.y - this.params.tilt.y;

			const bcr = item.getBoundingClientRect();
			const itemCenter = {
				x: bcr.left + bcr.width / 2,
				y: bcr.top + bcr.height / 2
			};
			
			const dist = getDistance(itemCenter.x, itemCenter.y, this.params.center.x, this.params.center.y);

			const tx = transX / this.params.width * dist || 0;
			const ty = transY / this.params.height * dist || 0;
			
			item.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
		});

		requestAnimationFrame(this.animate);
	}
}