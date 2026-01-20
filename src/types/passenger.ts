import type ButtonPressed from "./button-pressed";

export default interface Passenger {
    selectedFloor: number;
    direction: ButtonPressed["direciton"];
    timestamp: number;
}
