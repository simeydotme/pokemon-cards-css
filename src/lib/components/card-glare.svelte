<script>

  export let subtypes = "basic";
  export let rarity = "common";

</script>
	
  <div class="card__glare {subtypes} {rarity}" />

<style>
  
	.card__glare {
		transform: translateZ(1.4px);
		background: radial-gradient(
			farthest-corner circle at var(--mx) var(--my),
			rgba(255, 255, 255, 0.8) 10%,
			rgba(255, 255, 255, 0.65) 20%,
			rgba(0, 0, 0, 0.5) 90%
		);
		mix-blend-mode: overlay;
		opacity: var(--o);
	}

  .card__glare.holo:not(.v):not(.vmax):not(.vstar) {
		opacity: calc(var(--o)*.8);
    filter: brightness(0.8) contrast(1.5);
  }

	.card__glare.v,
	.card__glare.vfull,
	.card__glare.vmax,
	.card__glare.vstar {
    filter: brightness(.9) contrast(1.75);
		background: 
			radial-gradient( 
				farthest-corner circle at 
					var(--mx) var(--my), 
					rgb(255, 255, 255) 0%, 
					rgba(133, 137, 141, .33) 45%, 
					rgba(100, 100, 100, .65) 120% 
				);
		opacity: calc(var(--o)*.66);
  }


	.card__glare.vmax {		
		background: 
			radial-gradient( 
				farthest-corner circle at 
				var(--mx) var(--my), 
				rgba(255, 255, 255, 0.75) 0%, 
				rgba(99, 99, 99, 0.35) 45%, 
				rgba(0, 0, 0, 1) 120% 
			);
	}

	:global(.card[data-rarity="rare holo"][data-gallery="true"]) .card__glare {
		background: radial-gradient(
			farthest-corner circle at var(--mx) var(--my),
			rgba(255, 255, 255, 0.8) 10%,
			rgba(255, 255, 255, 0.6) 35%,
			rgba(0, 0, 0, 1) 85%
			);
		}
		
	:global(.card[data-rarity="radiant rare"]) .card__glare {
		background-image: 
			radial-gradient( 
				farthest-corner circle at var(--mx) var(--my), 
				rgba(255, 255, 255, .9) 10%, 
				rgba(255, 255, 255, 0.6) 30%, 
				rgba(0, 0, 0, .8) 80% 
			);
	}
		

</style>