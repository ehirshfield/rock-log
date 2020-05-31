import moment from 'moment';
import { pickHigherValue, roundToTwoDecimalPlaces } from './common';

export async function prepChallenger(
	userClimbs,
	userRole,
	challenge,
	challengeStart,
	challengeEnd
) {
	let newChallenge = Object.assign({}, challenge);
	for (let climb of userClimbs.docs) {
		if (climb.data().date === moment().format('MM/DD/YYYY')) {
			let climbObj = Object.assign({}, climb.data());
			for (let datapoint in climbObj) {
				if (datapoint === 'highestDifficulty') {
					let highest = pickHigherValue(
						newChallenge[userRole].highestDiff,
						climbObj[datapoint]
					);
					newChallenge[userRole].highestDiff = highest;
				} else if (datapoint === 'flashes') {
					let highest = pickHigherValue(
						newChallenge[userRole].flashes,
						climbObj[datapoint]
					);
					newChallenge[userRole].flashes = highest;
				} else if (datapoint === 'total') {
					let highest = pickHigherValue(
						newChallenge[userRole].attempts,
						climbObj[datapoint]
					);
					newChallenge[userRole].attempts = highest;
				} else if (datapoint === 'completed') {
					let highest = pickHigherValue(
						newChallenge[userRole].sends,
						climbObj[datapoint]
					);
					newChallenge[userRole].sends = highest;
				}
			}
		} else if (
			climb.data().endTime > challengeStart &&
			climb.data().endTime < challengeEnd
		) {
			let climbObj = Object.assign({}, climb.data());
			for (let datapoint in climbObj) {
				if (datapoint === 'highestDifficulty') {
					let highest = pickHigherValue(
						newChallenge[userRole].highestDiff,
						climbObj[datapoint]
					);
					newChallenge[userRole].highestDiff = highest;
				} else if (datapoint === 'flashes') {
					let highest = pickHigherValue(
						newChallenge[userRole].flashes,
						climbObj[datapoint]
					);
					newChallenge[userRole].flashes = highest;
				} else if (datapoint === 'total') {
					let highest = pickHigherValue(
						newChallenge[userRole].attempts,
						climbObj[datapoint]
					);
					newChallenge[userRole].attempts = highest;
				} else if (datapoint === 'completed') {
					let highest = pickHigherValue(
						newChallenge[userRole].sends,
						climbObj[datapoint]
					);
					newChallenge[userRole].sends = highest;
				}
			}
		}
	}

	if (newChallenge[userRole].attempts === 0) {
		return newChallenge;
	} else {
		newChallenge[userRole].SARatio = roundToTwoDecimalPlaces(
			newChallenge[userRole].sends / newChallenge[userRole].attempts
		);
		return newChallenge;
	}
}
