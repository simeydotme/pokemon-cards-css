<script>
	import { spring } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import { activeCard } from '$lib/stores/activeCard.js';

	export let cardBack = '/global/tcg-card-back-2x.jpg';
	export let img = cardBack;
	export let type = 'normal';
	export let stage = 0;

	const base = 'https://tcg.pokemon.com/assets/img';

	let thisCard;
	let rotator;
	let active = false;
	let interacting = false;

	const springR = { stiffness: 0.066, damping: 0.25 };
	const springD = { stiffness: 0.033, damping: 0.35 };
	let springRotate = spring({ x: 0, y: 0 }, springR);
	let springGlare = spring({ x: 50, y: 50 }, springR);
	let springBackground = spring({ x: 50, y: 50 }, springR);
	let springRotateDelta = spring({ x: 0, y: 0 }, springD);
	let springTranslate = spring({ x: 0, y: 0 }, springD);
	let springScale = spring(1, springD);

	const round = (v) => parseFloat(v.toFixed(3));

	const interact = (e) => {

		if ( $activeCard && $activeCard !== thisCard ) return;

		const $el = e.target;
		const rect = $el.getBoundingClientRect(); // get element's current size/position
		const absolute = {
			x: e.clientX - rect.left, // get mouse position from left
			y: e.clientY - rect.top // get mouse position from right
		};
		const percent = {
			x: round((100 / rect.width) * absolute.x),
			y: round((100 / rect.height) * absolute.y)
		};
		const center = {
			x: percent.x - 50,
			y: percent.y - 50
		};
		const angle =
			(Math.atan2(absolute.y - rect.height / 2, absolute.x - rect.width / 2) * 180) / Math.PI + 90;

		interacting = true;

		springBackground.set({
			x: round(50 + percent.x / 4 - 12.5),
			y: round(50 + percent.y / 3 - 16.67)
		});
		springRotate.stiffness = springR.stiffness;
		springRotate.damping = springR.damping;
		springRotate.set({
			x: round(-(center.x / 3.5)),
			y: round(center.y / 2)
		});
		springGlare.stiffness = springR.stiffness;
		springGlare.damping = springR.damping;
		springGlare.set({
			x: percent.x,
			y: percent.y
		});
	};

	const interactEnd = (e, delay = 500) => {
		setTimeout(function () {
			interacting = false;
			springRotate.stiffness = 0.01;
			springRotate.damping = 0.06;
			springRotate.set({ x: 0, y: 0 });
			springGlare.stiffness = 0.01;
			springGlare.damping = 0.06;
			springGlare.set({ x: 50, y: 50 });
			springBackground.set({ x: 50, y: 50 });
		}, delay);
	};

	const activate = (e) => {
		if ( $activeCard && $activeCard === thisCard ) {
			$activeCard = undefined;
		} else {
			$activeCard = thisCard;
		}
	};

	const reposition = (e) => {
		if ( $activeCard && $activeCard === thisCard ) {
			setCenter();
		}
	}

	const setCenter = () => {
		const rect = thisCard.getBoundingClientRect(); // get element's size/position
		const view = document.documentElement; // get window/viewport size

		const delta = {
			x: round(view.clientWidth / 2 - rect.x - rect.width / 2),
			y: round(view.clientHeight / 2 - rect.y - rect.height / 2)
		};
		springTranslate.set({
			x: delta.x,
			y: delta.y
		});
	};

	const popover = () => {
		setCenter();
		springRotateDelta.set({
			x: 360,
			y: 0
		});
		springScale.set(1.5);
		interactEnd(null, 1000);
	};

	const retreat = () => {
		springTranslate.set({
			x: 0,
			y: 0
		});
		springRotateDelta.set({
			x: 0,
			y: 0
		});
		springScale.set(1);
		interactEnd(null, 100);
	};

	$: {
		if ($activeCard && $activeCard === thisCard) {
			popover();
			active = true;
		} else {
			retreat();
			active = false;
		}
	};

	$: styles = `
		--mx: ${$springGlare.x}%;
		--my: ${$springGlare.y}%;
		--tx: ${$springTranslate.x}px;
		--ty: ${$springTranslate.y}px;
		--s: ${$springScale};
		--rx: ${$springRotate.x + $springRotateDelta.x}deg;
		--ry: ${$springRotate.y + $springRotateDelta.y}deg;
		--pos: ${$springBackground.x}% ${$springBackground.y}%; 
		--posx: ${$springBackground.x}%; 
		--posy: ${$springBackground.y}%;
	`;
</script>

<svelte:window on:scroll="{reposition}" />

<div class="card" class:active class:interacting style={styles} bind:this={thisCard}>
	<div class="card__translater">
		<div
			class="card__rotator"
			bind:this={rotator}
			on:mousemove={interact}
			on:mouseout={interactEnd}
			on:blur={interactEnd}
			on:click={activate}
		>
			<div class="card__images">
				<img class="card__back" src="{base}{cardBack}" alt="" />
				<img class="card__front" src="{img.startsWith('http') ? '' : base}{img}" alt="" />
			</div>
			<!-- <div class="card__shine {type}" class:stage={stage > 0} /> -->
			<div class="card__light {type}" />
		</div>
	</div>
</div>

<style>
	:root {
		--mx: 50%;
		--my: 50%;
		--s: 1;
		--tx: 0px;
		--ty: 0px;
		--rx: 0deg;
		--ry: 0deg;
	}

	.card {
		--radius: 4.55% / 3.5%;
	}

	.card.active {
		z-index: 9;
	}

	.card__translater {
		display: grid;
		position: relative;
		width: auto;
		transform: translate3d(var(--tx), var(--ty), 0) scale(var(--s));
	}

	.card__rotator {
		transform: rotateY(var(--rx)) rotateX(var(--ry));
		transform-style: preserve-3d;
		transition: opacity 0.75s cubic-bezier(0.77, 0, 0.18, 1);
	}

	.card__translater,
	.card__rotator,
	.card__images {
		display: grid;
		perspective: 600px;
		transform-origin: center;
	}

	.card__rotator * {
		width: 100%;
		grid-area: 1/1;
		border-radius: var(--radius);
		image-rendering: optimizeQuality;
		transform-style: preserve-3d;
		backface-visibility: visible;
	}

	.card__back {
		transform: translateZ(-0.5px) rotateY(180deg);
		z-index: 1;
	}

	.card__front {
		transform: translateZ(1px);
		z-index: 2;
	}

	.card__images {
		transform: translateZ(-1px);
	}

	.card__shine {
		transform: translateZ(1px);
		z-index: 3;
		/* background: rgb(255, 255, 0); */
	}
	.card__light {
		transform: translateZ(1.2px);
		z-index: 4;
		background: radial-gradient(
			farthest-corner circle at var(--mx) var(--my),
			rgba(255, 255, 255, 0.8) 10%,
			rgba(255, 255, 255, 0.65) 20%,
			rgba(0, 0, 0, 0.5) 90%
		);
		mix-blend-mode: overlay;
		opacity: 0;
		transition: opacity 1s cubic-bezier(0.77, 0, 0.18, 1);
	}

	.card.interacting .card__light {
		opacity: 1;
		transition: opacity 0.2s cubic-bezier(0.77, 0, 0.18, 1);
	}
</style>
