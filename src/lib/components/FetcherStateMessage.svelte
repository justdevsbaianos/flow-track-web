<script lang="ts">
	import { isIdle, type FetchResult } from '$lib/stores/fetch-result.svelte';
	import { isFail, isOk } from '$lib/utils/result';
	import LoadingSlash from './LoadingSlash.svelte';

	type Props = {
		class?: string;
		state: FetchResult<{ message: string }>;
	};

	let { class: className, state: st }: Props = $props();

	let style = $derived.by(() => {
		return {
			fail: 'text-destructive',
			fetching: 'text-card-foreground',
			ok: 'text-green-500',
			idle: ''
		}[st.status];
	});
</script>

{#if !isIdle(st)}
	<p class={['block font-mono text-xs tracking-wider uppercase', className, style]}>
		{#if isOk(st)}
			{st.value.message}
		{:else if isFail(st)}
			{st.message}
		{:else}
			<LoadingSlash /> Carregando...
		{/if}
	</p>
{/if}
