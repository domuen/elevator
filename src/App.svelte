<script lang="ts">
	import { onMount } from 'svelte';
	import LeftElevator from './components/LeftElevator.svelte';
	import RightElevator from './components/RightElevator.svelte';
	import { checkElevatorL, handleLeftButtonPressed } from './utils';
	import type { Elevator } from './types';

	let tickSpeed = 1_000;
	let floors: number[] = [9, 8, 7, 6, 5, 4, 3, 2, 1];

	let elevatorL = $state<Elevator>({
		floor: 1,
		buttonsPressed: [],
		nextStop: undefined
	});

	onMount(() => {
		const interval = setInterval(() => {
			checkElevatorL(elevatorL);
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
			handleLeftButtonPressed={handleLeftButtonPressed(elevatorL.buttonsPressed)}
		/>

		<!-- elevator R -->
		<RightElevator {tickSpeed} {floor} />
	</div>
{/each}
