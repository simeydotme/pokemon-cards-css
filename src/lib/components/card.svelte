<script>
	import { spring } from "svelte/motion";
	import { cubicInOut } from "svelte/easing";
	import { activeCard } from "$lib/stores/activeCard.js";

	import Glare from "$lib/components/card-glare.svelte";
	import Shine from "$lib/components/card-shine.svelte";

	export let cardBack = "https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg";
	export let img = cardBack;
	export let subtypes = "basic";
	export let supertype = "pokémon";
	export let rarity = "common";

	// const base = "https://tcg.pokemon.com/assets/img";
	const base = "https://images.pokemontcg.io/"

	let thisCard;
	let rotator;
	let active = false;
	let interacting = false;
	let firstPop = true;

	const springR = { stiffness: 0.066, damping: 0.25 };
	const springD = { stiffness: 0.033, damping: 0.45 };
	let springRotate = spring({ x: 0, y: 0 }, springR);
	let springGlare = spring({ x: 50, y: 50, o: 0 }, springR);
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
		// const angle =
		// 	(Math.atan2(absolute.y - rect.height / 2, absolute.x - rect.width / 2) * 180) / Math.PI + 90;

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
			y: percent.y,
			o: 1
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
			springGlare.set({ x: 50, y: 50, o: 0 });
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
		let delay = 100;
		setCenter();
		if ( firstPop ) {
			delay = 1000;
			springRotateDelta.set({
				x: 360,
				y: 0
			});
		}
		firstPop = false;
		springScale.set(1.5);
		interactEnd(null, delay);
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
		--o: ${$springGlare.o};
		--rx: ${$springRotate.x + $springRotateDelta.x}deg;
		--ry: ${$springRotate.y + $springRotateDelta.y}deg;
		--pos: ${$springBackground.x}% ${$springBackground.y}%;
		--posx: ${$springBackground.x}%;
		--posy: ${$springBackground.y}%;
		--hyp: ${ Math.sqrt( ($springGlare.y-50) * ($springGlare.y-50) +  ($springGlare.x-50) * ($springGlare.x-50) ) / 50};
	`;

	rarity = rarity.toLowerCase();
	supertype = supertype.toLowerCase();
	
	if ( Array.isArray( subtypes ) ) {
		subtypes = subtypes.join( " " ).toLowerCase();
	}
	
</script>

<svelte:window on:scroll="{reposition}" />

<div 
	class="card"
	class:active 
	class:interacting 
	data-subtypes="{subtypes}"
	data-supertype="{supertype}"
	data-rarity="{rarity}" 
	style={styles} 
	bind:this={thisCard}>

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
			<Shine {subtypes} {supertype} />
			<Glare {subtypes} />
		</div>
	</div>
</div>

<style>
	:root {
		--mx: 50%;
		--my: 50%;
		--s: 1;
		--o: 0;
		--tx: 0px;
		--ty: 0px;
		--rx: 0deg;
		--ry: 0deg;
		--pos: 50% 50%;
		--posx: 50%;
		--posy: 50%;
		--hyp: 0;

		--red: #cd196d;
    --yel: #aca21b;
    --gre: #6fbb77;
    --blu: #1698c0;
    --vio: rgb(163, 71, 206);
	}

	.card {
		--radius: 4.55% / 3.5%;
		z-index: calc( var(--s) * 100 );
		transform: translate3d(0,0,0.1px);
		will-change: transform, visibility;
		transform-style: preserve-3d;
	}

	.card.interacting {
		z-index: calc( var(--s) * 120 );
	}

	.card__translater,
	.card__rotator,
	.card__images {
		display: grid;
		perspective: 600px;
		transform-origin: center;
		will-change: transform;
	}

	.card__translater {
		width: auto;
		position: relative;
		transform: translate3d(var(--tx), var(--ty), 0) scale(var(--s));
	}

	.card__rotator {
		transform: rotateY(var(--rx)) rotateX(var(--ry));
		transform-style: preserve-3d;
		/* transition: opacity 0.75s cubic-bezier(0.77, 0, 0.18, 1); */
	}

	.card__rotator :global(*) {
		width: 100%;
		grid-area: 1/1;
		border-radius: var(--radius);
		image-rendering: optimizeQuality;
		transform-style: preserve-3d;
	}

	.card__images {
		/* aspect-ratio: 200/307; */
		transform: translateZ(-1px);
		transform-style: preserve-3d;
		background: rgb(168, 168, 168);
	}

	.card__back {
		transform: rotateY(180deg) translateZ(0px);
		backface-visibility: visible;
		z-index: 2;
	}

	.card__front {
		transform: translateZ(1px);
		backface-visibility: hidden;
		z-index: 1;
	}
</style>
