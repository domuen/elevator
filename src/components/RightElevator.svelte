<script lang="ts">
	import classnames from 'classnames';

	interface ButtonPressed {
		floor: number;
		direciton: 0 | 1;
		timestamp: number;
	}

	let { tickSpeed, floor } = $props();

	let elevatorRFloor = $state<number>(6);
	let elevatorRButtonsPressed = $state<ButtonPressed[]>([]);
	let elevatorRNextStop: undefined | number = undefined;

	const handleRightButtonPressed = (
		floor: ButtonPressed['floor'],
		direciton: ButtonPressed['direciton'],
		timestamp: ButtonPressed['timestamp']
	) => {
		elevatorRButtonsPressed.push({ floor, direciton, timestamp });
	};
</script>

<div class="container">
	<div class="buttons">
		<button class="button" onclick={() => handleRightButtonPressed(floor, 1, Date.now())}>⬆️</button
		>
		<button class="button" onclick={() => handleRightButtonPressed(floor, 0, Date.now())}>⬇️</button
		>
	</div>

	<div
		class={classnames('elevator', {
			'elevator-active': elevatorRFloor === floor
		})}
	></div>
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
