<section 
	class="card-grid" 
>

	<slot />

</section>

<style>
	.card-grid {  
		grid-template-columns: 1fr;
		grid-gap: 0.5vw;
		height: 100%;
		margin: auto;
		padding: 1%;
  		border-radius: 5px;
		align-items: center;
		position: relative;
		transform-style: preserve-3d;
		display: grid;
	}

@media screen and (min-width: 400px) {
	.card-grid {
		grid-template-columns: 1fr 1fr 1fr;
	}
}

@media screen and (min-width: 600px) {
	.card-grid {
		grid-template-columns: 1fr 1fr 1fr;
	}
}

@media screen and (min-width: 900px) {
	.card-grid {
		grid-template-columns: 1fr 1fr 1fr;
	}
}

</style>
