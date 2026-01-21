<script lang="ts">
	import classnames from 'classnames';
	import type { ButtonPressed } from '../types';

	interface Props {
		floor: number;
		elevatorLFloor: number;
		handleLeftButtonPressed: (buttonPressed: ButtonPressed) => void;
	}

	let { elevatorLFloor, floor, handleLeftButtonPressed }: Props = $props();
	let selectingFloor: undefined | ButtonPressed['direction'] = $state(undefined);

	const handleSelectFloor = (selectedFloor: number) => {
		handleLeftButtonPressed({
			floor,
			direction: selectingFloor!,
			selectedFloor,
			timestamp: Date.now()
		});
		selectingFloor = undefined;
	};
</script>

<div class="container">
	<div
		class={classnames('elevator', {
			'elevator-active': elevatorLFloor === floor
		})}
	></div>

	<div class="buttons">
		<button
			class="button"
			onclick={() => (selectingFloor = 0)}
			disabled={typeof selectingFloor === 'number'}>⬆️</button
		>
		<button
			class="button"
			onclick={() => (selectingFloor = 1)}
			disabled={typeof selectingFloor === 'number'}>⬇️</button
		>

		<div>
			{#if typeof selectingFloor === 'number'}
				{#each Array.from(Array(9)) as _, i}
					<button
						onclick={() => handleSelectFloor(i + 1)}
						disabled={selectingFloor === 0 ? (i + 1) <= floor : (i + 1) >= floor}>{i + 1}</button
					>
				{/each}
				<button onclick={() => (selectingFloor = undefined)}>X</button>
			{/if}
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
	}

	.elevator {
		width: 50px;
		height: 100px;
	}

	.elevator-active {
		background-color: red;
	}

	.buttons {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.button {
		width: fit-content;
	}
</style>
