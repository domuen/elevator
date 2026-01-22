<script lang="ts">
	import { onMount } from 'svelte';
	import LeftElevator from './components/LeftElevator.svelte';
	import RightElevator from './components/RightElevator.svelte';
	import Elevator from './classes/Elevator.svelte';

	const tickSpeed = 1_000;
	const floors: number[] = [9, 8, 7, 6, 5, 4, 3, 2, 1];

	const elevatorL = new Elevator(1);
	const elevatorR = new Elevator(6);

	onMount(() => {
		const interval = setInterval(() => {
			elevatorL.check();
			elevatorR.check();
		}, tickSpeed);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<main>
	<div class="app-container">
		{#each floors as floor}
			<div class="floor">
				<!-- elevator L -->
				<LeftElevator
					{floor}
					elevatorLFloor={elevatorL.floor}
					passengers={elevatorL.passengers.length}
					handleLeftButtonPressed={(btn) => elevatorL.handleButtonPress(btn)}
				/>

				<!-- elevator R -->
				<RightElevator
					{floor}
					elevatorLFloor={elevatorR.floor}
					passengers={elevatorR.passengers.length}
					handleLeftButtonPressed={(btn) => elevatorR.handleButtonPress(btn)}
				/>
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
	}

	.app-container {
		max-width: 400px;
		width: 100%;
		justify-self: center;
	}

	.floor {
		display: flex;
		flex-direction: row;
		/* align-items: center; */
		justify-content: center;
		border-top: 1px solid white;
		width: 100%;
		min-height: 100px;
		gap: 40px;
	}
</style>
