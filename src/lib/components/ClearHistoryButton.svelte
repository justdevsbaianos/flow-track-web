<script lang="ts">
	import { getTimerStorageState } from '$lib/stores/timer-storage-state.svelte';
	import Button from './Button.svelte';

	const globalTimer = getTimerStorageState();

	let state = $state<'idle' | 'delete-it' | 'cancel' | 'done' | 'nothing'>('idle');

	$effect(() => {
		if (globalTimer.workTimestamps.length === 0) {
			state = 'nothing';
		}
	});

	const clearHistory = () => {
		if (state === 'nothing') {
			return;
		}

		if (state === 'delete-it') {
			globalTimer.clearWorkTimestamps();
			state = 'done';
		} else {
			state = 'delete-it';
		}
	};
</script>

<div>
	<Button
		type="button"
		shortcut={state === 'delete-it' ? 'yes' : ''}
		onclick={() => clearHistory()}
		disabled={state === 'nothing'}
		class="text-muted-foreground"
	>
		{#if state === 'idle'}
			Clear history
		{:else if state === 'delete-it'}
			Are you sure?
		{:else if state === 'done'}
			Done!
		{:else}
			Nothing to clear
		{/if}
	</Button>

	{#if state === 'delete-it'}
		<Button type="button" onclick={() => (state = 'cancel')} class="text-destructive">Cancel</Button>
	{/if}
</div>
