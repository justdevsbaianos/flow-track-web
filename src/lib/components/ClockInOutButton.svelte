<script lang="ts">
	import { getTimerStorageState } from '$lib/stores/timer-storage-state.svelte';
	import Button from './Button.svelte';
	import FlipClock from './FlipClock.svelte';

	let timer = $state(0);

	const globalTimer = getTimerStorageState();

	$effect(() => {
		const intervalId = setInterval(() => {
			const now = Date.now();
			const timestamp = globalTimer.lastWorkTimestamp?.timestamp ?? now;
			timer = now - timestamp;
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

<section>
	<div class="flex items-center justify-between">
		<h2 class="font-mono text-xl font-semibold">Time registration</h2>

		{#if globalTimer.lastWorkTimestamp?.type === 'in'}
			<p class="text-clock-in">
				<FlipClock time={formatTime(timer)} />
			</p>
		{:else}
			<p class="text-clock-out">
				<FlipClock time={formatTime(timer)} />
			</p>
		{/if}
	</div>

	<div class="mt-4">
		<Button type="button" onclick={() => globalTimer.toggle()} class="w-full">
			{globalTimer.lastWorkTimestamp?.type === 'in' ? 'Clock out' : 'Clock in'}
		</Button>
	</div>
</section>
