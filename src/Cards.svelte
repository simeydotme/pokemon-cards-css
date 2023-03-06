<script>
	
	import { activeCard } from "./lib/stores/activeCard.js";
	
	let thisGrid;
	
	$: active = thisGrid && thisGrid.contains( $activeCard );
	
</script>

<section 
	class="card-grid" 
	class:active
	bind:this={thisGrid}
>

<slot />

</section>

<style>
	.card-grid {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 50px 2vw;
		transform-style: preserve-3d;
		height: 100%;
		max-width: 1200px;
		margin: auto;
		padding: 50px;
		position: relative;
	}
	
	.card-grid.active {
		z-index: 99;
	}
		
	@media screen and (min-width: 900px) {
		.card-grid {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
	
	
	@media screen and (max-width: 900px) {
		
		:global( .card-grid > .card ) {
			--row: 1;
			grid-column: 1;
			grid-row: var(--row);
			transition: opacity 0.2s ease, transform 0.2s ease;
		}

		:global( .card-grid > .card:nth-child(1n) ) {
			position: relative;
			left: -50px;
			top: 10px;
			z-index: calc(var(--card-scale) * 10 + 50);
			transform: translate3d(0, 0, 0.1px) rotateZ(-5deg);
			opacity: 1;
		}
		:global( .card-grid > .card:nth-child(2n) ) {
			left: 0px;
			top: -10px;
			z-index: calc(var(--card-scale) * 10 + 49);
			transform: translate3d(0, 0, 0.1px) rotateZ(0deg);
			opacity: 0.99;
		}
		:global( .card-grid > .card:nth-child(3n) ) {
			left: 50px;
			top: 0px;
			z-index: calc(var(--card-scale) * 10 + 48);
			transform: translate3d(0, 0, 0.1px) rotateZ(5deg);
			opacity: 0.99;
		}
		:global( .card-grid > .card.interacting) ,
		:global( .card-grid > .card.active ) {
			opacity: 1;
		}
		
		:global( .card-grid > .card:nth-child(n+4):nth-child(-n+6) ) { grid-row: 2; }
		:global( .card-grid > .card:nth-child(n+7):nth-child(-n+9) ) { grid-row: 3; }
		:global( .card-grid > .card:nth-child(n+10):nth-child(-n+12) ) { grid-row: 4; }
		:global( .card-grid > .card:nth-child(n+13):nth-child(-n+15) ) { grid-row: 5; }
		:global( .card-grid > .card:nth-child(n+16):nth-child(-n+18) ) { grid-row: 6; }
		:global( .card-grid > .card:nth-child(n+19) ) {
			grid-row: auto;
			grid-column: auto;
			transform: none!important;
			left: 0!important;
			top: 0!important;
		}

	}

	@media screen and (min-width: 600px) and (max-width: 900px) {
		.card-grid {
			max-width: 420px;
			margin: auto;
		}
		:global( .card-grid > .card:nth-child(1n) ) {
			left: -100px;
			top: 10px;
			transform: translate3d(0, 0, 0.1px) rotateZ(-5deg);
		}
		:global( .card-grid > .card:nth-child(2n) ) {
			left: 0px;
			top: -10px;
			transform: translate3d(0, 0, 0.1px) rotateZ(0deg);
		}
		:global( .card-grid > .card:nth-child(3n) ) {
			left: 100px;
			top: 0px;
			transform: translate3d(0, 0, 0.1px) rotateZ(5deg);
		}
	}

	:global( .card-grid > .card.active ) {
		transform: translate3d(0, 0, 0.1px)!important;
	}
	
</style>
