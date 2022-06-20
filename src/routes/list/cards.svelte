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
		max-width: 1200px;
		margin: auto;
		padding: 50px;
	}

@media screen and (min-width: 600px) {
	.card-grid {
		grid-template-columns: 1fr 1fr;
	}
}

@media screen and (min-width: 900px) {
	.card-grid {
		grid-template-columns: 1fr 1fr 1fr;
	}
}

</style>
