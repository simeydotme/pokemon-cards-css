<script>

  import CardList from "./list/cards.svelte";
	import Card from "$lib/components/card.svelte";
	
</script>

<CardList>
	<Card img="/expansions/sword-shield/cards/en-us/SWSH1_65-2x.jpg" />
	<Card img="/expansions/evolving-skies/cards/en-us/SWSH07_EN_125-2x.jpg" />
	<Card img="/expansions/vivid-voltage/cards/en-us/SWSH4_EN_110-2x.jpg" />
	<Card img="/expansions/chilling-reign/cards/en-us/SWSH06_EN_19-2x.jpg"  type="holo" />
	<Card img="/expansions/brilliant-stars/cards/en-us/SWSH09_EN_132-2x.jpg"  type="trainer holo" />
	<Card img="/expansions/chilling-reign/cards/en-us/SWSH06_EN_36-2x.jpg"  type="holo" stage={1} />
	<Card img="/expansions/sword-shield/cards/en-us/SWSH1_79-2x.jpg" type="v" />
	<Card img="/expansions/darkness-ablaze/cards/en-us/SWSH3_EN_1-2x.jpg" type="v" />
	<Card img="/expansions/darkness-ablaze/cards/en-us/SWSH3_EN_118-2x.jpg" type="v" />
	<Card img="/expansions/chilling-reign/cards/en-us/SWSH06_EN_176-2x.jpg" type="v full" />
	<Card img="/expansions/brilliant-stars/cards/en-us/SWSH09_EN_154-2x.jpg"  type="v alt" />
	<Card img="/expansions/brilliant-stars/cards/en-us/SWSH09_EN_29-2x.jpg"  type="v max" />
	<Card img="/expansions/vivid-voltage/cards/en-us/SWSH4_EN_188-2x.jpg"  type="v max" />
	<Card img="/expansions/brilliant-stars/cards/en-us/SWSH09_EN_18-2x.jpg"  type="v star" />
	<Card img="https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVS/EVS_214_R_EN.png"  type="v max" />
	<Card img="/expansions/chilling-reign/cards/en-us/SWSH06_EN_196-2x.jpg"  type="trainer full" />
</CardList>

