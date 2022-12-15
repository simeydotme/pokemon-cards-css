<script>

  export let subtypes = "basic";
  export let supertype = "pokémon";

</script>

  <div class="card__shine {subtypes} {supertype}" />

<style>


/*

  setup

*/

.card__shine {
  display: grid;
  overflow: hidden;
  z-index: 3;
  transform: translateZ(1px);
  background: transparent;
  mix-blend-mode: color-dodge;
  filter: brightness(.85) contrast(2.75) saturate(.65);
  background-size: cover;
  background-position: center;
  opacity: var(--o);
}

.card__shine:before {
  grid-area: 1/1;
  transform: translateZ(1px);
}
.card__shine:after {
  grid-area: 1/1;
  transform: translateZ(1.2px);
  border-radius: var(--radius);
}

:global(.card.masked) .card__shine,
:global(.card.masked) .card__shine:before,
:global(.card.masked) .card__shine:after {
  mask-image: var(--foilmask), var(--foilmask), var(--foilmask), var(--foilmask), var(--foilmask), var(--foilmask), var(--foilmask), var(--foilmask);
  mask-size: cover;
}

:global(.card:not(.masked)[data-rarity="rare ultra"][data-supertype="pokémon"]) .card__shine,
:global(.card:not(.masked)[data-rarity="rare ultra"][data-supertype="pokémon"]) .card__shine:before,
:global(.card:not(.masked)[data-rarity="rare ultra"][data-supertype="pokémon"]) .card__shine:after {
  --foilmask: url("/img/illusion-mask.png");
  --foil: url("/img/illusion.png");
  --imgsize: 66%;
  mask-image: var(--foilmask), var(--foilmask), var(--foilmask), var(--foilmask), var(--foilmask), var(--foilmask);
  mask-size: 66%;
  mask-position: center center;
}



</style>