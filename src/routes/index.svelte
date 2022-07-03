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

	const getCard = async ( id ) => {
		const json = await fetch( "https://api.pokemontcg.io/v2/cards/?q=id:" + id + "&select=id,name,images,number,supertype,subtypes,rarity", { headers });
		const card = await json.json();
		// console.log(card);
		return card.data[0];
	}

	const getCards = async () => {

		let promiseArray = [];

		// const setj = await fetch( "https://api.pokemontcg.io/v2/sets", { headers });
		// const sets = await setj.json();

		// const ids = [
		// 	"sm35-1","sm10-33","sm115-7",
		// 	"swsh45-35","swsh9-120","sm8-142",
		// 	"pgo-24","pgo-29","pgo-12",
		// 	"swsh10-86","swsh9-132","pgo-43",
		// 	"swshp-SWSH039","swsh45-60","swshp-SWSH127",
		// 	"pgo-4","swsh10-46","swsh10-27",
		// 	"swsh3-21","swsh1-141","swsh10-53",
		// 	"swsh8-250","swsh3-183","swsh1-190",
		// 	"swsh7-29","swsh45sv-SV111","swsh9-29",
		// 	"swshp-SWSH179","swshp-SWSH181","swshp-SWSH183",
		// 	"swshp-SWSH180","swshp-SWSH182","swshp-SWSH184",
		// 	"swsh10-177","swsh8-245","swsh7-192",
		// 	"swsh7-215","swsh8-270","swsh7-212",
		// 	"swshp-SWSH195","swsh9-18","swshp-SWSH197",
		// 	"swsh6-196","swsh9-167","swsh4-183",
		// 	"swsh4-185","swsh2-189","swsh6-192",
		// 	"swsh3-193","swsh9-173","swsh3-190",
		// 	"swsh10-213","swsh10-214","swsh7-232",
		// 	"swsh5-181","swsh7-229","swsh1-213",
		// 	"swsh8-280","swsh9-184","swsh7-227",
		// 	"sm12-241","swsh9tg-TG11","swsh9tg-TG07",
		// 	"swsh9tg-TG16","swsh9tg-TG18","swsh10tg-TG17",
		// 	"swsh9tg-TG17","swsh9tg-TG19","swsh10tg-TG18",
		// ];

		// ids.forEach((v,i) => {
		// 	promiseArray[ i ] = getCard( v );
		// });

		// let cards = await Promise.all( promiseArray );
		let cards = await fetch( "/data.json" );
		cards = await cards.json();
		window.cards = cards;
		return cards;

		// const json = await fetch( "https://api.pokemontcg.io/v2/cards?q=set.id:swsh9tg", { headers });
		// const cards = await json.json();
		// return Array.isArray( cards.data ) ? cards.data : [ cards.data ];

	}
	
</script>

<CardList>

	{#await getCards()}
		loading...
	{:then cards}
		{#each cards as card, id}
			<Card 
				img="{ card.images.large }"
				number="{ card.number }" 
				supertype="{ card.supertype }"
				subtypes="{ card.subtypes }"
				rarity="{ card.rarity }"
			/>
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

