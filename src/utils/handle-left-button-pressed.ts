import type { ButtonPressed } from "../types";

export default (elevatorLButtonsPressed: ButtonPressed[]) => ({ floor, direciton, timestamp }: ButtonPressed) => {
    const index = elevatorLButtonsPressed.findIndex(
        (button) => button.floor === floor && button.direciton === direciton,
    );
    if (index < 0)
        elevatorLButtonsPressed.push({ floor, direciton, timestamp });
};
