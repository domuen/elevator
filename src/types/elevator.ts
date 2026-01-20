import type ButtonPressed from "./button-pressed";

export default interface Elevator {
    floor: number;
    buttonsPressed: ButtonPressed[];
    nextStop: undefined | number;
}
