<script lang="ts">
	import { getTimerStorageState } from '$lib/stores/timer-storage-state.svelte';
	import ClearHistoryButton from './ClearHistoryButton.svelte';

	const globalTimer = getTimerStorageState();

	const dateFmt = new Intl.DateTimeFormat('en-US', {
		dateStyle: 'long'
	});

	const timeFmt = new Intl.DateTimeFormat('en-US', {
		timeStyle: 'short'
	});

	const numberFmt = new Intl.NumberFormat('en-US', {
		minimumIntegerDigits: 2,
		maximumFractionDigits: 0,
		minimumFractionDigits: 0
	});
</script>

<section class="scrollbar h-[30dvh] overflow-y-auto pr-2">
	<div class="bg-accent sticky top-0 flex items-center justify-between rounded-lg p-4 backdrop-blur-sm">
		<h2 class="font-mono text-xl font-semibold">History</h2>

		<ClearHistoryButton />
	</div>

	{#if globalTimer.workTimestamps.length === 0}
		<p class="text-muted-foreground mt-4">No history yet</p>
	{/if}

	<ol class="mt-4 flex flex-col">
		{#each globalTimer.workTimestamps as { type, timestamp, elapsed }}
			<li class="flex flex-col gap-1 border-r-4 py-2 pr-2">
				<div class="flex w-full items-center">
					<div
						class={[
							'mx-2 h-2 w-2 rounded-full',
							type === 'in' ? 'bg-clock-in shadow-clock-in' : 'bg-clock-out shadow-clock-out',
							'shadow-[0px_0px_10px_0px]'
						]}
					></div>

					<span class="text-muted-foreground block">{type === 'in' ? 'Clock in' : 'Clock out'}</span>
					<p class="ml-auto flex items-center gap-2">
						<span class="">{dateFmt.format(timestamp)}</span>
						<span>{timeFmt.format(timestamp)}</span>
					</p>
				</div>
			</li>

			{#if elapsed}
				<span class="text-muted-foreground ml-auto border-r-4 py-4 pr-1 text-sm">
					[ {numberFmt.format(elapsed)} elapsed seconds ] {'<-'}
				</span>
			{/if}
		{/each}
	</ol>
</section>
