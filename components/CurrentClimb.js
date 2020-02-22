import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RatingButton from './RatingButton';
import ClimbButton from './ClimbButton';
import SingleClimb from './SingleClimb';
import ClimbTimer from './ClimbTimer';

import { getUsers } from '../utils/user';

let time;

export default class CurrentClimb extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hours: 0,
			minutes: 0,
			seconds: 0,
			isPaused: false
			// workingOnProblem: false,
			// currentClimb: 'V3'
		};
		this.startTimer = this.startTimer.bind(this);
		this.finishClimbing = this.finishClimbing.bind(this);
		this.pauseClimbing = this.pauseClimbing.bind(this);
		this.resumeClimbing = this.resumeClimbing.bind(this);
		this.logRating = this.logRating.bind(this);
	}

	startTimer() {
		let { seconds, minutes, hours } = this.state;
		seconds++;
		if (seconds >= 60) {
			seconds = 0;
			minutes++;
			if (minutes >= 60) {
				minutes = 0;
				hours++;
			}
		}
		this.setState({
			seconds,
			minutes,
			hours
		});
		this.timer();
	}

	timer() {
		time = setTimeout(this.startTimer, 1000);
	}

	generateRatings(maxRating) {
		const ratings = [];
		for (let i = 0; i < parseInt(maxRating) + 1; i++) {
			ratings.push('V' + i);
		}
		return ratings.map((item, index) => {
			if (item.length > 2) {
				return (
					<RatingButton
						key={index}
						title={item}
						onPress={() => this.logRating(item)}
						largeRating
					/>
				);
			} else {
				return (
					<RatingButton
						key={index}
						title={item}
						onPress={() => this.logRating(item)}
					/>
				);
			}
		});
	}

	// openSingleClimb(rating) {
	// 	this.setState({
	// 		workingOnProblem: true,
	// 		currentClimb: rating
	// 	});
	// }

	logRating(rating) {
		console.log('Climbed: ', rating);
	}

	componentDidMount() {
		time = setTimeout(this.startTimer, 1000);
	}

	finishClimbing() {
		clearTimeout(time);
	}

	pauseClimbing() {
		clearTimeout(time);
		this.setState({
			isPaused: true
		});
	}

	resumeClimbing() {
		this.startTimer();
		this.setState({
			isPaused: false
		});
	}

	render() {
		const climbRatings = this.generateRatings(12);
		const { isPaused } = this.state;
		return (
			<View style={styles.currentClimbContainer}>
				<View style={styles.ratingContainer}>{climbRatings}</View>

				<ClimbTimer
					hours={this.state.hours}
					minutes={this.state.minutes}
					seconds={this.state.seconds}
				/>
				<View style={styles.endSessionButtonContainer}>
					{isPaused ? (
						<ClimbButton
							title='Resume Climbing'
							onPress={() => {
								this.resumeClimbing();
							}}
							color='green'
						/>
					) : (
						<ClimbButton
							title='Pause Climbing'
							onPress={() => {
								this.pauseClimbing();
							}}
							color='red'
						/>
					)}
				</View>
				<View style={styles.endSessionButtonContainer}>
					<ClimbButton
						title='Finished Climbing'
						onPress={() => {
							this.finishClimbing();
							this.props.onFormClose();
						}}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	currentClimbContainer: {
		flexDirection: 'column',
		borderColor: '#d6d7da',
		borderWidth: 2,
		borderRadius: 10
	},
	ratingContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		alignContent: 'flex-start'
	},
	endSessionButtonContainer: {
		padding: 10,
		margin: 10
	}
});
