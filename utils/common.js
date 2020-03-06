export function calculateHighestDifficulty(climbs) {
	const numbers = climbs.map(climb => {
		return parseInt(climb.split('V')[1]);
	});
	return Math.max(...numbers);
}
