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

	let basics;
	let holos;
	let galaxies;
	let radiant;
	let basicGallery;
	let vee;
	let veeUltra;
	let veeAlt;
	let veeMax;
	let veeMaxAlt;
	let veeStar;
	let trainerHolo;
	let rainbow;
	let gold;
	let veeGallery;

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
		let cardFetch = await fetch( "/data.json" );
		let cards = await cardFetch.json();
		window.cards = cards;

		basics = cards.slice(0,6);
		holos = cards.slice(6,12);
		galaxies = cards.slice(12,15);
		radiant = cards.slice(15,18);
		basicGallery = cards.slice(60,63);
		vee = cards.slice(18,21);
		veeUltra = cards.slice(21,24);
		veeAlt = [ ...cards.slice(27,30), ...cards.slice(33,36) ];
		veeMax = cards.slice(24,27);
		veeMaxAlt = [cards[36],cards[31],cards[37]];
		veeStar = cards.slice(39,42);
		trainerHolo = cards.slice(42,48);
		rainbow = cards.slice(48,51);
		gold = cards.slice(51,60);
		veeGallery = cards.slice(63,69);

		return cards;

		// const json = await fetch( "https://api.pokemontcg.io/v2/cards?q=set.id:swsh9tg", { headers });
		// const cards = await json.json();
		// return Array.isArray( cards.data ) ? cards.data : [ cards.data ];

	}
	
</script>

<main>

	<header>
		
		<section class="intro">
			
			<h1>Pokemon Cards <sup>V2</sup></h1>
			<p>A collection of <mark>advanced CSS</mark> styles to create <mark>realistic-looking effects</mark> for the faces of Pokemon cards.</p>
			<br>
			<p>The cards use <mark>3d transforms</mark>, <mark>filters</mark>, <mark>blend modes</mark>, and interactions to provide a unique experience when taking a closer look!</p>
			
			<hr>
			
			<p><mark>(Go ahead, try clicking a card to take a closer look!)</mark></p>

			<hr>

			<p class="small">
				Under the hood, I'm using SvelteJS to handle interactivity and state; assigning values to css custom properties (variables) which in-turn drive the effects and 3d transforms. Source code is in the repository, but it's subject to change as I morph it in to an actual App.
			</p>
			
		</section>
		
		<div class="showcase">
			{#await getCards()}
				loading...
			{:then cards}
			<Card 
						img="{ cards[23].images.large }"
						number="{ cards[23].number }" 
						supertype="{ cards[23].supertype }"
						subtypes="{ cards[23].subtypes }"
						rarity="{ cards[23].rarity }"
						showcase="{ true }"
						/>
			{/await}
		</div>
		
	</header>
	

	

	<h2>Common &amp; Uncommon</h2>
	<p>All cards get a 3d rotation with CSS based on the cursor position.<br> The default basic non-holo cards simply apply a <mark>flare/glare effect</mark> to the card which follows
		the mouse.</p>
	
	<CardList>
		{#await getCards()}
			loading...
		{:then cards}
		{#each basics as card, id}
				<Card 
					img="{ card.images.large }"
					number="{ card.number }" 
					supertype="{ card.supertype }"
					subtypes="{ card.subtypes }"
					rarity="{ card.rarity }"
				/>
			{/each}
			{/await}
	</CardList>
	

	<h2>Holofoil Rare</h2>
	<p>Holo cards have an additional <mark>vertical beam holo effect</mark>. <br> This uses a combintation of <mark>repeating gradients and filters</mark>, with <mark>clip-path</mark> to mask the holo areas for each stage. To get the holo effect to change while rotating the card I set the background-position of each gradient layer based on cursor.</p>
	
	<CardList>
		{#await getCards()}
			loading...
		{:then cards}
		{#each holos as card, id}
				<Card 
					img="{ card.images.large }"
					number="{ card.number }" 
					supertype="{ card.supertype }"
					subtypes="{ card.subtypes }"
					rarity="{ card.rarity }"
				/>
			{/each}
			{/await}
	</CardList>
	

	<h2>Galaxy/Cosmos Holofoil</h2>
	<p>Similar to the Holofoil, but this uses a special image <mark>background of a galaxy effect</mark> with a <mark>gradient rainbow set to color-dodge &amp; color-burn</mark> on top.</p><h3>An instant classic for any PTCG fan!</h3>
	
	<CardList>
		{#await getCards()}
			loading...
		{:then cards}
		{#each galaxies as card, id}
				<Card 
					img="{ card.images.large }"
					number="{ card.number }" 
					supertype="{ card.supertype }"
					subtypes="{ card.subtypes }"
					rarity="{ card.rarity }"
				/>
			{/each}
			{/await}
	</CardList>
	

	<h2>Radiant Holofoil</h2>
	<p>The newest holofoil added to the series! <br> The radiant effect
	proved <mark>very difficult to emulate</mark> without crazy math, so I settled with a <mark>criss-cross linear gradient pattern</mark> that moves across the card.</p>
	
	<CardList>
		{#await getCards()}
			loading...
		{:then cards}
		{#each radiant as card, id}
				<Card 
					img="{ card.images.large }"
					number="{ card.number }" 
					supertype="{ card.supertype }"
					subtypes="{ card.subtypes }"
					rarity="{ card.rarity }"
				/>
			{/each}
			{/await}
	</CardList>
	

	<h2>Trainer Gallery Holofoil</h2>
	<p>The effect for Trainer Gallery holofoils gives it a <mark>kind of metallic effect with iridescent shine</mark>. This is achieved with a <mark>large color dodge linear gradient</mark>, and a <mark>hard-light radial gradient</mark> on top, at the cursor position, to give the shimmer.</p>
	
	<CardList>
		{#await getCards()}
			loading...
		{:then cards}
		{#each basicGallery as card, id}
				<Card 
					img="{ card.images.large }"
					number="{ card.number }" 
					supertype="{ card.supertype }"
					subtypes="{ card.subtypes }"
					rarity="{ card.rarity }"
				/>
			{/each}
			{/await}
	</CardList>
	

	<h2>Pokemon V</h2>
	<p>V cards have a <mark>diagonal holographic effect</mark> which that appears to travel in opposite directions when you tilt the card into the light.</p><p>This effect is achieved with <mark>multiple background gradients</mark> and I change the background positions based on the cursor x/y. The gradients are set to color-dodge, and there's a subtle svg noise effect.</p>
	
	<CardList>
		{#await getCards()}
			loading...
		{:then cards}
		{#each vee as card, id}
				<Card 
					img="{ card.images.large }"
					number="{ card.number }" 
					supertype="{ card.supertype }"
					subtypes="{ card.subtypes }"
					rarity="{ card.rarity }"
				/>
			{/each}
			{/await}
	</CardList>
	

	<h2>Pokemon V <sup>(Full Art)</sup></h2>
	<p>Similar to the Pokemon V effect, Full-Art cards <mark>use diagonal gradients</mark>, but they have <mark>additional texture</mark> when looked at from certain angles. This is achieved with an <mark>additional background image with an exclusion filter</mark>. The effect is also more vibrant which adds to the metallic look.</p>
	<p>
		The texture effect is not identical to reality as the real cards each have a unique pattern that follows the art.
	</p>
	
	<CardList>
		{#await getCards()}
			loading...
		{:then cards}
		{#each veeUltra as card, id}
				<Card 
					img="{ card.images.large }"
					number="{ card.number }" 
					supertype="{ card.supertype }"
					subtypes="{ card.subtypes }"
					rarity="{ card.rarity }"
				/>
			{/each}
			{/await}
	</CardList>
	

	<h2>Pokemon V <sup>(Alternate Art)</sup></h2>
	<p>Alternate Art Pokemon V cards have <mark>practically the same holo effect as
	the Ultra Rare (Full Art) cards</mark>. The only difference is the pattern texture.</p>
	<p>The effect looks somewhat different though due to the type of artwork.</p>
	
	<CardList>
		{#await getCards()}
			loading...
		{:then cards}
		{#each veeAlt as card, id}
				<Card 
					img="{ card.images.large }"
					number="{ card.number }" 
					supertype="{ card.supertype }"
					subtypes="{ card.subtypes }"
					rarity="{ card.rarity }"
				/>
			{/each}
			{/await}
	</CardList>
	

	<h2>VMax</h2>
	<p>The gradient effect of Pokemon VMax is more subtle, using a <mark>larger background gradient</mark> which moves more slowly. But the <mark>texture effect is more pronounced</mark>.</p>
	
	<CardList>
		{#await getCards()}
			loading...
		{:then cards}
		{#each veeMax as card, id}
				<Card 
					img="{ card.images.large }"
					number="{ card.number }" 
					supertype="{ card.supertype }"
					subtypes="{ card.subtypes }"
					rarity="{ card.rarity }"
				/>
			{/each}
			{/await}
	</CardList>
	

	<h2>VMax <sup>(Alternate/Rainbow)</sup></h2>
	<p>There's some VMax cards which show a <mark>full, or alternate artwork</mark>. These are <mark>classed as "raindbow rare"</mark> and have a similar effect to the rainbow cards. It's a really <mark>vibrant and glittery overlay</mark>.</p>
	<p>
		This is achieved with a <mark>background image of glitter/sparkles</mark>, and a texture pattern background image, sandwiching the usual linear gradients.
	</p>
	
	<CardList>
		{#await getCards()}
			loading...
		{:then cards}
		{#each veeMaxAlt as card, id}
				<Card 
					img="{ card.images.large }"
					number="{ card.number }" 
					supertype="{ card.supertype }"
					subtypes="{ card.subtypes }"
					rarity="{ card.rarity }"
				/>
			{/each}
			{/await}
	</CardList>
	

	<h2>VStar</h2>
	<p>Again back to the <mark>diagonal gradients overlaying a texture</mark>, VStar are quite <mark>similar to teh Ultra Rare</mark> (Full/Alt) cards. The cards are generally <mark>brighter with a pastel hue</mark>, though, which makes the gradient and texture more subtle.</p>
	
	<CardList>
		{#await getCards()}
			loading...
		{:then cards}
		{#each veeStar as card, id}
				<Card 
					img="{ card.images.large }"
					number="{ card.number }" 
					supertype="{ card.supertype }"
					subtypes="{ card.subtypes }"
					rarity="{ card.rarity }"
				/>
			{/each}
			{/await}
	</CardList>
	

	<h2>Trainer Holo <sup>(Full Art)</sup></h2>
	<p>Again back to the <mark>diagonal gradients overlaying a texture</mark>, VStar are quite <mark>similar to teh Ultra Rare</mark> (Full/Alt) cards. The cards are generally <mark>brighter with a pastel hue</mark>, though, which makes the gradient and texture more subtle.</p>
	
	<CardList>
		{#await getCards()}
			loading...
		{:then cards}
		{#each trainerHolo as card, id}
				<Card 
					img="{ card.images.large }"
					number="{ card.number }" 
					supertype="{ card.supertype }"
					subtypes="{ card.subtypes }"
					rarity="{ card.rarity }"
				/>
			{/each}
			{/await}
	</CardList>
	

	<h2>Rainbow Rare <sup>(VMax, VStar)</sup></h2>
	<p>The Rainbow Rare is a <mark>super glittery effect on top of pastel gradients</mark>. This is achieved with a background image of glitter/sparkles and a <mark>color-burn/hard-light background blend</mark> for some pastel gradients.</p>
	
	<CardList>
		{#await getCards()}
			loading...
		{:then cards}
		{#each rainbow as card, id}
				<Card 
					img="{ card.images.large }"
					number="{ card.number }" 
					supertype="{ card.supertype }"
					subtypes="{ card.subtypes }"
					rarity="{ card.rarity }"
				/>
			{/each}
			{/await}
	</CardList>
	

	<h2>Secret Rare <sup>(Gold)</sup></h2>
	<p>GOLD! The effect from Rainbow is borrowed, except the color of the gradients, and the filter effects (hue) are different. There's also a different background image with a more subtle overlay. This gives a sparkly gold look which is very similar to reality!</p>
	
	<CardList>
		{#await getCards()}
			loading...
		{:then cards}
		{#each gold as card, id}
				<Card 
					img="{ card.images.large }"
					number="{ card.number }" 
					supertype="{ card.supertype }"
					subtypes="{ card.subtypes }"
					rarity="{ card.rarity }"
				/>
			{/each}
			{/await}
	</CardList>
	

	<h2>Trainer Gallery <sup>(V / VMax)</sup></h2>
	<p>The V and VMax cards in the Trainer Gallery are generally quite similar to the normal V and VMax cards,
	so here I've just tweaked the values a little and added a different background texture.</p>
	
	<CardList>
		{#await getCards()}
			loading...
		{:then cards}
		{#each veeGallery as card, id}
				<Card 
					img="{ card.images.large }"
					number="{ card.number }" 
					supertype="{ card.supertype }"
					subtypes="{ card.subtypes }"
					rarity="{ card.rarity }"
				/>
			{/each}
			{/await}
	</CardList>
	
	
	
</main>







<style>
	
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&family=Roboto:ital,wght@0,300;0,700;1,300;1,700&display=swap');
		
	main {
		color: white;
		padding: 50px;
		max-width: 1200px;
		margin: auto;
	}
	
	header {
		margin-bottom: 4rem;
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 30px;
		max-width: 900px;
	}

	@media screen and (min-width: 900px) {
		header {
			grid-template-columns: 60% 1fr;
		}
	}
	
	.showcase {
		z-index: 99;
		max-width: min( 330px, 80vw );
		margin: auto;
	}
	
	h1 {
		margin-top: 0;
		margin-bottom: .25em;
	}
	
	p {
		margin: 0 0 .25em;
		line-height: 1.5;
	}
	
	p.small {
		font-size: 0.875rem;
		opacity: 0.75;
	}
	
	h1, h2, h3 {
		font-family: "Roboto Condensed";
	}
	
	h2 {
		margin-top: 4em;
		margin-bottom: .25em;
	}
	
	h2 + p,
	h2 + p + p {
		font-style: italic;
		margin-bottom: 1em;
	}
	
	hr {
		border: none;
		background: white;
		height: 1px;
		opacity: 0.25;
		margin: 1em -1em;
	}
	
	h1 sup {
		font-weight: 300;
		font-size: 0.5em;
	}
	
	h2 sup {
		font-weight: 300;
		font-size: 0.75em;
	}
	
	mark {
		background: #006065;
		color: white;
		font-style: italic;
		font-weight: bold;
		padding-inline: .25em;
		border-radius: 3px;
	}
	
	:global(*) {
		box-sizing: border-box;
	}

	:global(body, html) {
		height: 100%;
		padding: 0;
		margin: 0;
		scroll-behavior: smooth;
	}

	:global(body) {
		font-family: "Roboto";
		background-color: rgb(57, 60, 66);
	}
	
	
</style>