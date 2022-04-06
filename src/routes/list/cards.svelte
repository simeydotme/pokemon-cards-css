<script>
</script>

<section class="card-grid">
	<slot />
</section>

<style>
	.card-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 1em;
	}
</style>
