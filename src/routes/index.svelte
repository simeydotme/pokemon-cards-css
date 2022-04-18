<script context="module">

	// import pokemon from "pokemontcgsdk";

	// export async function load({ params, fetch, session, stuff }) {
		
	// 	// pokemon.configure({ apiKey: "efd08569-7f7c-4544-92b5-9b16159d13a1" });
	// 	// const sets = await pokemon.set.find( "all" );
	// 	const key = "efd08569-7f7c-4544-92b5-9b16159d13a1";
	// 	const headers = new Headers({
	// 		"X-Api-Key": key
	// 	});
	// 	const sets = await fetch( "https://api.pokemontcg.io/v2/cards?q=set.id:swsh1", {
	// 		headers
	// 	})
	// 	console.log( sets );

	// 	return {}
	// }

</script>

<script>

  import CardList from "./list/cards.svelte";
	import Card from "$lib/components/card.svelte";

	const key = "efd08569-7f7c-4544-92b5-9b16159d13a1";
	const headers = new Headers({ "X-Api-Key": key });

	const getCards = async () => {
		const json = await fetch( "https://api.pokemontcg.io/v2/cards?q=set.id:swsh9", { headers });
		const sets = await json.json();
		return sets.data;
	}
	
</script>

<CardList>

	{#await getCards()}
		loading...
	{:then cards}
		{#each cards as card, id}
			<Card img="{ card.images.large }" subtypes="{ card.subtypes }" rarity="{ card.rarity }" />
		{/each}
	{/await}

	<!-- <Card img="https://images.pokemontcg.io/swsh1/65_hires.png" />
	<Card img="/expansions/evolving-skies/cards/en-us/SWSH07_EN_125-2x.jpg" />
	<Card img="/expansions/vivid-voltage/cards/en-us/SWSH4_EN_110-2x.jpg" />
	<Card img="/expansions/chilling-reign/cards/en-us/SWSH06_EN_19-2x.jpg"  subtypes="holo" />
	<Card img="https://images.pokemontcg.io/swsh9/132_hires.png" subtypes="trainer" rarity="rare holo" />
	<Card img="/expansions/chilling-reign/cards/en-us/SWSH06_EN_36-2x.jpg" subtypes="holo" />
	<Card img="/expansions/sword-shield/cards/en-us/SWSH1_79-2x.jpg" subtypes="v" />
	<Card img="/expansions/darkness-ablaze/cards/en-us/SWSH3_EN_1-2x.jpg" subtypes="v" />
	<Card img="/expansions/darkness-ablaze/cards/en-us/SWSH3_EN_118-2x.jpg" subtypes="v" />
	<Card img="/expansions/chilling-reign/cards/en-us/SWSH06_EN_176-2x.jpg" subtypes="v full" />
	<Card img="/expansions/brilliant-stars/cards/en-us/SWSH09_EN_154-2x.jpg"  subtypes="v alt" />
	<Card img="/expansions/brilliant-stars/cards/en-us/SWSH09_EN_29-2x.jpg"  subtypes="v max" />
	<Card img="/expansions/vivid-voltage/cards/en-us/SWSH4_EN_188-2x.jpg"  subtypes="v max" />
	<Card img="/expansions/brilliant-stars/cards/en-us/SWSH09_EN_18-2x.jpg"  subtypes="v star" />
	<Card img="https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/EVS/EVS_214_R_EN.png"  subtypes="v max" />
	<Card img="/expansions/chilling-reign/cards/en-us/SWSH06_EN_196-2x.jpg"  subtypes="trainer full" /> -->



</CardList>

