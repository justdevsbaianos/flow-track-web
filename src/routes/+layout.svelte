<script lang="ts">
	import clockImage from '$lib/assets/download.png';
	import { setTimerStorageState, TimerStorageState } from '$lib/stores/timer-storage-state.svelte';
	import '../app.css';

	let { children } = $props();

	let globalTimerStorageState = new TimerStorageState();

	setTimerStorageState(globalTimerStorageState);
</script>

<img
	alt="No history yet"
	src={clockImage}
	class="fixed inset-0 z-[-1] mx-auto mt-4 w-full opacity-10 mix-blend-lighten filter"
/>

<div class="pointer-events-none fixed inset-0 z-1 h-[100dvh] bg-[url(/noise.svg)] opacity-30"></div>

<header
	class="bg-card container mx-auto mb-8 flex h-[var(--header-height)] items-center justify-between rounded-b-xl px-4 shadow-[inset_0_2px_0_rgba(255,255,255,0.1),inset_0_-2px_3px_rgba(0,0,0,0.4),0px_2px_5px_0_rgba(0,0,0,0.1)]"
>
	<h1>Dashboard</h1>

	<button
		class="border-background bg-card text-muted-foreground rounded border px-1.5 py-0.5 text-sm font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
	>
		Configuration
	</button>
</header>

{@render children()}
