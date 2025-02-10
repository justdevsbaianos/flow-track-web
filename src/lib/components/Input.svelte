<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	type Props = HTMLInputAttributes;

	let { class: className, value = $bindable(), ...rest }: Props = $props();
</script>

<input
	class={[
		'bg-background/55 border-border focus:ring-ring w-full rounded border px-3 py-2 text-sm focus:border-transparent focus:ring-1 focus:outline-none',
		'shadow-[inset_0_2px_3px_rgba(0,0,0,0.3)] group-active:shadow-[inset_0_-2px_3px_rgba(0,0,0,0.2)]',
		className
	]}
	bind:value
	{...rest}
/>
