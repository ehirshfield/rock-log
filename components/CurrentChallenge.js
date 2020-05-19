import { StyleSheet, Text, FlatList, View, SafeAreaView } from 'react-native';
import React from 'react';
import { colors } from '../theme';
import { firestore } from '../config/firebase';
import GenericButton from './common/GenericButton';
import moment from 'moment';
import { pickHigherValue, roundToTwoDecimalPlaces } from '../utils/common';

const categoryScores = [
	{ category: 'Flashes', weight: 300, tie: 150 },
	{ category: 'Attempts', weight: 150, tie: 50 },
	{ category: 'Sends', weight: 200, tie: 100 },
	{ category: 'SARatio', weight: 200, tie: 100 },
	{ category: 'HighestDiff', weight: 200, tie: 100 },
	{ category: 'Custom', weight: 100, tie: 50 },
];

export default class CurrentChallenge extends React.Component {
	constructor() {
		super();
		this.state = {
			currentChallenge: [],
			categories: [
				'Flashes',
				'Attempts',
				'Sends',
				'S/A Ratio',
				'Highest Difficulty',
			],

			challengerScore: 0,
			inviteeScore: 0,
		};
		this.renderCategories = this.renderCategories.bind(this);
	}

	calculateScore() {
		let challengerScore = 0;
		let inviteeScore = 0;
		const curr = this.state.currentChallenge;
		for (let score of categoryScores) {
			for (let row of curr) {
				if (row.category === score.category) {
					if (row.challenger > row.invitee) {
						challengerScore += score.weight;
					} else if (row.challenger < row.invitee) {
						inviteeScore += score.weight;
					} else {
						challengerScore += score.tie;
						inviteeScore += score.tie;
					}
				}
			}
		}
		this.setState({
			challengerScore: challengerScore,
			inviteeScore: inviteeScore,
		});
	}

	async renderCategories() {
		// Call for todays climbs for each user and see if they can contribute to stats
		// OK if null
		const challenge = {
			challenger: {
				flashes: 0,
				attempts: 0,
				sends: 0,
				SARatio: 0,
				highestDiff: 0,
			},
			invitee: {
				flashes: 0,
				attempts: 0,
				sends: 0,
				SARatio: 0,
				highestDiff: 0,
			},
		};

		//Is the user the invitee or challenger?
		const userRole =
			this.props.currentChallenge.challengerEmail === this.props.userEmail
				? 'challenger'
				: 'invitee';

		const opponentRole =
			userRole === 'challenger' ? 'invitee' : 'challenger';

		const opponentEmail =
			this.props.currentChallenge.challengerEmail === this.props.userEmail
				? this.props.currentChallenge.inviteeEmail
				: this.props.currentChallenge.challengerEmail;

		// Get user climbs
		const userClimbs = await firestore
			.collection('climbs')
			.where('email', '==', this.props.userEmail)
			.get();

		// Store today's highest stats
		if (!userClimbs.empty) {
			for (let climb of userClimbs.docs) {
				if (climb.data().date === moment().format('MM/DD/YYYY')) {
					let climbObj = climb.data();
					for (let datapoint in climbObj) {
						if (datapoint === 'highestDifficulty') {
							let highest = pickHigherValue(
								challenge[userRole].highestDiff,
								climbObj[datapoint]
							);
							challenge[userRole].highestDiff = highest;
						} else if (datapoint === 'flashes') {
							let highest = pickHigherValue(
								challenge[userRole].flashes,
								climbObj[datapoint]
							);
							challenge[userRole].flashes = highest;
						} else if (datapoint === 'total') {
							let highest = pickHigherValue(
								challenge[userRole].attempts,
								climbObj[datapoint]
							);
							challenge[userRole].attempts = highest;
						} else if (datapoint === 'completed') {
							let highest = pickHigherValue(
								challenge[userRole].sends,
								climbObj[datapoint]
							);
							challenge[userRole].sends = highest;
						}
					}
				}
			}

			challenge[userRole].SARatio = roundToTwoDecimalPlaces(
				challenge[userRole].sends / challenge[userRole].attempts
			);
		} else {
			console.log('Could not find user climbs');
		}

		// Get opponent climbs
		const opponentClimbs = await firestore
			.collection('climbs')
			.where('email', '==', opponentEmail)
			.get();

		// Store opponent today's highest stats
		if (!opponentClimbs.empty) {
			for (let climb of opponentClimbs.docs) {
				if (climb.data().date === moment().format('MM/DD/YYYY')) {
					let climbObj = climb.data();
					for (let datapoint in climbObj) {
						if (datapoint === 'highestDifficulty') {
							let highest = pickHigherValue(
								challenge[opponentRole].highestDiff,
								climbObj[datapoint]
							);
							challenge[opponentRole].highestDiff = highest;
						} else if (datapoint === 'flashes') {
							let highest = pickHigherValue(
								challenge[opponentRole].flashes,
								climbObj[datapoint]
							);
							challenge[opponentRole].flashes = highest;
						} else if (datapoint === 'total') {
							let highest = pickHigherValue(
								challenge[opponentRole].attempts,
								climbObj[datapoint]
							);
							challenge[opponentRole].attempts = highest;
						} else if (datapoint === 'completed') {
							let highest = pickHigherValue(
								challenge[opponentRole].sends,
								climbObj[datapoint]
							);
							challenge[opponentRole].sends = highest;
						}
					}
				}
			}

			challenge[opponentRole].SARatio = roundToTwoDecimalPlaces(
				challenge[opponentRole].sends / challenge[opponentRole].attempts
			);
		} else {
			console.log('Could not find opponent climbs');
		}

		const finalObj = [
			{
				category: 'Flashes',
				challenger: challenge.challenger.flashes,
				invitee: challenge.invitee.flashes,
				displayName: 'Flashes',
			},
			{
				category: 'Attempts',
				challenger: challenge.challenger.attempts,
				invitee: challenge.invitee.attempts,
				displayName: 'Attempts',
			},
			{
				category: 'Sends',
				challenger: challenge.challenger.sends,
				invitee: challenge.invitee.sends,
				displayName: 'Sends',
			},
			{
				category: 'SARatio',
				challenger: challenge.challenger.SARatio,
				invitee: challenge.invitee.SARatio,
				displayName: 'S/A Ratio',
			},
			{
				category: 'HighestDiff',
				challenger: challenge.challenger.highestDiff,
				invitee: challenge.invitee.highestDiff,
				displayName: 'Highest Difficulty',
			},
		];
		this.setState({
			currentChallenge: finalObj,
		});
	}

	async componentDidMount() {
		try {
			await this.renderCategories();
		} catch (error) {
			console.log('category error :>> ', error);
		}
		try {
			await this.calculateScore();
		} catch (error) {
			console.log('score error :>> ', error);
		}
	}

	render() {
		const currentChallenge = this.props.currentChallenge;
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Current Challenge</Text>
				</View>
				<View style={styles.scoreAndCategoryContainer}>
					<View style={styles.scoreContainer}>
						<View style={styles.scoreLeft}>
							<Text style={styles.text}>
								{currentChallenge.challengerName}
							</Text>
							<Text style={styles.text}>
								{this.state.challengerScore}
							</Text>
						</View>
						<View style={styles.scoreVS}>
							<Text style={styles.text}>VS.</Text>
						</View>
						<View style={styles.scoreRight}>
							<Text style={styles.text}>
								{currentChallenge.inviteeName}
							</Text>
							<Text style={styles.text}>
								{this.state.inviteeScore}
							</Text>
						</View>
					</View>
					<View style={styles.categoriesContainer}>
						<FlatList
							style={styles.categoriesList}
							data={this.state.currentChallenge}
							keyExtractor={(item) => item.category}
							renderItem={({ item }) => (
								<View style={styles.categoryRow}>
									<View style={styles.categoryLeft}>
										<Text style={styles.listText}>
											{item.challenger}
										</Text>
									</View>
									<View style={styles.categoryMiddle}>
										<Text style={styles.textMiddle}>
											{item.displayName}
										</Text>
									</View>
									<View style={styles.categoryRight}>
										<Text style={styles.listText}>
											{item.invitee}
										</Text>
									</View>
								</View>
							)}
						/>
					</View>
				</View>

				<View style={styles.cancelButtonContainer}>
					<GenericButton
						color={colors.buttonPrimaryBg}
						title='Cancel'
						onPress={() => {
							this.props.cancelCurrentChallengePage();
						}}
					/>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 22,
		flexDirection: 'column',
	},
	titleContainer: {
		flex: 1,
	},
	categoriesContainer: {
		flex: 5,
	},
	cancelButtonContainer: {
		flex: 1,
		paddingTop: 20,
		marginHorizontal: 10,
	},
	scoreAndCategoryContainer: {
		flex: 5,
		borderColor: colors.textColors.paragraphText,
		borderWidth: 2,
		borderRadius: 3,
		backgroundColor: colors.backgroundColors.generalBackgroundGreyLighter,
		marginHorizontal: 10,
	},
	scoreContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: colors.backgroundColors.generalBackgroundGrey,
	},
	scoreLeft: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	scoreVS: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	scoreRight: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: colors.textColors.paragraphText,
		fontSize: 30,
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
		color: colors.textColors.paragraphText,
	},
	profileRow: {
		flexDirection: 'row',
	},
	title: {
		padding: 20,
		fontSize: 30,
		color: colors.textColors.paragraphText,
	},
	categoriesList: {
		flex: 1,
	},
	categoryRow: {
		flex: 1,
		flexDirection: 'row',
		paddingVertical: 15,
		backgroundColor: colors.backgroundColors.generalBackgroundGreyLighter,
	},
	categoryLeft: {
		height: 60,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	categoryMiddle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRightWidth: 1,
		borderColor: 'white',
		borderLeftWidth: 1,
	},
	textMiddle: {
		color: 'white',
		fontSize: 25,
	},
	categoryRight: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	listText: {
		fontSize: 30,
		color: colors.textColors.paragraphText,
	},
});
