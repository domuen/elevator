<script lang="ts">
    import classnames from "classnames";
    import type { ButtonPressed } from "../types";

    interface Props {
        elevatorLFloor: number;
        floor: number;
        handleLeftButtonPressed: (buttonPressed: ButtonPressed) => void;
    }

    let { elevatorLFloor, floor, handleLeftButtonPressed }: Props = $props();
</script>

<div class="elevator-l">
    <div
        class={classnames("elevator", {
            "elevator-active": elevatorLFloor === floor,
        })}
    ></div>

    <div class="buttons">
        <button
            class="button"
            onclick={() =>
                handleLeftButtonPressed({
                    floor,
                    direciton: 1,
                    timestamp: Date.now(),
                })}>⬆️</button
        >
        <button
            class="button"
            onclick={() =>
                handleLeftButtonPressed({
                    floor,
                    direciton: 0,
                    timestamp: Date.now(),
                })}>⬇️</button
        >
    </div>
</div>
