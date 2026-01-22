<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
		children: Snippet;
		anchor: { x: number; y: number };
	}

	const props: Props = $props();
</script>

{#if props.isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="modal-container" onclick={props.onClose}>
		<div
			class="modal-content"
			style:top={`${props.anchor.y}px`}
			style:left={`${props.anchor.x}px`}
			style:transform={'translate(-110%, -45%)'}
			onclick={(e) => e.stopPropagation()}
		>
			{@render props.children()}
		</div>
	</div>
{/if}

<style>
	.modal-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal-content {
		position: absolute;
	}
</style>
