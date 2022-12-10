<script>
	import CardList from "./cards.svelte";
	import CardListDaily from "./cards-mint.svelte";
	import Card from "./lib/components/card.svelte";
	import CardMinted from "./lib/components/card-minted.svelte";
	import CardPackGlowing from "./lib/components/card-pack-glowing.svelte";
	import CardPackTxInProgress from "./lib/components/card-pack-tx-progress.svelte";
	import CardPackOff from "./lib/components/card-pack-off.svelte";
  	import { onMount } from "svelte";
	import * as contract from './contract/main.json';
	import pokemon from "./contract/data.json";
	import { stringToFeltArray } from "./utils/utils.js";
	
	import { Account, Contract, ec, number, uint256, defaultProvider } from "starknet";
	import { connect, disconnect, getInstalledWallets, getStarknet } from "get-starknet"

	const POKEMON_CONTRACT_ADDRESS = "0x07927d282802f2dc3904d4e010a0d7ce983646837da74ed89dba78732ceb663f"
	// const POKEMON_CONTRACT_ADDRESS = "0x02a1e5176c4d391fde798f5739fed081901710377eecffe493a46c8ad880fc39"
	const ipfs_url = "https://ipfs.io/ipfs/QmbCRMSuCDxxXGRNgvAM3BhDVNC6i8hvCT2NvpnsqgFQhS/"
    const CARDS_DECK = 69;
	const DAILY_MINT_STATUS_KEY = "daily_mint_status"
	const DAILY_SEND_CARD_STATUS_KEY = "daily_send_card_status"
	const DEPLOY_SCOPE = "testnet." // if mainnet, leave empty

	let provider;
	let address;
	let isConnected = false;
	let walletModalVisible;
	let pokemonContract;
	
	let mintedCards;
	let mintedTodayCards;
	let userTradeData;
	let isLoading = true;
	let isLoadingMintedToday = true;
	let isLoadingTradeData = true;

	let addressToSendCard;
	let cardSelectedToSend;

	let dailyMintTxStatus = {};
	let dailySendCardTxStatus = {};

	const connectWallet = async() => {   
		try{
			walletModalVisible = true
    		// await windowStarknet.enable()
			const starknet = await connect( {modalOptions: {theme: "dark"}} );     
			await starknet?.enable({  starknetVersion: "v4" })     

			console.log("AFRTER")
			console.log(await getInstalledWallets())
			console.log(await getStarknet())
			provider = starknet.account     
			address = starknet.selectedAddress    
			isConnected = true    

			pokemonContract = new Contract(contract.abi, POKEMON_CONTRACT_ADDRESS, provider);
			walletModalVisible = false
			var data = { provider, address, isConnected}
			
			return data
		}   catch(error){     
			walletModalVisible = false
			console.log(error.message)
		}
	}

	const sendCardToWallet = async() => {
		try {
			if ((addressToSendCard == undefined || addressToSendCard == "") || cardSelectedToSend == undefined) {
				window.alert("Address or card cannot be empty!")
				return;
			}
			pokemonContract = new Contract(contract.abi, POKEMON_CONTRACT_ADDRESS, provider);
			let sendCardResponse = await pokemonContract.send_card(addressToSendCard, uint256.bnToUint256(number.toBN(cardSelectedToSend, 16)))
			
			if (sendCardResponse.transaction_hash != "0x0") {
				localStorage.setItem(DAILY_SEND_CARD_STATUS_KEY, JSON.stringify({status: "RECEIVED", txHash: sendCardResponse.transaction_hash}))
				dailySendCardTxStatus.status = "RECEIVED"
				dailySendCardTxStatus.txHash = sendCardResponse.transaction_hash
			} else {
				localStorage.setItem(DAILY_SEND_CARD_STATUS_KEY, JSON.stringify({status: "NOT_RECEIVED", txHash: sendCardResponse.transaction_hash}))
			}

			await provider.waitForTransaction(sendCardResponse.transaction_hash)
			getCards().then((cards) => {
				mintedCards = cards;
				isLoading = false;
			});	
						
			getDailyTradeData().then((trade)  => {
				userTradeData = trade;
				isLoadingTradeData = false;
			});

		} catch (error) {
			console.log("Error while trying to send card: ", error)
		}
	}

	const getDailyTradeData = async() => {
		try {
			isLoadingTradeData = true
			let trade = {}

			pokemonContract = new Contract(contract.abi, POKEMON_CONTRACT_ADDRESS, provider);
			let dailyTradeResponse = await pokemonContract.get_user_daily_trade(address)

			trade.dailySend = Math.floor((parseInt(dailyTradeResponse) / 10))
			trade.dailyReceive = (parseInt(dailyTradeResponse) % 10)
			return trade
		} catch (error) {
			console.log(error)
		}
	}

	const mintDailyCards = async() => {
		try {
			pokemonContract = new Contract(contract.abi, POKEMON_CONTRACT_ADDRESS, provider);
			let dailyMintCardsResponse = await pokemonContract.mint_daily_cards()
			
			if (dailyMintCardsResponse.transaction_hash != "0x0") {
			 	localStorage.setItem(DAILY_MINT_STATUS_KEY, JSON.stringify({status: "RECEIVED", txHash: dailyMintCardsResponse.transaction_hash}))
				dailyMintTxStatus.status = "RECEIVED"
				dailyMintTxStatus.txHash = dailyMintCardsResponse.transaction_hash
			} else {
				localStorage.setItem(DAILY_MINT_STATUS_KEY, JSON.stringify({status: "NOT_RECEIVED", txHash: dailyMintCardsResponse.transaction_hash}))
			}
			
			await provider.waitForTransaction(dailyMintCardsResponse.transaction_hash)
			getCardsMintedToday().then((mintedToday) => {
				mintedTodayCards = mintedToday;
				isLoadingMintedToday = false;
			});
			
			getCards().then((cards) => {
				mintedCards = cards;
				isLoading = false;
			});	
					
		} catch (error) {
			console.log(error)
		}
	}

	const getCards = async () => {
		isLoading=true;
		const accounts = Array(CARDS_DECK).fill(address.toString())
		var ids = []
		for (var i = 1; i <= CARDS_DECK; i++) {
			ids.push(uint256.bnToUint256(number.toBN(i, 16)));
		}

		var cards = []

		let balanceResponse = await pokemonContract.balanceOfBatch(accounts, ids);
		
		for (var i = 0; i < CARDS_DECK; i++) {
			var id = i;
			var quantity = number.toBN(balanceResponse.balances[i].low, 16) ? number.toBN(balanceResponse.balances[i].low, 16).toString() : "0";
			if (parseInt(quantity) > 0) {
				cards.push({id, quantity})
			}	
		}
		return cards;
	};

	const getCardsMintedToday = async () => {
		isLoadingMintedToday = true
		let cardsMinted = await pokemonContract.get_user_claimed_pack(address)
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

	const handleDisconnect = async () =>{
		disconnect( {clearLastWallet: true, clearDefaultWallet: true} );
		isConnected=false
		mintedCards = []
		mintedTodayCards = []
	}

	const updateDailyMintTransactionStatus = async () => {
		console.log("Checking if a tx is in progress")
		var dailyMintTxStored = localStorage.getItem(DAILY_MINT_STATUS_KEY)
		console.log("Daily Mint Tx status: ", dailyMintTxStored)
		if (dailyMintTxStored != undefined) {
			let data = JSON.parse(localStorage.getItem(DAILY_MINT_STATUS_KEY))

			//'NOT_RECEIVED' | 'RECEIVED' | 'PENDING' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1' | 'REJECTED';
			if (data.status == "NOT_RECEIVED" || data.status == "ACCEPTED_ON_L2" || data.status == "ACCEPTED_ON_L1") {
				localStorage.removeItem(DAILY_MINT_STATUS_KEY)
				return;
			}

			let txStatus = await defaultProvider.getTransactionReceipt(data.txHash)
			localStorage.setItem(DAILY_MINT_STATUS_KEY, JSON.stringify({status: txStatus.status, txHash: txStatus.transaction_hash}))
			dailyMintTxStatus.status = txStatus.status
			dailyMintTxStatus.txHash = txStatus.transaction_hash
			console.log("updating - status:", dailyMintTxStatus.status, " and tx:", dailyMintTxStatus.txHash)
		} 
	}

	const updateDailyTradeTransactionStatus = async () => {
		var dailySendCardTxStored = localStorage.getItem(DAILY_SEND_CARD_STATUS_KEY)
		console.log("Daily send card Tx status: ", dailySendCardTxStored)
		if (dailySendCardTxStored != undefined) {
			let data = JSON.parse(localStorage.getItem(DAILY_SEND_CARD_STATUS_KEY))
			
			//'NOT_RECEIVED' | 'RECEIVED' | 'PENDING' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1' | 'REJECTED';
			if (data.status == "NOT_RECEIVED" || data.status == "ACCEPTED_ON_L2" || data.status == "ACCEPTED_ON_L1") {
				localStorage.removeItem(DAILY_SEND_CARD_STATUS_KEY)
				return;
			}
			// Check if can update data
			let txStatus = await defaultProvider.getTransactionReceipt(data.txHash)
			localStorage.setItem(DAILY_SEND_CARD_STATUS_KEY, JSON.stringify({status: txStatus.status, txHash: txStatus.transaction_hash}))
			dailySendCardTxStatus.status = txStatus.status

			dailySendCardTxStatus.txHash = txStatus.transaction_hash
		} 
	}

	const init = async () => {
		await updateDailyMintTransactionStatus()
		await updateDailyTradeTransactionStatus()

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
				isLoadingMintedToday = false;
			});

			getCards().then((cards) => {
				mintedCards = cards;
				isLoading = false;
			});

			getDailyTradeData().then((trade)  => {
				userTradeData = trade;
				isLoadingTradeData = false;
			});
		}
		})
	}

	init()

	// console.log(stringToFeltArray("https://gateway.pinata.cloud/ipfs/QmdGwt12YLuJQkbENy3VR1hoRZKCfAXZAbPwXZNZMSXQ7L/"))

	// onMount(() => {
	// 	const $headings = document.querySelectorAll("h1,h2,h3");
	// 	const $anchor = [...$headings].filter((el) => {
	// 		const id = el.getAttribute("id")?.replace(/^.*?-/g,"");
	// 		const hash = window.location.hash?.replace(/^.*?-/g,"")
	// 		return id === hash;
	// 	})[0];
	// 	if( $anchor ) {
	// 		setTimeout(() => {
	// 			$anchor.scrollIntoView();
	// 		},100);
	// 	}
	// });

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
					You can claim a pack per day (contains 5 cards), once the day has passed it cannot be minted. 
					It is based on the ERC1155 standard, so cards can be transferred with other users (one trade per day is allowed).
				</p>
				<br>
				<p>
					In principle the base set contains 102 cards, but in this case we will remove the trainer and energy cards (a total of 69 cards remain). 
				</p>
			</section>

			<p class="author">This frontend is an adaptation of <br /><a href="https://twitter.com/simeydotme" style="color: rgb(66, 219, 240);"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/> </svg> @simeydotme</a> |
				<em><a href="https://github.com/simeydotme/pokemon-cards-css" style="color: rgb(66, 219, 240);" ><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> Simon Goellner</em>
				<p class="author">Backend in Cairo by <a href="https://twitter.com/dub_zn" style="color: rgb(66, 219, 240);"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/> </svg>@dub_zn</a>
			</p>
			{#if !walletModalVisible}
				<div class="showcase">
					<Card 
						img={"https://i.ibb.co/yqKsRHQ/gengar-cairo.png"}
						rarity="Rare Ultra" />
				</div> 
			{:else}
				<div class="showcase" style="z-index: 0">
					<Card 
						img={"https://i.ibb.co/yqKsRHQ/gengar-cairo.png"}
						rarity="Rare Ultra" />
				</div> 
			{/if}
		</div>
		<div class="mint-menu" >
			<div class="mint-menu-title">
				<h1>Cards obtained today</h1>
			</div> 
			<CardListDaily>
				{#if isConnected}
					{#if isLoadingMintedToday}
						<div> <CardPackOff 
							img={"https://i.ibb.co/2Ykx1Tg/base-set.jpg"}
							rarity="Common" />
						</div>
						{#each Array(5) as _, i} <div> <CardMinted /> </div> {/each}			
					{:else if !isLoadingMintedToday && mintedTodayCards.length == 0}
						{#if dailyMintTxStatus != undefined && (dailyMintTxStatus.status == "RECEIVED" || dailyMintTxStatus.status == "PENDING")}
							<a href="https://{DEPLOY_SCOPE}starkscan.co/tx/{dailyMintTxStatus.txHash}" target="_blank" rel="noreferrer">
								<div class="card-tag" style="background-color: rgba(213, 21, 238, 0.8);">TX IN PROGRESS</div>
								<div> <CardPackTxInProgress 
										img={"https://i.ibb.co/2Ykx1Tg/base-set.jpg"}
										rarity="Common" />
								</div>
							</a>
							{#each Array(5) as _, i} <div> <CardMinted /> </div> {/each}
						{:else}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div on:click={() => mintDailyCards()} >
								<div class="card-tag" style="background-color: rgba(13, 199, 0, 0.8);">READY TO CLAIM</div>
									<CardPackGlowing
										img={"https://i.ibb.co/2Ykx1Tg/base-set.jpg"}
										rarity="Rare Holo V"
									/>
							</div>
							{#each Array(5) as _, i} <div> <CardMinted /> </div> {/each}
						{/if}
					{:else}
						{#if !isLoadingMintedToday && mintedTodayCards.length > 1}
							<div>
								<div class="card-tag" style="background-color: rgba(255, 0, 0, 0.8);">OUT OF STOCK</div>
								<CardPackOff 
									img={"https://i.ibb.co/2Ykx1Tg/base-set.jpg"}
									rarity="Common"
								/>
							</div>
							{#each mintedTodayCards as card, i}
								{#if card <= 15} <CardMinted img={ipfs_url+"/"+ (card) +".webp"} rarity="Rare Holo V"/> {/if}
								{#if card > 15} <CardMinted img={ipfs_url+"/"+ (card) +".webp"} rarity="Common"/>{/if}
							{/each}
						{/if}
					{/if}
				{:else}
					{#if isLoadingMintedToday}
						<div> <CardPackOff 
							img={"https://i.ibb.co/2Ykx1Tg/base-set.jpg"}
							rarity="Common" />
						</div>
						{#each Array(5) as _, i} <div> <CardMinted /> </div> {/each}			
					{:else}
					<div> <CardPackOff 
						img={"https://i.ibb.co/2Ykx1Tg/base-set.jpg"}
						rarity="Common" />
					</div>
					{#each Array(5) as _, i} <div> <CardMinted /> </div> {/each}		
					{/if}
				{/if}
			</CardListDaily>
		</div>
	</header>
	
	<br>
	<header style="grid-template-columns: 50% 50%;">
		<div class="inside-header2">
			{#if isLoadingTradeData}
				<h1 id="⚓-top">
					Loading trade stats..
				</h1>
			{:else}
				<h1 id="⚓-top">
					Daily trades status
				</h1>
			{/if}
			
			<div class="daily-trade-menu" style="width: 100%;">
				{#if !isLoadingTradeData && userTradeData.dailySend == 0}
						{#if dailySendCardTxStatus != undefined && (dailySendCardTxStatus.status == "RECEIVED" || dailySendCardTxStatus.status == "PENDING")}
							<a href="https://{DEPLOY_SCOPE}starkscan.co/tx/{dailySendCardTxStatus.txHash}" target="_blank" rel="noreferrer">
								<div class="flags" style="background-color: rgba(213, 21, 238, 0.8);">Transaction in progress..</div>
							</a>
						{:else}
							<div class="flags" style="background-color: rgba(0, 204, 102, 0.8);">Can send a card </div>	
						{/if}
				{:else}
					<div class="flags" style="background-color: rgba(255, 255, 255, 0.3);">Already send a card</div>
				{/if}
					
				{#if !isLoadingTradeData && userTradeData.dailyReceive == 0}
					<div class="flags" style="background-color: rgba(0, 204, 102, 0.8);">Can receive a card</div>
				{:else}
					<div class="flags" style="background-color: rgba(255, 255, 255, 0.3);">Already receive a card</div>
				
				{/if}
			</div>
			{#if !isLoading && !isLoadingTradeData && userTradeData.dailySend == 0 }
				<h2>Send a card</h2>
				<input class="input-wallet" placeholder="Wallet address.." bind:value={addressToSendCard}>
				<div class="daily-trade-menu" style="width: 100%;">	
					<select placeholder="Select card to send.." bind:value={cardSelectedToSend}>
						{#each mintedCards as card}
							<option value={card.id + 1}>
								#{card.id + 1} {pokemon.data[card.id].name} (x{card.quantity})
							</option>
						{/each}
					</select>
					<button class="flags" on:click={() => sendCardToWallet()} style="background-color: rgba(21, 161, 222, 0.9);">Send selected card</button>
				</div>
			{/if}
		</div>
		<div class="inside-header2">
			<h1 id="⚓-top">Wallet stats </h1>
				{#if isLoading}
					<h2>Loading cards..</h2>
				{:else}
					<h2>Minted cards {mintedCards.length}/69</h2>
				{/if}
			
			
			{#if isConnected}
			<div class="flags" style="background-color: rgba(255, 255, 255, 0.3)">{address}</div>
			<div class="daily-trade-menu" style="width: 100%; grid-template-columns: 1fr;">
				
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<button class="flags" style="background-color: rgba(21, 161, 222, 0.9)"
					on:click={() => handleDisconnect()}>
						Disconnect Wallet
				</button>
			</div>
			{:else}
			<div class="daily-trade-menu" style="width: 100%; grid-template-columns: 1fr;">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<button class="flags" style="background-color: rgba(21, 161, 222, 0.9)"
					on:click={() => init() }>
						Connect Wallet<br />
				</button>
			</div>
			{/if}
		</div>
	</header>
	<br>
	
	<CardList>
		{#if isLoading}
			Loading..
		{:else}
			{#each mintedCards as card, i}
				{#if card.quantity > 0}	
					{#if card.id <= 15}
						<Card 
							img={ipfs_url+"/"+ (card.id+1) +".webp"}
							number= {card.id+1}
							quantity={card.quantity}
							rarity="Rare Holo V"
						/>
					{/if}
					{#if card.id > 15}
						<Card 
							img={ipfs_url+"/"+ (card.id+1) +".webp"}
							number= {card.id+1}
							quantity={card.quantity}
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
