<script>
	import { spring } from "svelte/motion";
	import { onMount } from "svelte";
	import { activeCard } from "$lib/stores/activeCard.js";
	import { orientation, resetBaseOrientation } from "$lib/stores/orientation.js";
	import { clamp, round } from "$lib/helpers/Math.js";

	import Glare from "$lib/components/card-glare.svelte";
	import Shine from "$lib/components/card-shine.svelte";

	export let cardBack = "https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg";
	export let img = cardBack;

	export let number = cardBack;
	export let subtypes = "basic";
	export let supertype = "pokémon";
	export let rarity = "common";
	export let gallery = false;
	export let showcase = false;

	const base = "https://images.pokemontcg.io/"

	let thisCard;
	let rotator;
	let debounce;
	let active = false;
	let interacting = false;
	let firstPop = true;
	let loading = true;

	const springR = { stiffness: 0.066, damping: 0.25 };
	const springD = { stiffness: 0.033, damping: 0.45 };
	let springRotate = spring({ x: 0, y: 0 }, springR);
	let springGlare = spring({ x: 50, y: 50, o: 0 }, springR);
	let springBackground = spring({ x: 50, y: 50 }, springR);
	let springRotateDelta = spring({ x: 0, y: 0 }, springD);
	let springTranslate = spring({ x: 0, y: 0 }, springD);
	let springScale = spring(1, springD);
	
	const interact = (e) => {
		
		if ( $activeCard && $activeCard !== thisCard ) return;

		interacting = true;

		if ( e.type === "touchmove" ) {
			e.clientX = e.touches[0].clientX;
			e.clientY = e.touches[0].clientY;
		}

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

	const touchEnd = (e, delay) => {
		deactivate();
		interactEnd(e, delay);
	}

	const activate = (e) => {
		const isTouch = e.pointerType === "touch";
		if ( !isTouch && $activeCard && $activeCard === thisCard ) {
			// deactive if already active
			$activeCard = undefined;
		} else {
			$activeCard = thisCard;
			resetBaseOrientation();
		}
	};

	const deactivate = (e) => {
		interactEnd();
		$activeCard = undefined;
	}

	const reposition = (e) => {
		clearTimeout(debounce);
		debounce = setTimeout(() => {
			if ( $activeCard && $activeCard === thisCard ) {
				setCenter();
			}
		}, 300 );
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
		const rect = thisCard.getBoundingClientRect(); // get element's size/position
		let delay = 100;
		let scaleW = ( window.innerWidth / rect.width ) * 0.9;
		let scaleH = ( window.innerHeight / rect.height ) * 0.9;
		let scaleF = 1.75;
		setCenter();
		if ( firstPop ) {
			delay = 1000;
			springRotateDelta.set({
				x: 360,
				y: 0
			});
		}
		firstPop = false;
		springScale.set(Math.min(scaleW,scaleH,scaleF));
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

	$: {

		rarity = rarity.toLowerCase();
		supertype = supertype.toLowerCase();
		number = number.toLowerCase();
		gallery = number.startsWith( "tg" );
		if ( Array.isArray( subtypes ) ) {
			subtypes = subtypes.join( " " ).toLowerCase();
		}
	}

	const imageLoader = (e) => {
		loading = false;
	}

	const orientate = (e) => {

		const x = e.relative.gamma;
		const y = e.relative.beta;

		const max = { x: 16, y: 18 };
		const degrees = { x: clamp( x, -max.x, max.x ), y: clamp( y, -max.y, max.y ) };
		const percent = { x: 50 + (degrees.x / (max.x*2) * 100), y: 50 + (degrees.y / (max.y*2) * 100) };

		springBackground.set({
			x: round(50 + ((max.x*2) * ((50 - -percent.x) / 100)-max.x*2)),
			y: round(50 + ((max.y*2) * ((50 + percent.y) / 100)- max.y*2))
		});
		springRotate.stiffness = springR.stiffness;
		springRotate.damping = springR.damping;
		springRotate.set({
			x: round(degrees.x * -1),
			y: round(degrees.y)
		});
		springGlare.stiffness = springR.stiffness;
		springGlare.damping = springR.damping;
		springGlare.set({
			x: round(percent.x),
			y: round(percent.y),
			o: 1
		});
		
	}

	$: {
		if ( $activeCard && $activeCard === thisCard ) {
			interacting = true;
			orientate( $orientation );
		}
	}


	onMount(() => {
		if( showcase ) {
			let showTimer;
			const s = 0.02;
			const d = 0.5;
			setTimeout(() =>{
				interacting = true;
				active = true;
				springRotate.stiffness = s;
				springRotate.damping = d;
				springGlare.stiffness = s; 
				springGlare.damping = d;
				springBackground.stiffness = s;
				springBackground.damping = d;
				
				springRotate.set({ x: -15, y: 10 });
				springGlare.set({ x: 90, y: 0, o: 1 });
				springBackground.set({ x: 90, y: 0 });
				setTimeout(() =>{
					springRotate.set({ x: 15, y: 10 });
					springGlare.set({ x: 10, y: 0, o: 1 });
					springBackground.set({ x: 10, y: 0 });
					setTimeout(() =>{
						interactEnd(0);
					}, 3000);
				}, 3000);
				document.documentElement.scrollTop = 0;
			}, 2000);
		}
	});
	
</script>

<svelte:window on:scroll="{reposition}" />

<div 
	class="card"
	class:active 
	class:interacting 
	class:loading
	data-number="{number}"
	data-subtypes="{subtypes}"
	data-supertype="{supertype}"
	data-rarity="{rarity}" 
	data-gallery="{gallery}" 
	style={styles} 
	bind:this={thisCard}>

	<div class="card__translater">
		<div
			class="card__rotator"
			bind:this={rotator}
			on:pointerup={activate}
			on:pointermove={interact}
			on:mouseout={interactEnd}
			on:blur={deactivate}
			tabindex=0
		>
			<img class="card__back" src="{cardBack}" alt="" />
			<div class="card__front">
				<img src="{img.startsWith('http') ? '' : base}{img}" alt="" on:load="{imageLoader}" loading="lazy" />
				<Shine {subtypes} {supertype} />
				<Glare {subtypes} />
			</div>
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

	.card.active .card__translater,
	.card.active .card__rotator {
		touch-action: none;
	}

	.card__translater,
	.card__rotator {
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
		--glow: #69d1e9;
		transform: rotateY(var(--rx)) rotateX(var(--ry));
		transform-style: preserve-3d;
		box-shadow: 0px 10px 20px -5px black;
		border-radius: var(--radius);
		outline: none;
		transition: box-shadow 0.4s ease, outline 0.2s ease;
	}

	.card.active .card__rotator {
		box-shadow: 0 0 10px 0px var(--glow), 0 0 10px 0px var(--glow), 0 0 30px 0px var(--glow);
	}

	.card__rotator:focus {
		box-shadow: 0 0 10px 0px var(--glow), 0 0 10px 0px var(--glow), 0 0 30px 0px var(--glow);
	}

	.card.active .card__rotator:focus {
		box-shadow: 0px 10px 30px 3px black;
	}

	.card__rotator :global(*) {
		width: 100%;
		display: grid;
		grid-area: 1/1;
		border-radius: var(--radius);
		image-rendering: optimizeQuality;
		transform-style: preserve-3d;
	}

	.card__back {
		transform: rotateY(180deg);
		backface-visibility: visible;
	}

	.card__front,
	.card__front * {
		backface-visibility: hidden;
	}

	.card__front {
		opacity: 1;
		transition: opacity .2s ease-out;
	}

	.loading .card__front {
		opacity: 0;
	}

	.loading .card__back {
		transform: rotateY(0deg);
	}


</style>
