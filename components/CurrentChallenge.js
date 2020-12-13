import { StyleSheet, Text, FlatList, View, SafeAreaView } from 'react-native';
import React from 'react';
import { colors } from '../theme';
import { firestore } from '../config/firebase';
import GenericButton from './common/GenericButton';
import { prepChallenger } from '../utils/challenge';
import moment from 'moment';

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
			winner: '',
			loser: '',
		};
		this.renderCategories = this.renderCategories.bind(this);
	}

	async calculateScore() {
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
					} else if (row.challenger === 0 && row.invitee === 0) {
						challengerScore += 0;
						inviteeScore += 0;
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

		// UPDATE the db here if the scores are not in the db and pick a winner
		// Also make sure it has not been decided on a winner first
		if (
			!this.props.currentChallenge.winner &&
			this.props.currentChallenge.endTime < moment().unix()
		) {
			let winner,
				loser,
				tie = false;
			if (challengerScore > inviteeScore) {
				winner = this.props.currentChallenge.challengerName;
				loser = this.props.currentChallenge.inviteeName;
				this.setState({
					winner,
					loser,
				});
			} else if (inviteeScore > challengerScore) {
				winner = this.props.currentChallenge.inviteeName;
				loser = this.props.currentChallenge.challengerName;
				this.setState({
					winner,
					loser,
				});
			} else if (challengerScore === inviteeScore) {
				tie = true;
			}
			const challengeRef = await firestore
				.collection('challenges')
				.doc(this.props.currentChallenge.id);

			try {
				await challengeRef.update({
					winner,
					loser,
					tie,
					challengerScore,
					inviteeScore,
				});
				console.log('Marking challenge finished');
			} catch (error) {
				console.error(error);
			}
		}
		// check this.props.currentChallenge for finished and a winner, if not then pick winner
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

		let userPreppedChallange;
		// Prep User
		if (!userClimbs.empty) {
			userPreppedChallange = prepChallenger(
				userClimbs,
				userRole,
				challenge
			);
		} else {
			console.log('Could not find user climbs');
			userPreppedChallange = challenge;
		}

		// Get opponent climbs
		const opponentClimbs = await firestore
			.collection('climbs')
			.where('email', '==', opponentEmail)
			.get();

		let oppPreppedChallenge;
		// Store opponent today's highest stats
		if (!opponentClimbs.empty) {
			oppPreppedChallenge = prepChallenger(
				opponentClimbs,
				opponentRole,
				userPreppedChallange
			);
		} else {
			console.log('Could not find opponent climbs');
			oppPreppedChallenge = userPreppedChallange;
		}

		const finalObj = [
			{
				category: 'Flashes',
				challenger: oppPreppedChallenge.challenger.flashes,
				invitee: oppPreppedChallenge.invitee.flashes,
				displayName: 'Flashes',
			},
			{
				category: 'Attempts',
				challenger: oppPreppedChallenge.challenger.attempts,
				invitee: oppPreppedChallenge.invitee.attempts,
				displayName: 'Attempts',
			},
			{
				category: 'Sends',
				challenger: oppPreppedChallenge.challenger.sends,
				invitee: oppPreppedChallenge.invitee.sends,
				displayName: 'Sends',
			},
			{
				category: 'SARatio',
				challenger: oppPreppedChallenge.challenger.SARatio,
				invitee: oppPreppedChallenge.invitee.SARatio,
				displayName: 'S/A Ratio',
			},
			{
				category: 'HighestDiff',
				challenger: oppPreppedChallenge.challenger.highestDiff,
				invitee: oppPreppedChallenge.invitee.highestDiff,
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
