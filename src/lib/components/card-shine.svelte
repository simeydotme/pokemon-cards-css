<script>

  export let type = "normal";
  export let stage = 0;

</script>

  <div class="card__shine {type}" class:stage={stage > 0} />

<style>

  .card__shine {
    display: grid;
    overflow: hidden;
    transform: translateZ(1px);
    background: transparent;
    z-index: 3;
    mix-blend-mode: color-dodge;
		filter: brightness(.85) contrast(2.75) saturate(.65);
    background-size: cover;
    background-position: center;
		opacity: var(--o);
  }

  .card__shine:after {
    grid-area: 1/1;
  }

  .card__shine.v,
  .card__shine.v:after {
    --space: 1.12%;
    --angle: 133deg;
    background-image:
      repeating-linear-gradient( calc( var(--angle) * 1.05), 
        rgb(255, 119, 115) calc(var(--space)*1), 
        rgba(255,237,95,1) calc(var(--space)*2), 
        rgba(168,255,95,1) calc(var(--space)*3), 
        rgba(131,255,247,1) calc(var(--space)*4), 
        rgba(120,148,255,1) calc(var(--space)*5), 
        rgb(216, 117, 255) calc(var(--space)*6), 
        rgb(255, 119, 115) calc(var(--space)*7)
      ),
      repeating-linear-gradient( 
        var(--angle), 
        #0e152e 0%, 
        hsl(180, 20%, 50%) 4%, 
        hsl(180, 29%, 71%) 4.5%, 
        hsl(180, 20%, 50%) 5%, 
        #0e152e 10% , 
        #0e152e 12% 
        ),
      radial-gradient(
        farthest-corner circle 
        at var(--mx) var(--my), 
        rgba(0, 0, 0, 0) 0%, 
        rgba(0, 0, 0, 0.1) 25%, 
        rgba(0, 0, 0, 0.75) 85%, 
        rgb(0, 0, 0) 100% 
      );
      background-blend-mode: hue, color-burn;
      background-size: 525%, 300%, 200%;
		  background-position: var(--pos), var(--posx) var(--posy), var(--posx) var(--posy);
      
      filter: brightness(1) contrast(1.5) saturate(.5);

  }

  .card__shine.v:after {
    content: "";

    background-position: center, calc( var(--posx) * -1) calc( var(--posy) * -1), var(--posx) var(--posy);
    background-size: 725%, 195%, 200%;

    filter: brightness(.9) contrast(3) saturate(1);
    mix-blend-mode: soft-light;
    
  }

  /* .card__shine.v {
		
		background-image: 
			repeating-linear-gradient(126deg, rgba(255,116,111,1) 0%, rgba(255,237,95,1) 3%, rgba(168,255,95,1) 6%, rgba(131,255,247,1) 9%, rgba(120,148,255,1) 12%, rgba(213,105,255,1) 15%, rgba(255,116,111,1) 18%), 
			url(https://st3.depositphotos.com/3205185/13034/v/450/depositphotos_130341042-stock-illustration-abstract-background-with-glowing-lines.jpg), 
			url(https://st2.depositphotos.com/2172801/6147/i/450/depositphotos_61477739-stock-photo-wonderful-abstract-stripe-background-design.jpg), 
			radial-gradient(farthest-corner circle at var(--mx) var(--my), rgba(255, 255, 255, .6) 0%, rgba(255, 255, 255, .3) 20%, rgb(0, 0, 0) 80%);
		
		background-position: var(--pos),var(--pos), var(--pos), var(--pos);
		background-size: 160% 160%, 130% 130%, 180% 180%, 200% 200%;
		background-blend-mode: hue, color-burn, overlay;
		filter: brightness(.8) contrast(2.15) saturate(.8);
		mix-blend-mode: color-dodge;
		
	} */

</style>