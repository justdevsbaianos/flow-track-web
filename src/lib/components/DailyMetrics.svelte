<script lang="ts">
	import { getTimerStorageState } from '$lib/stores/timer-storage-state.svelte';
	import { differenceInSeconds, startOfDay } from 'date-fns';

	const globalTimer = getTimerStorageState();

	$effect(() => {
		// Recalculate daily metrics whenever timestamps change
		calculateDailyMetrics();
	});

	function calculateDailyMetrics() {
		const timestamps = globalTimer.workTimestamps;
		const dailyTotals = new Map<string, number>();

		// Group timestamps by day and calculate total work time
		for (let i = 0; i < timestamps.length; i++) {
			const current = timestamps[i];
			const next = timestamps[i + 1];

			if (current.type === 'in' && next?.type === 'out') {
				const day = startOfDay(current.timestamp).toISOString();
				const workTime = differenceInSeconds(next.timestamp, current.timestamp);
				dailyTotals.set(day, (dailyTotals.get(day) || 0) + workTime);
			}
		}

		return dailyTotals;
	}

	function formatDuration(seconds: number) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		return `${hours}h ${minutes}m`;
	}

	const dateFmt = new Intl.DateTimeFormat('en-US', {
		dateStyle: 'long'
	});
</script>

<section class="mt-8">
	<div class="bg-accent sticky top-0 flex items-center justify-between rounded-lg p-4 backdrop-blur-sm">
		<h2 class="font-mono text-xl font-semibold">Daily Metrics</h2>
	</div>

	{#if globalTimer.workTimestamps.length === 0}
		<p class="text-muted-foreground mt-4">No metrics available yet</p>
	{:else}
		<div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each [...calculateDailyMetrics().entries()].sort((a, b) => b[0].localeCompare(a[0])) as [date, seconds]}
				<div class="bg-card rounded-lg p-4 shadow-sm">
					<div class="flex items-center justify-between">
						<h3 class="font-mono text-lg font-medium">{dateFmt.format(new Date(date))}</h3>
						<span class="text-clock-in font-mono">{formatDuration(seconds)}</span>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</section>
