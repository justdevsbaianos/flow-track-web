<script lang="ts">
	import { getTimerStorageState } from '$lib/stores/timer-storage-state.svelte';
	import Button from './Button.svelte';

	const globalTimer = getTimerStorageState();

	let state = $state<'idle' | 'delete-it' | 'cancel' | 'done'>('idle');

	const clearHistory = () => {
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
		class="text-muted-foreground"
	>
		{#if state === 'delete-it'}
			Are you sure?
		{:else if state === 'done'}
			Done!
		{:else}
			Clear history
		{/if}
	</Button>

	{#if state === 'delete-it'}
		<Button type="button" onclick={() => (state = 'cancel')} class="text-destructive">Cancel</Button>
	{/if}
</div>
