<script lang="ts">
	import { elasticOut } from 'svelte/easing';
	import type { TransitionConfig } from 'svelte/transition';

	let { digit } = $props<{ digit: string }>();

	type FlipParams = {
		delay?: number;
		duration?: number;
		easing?: (t: number) => number;
	};

	const flip = (node: Element, params: FlipParams): TransitionConfig => {
		const style = getComputedStyle(node);
		const margin = parseFloat(style.marginTop);

		return {
			delay: params.delay || 0,
			duration: params.duration || 400,
			easing: params.easing || elasticOut,
			css: (t) => `margin-top: ${margin * t}px`
		};
	};

	let duration = 990;
	let current = $state(digit);

	$effect(() => {
		const intervalId = setInterval(() => {
			current = digit;
		}, duration);

		return () => clearInterval(intervalId);
	});
</script>

<div
	class="card bg-card border-background relative m-1 inline-block h-[50px] w-[35px] overflow-hidden rounded-sm pt-[2.5px]"
>
	<div
		class="absolute inset-[-0.5px] rounded-sm shadow-[inset_0_2px_0_rgba(255,255,255,0.1)] group-active:shadow-[inset_0_2px_0_rgba(255,255,255,0.05)]"
	></div>

	<div
		class="absolute inset-[-1px] rounded-sm shadow-[inset_0_-2px_3px_rgba(0,0,0,0.4)] group-active:shadow-[inset_0_-2px_3px_rgba(0,0,0,0.2)]"
	></div>

	{#if digit != current}
		<div class="digit mt-[-50px] h-[50px] text-center font-mono text-[50px] leading-none" in:flip={{ duration }}>
			{current}
		</div>
	{/if}

	<div class="digit h-[50px] text-center font-mono text-[50px] leading-none">{digit}</div>
</div>

<style>
	.digit {
		animation: neon-flicker 2s infinite alternate;
	}

	@keyframes neon-flicker {
		0%,
		10%,
		21%,
		23%,
		25%,
		54%,
		56%,
		100% {
			text-shadow:
				-0.1em -0.1em 0.6em rgba(0, 0, 0, 0.565),
				0.1em 0.1em 0.6em #000000,
				0 0 0.2em currentColor,
				0 0 0.8em currentColor,
				0 0 1.8em currentColor,
				0 0 2.8em currentColor,
				0 0 3.6em currentColor;
		}

		20%,
		24%,
		55% {
			text-shadow: none;
		}
	}
</style>
