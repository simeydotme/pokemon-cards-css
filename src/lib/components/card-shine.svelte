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


</style>