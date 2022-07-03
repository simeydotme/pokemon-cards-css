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


</style>