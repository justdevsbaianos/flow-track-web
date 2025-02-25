<script lang="ts">
	import FlipClockCard from './FlipClockCard.svelte';

	// time = HH:MM:SS
	let { time } = $props<{ time: string }>();

	let s = $derived(time.split(''));
</script>

<div class="flex items-center justify-end">
	{#each s as digit}
		<FlipClockCard {digit} />
	{/each}
</div>
