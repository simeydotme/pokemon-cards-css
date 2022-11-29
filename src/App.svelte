<script>
	import CardList from "./cards.svelte";
	import Card from "./lib/components/card.svelte";
	import CardMinted from "./lib/components/card-minted.svelte";
	import CardPackGlowing from "./lib/components/card-pack-glowing.svelte";
	import CardPackOff from "./lib/components/card-pack-off.svelte";
  	import { onMount } from "svelte";
	import * as contract from './contract/main.json';

	import { Account, Contract, ec, number, uint256 } from "starknet";
	import { connect } from "get-starknet"

	const POKEMON_CONTRACT_ADDRESS = "0x00cc1cb3722ccd5be372f2fba0c3ad218b10975dda4e256dca4a45acbc5d90e5"
	const ipfs_url = "https://gateway.pinata.cloud/ipfs/QmbCRMSuCDxxXGRNgvAM3BhDVNC6i8hvCT2NvpnsqgFQhS/"
    const CARDS_DECK = 69;

	let provider;
	let address;
	let isConnected = false;
	let walletModalVisible;
	let pokemonContract;
	
	let mintedCards;
	let mintedTodayCards;
	let isLoading = true;
	let isLoadingMintedToday = true;

	const connectWallet = async() => {   
		try{      
			walletModalVisible = true
			const starknet = await connect()     
			await starknet?.enable({ starknetVersion: "v4" })     

			provider = starknet.account     
			address = starknet.selectedAddress    
			isConnected = true   

			pokemonContract = new Contract(contract.abi, POKEMON_CONTRACT_ADDRESS, provider);
			walletModalVisible = false

			var data = { provider, address, isConnected}
			
			return data
		}   catch(error){     
			walletModalVisible = false
			alert(error.message)   
		}
	}

	const getCards = async () => {
		const accounts = Array(CARDS_DECK).fill(address.toString())
		var ids = []
		for (var i = 1; i <= CARDS_DECK; i++) {
			ids.push(uint256.bnToUint256(number.toBN(i, 16)));
		}

		var cards = []

		let balanceResponse = await pokemonContract.balanceOfBatch(accounts, ids);
		
		for (var i = 0; i < CARDS_DECK; i++) {
			var id = i;
			var quantity = number.toBN(balanceResponse.batch_balances[i].low, 16).toString();
			if (parseInt(quantity) > 0) {
				cards.push({id, quantity})
			}	
		}

		return cards;
	};

	const getCardsMintedToday = async () => {
		let cardsMinted = await pokemonContract.user_claim_pack(address)
		let cards = []

		let cardsInString = cardsMinted.toString()

		if (cardsInString.length == 1) {
			return cards;
		}

		if (cardsInString.length % 2 != 0) {
			cardsInString = "0" + cardsInString;
		}

		for (var i = cardsInString.length - 1; i >= 0; i-=2) {
			cards.push(parseInt(cardsInString[i-1] + cardsInString[i]))
		}
		return cards;
	};

	connectWallet().then(data => {
		provider = data.provider
		address = data.address
		isConnected = data.isConnected

		if (isConnected) {
			const account = new Account(
				provider,
				address,
				ec.getKeyPair("")
			);	
			pokemonContract.connect(account);
		
			getCardsMintedToday().then((mintedToday) => {
				mintedTodayCards = mintedToday;
				// mintedTodayCards = [];
				isLoadingMintedToday = false;
			});

			getCards().then((cards) => {
				mintedCards = cards;
				isLoading = false;
			});
		}
	})

	onMount(() => {
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
		<div class="header-inside">
			<h1 id="⚓-top">Cairo Pokemon Cards</h1> 
			<section class="intro" id="⚓-intro">
				<p>
					This is a collection of <mark>NFTs</mark> (with no real value) based on the first pack of the original Pokemon sets (nerd stuff).
					This is <mark>NOT</mark> intended for any kind of monetary benefit, it is simply for fun and to learn more about Cairo.
					I do not own the art found on the cards, all rights reserved to their creators.
				</p>
				<br>
				<p>
					The idea is to launch 1 pack per day (contains 5 cards), once the day has passed it cannot be minted. 
					It is based on the ERC1155 standard, so cards can be transferred with other users (one trade per day is allowed).
				</p>
				<br>
				<p>
					In principle the base set contains 102 cards, but in this case we will remove the trainer and energy cards (a total of 69 cards remain). 
					Of which can be repeated.
				</p>
			</section>

			<p class="author">This frontend is an adaptation made by me of the work of <br /><a href="https://twitter.com/simeydotme"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/> </svg> @simeydotme</a> |
				<em><a href="https://github.com/simeydotme/pokemon-cards-css"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> Simon Goellner</em>
				<p class="author">Backend in Cairo by <a href="https://twitter.com/dub_zn"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/> </svg>@dub_zn</a>
			</p>
			{#if !walletModalVisible}
				<div class="showcase">
					<Card 
						img={"https://i.ibb.co/yqKsRHQ/gengar-cairo.png"}
						rarity="Rare Ultra"
					/>
				</div> 
			{/if}
		</div>
		<div class="mint-menu" >
			<div class="mint-menu-title">
				<h1>Cards obtained today</h1>
			</div> 
			<div class="header-inside-minted">
				{#if !isLoadingMintedToday && mintedTodayCards.length == 0}
					<div class="minted-today">
						<div class="minted-text-has-stock">READY TO CLAIM</div>
						<CardPackGlowing 
							img={"https://crystal-cdn2.crystalcommerce.com/photos/352236/base_set.jpg"}
							rarity="Rare Holo V"

						/>
					</div>
					{#each Array(5) as _, i}
						<div class="minted-today">
							<CardMinted 
							/>
						</div>
					{/each}
				{:else}
					<div class="minted-today">
						<div>
							<div class="minted-text-out-stock">OUT OF STOCK</div>
							<CardPackOff 
								img={"https://crystal-cdn2.crystalcommerce.com/photos/352236/base_set.jpg"}
								rarity="Common"
							/>
						</div>
					</div>
				{/if}
				{#if isLoadingMintedToday}
					{#each Array(5) as _, i}
						<div class="minted-today">
							<CardMinted 
							/>
						</div>
					{/each}
				{:else if mintedTodayCards.length > 0}
					{#each mintedTodayCards as card_id, i}
						{#if card_id <= 15}
						<div class="minted-today">
							<CardMinted 
								img={ipfs_url+"/"+ card_id +".webp"}
								rarity="Rare Holo V"
							/>
						</div>
						{/if}
						{#if card_id > 15}
						<div class="minted-today">
							<CardMinted 
							
								img={ipfs_url+"/"+ card_id +".webp"}
								rarity="Common"
							/>
						</div>
						{/if}
					{/each}
					{#if mintedTodayCards.length == 0}
						{#each Array(5) as _, i}
							<div class="minted-today">
								<CardMinted 
								/>
							</div>
						{/each}
					{/if}
				{/if}
			</div>
		</div>
	</header>


	<br>
	<div class="header2">
		<h1 id="⚓-top">
			<a href="#⚓-top">
			{#if isLoading}
				Loading cards..
			{:else}
				Minted cards {mintedCards.length}/69 
			{/if}
			</a>
		</h1>
		{#if isConnected}
			<button class="wallet-green">
				Wallet connected <br />
			</button>
			<br />
			<p>
				{address} 
			</p>

		{:else}
			<button class="wallet-red">
				Wallet not connected <br />
			</button>
		{/if}
	</div>
	<br>
	
	<CardList>
		{#if isLoading}
			Loading..
		{:else}
			
			{#each mintedCards as card, i}
				{#if card.quantity != 0}
					{#if card.id <= 15}
						<Card 
							img={ipfs_url+"/"+ (card.id+1) +".webp"}
							rarity="Rare Holo V"
						/>
					{/if}
					{#if card.id > 15}
						<Card 
							img={ipfs_url+"/"+ (card.id+1) +".webp"}
							rarity="Common"
						/>
					{/if}
				{/if}
			{/each}
		{/if}
	</CardList>
</main>
<br>

<div class="back-to-top">
  <a href="#top">Back to Top</a>
</div>

<style>
  .back-to-top a {
    color: inherit;
    text-decoration: none;
  }

  main {
	margin: auto;
	max-width: max-content;
  }

</style>
