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

  .card__shine.holo {
    --space: 2px;
    --l: 50%;
    --s: 70%;
    --h: 21;
    background-image: 
      repeating-linear-gradient( 90deg, 
        black 25px, white 40px, black 55px, white 70px, black 85px, black 200px
      ),
      repeating-linear-gradient( 90deg, 
        black 25px, rgb(255, 255, 255) 40px, black 55px, white 70px, black 85px, black 200px
      ),
      repeating-linear-gradient( 90deg, 
        var(--vio), var(--blu), var(--gre), var(--yel), var(--red) 15%, var(--vio) 17%, var(--blu), var(--gre), var(--yel), var(--red) 30%, var(--vio) 32%, var(--blu), var(--gre), var(--yel), var(--red) 45%, var(--vio) 47%
      ),
      repeating-linear-gradient( 90deg, 
        hsl(calc(var(--h)*0), var(--s), var(--l)) calc(var(--space)*0), hsl(calc(var(--h)*0), var(--s), var(--l)) calc(var(--space)*1), 
        black calc(var(--space)*1.001), black calc(var(--space)*1.999),
        hsl(calc(var(--h)*1), var(--s), var(--l)) calc(var(--space)*2), hsl(calc(var(--h)*1), var(--s), var(--l)) calc(var(--space)*3), 
        black calc(var(--space)*3.001), black calc(var(--space)*3.999),
        hsl(calc(var(--h)*2), var(--s), var(--l)) calc(var(--space)*4), hsl(calc(var(--h)*2), var(--s), var(--l)) calc(var(--space)*5), 
        black calc(var(--space)*5.001), black calc(var(--space)*5.999),
        hsl(calc(var(--h)*3), var(--s), var(--l)) calc(var(--space)*6), hsl(calc(var(--h)*3), var(--s), var(--l)) calc(var(--space)*7), 
        black calc(var(--space)*7.001), black calc(var(--space)*7.999),
        hsl(calc(var(--h)*4), var(--s), var(--l)) calc(var(--space)*8), hsl(calc(var(--h)*4), var(--s), var(--l)) calc(var(--space)*9), 
        black calc(var(--space)*9.001), black calc(var(--space)*9.999),
        hsl(calc(var(--h)*5), var(--s), var(--l)) calc(var(--space)*10), hsl(calc(var(--h)*5), var(--s), var(--l)) calc(var(--space)*11), 
        black calc(var(--space)*11.001), black calc(var(--space)*11.999),
        hsl(calc(var(--h)*6), var(--s), var(--l)) calc(var(--space)*12), hsl(calc(var(--h)*6), var(--s), var(--l)) calc(var(--space)*13), 
        black calc(var(--space)*13.001), black calc(var(--space)*13.999),
        hsl(calc(var(--h)*7), var(--s), var(--l)) calc(var(--space)*14), hsl(calc(var(--h)*7), var(--s), var(--l)) calc(var(--space)*15), 
        black calc(var(--space)*15.001), black calc(var(--space)*15.999),
        hsl(calc(var(--h)*8), var(--s), var(--l)) calc(var(--space)*16), hsl(calc(var(--h)*8), var(--s), var(--l)) calc(var(--space)*17), 
        black calc(var(--space)*17.001), black calc(var(--space)*17.999),
        hsl(calc(var(--h)*9), var(--s), var(--l)) calc(var(--space)*18), hsl(calc(var(--h)*9), var(--s), var(--l)) calc(var(--space)*19), 
        black calc(var(--space)*19.001), black calc(var(--space)*19.999),
        hsl(calc(var(--h)*10), var(--s), var(--l)) calc(var(--space)*20), hsl(calc(var(--h)*10), var(--s), var(--l)) calc(var(--space)*21), 
        black calc(var(--space)*21.001), black calc(var(--space)*21.999),
        hsl(calc(var(--h)*11), var(--s), var(--l)) calc(var(--space)*22), hsl(calc(var(--h)*11), var(--s), var(--l)) calc(var(--space)*23), 
        black calc(var(--space)*23.001), black calc(var(--space)*23.999),
        hsl(calc(var(--h)*12), var(--s), var(--l)) calc(var(--space)*24), hsl(calc(var(--h)*12), var(--s), var(--l)) calc(var(--space)*25), 
        black calc(var(--space)*25.001), black calc(var(--space)*25.999),
        hsl(calc(var(--h)*13), var(--s), var(--l)) calc(var(--space)*26), hsl(calc(var(--h)*13), var(--s), var(--l)) calc(var(--space)*27), 
        black calc(var(--space)*27.001), black calc(var(--space)*27.999),
        hsl(calc(var(--h)*14), var(--s), var(--l)) calc(var(--space)*28), hsl(calc(var(--h)*14), var(--s), var(--l)) calc(var(--space)*29), 
        black calc(var(--space)*29.001), black calc(var(--space)*29.999),
        hsl(calc(var(--h)*15), var(--s), var(--l)) calc(var(--space)*30), hsl(calc(var(--h)*15), var(--s), var(--l)) calc(var(--space)*31), 
        black calc(var(--space)*31.001), black calc(var(--space)*31.999)
      ),
			radial-gradient(
        farthest-corner circle 
          at var(--mx) var(--my), 
          rgba(255, 255, 255, .66) 0%, 
          rgba(255, 255, 255, .025) 30%, 
          rgba(0,0,0,1) 100%
        );
		clip-path: inset(10% 8.5% 52.5% 8.5%);
		background-position: calc(var(--posx)*-1.2) var(--posy), var(--pos), calc(var(--posx)*3) var(--posy), center, center;
		background-size: 250%, 200%, 250%, 100%, 100%;
    background-blend-mode: soft-light, soft-light, color, overlay;
    filter: brightness(.95) contrast(1.25) saturate(.55);
  }

  .card__shine.holo.stage {
		clip-path: polygon(91.78% 10%, 57% 10%, 53.92% 12.00%, 17% 12%, 16% 14%, 12% 16%, 8.5% 16%, 7.93% 47.41%, 92.07% 47.41%);
	}

  .card__shine.v,
  .card__shine.v:after {
    --space: 1.12%;
    --angle: 133deg;
    background-image:
    url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCI+CjxmaWx0ZXIgaWQ9Im4iPgo8ZmVUdXJidWxlbmNlIHR5cGU9InR1cmJ1bGVuY2UgIiBiYXNlRnJlcXVlbmN5PSIuNSIgbnVtT2N0YXZlcz0iMiI+PC9mZVR1cmJ1bGVuY2U+CgogIDwvZmlsdGVyPgogIAo8cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzAwMCI+PC9yZWN0Pgo8cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIuNSI+PC9yZWN0Pgo8L3N2Zz4="),
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
        hsl(180, 36%, 52%) 3.8%, 
        hsl(180, 29%, 71%) 4.5%, 
        hsl(22, 36%, 52%) 5.2%, 
        #0e152e 10% , 
        #0e152e 12% 
        ),
      radial-gradient(
        farthest-corner circle 
        at var(--mx) var(--my), 
        rgba(0, 0, 0, 0) 0%, 
        rgba(0, 0, 0, 0.1) 25%, 
        rgba(0, 0, 0, 0.5) 85%, 
        rgb(0, 0, 0) 100% 
      );
      background-blend-mode: screen, hue, color-burn;
      background-size: 500px, 525%, 300%, 200%;
		  background-position: center, var(--pos), var(--posx) var(--posy), var(--posx) var(--posy);
      
      filter: brightness(1) contrast(1.65) saturate(.375);
  }

  .card__shine.v:after {
    content: "";
    background-position: center, center, calc( var(--posx) * -1) calc( var(--posy) * -1), var(--posx) var(--posy);
    background-size: 500px, 725%, 195%, 200%;
    filter: brightness(.9) contrast(3) saturate(1);
    mix-blend-mode: soft-light;
  }


</style>