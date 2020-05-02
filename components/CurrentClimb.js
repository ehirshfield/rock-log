import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import RatingButton from './RatingButton';
import ClimbButton from './ClimbButton';
import ClimbTimer from './ClimbTimer';
import moment from 'moment';
import { firestore, firebase } from '../config/firebase';
import { calculateHighestDifficulty } from '../utils/common';
import SingleClimb from './SingleClimb';

let time;

export default class CurrentClimb extends React.Component {
	constructor(props) {
		super(props);
		this.userId = firebase.auth().currentUser.uid || null;
		this.state = {
			climbs: [],
			singleClimb: false,
			singleClimbRating: '',
			runningTime: 0,
			status: false,
		};
		this.finishClimbing = this.finishClimbing.bind(this);
		this.logRating = this.logRating.bind(this);
		this.moveToSingleClimb = this.moveToSingleClimb.bind(this);
		this.exitSingleClimb = this.exitSingleClimb.bind(this);
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
						onPress={() => this.moveToSingleClimb(item)}
						largeRating
					/>
				);
			} else {
				return (
					<RatingButton
						key={index}
						title={item}
						onPress={() => this.moveToSingleClimb(item)}
					/>
				);
			}
		});
	}

	moveToSingleClimb(rating) {
		this.setState({
			singleClimb: true,
			singleClimbRating: rating,
		});
	}

	exitSingleClimb() {
		this.setState({
			singleClimb: false,
		});
	}

	logRating(rating, time) {
		const climbs = this.state.climbs;
		climbs.push({
			difficulty: rating,
			time: time,
		});
		this.setState({
			climbs,
		});
	}

	finishClimbing() {
		const { climbs, runningTime } = this.state;
		clearInterval(this.timer);
		if (climbs.length > 0) {
			const highest = calculateHighestDifficulty(climbs);
			firestore.collection('climbs').add({
				date: moment().format('MM/DD/YYYY'),
				highestDifficulty: 'V' + highest,
				time: runningTime,
				total: climbs.length,
				userId: this.userId,
				singleClimbs: climbs,
			});
		}

		this.props.onFormClose();
		this.props.toggleClimbList(false);
	}

	handleClimbTime = () => {
		this.setState((state) => {
			if (state.status) {
				clearInterval(this.timer);
			} else {
				const startTime = Date.now() - this.state.runningTime;
				this.timer = setInterval(() => {
					this.setState({ runningTime: Date.now() - startTime });
				});
			}
			return { status: !state.status };
		});
	};

	handleReset = () => {
		clearInterval(this.timer);
		this.setState({ runningTime: 0, status: false });
	};

	componentDidMount() {
		this.handleClimbTime();
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		const climbRatings = this.generateRatings(13);
		const { status } = this.state;
		return (
			<View style={styles.currentClimbContainer}>
				{this.state.singleClimb ? (
					<View>
						<SingleClimb
							logRating={this.logRating}
							singleClimbRating={this.state.singleClimbRating}
							handleClimbTime={this.handleClimbTime}
							exitSingleClimb={this.exitSingleClimb}
						/>
					</View>
				) : (
					<View>
						<View style={styles.ratingContainer}>
							{climbRatings}
						</View>

						<ClimbTimer time={this.state.runningTime} />
						<View style={styles.endSessionButtonContainer}>
							{!status ? (
								<ClimbButton
									title='Resume Climbing'
									onPress={() => {
										this.handleClimbTime();
									}}
									color='green'
								/>
							) : (
								<ClimbButton
									title='Pause Climbing'
									onPress={() => {
										this.handleClimbTime();
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
								}}
							/>
						</View>
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	currentClimbContainer: {
		flexDirection: 'column',
	},
	ratingContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		alignContent: 'flex-start',
	},
	endSessionButtonContainer: {
		padding: 10,
		margin: 10,
	},
});
