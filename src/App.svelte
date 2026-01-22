<script lang="ts">
	import { onMount } from 'svelte';
	import LeftElevator from './components/LeftElevator.svelte';
	// import RightElevator from './components/RightElevator.svelte';
	import Elevator from './classes/Elevator.svelte';

	let tickSpeed = 1_000;
	let floors: number[] = [9, 8, 7, 6, 5, 4, 3, 2, 1];

	const elevatorL = new Elevator(1);

	onMount(() => {
		const interval = setInterval(() => {
			elevatorL.check();
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
				<!-- <RightElevator {tickSpeed} {floor} /> -->
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
		flex-direction: column;
		/* align-items: center; */
		justify-content: space-evenly;
		width: 100%;
		min-height: 100px;
		border-top: 1px solid white;
	}
</style>
