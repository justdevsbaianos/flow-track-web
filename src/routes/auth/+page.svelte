<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import FetcherStateMessage from '$lib/components/FetcherStateMessage.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import { fetchLogin, fetchRegister } from '$lib/services/fetch-auth';
	import { FetchState } from '$lib/stores/fetch-result.svelte';

	let activeTab = $state('login');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	let result = new FetchState<{ message: string }>();

	const handleSubmit = async (e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) => {
		e.preventDefault();

		if (activeTab === 'login') {
			result.wrap(fetchLogin({ email, password }));
		} else {
			result.wrap(fetchRegister({ email, password }));
		}
	};
</script>

<div
	class="bg-background flex min-h-screen items-center justify-center bg-[url(/radio.jpg)] p-4 bg-blend-overlay before:absolute before:inset-0 before:h-screen before:w-full before:backdrop-blur-sm"
>
	<div class="relative w-full max-w-md overflow-hidden">
		<div class="bg-card border-border relative overflow-hidden rounded-lg border backdrop-blur-sm">
			<div class="border-border flex border-b">
				<button
					class="w-full cursor-pointer p-4 font-mono text-sm tracking-wider uppercase transition-colors"
					class:text-primary={activeTab === 'login'}
					class:text-muted-foreground={activeTab !== 'login'}
					onclick={() => (activeTab = 'login')}
				>
					Login
				</button>

				<button
					class="w-full cursor-pointer p-4 font-mono text-sm tracking-wider uppercase transition-colors"
					class:text-primary={activeTab === 'register'}
					class:text-muted-foreground={activeTab !== 'register'}
					onclick={() => (activeTab = 'register')}
				>
					Register
				</button>
			</div>

			<form onsubmit={handleSubmit} class="text-foreground flex flex-col space-y-6 p-6">
				<FetcherStateMessage state={result.wrapper} />

				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" bind:value={email} required />
				</div>

				<div class="space-y-2">
					<Label for="password">Password</Label>
					<Input name="password" type="password" bind:value={password} required />
				</div>

				{#if activeTab === 'register'}
					<div class="space-y-2">
						<Label for="confirm-password">Confirm Password</Label>
						<Input id="confirm-password" type="password" bind:value={confirmPassword} required />
					</div>
				{/if}

				<Button type="submit" shortcut="enter" class="ml-auto">
					{activeTab === 'login' ? 'Login' : 'Create Account'}
				</Button>
			</form>
		</div>
	</div>
</div>
