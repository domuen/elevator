<script lang="ts">
  import classnames from "classnames";
  interface Floor {}

  let floors: Floor[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  let elevatorLFloor = 1;
  let elevatorRFloor = 6;
</script>

<main>
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
          <button class="button">⬆️</button>
          <button class="button">⬇️</button>
        </div>
      </div>

      <!-- elevator R -->
      <div class="elevator-r">
        <div class="buttons">
          <button class="button">⬆️</button>
          <button class="button">⬇️</button>
        </div>

        <div
          class={classnames("elevator", {
            "elevator-active": elevatorRFloor === floor,
          })}
        ></div>
      </div>
    </div>
  {/each}
</main>

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
