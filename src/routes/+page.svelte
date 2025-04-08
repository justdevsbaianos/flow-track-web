<script>
	import ClockHistory from '$lib/components/ClockHistory.svelte';
	import ClockInOutButton from '$lib/components/ClockInOutButton.svelte';
	import DailyMetrics from '$lib/components/DailyMetrics.svelte';
</script>

<main class="container mx-auto">
	<ClockInOutButton />

	<hr class="my-8" />

	<ClockHistory />

	<hr class="my-8" />

	<DailyMetrics />
</main>
