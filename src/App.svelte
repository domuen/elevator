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

passengers: {JSON.stringify(elevatorL.passengers)}
<br />
buttons: {JSON.stringify(elevatorL.buttonsPressed)}
{#each floors as floor}
	<div class="floor">
		<h2>{floor}</h2>
		<!-- elevator L -->
		<LeftElevator
			{floor}
			elevatorLFloor={elevatorL.floor}
			handleLeftButtonPressed={(btn) => elevatorL.handleButtonPress(btn)}
		/>

		<!-- elevator R -->
		<!-- <RightElevator {tickSpeed} {floor} /> -->
	</div>
{/each}

<style>
	.floor {
		display: flex;
		gap: 50px;
		width: 100%;
		min-height: 100px;
		border-top: 1px solid white;
	}
</style>
