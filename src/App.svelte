<script>
	import CardList from "./cards.svelte";
	import Card from "./lib/components/card.svelte";
  	import { onMount } from "svelte";
	import * as contract from './contract/main.json';
	import contractAbi from "./contract/main_abi.json"

	import {
		Account,
		Contract,
		defaultProvider,
		ec,
		json,
		stark,
		SequencerProvider,
		number,
        uint256
	} from "starknet";
  import { bnToUint256 } from "starknet/dist/utils/uint256";

	// contract variables
	const provider = new SequencerProvider({ 
		network: 'goerli-alpha' // or 'goerli-alpha'
	});

	const account = new Account(
    provider,
    "0x0660cC8805f88E40c4e685ABf35B279DC05C02db063f719074A4Fd2c0bfe725a",
    ec.getKeyPair("")
  	);
	  
	const erc20 = new Contract(contract.abi, "0x04e545be81062ef526f10ce94edb3354510d6ae566bd3da57ad3339fa5ba507c", provider);
	erc20.connect(account);
	
	(async () => {
	// console.log(`Getting url ${account.address}...`);
	// const url = await erc20.uri();

	// console.log(
	// 	`url ${url}`
	// );

	const ids = [uint256.bnToUint256(number.toBN(1, 16))]

	// console.log(`Get balance ${account.address} for id...`);
	// const response = await erc20.balanceOf(
	// 	account.address,
	// 	uint256.bnToUint256(number.toBN(2, 16))
	// );
	
	// console.log("balance simple reuslt: ", response)
	// console.log(
	// 	`account Address ${account.address} has a balance of:`,
	// 	number.toBN(response.balance.low, 16).toString()
	// 	);


	/////

	console.log("//////////////////////////////")
	console.log(`Get balance ${account.address} for ids ${ids}...`);
	const balancResponse = await erc20.balanceOfBatch(
		[account.address, account.address, account.address],
		[uint256.bnToUint256(number.toBN(1, 16)),
		uint256.bnToUint256(number.toBN(2, 16)),
		uint256.bnToUint256(number.toBN(3, 16))]
	);
	

	balancResponse.batch_balances.map((balance) => {
		console.log("result: ", number.toBN(balance.low, 16).toString())
	});

	// console.log("balance batch reuslt: ", balancResponse.batch_balances)
	// console.log(
	// 	`account Address ${account.address} has a balance of:`,
	// 	number.toBN(balancResponse.result, 16).toString()
	// 	);
	
	// console.log(`Waiting for Tx to be Accepted on Starknet - Minting...`);
	// await provider.waitForTransaction(mintTxHash);
	// console.log(
	// 	`account Address ${account.address} has a balance of: `, 
	// 	balance.res
	// );

	
	})();
	///
	let mintedCards;
	let isLoading = true;
	let ipfs = "https://gateway.pinata.cloud/ipfs/QmbCRMSuCDxxXGRNgvAM3BhDVNC6i8hvCT2NvpnsqgFQhS/"
		
	const getCards = async () => {
		let promiseArray = [];

		let cardFetch = await fetch("/data.json");
		let cards = await cardFetch.json();
		return cards;
	};

	getCards().then((cards) => {
		window.cards = cards;
		mintedCards = cards.slice(1, 12);
		isLoading = false;
	});

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
		 <h1 id="⚓-top">Cairo Pokemon Cards</h1> 

		 <p class="author">This is an adaptation of the frontend by <a href="https://twitter.com/simeydotme"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/> </svg> @simeydotme</a> |
			<em><a href="https://github.com/simeydotme/pokemon-cards-css"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> Simon Goellner</em>
		</p>

		<section class="intro" id="⚓-intro">
			<p>
				This is a collection of <mark>NFTs</mark> (with no real value) based on the first pack of the original Pokemon sets (nerd stuff).
				This is <mark>NOT</mark> intended for any kind of monetary benefit, it is simply for fun and to learn more about Cairo.
			</p>
			<br>
			<p>
				The idea is to launch 1 pack per day (contains 11 cards), once the day has passed it cannot be minted. 
				It is based on the ERC1155 standard, so cards can be transferred with other users.
			</p>
			<br>
			<p>
				In principle the base set contains 102 cards, but in this case we will remove the trainer and energy cards (a total of 69 cards remain). 
				Of which can be repeated.
			</p>
		</section>
		<p class="author">Backend in Cairo by <a href="https://twitter.com/dub_zn"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/> </svg>@dub_zn</a>
		</p>
		<div class="showcase">
			{#if isLoading}
				Loading..
			{:else}
			<Card 
				img={"https://crystal-cdn2.crystalcommerce.com/photos/352236/base_set.jpg"}
				rarity="Rare Ultra"
			/>
			{/if}
		</div> 
	</header>

	<h1 id="⚓-top">
		<a href="#⚓-top">
			Minted cards 12/69 
		</a>
	</h1>
	<p>
		All cards get a 3d rotation with CSS based on the cursor position.<br />
	</p>

	<CardList>
		{#if isLoading}
			Loading..
		{:else}
			{#each mintedCards as _, i}
				{#if i <= 15}
					<Card 
						img={ipfs+"/"+ (i+1) +".webp"}
						rarity="Rare Holo V"
					/>
				{/if}
				{#if i > 15}
					<Card 
						img={ipfs+"/"+ (i+1) +".webp"}
						rarity="Common"
					/>
				{/if}
			{/each}
		{/if}
	</CardList>
</main>

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
