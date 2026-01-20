<script lang="ts">
  import classnames from "classnames";
  import { onMount } from "svelte";

  interface ButtonPressed {
    floor: number;
    direciton: 0 | 1;
    timestamp: number;
  }

  let tickSpeed = 1_000;
  let floors: number[] = [9, 8, 7, 6, 5, 4, 3, 2, 1];

  let elevatorLFloor = $state<number>(1);
  let elevatorLButtonsPressed = $state<ButtonPressed[]>([]);
  let elevatorLNextStop: undefined | number = undefined;

  let elevatorRFloor = $state<number>(6);
  let elevatorRButtonsPressed = $state<ButtonPressed[]>([]);
  let elevatorRNextStop: undefined | number = undefined;

  const handleLeftButtonPressed = (
    floor: ButtonPressed["floor"],
    direciton: ButtonPressed["direciton"],
    timestamp: ButtonPressed["timestamp"],
  ) => {
    const index = elevatorLButtonsPressed.findIndex(
      (button) => button.floor === floor && button.direciton === direciton,
    );
    if (index < 0)
      elevatorLButtonsPressed.push({ floor, direciton, timestamp });
  };

  const handleRightButtonPressed = (
    floor: ButtonPressed["floor"],
    direciton: ButtonPressed["direciton"],
    timestamp: ButtonPressed["timestamp"],
  ) => {
    elevatorLButtonsPressed.push({ floor, direciton, timestamp });
  };

  const moveLeftElevator = () => {
    const clearNextStop = () => {
      elevatorLButtonsPressed.splice(
        elevatorLButtonsPressed.findIndex(
          (button) => button.floor === elevatorLNextStop,
        ),
        1,
      );
      elevatorLNextStop = undefined;
    };

    if (elevatorLFloor === elevatorLNextStop) {
      clearNextStop();
    } else if (elevatorLFloor < elevatorLNextStop!) {
      elevatorLFloor = elevatorLFloor + 1;
      if (elevatorLFloor === elevatorLNextStop) clearNextStop(); // clear immedeately on arrival
    } else {
      elevatorLFloor = elevatorLFloor - 1;
      if (elevatorLFloor === elevatorLNextStop) clearNextStop(); // clear immedeately on arrival
    }
  };

  const checkElevatorL = () => {
    // if there is a next stop, go there and remove the next stop
    if (!!elevatorLNextStop) {
      moveLeftElevator();

      return;
    }

    // if there is NOT a next stop, evaluate the next stop based on buttons pressed
    console.log("evaluating");
    if (elevatorLButtonsPressed.length <= 0) return;

    console.log("evaluating true");
    const sorted = elevatorLButtonsPressed.sort(
      (a, b) => a.timestamp - b.timestamp,
    );

    elevatorLNextStop = sorted[0].floor;
  };

  const checkElevatorR = () => {};

  onMount(() => {
    const interval = setInterval(() => {
      checkElevatorL();
      checkElevatorR();
    }, tickSpeed);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<p>{JSON.stringify(elevatorLButtonsPressed, null, 2)}</p>
<p>{elevatorLButtonsPressed.length}</p>
{#each floors as floor}
  <div class="floor">
    <!-- elevator L -->
    <div class="elevator-l">
      <div
        class={classnames("elevator", {
          "elevator-active": elevatorLFloor === floor,
        })}
      ></div>

      <div class="buttons">
        <button
          class="button"
          onclick={() => handleLeftButtonPressed(floor, 1, Date.now())}
          >⬆️</button
        >
        <button
          class="button"
          onclick={() => handleLeftButtonPressed(floor, 0, Date.now())}
          >⬇️</button
        >
      </div>
    </div>

    <!-- elevator R -->
    <div class="elevator-r">
      <div class="buttons">
        <button
          class="button"
          onclick={() => handleRightButtonPressed(floor, 1, Date.now())}
          >⬆️</button
        >
        <button
          class="button"
          onclick={() => handleRightButtonPressed(floor, 0, Date.now())}
          >⬇️</button
        >
      </div>

      <div
        class={classnames("elevator", {
          "elevator-active": elevatorRFloor === floor,
        })}
      ></div>
    </div>
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

  .elevator-l {
    display: flex;
  }

  .elevator-r {
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
