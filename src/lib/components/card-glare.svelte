<script>

  export let subtypes = "basic";
  export let rarity = "common";

</script>
	
  <div class="card__glare {subtypes} {rarity}" />

<style>
  




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