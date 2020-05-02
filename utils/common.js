export function calculateHighestDifficulty(climbs) {
	const numbers = climbs.map((climb) => {
		return parseInt(climb.difficulty.split('V')[1]);
	});
	return Math.max(...numbers);
}
