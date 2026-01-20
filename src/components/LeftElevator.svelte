<script lang="ts">
	import classnames from 'classnames';
	import type { ButtonPressed } from '../types';

	interface Props {
		elevatorLFloor: number;
		floor: number;
		handleLeftButtonPressed: (buttonPressed: ButtonPressed) => void;
	}

	let { elevatorLFloor, floor, handleLeftButtonPressed }: Props = $props();
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
			onclick={() =>
				handleLeftButtonPressed({
					floor,
					direciton: 1,
					timestamp: Date.now()
				})}>⬆️</button
		>
		<button
			class="button"
			onclick={() =>
				handleLeftButtonPressed({
					floor,
					direciton: 0,
					timestamp: Date.now()
				})}>⬇️</button
		>
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
</style>
