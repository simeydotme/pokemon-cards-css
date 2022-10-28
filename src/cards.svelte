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
		grid-gap: 2vw;
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

@media screen and (min-width: 600px) {
	.card-grid {
		grid-template-columns: 1fr 1fr;
	}
}

@media screen and (min-width: 900px) {
	.card-grid {
		grid-template-columns: 1fr 1fr 1fr;
	}
}

</style>
