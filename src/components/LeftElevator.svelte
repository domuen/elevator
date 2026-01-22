<script lang="ts">
	import classnames from 'classnames';
	import type { ButtonPressed } from '../types';

	interface Props {
		floor: number;
		elevatorLFloor: number;
		passengers: number;
		handleLeftButtonPressed: (buttonPressed: ButtonPressed) => void;
	}

	let props: Props = $props();
	let selectingFloor: undefined | ButtonPressed['direction'] = $state(undefined);

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
						disabled={selectingFloor === 0 ? i + 1 <= props.floor : i + 1 >= props.floor}
						>{i + 1}</button
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
		width: 50%;
		height: calc(100vh / 10);
		justify-content: end;
		gap: 20px;
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
