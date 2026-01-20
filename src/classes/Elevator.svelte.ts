import type { ButtonPressed, Passenger } from "../types";

export default class Elevator {
    floor = $state<number>(undefined!);
    private passengers: Passenger[] = [];
    private buttonsPressed: ButtonPressed[] = [];
    private nextStop: undefined | number = undefined;

    constructor(floor: number) {
        this.floor = floor;
    }

    handleButtonPress({ floor, direciton, selectedFloor, timestamp }: ButtonPressed) {
        const index = this.buttonsPressed.findIndex(
            (button) => button.floor === floor && button.direciton === direciton
        );
        if (index < 0) this.buttonsPressed.push({ floor, direciton, selectedFloor, timestamp });
    }

    private clearNextStop() {
        // remove pressed button and create passenger in the elevator with their stop
        const index = this.buttonsPressed.findIndex((button) => button.floor === this.nextStop);

        if (index < 0) return this.nextStop = undefined;

        const buttonPressed = this.buttonsPressed[index];
        this.passengers.push({
            selectedFloor: buttonPressed.selectedFloor,
            direction: buttonPressed.direciton,
            timestamp: Date.now()
        });

        this.buttonsPressed.splice(index, 1);
        this.nextStop = undefined;
    };

    check() {
        // prioritize passengers; since they always have a stop, the elevator should go there first
        if (this.passengers.length > 0) {
            const passenger = this.passengers.sort((a, b) => a.timestamp - b.timestamp)[0].selectedFloor;

            this.nextStop = passenger;

            this.passengers.splice(this.passengers.findIndex(passenger => passenger.selectedFloor === passenger.selectedFloor))

            return;
        }

        // if there is a next stop, go there and remove the next stop
        if (!!this.nextStop) {
            if (this.floor === this.nextStop) {
                this.clearNextStop();
            } else if (this.floor < this.nextStop!) {
                this.floor = this.floor + 1;
                if (this.floor === this.nextStop) this.clearNextStop(); // clear immedeately on arrival
            } else {
                this.floor = this.floor - 1;
                if (this.floor === this.nextStop) this.clearNextStop(); // clear immedeately on arrival
            }

            return;
        }

        // if there is NOT a next stop, evaluate the next stop based on buttons pressed
        if (this.buttonsPressed.length <= 0) return;

        this.nextStop = this.buttonsPressed.sort((a, b) => a.timestamp - b.timestamp)[0].floor;
    }
}
