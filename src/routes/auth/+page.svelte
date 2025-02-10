<script lang="ts">
	import Button from '$lib/components/button.svelte';

	let activeTab = $state('login');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let username = $state('');

	const handleSubmit = () => {
		if (activeTab === 'login') {
			console.log('Login:', { email, password });
		} else {
			console.log('Register:', { username, email, password });
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
				{#if activeTab === 'register'}
					<div class="space-y-2">
						<label
							for="username"
							class="text-card-foreground block font-mono text-xs tracking-wider uppercase"
						>
							Username
						</label>
						<input
							id="username"
							type="text"
							bind:value={username}
							class="bg-background border-border focus:ring-ring w-full rounded border px-3 py-2 text-sm focus:border-transparent focus:ring-1 focus:outline-none"
							required
						/>
					</div>
				{/if}

				<div class="space-y-2">
					<label
						for="email"
						class="text-card-foreground block font-mono text-xs tracking-wider uppercase"
					>
						Email
					</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						class="bg-background border-border focus:ring-ring w-full rounded border px-3 py-2 text-sm focus:border-transparent focus:ring-1 focus:outline-none"
						required
					/>
				</div>

				<div class="space-y-2">
					<label
						for="password"
						class="text-card-foreground block font-mono text-xs tracking-wider uppercase"
					>
						Password
					</label>
					<input
						name="password"
						type="password"
						bind:value={password}
						class="bg-background border-border focus:ring-ring w-full rounded border px-3 py-2 text-sm focus:border-transparent focus:ring-1 focus:outline-none"
						required
					/>
				</div>

				{#if activeTab === 'register'}
					<div class="space-y-2">
						<label
							for="confirm-password"
							class="text-card-foreground block font-mono text-xs tracking-wider uppercase"
						>
							Confirm Password
						</label>
						<input
							id="confirm-password"
							type="password"
							bind:value={confirmPassword}
							class="bg-background border-border focus:ring-ring w-full rounded border px-3 py-2 text-sm focus:border-transparent focus:ring-1 focus:outline-none"
							required
						/>
					</div>
				{/if}

				<Button type="submit" shortcut="enter" class="ml-auto">
					{activeTab === 'login' ? 'Login' : 'Create Account'}
				</Button>
			</form>
		</div>
	</div>
</div>
