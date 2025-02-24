<script lang="ts">
	import { setTimerStorageState, TimerStorageState } from '$lib/stores/timer-storage-state.svelte';
	import '../app.css';
	let { children } = $props();

	let globalTimerStorageState = new TimerStorageState();

	setTimerStorageState(globalTimerStorageState);
</script>

<div class="pointer-events-none fixed inset-0 z-1 h-[100dvh] bg-[url(/noise.svg)] opacity-30"></div>

<header
	class="bg-card container mx-auto mb-8 flex h-[var(--header-height)] items-center justify-between rounded-b-xl px-4 shadow-[inset_0_2px_0_rgba(255,255,255,0.1),inset_0_-2px_3px_rgba(0,0,0,0.4),0px_2px_5px_0_rgba(0,0,0,0.1)]"
>
	<h1>Dashboard</h1>
</header>

{@render children()}
