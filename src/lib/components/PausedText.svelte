<script lang="ts">
	import FlipClockCard from './FlipClockCard.svelte';
</script>

<div class="flex gap-1">
	<FlipClockCard digit="P" />
	<FlipClockCard digit="A" />
	<FlipClockCard digit="U" />
	<FlipClockCard digit="S" />
	<FlipClockCard digit="E" />
	<FlipClockCard digit="D" />
</div>

<style>
	:global(.paused-text) {
		animation: neon-flicker 2s infinite alternate;
	}

	@keyframes neon-flicker {
		0%,
		10%,
		21%,
		23%,
		25%,
		54%,
		56%,
		100% {
			text-shadow:
				-0.1em -0.1em 0.6em rgba(0, 0, 0, 0.565),
				0.1em 0.1em 0.6em #000000,
				0 0 0.2em currentColor,
				0 0 0.8em currentColor,
				0 0 1.8em currentColor,
				0 0 2.8em currentColor,
				0 0 3.6em currentColor;
		}

		20%,
		24%,
		55% {
			text-shadow: none;
		}
	}
</style>
