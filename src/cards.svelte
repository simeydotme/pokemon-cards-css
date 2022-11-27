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
		
		background-color: rgba(0, 0, 0, 0.6);
		grid-template-columns: 1fr;
		grid-gap: 1.5vw;
		height: 100%;
		max-width: 85%;
		margin: auto;
		padding: 1%;
  		border-radius: 5px;
		align-items: center;
		position: relative;
		transform-style: preserve-3d;
		display: grid;
	}

	.card-grid.active {
		z-index: 99;
	}

@media screen and (min-width: 400px) {
	.card-grid {
		grid-template-columns: 1fr 1fr 1fr;
	}
}

@media screen and (min-width: 600px) {
	.card-grid {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
}

@media screen and (min-width: 900px) {
	.card-grid {
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	}
}

</style>
