<script>

  export let subtypes = "basic";
  export let rarity = "common";

</script>
	
  <div class="card__glare {subtypes} {rarity}" />

<style>
  
	.card__glare {
		transform: translateZ(1.41px);
		background-image: radial-gradient(
			farthest-corner circle at var(--mx) var(--my),
			rgba(255, 255, 255, 0.8) 10%,
			rgba(255, 255, 255, 0.65) 20%,
			rgba(0, 0, 0, 0.5) 90%
		);
		mix-blend-mode: overlay;
		opacity: var(--o);
	}

  .card__glare.holo:not(.v):not(.vmax):not(.vstar):not(.reverse) {
		opacity: calc(var(--o)*.8);
    filter: brightness(0.8) contrast(1.5);
  }

	.card__glare.reverse.holo,
	.card__glare.reverse.holo:after {
		
		background-image: radial-gradient(
			farthest-corner circle at var(--mx) var(--my),
			rgba(255, 255, 255, 0.8) 10%,
			rgba(255, 255, 255, 0.5) 20%,
			rgba(0, 0, 0, 0.75) 90%
		);
		opacity: var(--o);
		filter: brightness(.55) contrast(1.33);
	}
	
	.card__glare.reverse.holo:after {
		content: "";
		background-image: 
			radial-gradient( 
				farthest-corner circle at var(--mx) var(--my), 
				rgba(255, 255, 255, 1) 10%, 
				rgba(255, 255, 255, 0.5) 20%, 
				rgba(0, 0, 0, 0.5) 120% 
			);
		filter: brightness(1) contrast(1.5);
	}

	.card__glare.v,
	.card__glare.vfull,
	.card__glare.vmax,
	.card__glare.vstar {
    filter: brightness(.9) contrast(1.75);
		background-image: 
			radial-gradient( 
				farthest-corner circle at 
				var(--mx) var(--my), 
				rgb(255, 255, 255) 0%, 
				rgba(133, 137, 141, .33) 45%, 
				rgba(100, 100, 100, .65) 120% 
				);
		opacity: calc(var(--o)*.66);
  }

	.card__glare.rare.ultra {
		background-image: 
			radial-gradient( 
				farthest-corner circle at 
				var(--mx) var(--my), 
				rgb(255, 255, 255) 0%, 
				rgba(133, 137, 141, .5) 45%, 
				rgba(20, 20, 50, .5) 140% 
			);
		background-size: 130% 150%;
		background-position: center center;
	}


	.card__glare.rare.ultra {
		
		background-image: 
			radial-gradient( 
				farthest-corner circle at 
				var(--mx) var(--my), 
				rgba(255, 255, 255, .7) 0%, 
				rgba(133, 137, 141, .4) 45%, 
				rgba(20, 20, 50, .8) 140% 
			);

	}

	.card__glare.vmax {		
		background-image: 
			radial-gradient( 
				farthest-corner circle at 
				var(--mx) var(--my), 
				rgba(255, 255, 255, 0.75) 0%, 
				rgba(99, 99, 99, 0.35) 45%, 
				rgba(0, 0, 0, 1) 120% 
			);
	}

	:global(.card[data-rarity*="rare holo"][data-gallery="true"]) .card__glare {
		background-image: radial-gradient(
			farthest-corner circle at var(--mx) var(--my),
			rgba(255, 255, 255, 0.8) 10%,
			rgba(255, 255, 255, 0.6) 35%,
			rgba(80, 100, 100, .9) 60%
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

:global(.card[data-rarity*="rare rainbow"]) .card__glare {
	
	background-image: 
		radial-gradient( 
			farthest-corner circle at 
			var(--mx) var(--my), 
			rgba(230, 252, 255, 0.75) 0%, 
			rgba(97, 81, 91, 0.5) 45%, 
			rgb(10, 15, 17) 120% 
		);

	filter: brightness(.9) contrast(1.75);
	opacity: calc( var(--o) * 0.75 );

}

:global(.card[data-rarity*="rare rainbow alt"]) .card__glare {
	
	background-image: 
		radial-gradient( 
			farthest-corner circle at 
			var(--mx) var(--my), 
			hsla(50, 20%, 90%, 0.75) 0%, 
			hsla(150, 20%, 30%, 0.65) 45%, 
			hsla(0, 0%, 0%, 1) 100% 
		);

	filter: brightness(.9) contrast(2);
	opacity: calc( var(--o) * 0.75 );

}

	:global(.card[data-rarity="rare secret"]) .card__glare {
		background-image: 
			radial-gradient( 
				circle at var(--mx) var(--my), 
				rgba(255, 250, 240, 0.95) 0%, 
				rgba(255, 225, 190, 0.45) 30%, 
				rgba(0, 0, 0, 0.75) 80% 
			);
			opacity: calc( var(--o) * 0.6 );
			filter: brightness(.9) contrast(1.8);
	}
		

</style>