import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';
import ChallengeList from '../components/ChallengeList';
import NewChallenge from '../components/NewChallenge';
import CurrentChallenge from '../components/CurrentChallenge';
import RemoveButton from '../components/RemoveButton';
import { firestore, firebase } from '../config/firebase';

export default class ChallengePage extends React.Component {
	constructor() {
		super();
		this.userEmail = firebase.auth().currentUser.email || null;
		this.challengeRef = firestore.collection('challenges');
		this.challengerListener = null;
		this.inviteeListener = null;
		this.state = {
			isLoading: true,
			challenges: [],
			newChallenge: false,
			currentChallenge: false,
		};

		this.onCollectionUpdate = this.onCollectionUpdate.bind(this);
		this.showNewChallenge = this.showNewChallenge.bind(this);
		this.showCurrentChallenge = this.showCurrentChallenge.bind(this);
		this.cancelNewChallengePage = this.cancelNewChallengePage.bind(this);
		this.challengeInvite = this.challengeInvite.bind(this);
		this.handleRemoveChallenge = this.handleRemoveChallenge.bind(this);
		this.cancelCurrentChallengePage = this.cancelCurrentChallengePage.bind(
			this
		);
	}

	onCollectionUpdate(querySnapshot) {
		let challenges;
		querySnapshot.forEach((doc) => {
			challenges = this.state.challenges;
			if (challenges.find((item) => item.id === doc.id)) {
				const newChallenges = challenges.filter(
					(item) => item.id !== doc.id
				);
				this.setState({
					isLoading: false,
					challenges: [...newChallenges, doc.data()],
				});
			} else {
				this.setState({
					isLoading: false,
					challenges: [...challenges, doc.data()],
				});
			}
		});
	}

	componentDidMount() {
		this.inviteeListener = this.challengeRef
			.where('inviteeEmail', '==', this.userEmail)
			.onSnapshot(this.onCollectionUpdate, (error) => {
				if (
					error
						.toString()
						.includes('Missing or insufficient permissions.')
				) {
					console.log('Detached invitee listener!');
				} else {
					console.error('error :', error);
				}
			});

		this.challengerListener = this.challengeRef
			.where('challengerEmail', '==', this.userEmail)
			.onSnapshot(this.onCollectionUpdate, (error) => {
				if (
					error
						.toString()
						.includes('Missing or insufficient permissions.')
				) {
					console.log('Detached challenger listener!');
				} else {
					console.error('error :', error);
				}
			});
	}

	showNewChallenge() {
		this.setState({
			newChallenge: true,
		});
	}

	showCurrentChallenge() {
		this.setState({
			currentChallenge: true,
		});
	}

	cancelNewChallengePage() {
		this.setState({
			newChallenge: false,
		});
	}

	cancelCurrentChallengePage() {
		this.setState({
			newChallenge: false,
		});
	}

	async handleRemoveChallenge(challengeId) {
		const challengeRef = await firestore
			.collection('challenges')
			.doc(challengeId);

		try {
			await challengeRef.delete();
			console.log('Challenge Deleted!');

			const currentChallenges = this.state.challenges;
			this.setState({
				challenges: currentChallenges.filter(
					(chal) => chal.id !== challengeId
				),
			});
		} catch (error) {
			console.error(error);
		}
	}

	async challengeInvite(userDoc) {
		let userId, userName;
		const user = await firestore
			.collection('users')
			.where('email', '==', this.userEmail)
			.get();

		if (!user.empty) {
			const snapshot = user.docs[0];
			const userData = snapshot.data();
			userId = snapshot.id;
			userName = userData.name;
		} else {
			console.log('Could not find user');
		}

		try {
			const newDoc = await firestore.collection('challenges').doc();
			await newDoc.set({
				accepted: false,
				challengerEmail: this.userEmail,
				challengerId: userId,
				challengerName: userName,
				finished: false,
				id: newDoc.id,
				inviteeEmail: userDoc.email,
				inviteeId: userDoc.id,
				inviteeName: userDoc.name,
				startTime: 123,
				endTime: 123,
			});
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		if (!this.state.newChallenge && !this.state.currentChallenge) {
			return (
				<View style={styles.container}>
					<View style={styles.challenges}>
						<ChallengeList
							title='Challenges'
							challenges={this.state.challenges}
							userEmail={this.userEmail}
							showCurrentChallenge={this.showCurrentChallenge}
							handleRemoveChallenge={this.handleRemoveChallenge}
						/>
					</View>
					<View style={styles.newChallenge}>
						<RemoveButton
							color='pink'
							title='New Challenge'
							small={true}
							onPress={() => {
								this.showNewChallenge();
							}}
						/>
					</View>
				</View>
			);
		} else if (this.state.newChallenge && !this.state.currentChallenge) {
			return (
				<View style={styles.container}>
					<View style={styles.newChallenge}>
						<NewChallenge
							userEmail={this.userEmail}
							cancelNewChallengePage={this.cancelNewChallengePage}
							challengeInvite={this.challengeInvite}
						/>
					</View>
				</View>
			);
		} else if (!this.state.newChallenge && this.state.currentChallenge) {
			return (
				<View style={styles.container}>
					<View style={styles.newChallenge}>
						<CurrentChallenge
							handleRemoveChallenge={this.handleRemoveChallenge}
							cancelCurrentChallengePage={
								this.cancelCurrentChallengePage
							}
						/>
					</View>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.backgroundColors.generalBackground,
		flexDirection: 'column',
	},
	challenges: {
		flex: 1,
	},
	newChallenge: {
		flex: 1,
	},
});
