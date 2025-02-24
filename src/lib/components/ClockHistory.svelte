<script lang="ts">
	import { getTimerStorageState } from '$lib/stores/timer-storage-state.svelte';
	import ClearHistoryButton from './ClearHistoryButton.svelte';

	const globalTimer = getTimerStorageState();

	let historyEntries = $derived(globalTimer.workTimestamps.toSorted((a, b) => b.timestamp - a.timestamp));

	const dateFmt = new Intl.DateTimeFormat('en-US', {
		dateStyle: 'long'
	});

	const timeFmt = new Intl.DateTimeFormat('en-US', {
		timeStyle: 'short'
	});

	const numberFmt = new Intl.NumberFormat('en-US', {
		minimumIntegerDigits: 2,
		maximumFractionDigits: 2,
		minimumFractionDigits: 2
	});

	const diff = (recent: number) => {
		const recentTs = historyEntries[recent].timestamp;
		const previous = recent + 1;
		const previousTs = historyEntries[previous].timestamp;

		return (recentTs - previousTs) / 1000 / 60;
	};
</script>

<section>
	<div class="flex items-center justify-between">
		<h2 class="font-mono text-xl font-semibold">History</h2>

		<ClearHistoryButton />
	</div>

	<ol class="mt-4">
		{#each historyEntries as { type, timestamp }, idx}
			<li class="flex flex-col gap-1 py-2">
				<div class="flex items-center justify-between">
					<span class="text-muted-foreground block w-[9ch]">{type === 'in' ? 'Clock in' : 'Clock out'}</span>

					{#if idx !== historyEntries.length - 1}
						<span class="text-muted-foreground text-sm">
							[ {numberFmt.format(diff(idx))} minutes ]
						</span>
					{/if}
				</div>

				<p class="flex w-full items-center justify-between">
					<span>{dateFmt.format(timestamp)}</span>
					<span>{timeFmt.format(timestamp)}</span>
				</p>
			</li>
		{/each}
	</ol>
</section>
