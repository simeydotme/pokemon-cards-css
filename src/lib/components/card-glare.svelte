<script>

  export let subtypes = "basic";

</script>
	
  <div class="card__glare {subtypes}" />

<style>
  
	.card__glare {
		transform: translateZ(1px);
		z-index: 4;
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
    filter: brightness(0.66) contrast(2.5);
    background: 
      radial-gradient( 
        farthest-corner circle 
        at var(--mx) var(--my), 
        rgb(229, 247, 253) 10%, 
        rgba(133, 137, 141, 0.45) 50%, 
        rgba(0, 0, 0, .25) 120% 
      );
  }

</style>