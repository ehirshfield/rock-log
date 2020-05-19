export function calculateHighestDifficulty(climbs) {
	const numbers = climbs.map((climb) => {
		return parseInt(climb.difficulty.split('V')[1]);
	});
	return Math.max(...numbers);
}

export function convertTime(time) {
	let milliseconds = parseInt((time % 1000) / 100);
	let seconds = Math.floor((time / 1000) % 60);
	let minutes = Math.floor((time / (1000 * 60)) % 60);
	let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

	hours = hours < 10 ? '0' + hours : hours;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;

	return hours + ':' + minutes + ':' + seconds + milliseconds;
}

export function pickHigherValue(one, two) {
	if (one > two) {
		return one;
	} else if (one < two) {
		return two;
	} else {
		return one;
	}
}

export function roundToTwoDecimalPlaces(num) {
	return Math.round((num + Number.EPSILON) * 100) / 100;
}
