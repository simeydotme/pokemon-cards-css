<script>

  export let type = "normal";
  export let stage = 0;

</script>
	
  <div class="card__glare {type}" class:stage={stage > 0} />

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

	.card__glare.v,
	.card__glare.vfull,
	.card__glare.vmax,
	.card__glare.vstar {
    filter: brightness(0.6) contrast(3);
    background: 
      radial-gradient( 
        farthest-corner circle 
        at var(--mx) var(--my), 
        rgb(255, 255, 255) 10%, 
        rgba(143, 143, 143, 0.45) 50%, 
        rgba(0, 0, 0, .66) 80% 
      );
  }

</style>