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
				hsla(40, 100%, 97%, 0.95) 0%, 
				hsla(32, 100%, 87%, 0.45) 30%, 
				hsla(0, 0%, 0%, 0.75) 80% 
			);
			opacity: calc( var(--card-opacity) * 0.6 );
			filter: brightness(.9) contrast(1.8);
	}

:global(.card[data-rarity*="rare holo v"][data-gallery="true"]) .card__glare {
	background-image: 
		radial-gradient( 
			farthest-corner circle at var(--pointer-x) var(--pointer-y), 
			hsl(0, 0%, 100%) 10%, 
			hsla(0, 0%, 100%, 0.7) 35%, 
			hsl(0, 100%, 6%) 100% 
		);
}
		

</style>