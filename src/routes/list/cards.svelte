<script>
</script>

<section class="card-grid">
	<slot />
</section>

<style>
	.card-grid {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 1.5em;
		transform-style: preserve-3d;
		height: 100%;
		overflow: scroll;
		padding: 50px;
	}

	@media screen and (min-width: 400px) {
		.card-grid {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

</style>
