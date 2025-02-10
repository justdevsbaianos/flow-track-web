<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';
	type Props = HTMLLabelAttributes;

	let { class: className, children, ...rest }: Props = $props();
</script>

<label
	class={['text-card-foreground block font-mono text-xs tracking-wider uppercase', className]}
	{...rest}
>
	{@render children?.()}
</label>
