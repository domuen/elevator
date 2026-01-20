<script lang="ts">
	import { onMount } from 'svelte';
	import LeftElevator from './components/LeftElevator.svelte';
	import RightElevator from './components/RightElevator.svelte';
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

{#each floors as floor}
	<div class="floor">
		<!-- elevator L -->
		<LeftElevator
			elevatorLFloor={elevatorL.floor}
			{floor}
			handleLeftButtonPressed={(btn) => elevatorL.handleButtonPress(btn)}
		/>

		<!-- elevator R -->
		<RightElevator {tickSpeed} {floor} />
	</div>
{/each}
