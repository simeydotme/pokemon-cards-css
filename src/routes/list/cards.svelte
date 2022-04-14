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
	}

	@media screen and (min-width: 400px) {
		.card-grid {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

</style>
