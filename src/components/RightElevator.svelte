<script lang="ts">
	import classnames from 'classnames';
	import type { ButtonPressed } from '../types';
	import Modal from './Modal.svelte';

	interface Props {
		floor: number;
		elevatorLFloor: number;
		passengers: number;
		handleLeftButtonPressed: (buttonPressed: ButtonPressed) => void;
	}

	let props: Props = $props();
	let selectingFloor: undefined | ButtonPressed['direction'] = $state(undefined);
	let elevatorButtonAnchor = $state({ x: 0, y: 0 });

	const handleOpenModal = (e: MouseEvent, direction: ButtonPressed['direction']) => {
		elevatorButtonAnchor = {
			x: e.clientX,
			y: e.clientY
		};
		selectingFloor = direction;
	};

	const handleSelectFloor = (selectedFloor: number) => {
		props.handleLeftButtonPressed({
			floor: props.floor,
			direction: selectingFloor!,
			selectedFloor,
			timestamp: Date.now()
		});
		selectingFloor = undefined;
	};
</script>

<div class="container">
	<Modal
		isOpen={selectingFloor !== undefined}
		onClose={() => (selectingFloor = undefined)}
		anchor={elevatorButtonAnchor}
	>
		{#if typeof selectingFloor === 'number'}
			{#each Array.from(Array(9)) as _, i}
				{@const floor = i + 1}

				<button
					onclick={() => handleSelectFloor(floor)}
					disabled={selectingFloor === 0 ? floor <= props.floor : floor >= props.floor}
					>{floor}</button
				>
			{/each}
			<button onclick={() => (selectingFloor = undefined)}>X</button>
		{/if}
	</Modal>

	<div class="buttons">
		<button
			class="button"
			onclick={(e) => handleOpenModal(e, 0)}
			disabled={typeof selectingFloor === 'number'}>⬆️</button
		>
		<button
			class="button"
			onclick={(e) => handleOpenModal(e, 1)}
			disabled={typeof selectingFloor === 'number'}>⬇️</button
		>
	</div>

	{#if props.elevatorLFloor === props.floor}
		<div class={classnames('elevator')}>
			<div class="elevator-details">
				<div>
					<p>{props.elevatorLFloor}</p>
				</div>

				<p>{props.passengers}</p>
			</div>

			<div class="elevator-door-container">
				<div class="elevator-door"></div>
				<div class="elevator-door"></div>
			</div>
		</div>
	{/if}
</div>

<style>
	.container {
		display: flex;
		height: calc(100vh / 10);
		justify-content: start;
		align-items: center;
		gap: 10px;
		width: 50%;
	}

	.elevator {
		display: flex;
		flex-direction: column;
		width: 50px;
		height: 100px;
		background-color: dimgray;
		padding: 0px 10px 0px;
	}

	.elevator-details {
		display: flex;
		justify-content: space-evenly;
		width: 100%;
		height: 20px;
	}

	.elevator-details p {
		line-height: normal;
		margin: 0px;
		padding: 0px;
	}

	.elevator-door-container {
		display: flex;
		width: 100%;
		height: 100%;
		gap: 1px;
	}

	.elevator-door {
		display: flex;
		justify-items: center;
		align-items: center;
		background-color: gray;
		width: 50%;
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
