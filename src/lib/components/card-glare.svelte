<script>

  export let subtypes = "basic";
  export let rarity = "common";

</script>
	
  <div class="card__glare {subtypes} {rarity}" />

<style>
  




	:global(.card[data-rarity="rare secret"]) .card__glare {
		background-image: 
			radial-gradient( 
				circle at var(--pointer-x) var(--pointer-y), 
				rgba(255, 250, 240, 0.95) 0%, 
				rgba(255, 225, 190, 0.45) 30%, 
				rgba(0, 0, 0, 0.75) 80% 
			);
			opacity: calc( var(--card-opacity) * 0.6 );
			filter: brightness(.9) contrast(1.8);
	}

:global(.card[data-rarity*="rare holo v"][data-gallery="true"]) .card__glare {
	background-image: 
		radial-gradient( 
			farthest-corner circle at var(--pointer-x) var(--pointer-y), 
			rgba(255, 255, 255, 1) 10%, 
			rgba(255, 255, 255, 0.7) 35%, 
			rgba(30, 0, 0, 1) 100% 
		);
}
		

</style>