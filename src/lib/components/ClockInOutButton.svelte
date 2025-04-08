<script lang="ts">
	import { getTimerStorageState } from '$lib/stores/timer-storage-state.svelte';
	import Button from './Button.svelte';
	import FlipClock from './FlipClock.svelte';
	import PausedText from './PausedText.svelte';

	let timer = $state(0);

	const globalTimer = getTimerStorageState();

	$effect(() => {
		const intervalId = setInterval(() => {
			if (globalTimer.lastWorkTimestamp?.type === 'in') {
				const now = Date.now();
				const timestamp = globalTimer.lastWorkTimestamp.timestamp;
				timer = now - timestamp;
			} else {
				timer = 0;
			}
		}, 1000);

		return () => clearInterval(intervalId);
	});

	const formatTime = (ms: number) => {
		const seconds = Math.floor(ms / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);

		return `${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
	};
</script>

<section class="w-full">
	<div class="flex w-full items-center justify-between">
		<h2 class="font-mono text-xl font-semibold">Time registration</h2>

		<p class={[globalTimer.lastWorkTimestamp?.type === 'in' ? 'text-clock-in' : 'text-clock-out', 'ml-auto']}>
			{#if globalTimer.lastWorkTimestamp?.type === 'in'}
				<FlipClock time={formatTime(timer)} />
			{:else}
				<PausedText />
			{/if}
		</p>
	</div>

	<div class="mt-4">
		<Button type="button" onclick={() => globalTimer.toggle()} class="w-full">
			{globalTimer.lastWorkTimestamp?.type === 'in' ? 'Clock out' : 'Clock in'}
		</Button>
	</div>
</section>
