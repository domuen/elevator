import type { ButtonPressed, Passenger } from "../types";

export default class Elevator {
    floor = $state<number>(undefined!);
    // passengers: Passenger[] = [];
    // buttonsPressed: ButtonPressed[] = [];
    passengers = $state<Passenger[]>([]);
    buttonsPressed = $state<ButtonPressed[]>([]);
    private nextStop: undefined | number = undefined; // this tuple contains the next stop floor, and the passenger (if applicable)

    constructor(floor: number) {
        this.floor = floor;
    }

    handleButtonPress({ floor, direciton, selectedFloor, timestamp }: ButtonPressed) {
        const index = this.buttonsPressed.findIndex(
            (button) => button.floor === floor && button.direciton === direciton && button.selectedFloor === selectedFloor
        );
        if (index < 0) this.buttonsPressed.push({ floor, direciton, selectedFloor, timestamp });
    }

    check() {
        // prioritize next stop; if there is a next stop, the elevator needs to move there
        // buttons and passenger stops need to be evaluated in this block to manage traffic on each floor
        if (!!this.nextStop) {
            if (this.floor === this.nextStop) {
                this.nextStop = undefined;
            } else if (this.floor < this.nextStop) {
                this.floor = this.floor + 1;
            } else {
                this.floor = this.floor - 1;
            }

            {
                const ascending: undefined | boolean = !this.nextStop ? undefined : this.nextStop > this.floor;

                const pickUps: number[] = [];

                this.buttonsPressed.forEach((button, i) => {
                    if (button.floor === this.floor) {
                        const addPassenger = () => {
                            pickUps.push(i);

                            this.passengers.push({
                                selectedFloor: button.selectedFloor,
                                direction: button.direciton,
                                timestamp: Date.now()
                            });
                        }

                        // if the elevator has no direction, everyone waiting needs to get in
                        if (ascending === undefined) return addPassenger();
                        // if there is a direction, we need to filter passengers entering by said direction
                        if (button.direciton === (ascending ? 0 : 1)) addPassenger();
                    }
                });

                this.buttonsPressed = this.buttonsPressed.filter((_, i) => !pickUps.includes(i));
            }

            // drop-off passengers on the way
            const dropOffs: number[] = [];

            this.passengers.forEach((passenger, i) => {
                if (passenger.selectedFloor === this.floor) dropOffs.push(i);
            });

            if (dropOffs.length) console.log("dropping off")

            this.passengers = this.passengers.filter((_, i) => !dropOffs.includes(i));

            // evaluate the next stop
            // if 
        }

        // passengers needs to be stored for visuals
        // sort by the stops going in the current direction and change the next stop to whoever is first down the row
        if (this.passengers.length > 0) {
            // const filtered = this.passengers.filter(passenger => passenger.direction === this.passengers[0].direction);
            // const sorted = filtered.sort((a, b) => a.selectedFloor - b.selectedFloor);

            // this.nextStop
            // return;
            const sorted = this.passengers.sort((a, b) => a.timestamp - b.timestamp);
            this.nextStop = sorted[0].selectedFloor;
        }

        // if there is NOT a next stop or a passenger, continue evaluating the next stop based on buttons pressed
        if (this.buttonsPressed.length <= 0) return;

        this.nextStop = this.buttonsPressed.sort((a, b) => a.timestamp - b.timestamp)[0].floor;
    }
}
