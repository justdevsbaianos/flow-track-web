<script>
	let frame = $state(0);
	const frames = ['\\', '|', '/', '-'];

	$effect(() => {
		const intervalId = setInterval(() => {
			frame = (frame + 1) % frames.length;
		}, 100);

		return () => clearInterval(intervalId);
	});
</script>

<div class="loading-spinner">
	{frames[frame]}
</div>

<style>
	.loading-spinner {
		font-size: 1em;
		width: 1em;
		height: 1em;
		line-height: 1;
		display: inline-block;
		/* Optional: Adjust styling for terminal-like appearance */
		font-family: monospace;
		text-align: center;
	}
</style>
