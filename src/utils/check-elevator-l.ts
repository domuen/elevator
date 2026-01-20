import type { Elevator } from "../types";

const moveLeftElevator = (elevatorL: Elevator) => {
    const clearNextStop = () => {
        elevatorL.buttonsPressed.splice(
            elevatorL.buttonsPressed.findIndex(
                (button) => button.floor === elevatorL.nextStop,
            ),
            1,
        );
        elevatorL.nextStop = undefined;
    };

    console.log("moving");

    if (elevatorL.floor === elevatorL.nextStop) {
        console.log("arriving");
        clearNextStop();
    } else if (elevatorL.floor < elevatorL.nextStop!) {
        console.log("ascending");
        elevatorL.floor = elevatorL.floor + 1;
        if (elevatorL.floor === elevatorL.nextStop) clearNextStop(); // clear immedeately on arrival
    } else {
        console.log("descending");
        elevatorL.floor = elevatorL.floor - 1;
        if (elevatorL.floor === elevatorL.nextStop) clearNextStop(); // clear immedeately on arrival
    }
};

export default (elevatorL: Elevator) => {
    // if there is a next stop, go there and remove the next stop
    if (!!elevatorL.nextStop) {
        moveLeftElevator(elevatorL);

        return;
    }

    // if there is NOT a next stop, evaluate the next stop based on buttons pressed
    console.log("evaluating");
    if (elevatorL.buttonsPressed.length <= 0) return;

    console.log("getting next stop");

    const sorted = elevatorL.buttonsPressed.sort(
        (a, b) => a.timestamp - b.timestamp,
    );

    console.log(sorted);

    elevatorL.nextStop = sorted[0].floor;
};
