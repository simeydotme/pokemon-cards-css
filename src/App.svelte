<script>
	import { connect, disconnect, getInstalledWallets } from "get-starknet"

	let provider;
	let address;
	let isConnected = false;
	let walletModalVisible;
	let installedWallets;
	
	const connectWallet = async() => {   
		try{
			walletModalVisible = true
			installedWallets = await getInstalledWallets();
			const wallet = await connect({modalOptions: {theme: "dark"}});

			console.log("Installed walltes: ", installedWallets)
			console.log("Wallet data connect: ", wallet)

			await wallet.enable({ showModal: true });
			
			isConnected = wallet.isConnected    
			provider = wallet.account     
			address = wallet.selectedAddress   

			return { provider, address, isConnected }
			
		}   catch(error){     
			walletModalVisible = false
			console.log(error.message)
		}
	}

	const init = async () => {
		connectWallet().then(data => {
		provider = data.provider
		address = data.address
		isConnected = data.isConnected

		if (isConnected) {
			console.log("Wallet connected! ", data)
		}
		})
	}

	const handleDisconnect = async () =>{
		disconnect( {clearLastWallet: true, clearDefaultWallet: true} );
		isConnected = false;
	}

	init()
</script>

<main>
	
	<header>
			<h1 id="⚓-top">Cairo Pokemon Cards</h1> 
			<section class="intro" id="⚓-intro">
			</section>

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
	</header>
</main>
