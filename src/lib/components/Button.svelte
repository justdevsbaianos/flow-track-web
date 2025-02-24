<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = {
		shortcut?: string;
		children: Snippet;
	} & HTMLButtonAttributes;

	let { shortcut, children, type = 'button', class: className, ...rest }: Props = $props();
</script>

<button
	{...rest}
	{type}
	class={[
		'group bg-card text-card-foreground border-background relative w-fit cursor-pointer rounded-lg border px-6 py-2.5 text-center transition-transform select-none active:scale-[0.98]',
		className
	]}
>
	<div
		class="absolute inset-0 rounded-lg shadow-[inset_0_2px_0_rgba(255,255,255,0.1)] group-active:shadow-[inset_0_2px_0_rgba(255,255,255,0.05)]"
	></div>

	<div
		class="absolute inset-0 rounded-lg shadow-[inset_0_-2px_3px_rgba(0,0,0,0.4)] group-active:shadow-[inset_0_-2px_3px_rgba(0,0,0,0.2)]"
	></div>

	<div class="relative flex items-center gap-2 text-[15px]">
		<span class="w-full text-center font-mono font-medium">{@render children()}</span>

		{#if shortcut}
			<span
				class="border-background bg-card text-muted-foreground rounded border px-1.5 py-0.5 text-sm font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
			>
				{shortcut}
			</span>
		{/if}
	</div>
</button>

<style>
	button {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		-webkit-font-smoothing: antialiased;
	}
</style>
