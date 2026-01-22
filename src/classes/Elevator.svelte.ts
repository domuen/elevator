import type { ButtonPressed, Passenger } from "../types";

export default class Elevator {
    floor = $state<number>(undefined!);
    passengers = $state<Passenger[]>([]);
    buttonsPressed = $state<ButtonPressed[]>([]);
    private nextStop: undefined | number = undefined;

    constructor(floor: number) {
        this.floor = floor;
    }

    handleButtonPress({ floor, direction, selectedFloor, timestamp }: ButtonPressed) {
        const index = this.buttonsPressed.findIndex(
            (button) => button.floor === floor && button.direction === direction && button.selectedFloor === selectedFloor
        );
        if (index < 0) this.buttonsPressed.push({ floor, direction: direction, selectedFloor, timestamp });
    }

    addPassengers() { // used to evaluate if a button presser meets the reqs to enter the elevator per floor
        // get elevator direction from next stop and current pos
        const ascending: undefined | boolean = !this.nextStop ? undefined : this.nextStop > this.floor;

        const pickUps: number[] = [];

        this.buttonsPressed.forEach((button, i) => {
            if (button.floor === this.floor) {
                const addPassenger = () => {
                    pickUps.push(i);

                    this.passengers.push({
                        selectedFloor: button.selectedFloor,
                        direction: button.direction,
                        timestamp: Date.now()
                    });
                }

                // if the elevator has no direction, everyone waiting needs to get in
                if (ascending === undefined) return addPassenger();
                // if there is a direction, we need to filter passengers entering by said direction
                if (button.direction === (ascending ? 0 : 1)) addPassenger();
                /*
                    the issue with this approach is if the elevator is ascending to pick up someone going down (descending)
                    a passenger going up will be added to the elevator and prioritized, although they should wait until the elevator is ascending;
                    the elevator should only allow descending passengers since the down button was pressed first (and vice versa)
                */
            }
        });

        this.buttonsPressed = this.buttonsPressed.filter((_, i) => !pickUps.includes(i));
    }

    dropOffPassengers() { // used to evaluate whether or not to remove a passenger at their stop per floor
        const dropOffs: number[] = [];

        this.passengers.forEach((passenger, i) => {
            if (passenger.selectedFloor === this.floor) dropOffs.push(i);
        });

        this.passengers = this.passengers.filter((_, i) => !dropOffs.includes(i));
    }

    check() {
        // prioritize next stop; if there is a next stop, the elevator needs to move there
        // buttons and passengers need to be evaluated on each floor to manage traffic
        if (!!this.nextStop) {
            if (this.floor === this.nextStop) {
                this.nextStop = undefined;
            } else if (this.floor < this.nextStop) {
                this.floor = this.floor + 1; // ascend
            } else {
                this.floor = this.floor - 1; // descend
            }

            this.addPassengers();
            return this.dropOffPassengers();
        }

        // i guess this is a precaution in case there are passengers but no next stop
        // probably can be removed
        if (this.passengers.length > 0) {
            const sorted = this.passengers.sort((a, b) => a.timestamp - b.timestamp);
            // without returning here, passengers will get in going the wrong direction
            // and subsequentially get prioritized, changing the direction of the elevator
            return this.nextStop = sorted[0].selectedFloor;
        }

        // if there is NOT a next stop or a passenger, continue monitoring pressed buttons
        if (this.buttonsPressed.length <= 0) return;

        this.nextStop = this.buttonsPressed.sort((a, b) => a.timestamp - b.timestamp)[0].floor;
    }
}
