<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = Omit<HTMLInputAttributes, 'id' | 'type'>;
	let props: Props = $props();
</script>

<input
	{...props}
	type="checkbox"
	class={['accent-accent size-5 disabled:cursor-not-allowed disabled:opacity-50', props.class]}
/>
