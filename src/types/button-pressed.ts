export default interface ButtonPressed {
	floor: number;
	direction: 0 | 1; // 0 = up | 1 = down
	selectedFloor: number;
	timestamp: number;
}
