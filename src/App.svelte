<script>
  import { onMount } from "svelte";

	import Search from "./Search.svelte";
	import CardList from "./Cards.svelte";
	import Card from "./lib/components/CardProxy.svelte";

	let showcase, basics, reverse, holos, cosmos, amazings, radiant, basicGallery, 
			vee, veeUltra, veeAlt, veeMax, veeMaxAlt, veeStar, 
			trainerHolo, rainbow, gold, veeGallery, shinyVault;

	let query = "";
	let isLoading = true;

	const getCards = async () => {
		let promiseArray = [];
		let cardFetch = await fetch("/data/cards.json");
		let cards = await cardFetch.json();
		return cards;
	};

	const loadCards = async() => {
		return getCards()
			.then((cards) => {
				window.cards = cards;
				showcase = cards[0];
				basics = cards.slice(1, 4);
				reverse = [...cards.slice(4, 7), ...cards.slice(70,76)];
				holos = cards.slice(7, 13);
				cosmos = cards.slice(13, 16);
				amazings = cards.slice(76, 85);
				radiant = cards.slice(16, 19);
				basicGallery = cards.slice(19, 22);
				vee = cards.slice(22, 25);
				veeUltra = cards.slice(25, 28);
				veeAlt = cards.slice(28, 34);
				veeMax = cards.slice(37, 40);
				veeMaxAlt = cards.slice(40, 43);
				veeStar = cards.slice(43, 46);
				trainerHolo = cards.slice(46, 52);
				rainbow = cards.slice(52, 58);
				gold = cards.slice(58, 64);
				veeGallery = cards.slice(64, 70);
				shinyVault = cards.slice(85,91);
				isLoading = false;
			});
	};

	onMount(() => {
		loadCards();
		const $headings = document.querySelectorAll("h1,h2,h3");
		const $anchor = [...$headings].filter((el) => {
			const id = el.getAttribute("id")?.replace(/^.*?-/g,"");
			const hash = window.location.hash?.replace(/^.*?-/g,"")
			return id === hash;
		})[0];
		if( $anchor ) {
			setTimeout(() => {
				$anchor.scrollIntoView();
			},100);
		}
	});
</script>

<main>
	<header>
		<h1 id="⚓-top">Pokemon Cards <sup>V2</sup></h1>

		<p class="author">By <a href="https://twitter.com/simeydotme"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg> @simeydotme</a> |
			<em><a href="https://github.com/simeydotme/pokemon-cards-css"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> Simon Goellner</em>
		</p>

		<section class="intro" id="⚓-intro">
			<p>
				A collection of <mark>advanced CSS</mark> styles to create
				<mark>realistic-looking effects</mark> for the faces of Pokemon cards. 
				The cards use <mark>3d transforms</mark>, <mark>filters</mark>, <mark>blend modes</mark>,
				<mark>css gradients</mark> and interactions to provide a unique experience when taking a closer look!
			</p>
		</section>

		<div class="showcase">
			{#if !showcase}
				loading...
			{:else}
				<Card
					id={showcase.id}
					name={showcase.name}
					set={showcase.set}
					number={showcase.number}
					types={showcase.types}
					supertype={showcase.supertype}
					subtypes={showcase.subtypes}
					rarity={showcase.rarity}
					isReverse={showcase.isReverse}
					showcase={true}
				/>
			{/if}
		</div>

		<section class="info">
			<h2>Click on a Card to take a Closer look!</h2>

			<hr />

			<p class="small">
				I'm using SvelteJS to handle interactivity and state; <strong>
					assigning values to css custom properties </strong> (variables) which 
					in-turn drive the effects and 3d transforms. 
					<br>
					<a href="https://github.com/simeydotme/pokemon-cards-css">Source code is in the repository</a>.
			</p>
		</section>
	</header>

	<Search bind:query />

	{#if query.length < 3}

		<h2 id="⚓-common">
			<a href="#⚓-common">
				Common &amp; Uncommon
			</a>
		</h2>
		<p>
			All cards get a 3d rotation with CSS based on the cursor position.<br /> The default basic
			non-holo cards simply apply a <mark>flare/glare effect</mark> to the card which follows the mouse.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each basics as card, index}
					<Card
						id={card.id}
						name={card.name}
						img={card.images.large}
						number={card.number}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-reverse">
			<a href="#⚓-reverse">
				Reverse Holo non-rares
			</a>
		</h2>
		<p>
			Reverse holo cards come in <mark>many shapes and sizes</mark> (trainer, stage1, and different energy types). <br /> Therefore
			there are a few examples here to show the different variations. The <mark>background uses a foil and a mask layer</mark>
			along with a glare. I also <mark>clip the glare</mark> into the image window to treat the image and the holofoil differently.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each reverse as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
						isReverse
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-holo">
			<a href="#⚓-holo">
				Holofoil Rare
			</a>
		</h2>
		<p>
			Holo cards have an additional <mark>vertical beam holo effect</mark>. <br /> This uses a
			combintation of <mark>repeating gradients and filters</mark>, with <mark>clip-path</mark> to mask
			the holo areas for each stage. To get the holo effect to change while rotating the card I set the
			background-position of each gradient layer based on cursor.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each holos as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-galaxy">
			<a href="#⚓-galaxy">
				Galaxy/Cosmos Holofoil
			</a>
		</h2>
		<p>
			Similar to the Holofoil, but this uses a special image <mark>background of a galaxy effect</mark>
			with a <mark>gradient rainbow set to color-dodge &amp; color-burn</mark> on top.
		</p>
		<h3>An instant classic for any PTCG fan!</h3>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each cosmos as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-amazing">
			<a href="#⚓-amazing">
				Holofoil Amazing Rare
			</a>
		</h2>
		<p>
			Amazing Rare cards have a <mark>very unique shiny foil</mark> that extends past the frame and is much shinier than
			a regular holo effect, and textured. We achieve this by using a mask and applying a glitter effect with a lighten filter.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each amazings as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-radiant">
			<a href="#⚓-radiant">
				Radiant Holofoil
			</a>
		</h2>
		<p>
			The newest holofoil added to the series! <br /> The radiant effect proved
			<mark>very difficult to emulate</mark>
			without crazy math, so I settled with a <mark>criss-cross linear gradient pattern</mark> that moves
			across the card.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each radiant as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-trainer-gallery-holo">
			<a href="#⚓-trainer-gallery-holo">
				Trainer Gallery Holofoil
			</a>
		</h2>
		<p>
			The effect for Trainer Gallery holofoils gives it a <mark
				>kind of metallic effect with iridescent shine</mark
			>. This is achieved with a <mark>large color dodge linear gradient</mark>, and a
			<mark>hard-light radial gradient</mark> on top, at the cursor position, to give the shimmer.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each basicGallery as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-v">
			<a href="#⚓-v">
				Pokemon V
			</a>
		</h2>
		<p>
			V cards have a <mark>diagonal holographic effect</mark> which that appears to travel in opposite
			directions when you tilt the card into the light.
		</p>
		<p>
			This effect is achieved with <mark>multiple background gradients</mark> and I change the background
			positions based on the cursor x/y. The gradients are set to color-dodge, and there's a subtle svg
			noise effect.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each vee as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-v-full-art">
			<a href="#⚓-v-full-art">
				Pokemon V <sup>(Full Art)</sup>
			</a>
		</h2>
		<p>
			Similar to the Pokemon V effect, Full-Art cards <mark>use diagonal gradients</mark>, but they
			have <mark>additional texture</mark> when looked at from certain angles. This is achieved with
			an <mark>additional background image with an exclusion filter</mark>. The effect is also more
			vibrant which adds to the metallic look.
		</p>
		<p>
			The texture effect is not identical to reality as the real cards each have a unique pattern that
			follows the art.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each veeUltra as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-v-alternate-art">
			<a href="#⚓-v-alternate-art">
				Pokemon V <sup>(Alternate Art)</sup>
			</a>
		</h2>
		<p>
			Alternate Art Pokemon V cards have <mark
				>practically the same holo effect as the Ultra Rare (Full Art) cards</mark
			>. The only difference is the pattern texture.
		</p>
		<p>The effect looks somewhat different though due to the type of artwork.</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each veeAlt as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-v-max">
			<a href="#⚓-v-max">
				VMax
			</a>
		</h2>
		<p>
			The gradient effect of Pokemon VMax is more subtle, using a <mark
				>larger background gradient</mark
			>
			which moves more slowly. But the <mark>texture effect is more pronounced</mark>.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each veeMax as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-v-max-alternate">
			<a href="#⚓-v-max-alternate">
				VMax <sup>(Alternate/Rainbow)</sup>
			</a>
		</h2>
		<p>
			There's some VMax cards that show a <mark>full, or alternate artwork</mark>. These are
			<mark>classed as "rainbow rare"</mark>
			and have a similar effect to the rainbow cards. It's a really
			<mark>vibrant and glittery overlay</mark>.
		</p>
		<p>
			This is achieved with a <mark>background image of glitter/sparkles</mark>, and a texture pattern
			background image, sandwiching the usual linear gradients.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each veeMaxAlt as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-v-star">
			<a href="#⚓-v-star">
				VStar
			</a>
		</h2>
		<p>
			Again back to the <mark>diagonal gradients overlaying a texture</mark>, VStar are quite
			<mark>similar to the Ultra Rare</mark>
			(Full/Alt) cards. The cards are generally <mark>brighter with a pastel hue</mark>, though, which
			makes the gradient and texture more subtle.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each veeStar as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-trainer-full-art">
			<a href="#⚓-trainer-full-art">
				Trainer Holo <sup>(Full Art / Trainer Gallery)</sup>
			</a>
		</h2>
		<p>
			Again back to the <mark>diagonal gradients overlaying a texture</mark>, VStar are quite
			<mark>similar to the Ultra Rare</mark>
			(Full/Alt) cards. The cards are generally <mark>brighter with a pastel hue</mark>, though, which
			makes the gradient and texture more subtle.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each trainerHolo as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-rainbow-rare">
			<a href="#⚓-rainbow-rare">
				Rainbow Rare <sup>(VMax, VStar)</sup>
			</a>
		</h2>
		<p>
			The Rainbow Rare is a <mark>super glittery effect on top of pastel gradients</mark>. This is
			achieved with a background image of glitter/sparkles and a
			<mark>color-burn/hard-light background blend</mark> for some pastel gradients.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each rainbow as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-secret-rare">
			<a href="#⚓-secret-rare">
				Secret Rare <sup>(Gold)</sup>
			</a>
		</h2>
		<p>
			<mark>GOLD!</mark> Here we apply two glitter layers on top of each other with a overlay effect and
		<mark>slide the two layers in opposite directions</mark>. We also <mark>mask the foil image</mark> with a gadient so
		that foil and glitter layers are mutually exclusive. The resulting effect is a shimmering glitter layer!
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each gold as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-trainer-gallery-v">
			<a href="#⚓-trainer-gallery-v">
				Trainer Gallery <sup>(V / VMax)</sup>
			</a>
		</h2>
		<p>
			The V and VMax cards in the Trainer Gallery are generally quite similar to the normal V and VMax
			cards, so here I've just tweaked the values a little and added a different background texture.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each veeGallery as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

		<h2 id="⚓-shiny-vault">
			<a href="#⚓-shiny-vault">
				Shiny Vault <sup>(Basic / Stage 1 / V / VMax)</sup>
			</a>
		</h2>
		<p>
			Shiny Vault cards have quite a unique effect in whereby the foil background is a shiny silver
			color. To achieve this we apply the foil image with some radial gradients to darken the foil
			over the background. This creates a slightly silver effect on top of the white card background.
			This effect works best in Firefox.
		</p>

		<CardList>
			{#if isLoading}
				loading...
			{:else}
				{#each shinyVault as card, index}
					<Card
						id={card.id}
						name={card.name}
						number={card.number}
						set={card.set}
						types={card.types}
						supertype={card.supertype}
						subtypes={card.subtypes}
						rarity={card.rarity}
					/>
				{/each}
			{/if}
		</CardList>

	{/if}
</main>

<div class="back-to-top">
  <a href="#⚓-top">Back to Top</a>
</div>

<style>
  .back-to-top a {
    color: inherit;
    text-decoration: none;
		z-index: 999;
  }
</style>
