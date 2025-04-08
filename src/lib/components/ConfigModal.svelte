<script lang="ts">
	import { DEFAULT_CONFIG, getConfigStorageState } from '$lib/stores/config-storage-state.svelte';
	import type { Snippet } from 'svelte';
	import Button from './Button.svelte';
	import CheckboxInput from './CheckboxInput.svelte';
	import Input from './Input.svelte';

	let { trigger }: { trigger: Snippet<[{ onclick: () => void }]> } = $props();

	const configStore = getConfigStorageState();

	let formData: { day: string; hours: number; rest: boolean }[] = $state([
		{ day: 'Monday', ...DEFAULT_CONFIG.dailyHours.Monday },
		{ day: 'Tuesday', ...DEFAULT_CONFIG.dailyHours.Tuesday },
		{ day: 'Wednesday', ...DEFAULT_CONFIG.dailyHours.Wednesday },
		{ day: 'Thursday', ...DEFAULT_CONFIG.dailyHours.Thursday },
		{ day: 'Friday', ...DEFAULT_CONFIG.dailyHours.Friday },
		{ day: 'Saturday', ...DEFAULT_CONFIG.dailyHours.Saturday },
		{ day: 'Sunday', ...DEFAULT_CONFIG.dailyHours.Sunday }
	]);

	$effect(() => {
		if (configStore.config && configStore.config.dailyHours) {
			formData = Object.entries(configStore.config.dailyHours).map(([day, { hours, rest }]) => ({ day, hours, rest }));
		}
	});

	// Reference to the <dialog> element.
	let dlg: HTMLDialogElement;

	// Open the dialog.
	function openDialog() {
		dlg.showModal();
	}

	// Close the dialog.
	function closeDialog() {
		dlg.close();
	}

	// When the form is submitted, update the configuration.
	function handleSubmit(e: Event) {
		e.preventDefault();
		const newConfig = { dailyHours: {} as Record<string, { hours: number; rest: boolean }> };
		for (const { day, hours, rest } of formData) {
			newConfig.dailyHours[day] = { hours: rest ? 0 : hours, rest };
		}
		configStore.updateConfig(newConfig);
		closeDialog();
	}

	// Update the field for a given day.
	function updateField(index: number, field: 'hours' | 'rest', value: number | boolean) {
		formData[index] = { ...formData[index], [field]: value };
		// If a day is marked as rest, force hours to zero.
		if (field === 'rest' && value === true) {
			formData[index].hours = 0;
		}
		// If unmarking "rest" and hours are zero, set a default (e.g. 8)
		if (field === 'rest' && value === false && formData[index].hours === 0) {
			formData[index].hours = 8;
		}
	}
</script>

{@render trigger({ onclick: openDialog })}

<!-- The native <dialog> element with Tailwind-inspired classes -->
<dialog bind:this={dlg} class="bg-card-dark text-foreground">
	<form onsubmit={handleSubmit} method="dialog">
		<header class="flex items-center justify-between border-b p-4">
			<h2 class="text-foreground text-xl font-extrabold">Configure Work Hours</h2>

			<button
				type="button"
				class="bg-card text-card-foreground rounded-full p-1.5"
				aria-label="Close"
				onclick={closeDialog}
			>
				<span class="sr-only">Close</span>
				<svg
					class="text-foreground/50 hover:text-foreground h-6 w-6 cursor-pointer"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</header>

		<main class="bg-card border-b p-4">
			{#each formData as dayData, i}
				<div class="flex w-full items-center justify-between gap-4 p-2">
					<label class="flex-1" for="n">{dayData.day}</label>
					<div class="flex items-center gap-4">
						<Input
							id="n"
							type="number"
							class="w-[5ch]"
							min="0"
							value={dayData.hours}
							oninput={(e: Event) => updateField(i, 'hours', +(e.target as HTMLInputElement).value)}
							disabled={dayData.rest}
						/>

						<label class="flex shrink-0 items-center gap-2">
							<CheckboxInput
								checked={dayData.rest}
								onchange={(e: Event) => updateField(i, 'rest', (e.target as HTMLInputElement).checked)}
							/>
							<span class="text-sm">Rest Day</span>
						</label>
					</div>
				</div>
			{/each}
		</main>

		<footer class="flex justify-end gap-4 p-4">
			<Button variant="destructive" autofocus type="button" value="cancel" onclick={closeDialog}>Cancel</Button>
			<Button type="submit" value="confirm">Save</Button>
		</footer>
	</form>
</dialog>

<style>
	dialog {
		--readable-width: 60ch;

		display: grid;
		max-inline-size: min(90vw, var(--readable-width));
		max-block-size: min(80vh, 100%);
		max-block-size: min(80dvb, 100%);
		overflow: hidden;
		margin: auto;
		padding: 0;
		position: fixed;
		inset: 0;
		z-index: 50;
		border-radius: 20px;
		box-shadow: var(--shadow-dialog);
	}

	dialog::backdrop {
		backdrop-filter: blur(25px);
		transition: backdrop-filter 0.3s ease;
	}

	:global(html:has(dialog[open])) {
		overflow: hidden;
	}

	@media (max-width: 640px) {
		dialog {
			margin-block-end: 0;
			border-end-end-radius: 0;
			border-end-start-radius: 0;
		}
	}

	dialog:not([open]) {
		pointer-events: none;
		opacity: 0;
	}

	dialog > form {
		display: grid;
		grid-template-rows: auto 1fr auto;
		align-items: start;
		max-block-size: 80vh;
		max-block-size: 80dvb;
	}
</style>
