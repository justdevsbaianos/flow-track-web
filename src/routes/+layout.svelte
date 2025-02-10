<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="pointer-events-none fixed inset-0 z-1 h-[100dvh] bg-[url(/noise.svg)] opacity-30"></div>
{@render children()}
