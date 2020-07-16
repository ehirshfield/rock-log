import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import ClimbForm from './ClimbForm';
import StartingClimbToggle from './StartingClimbToggle';
import { firestore, firebase } from '../config/firebase';
import { colors } from '../theme';

// Think about using Flatlist in the future for this list

export default class ClimbList extends React.Component {
	constructor() {
		super();
		this.userEmail = firebase.auth().currentUser.email || null;
		this.ref = firestore
			.collection('climbs')
			.where('email', '==', this.userEmail);
		this.climbListener = null;
		this.state = {
			isLoading: true,
			climbs: [],
			hideList: false,
		};
		this.onCollectionUpdate = this.onCollectionUpdate.bind(this);
		this.toggleClimbList = this.toggleClimbList.bind(this);
	}

	async onCollectionUpdate(querySnapshot) {
		const climbs = [];
		querySnapshot.forEach((doc) => {
			const {
				date,
				highestDifficulty,
				time,
				total,
				singleClimbs,
			} = doc.data();
			climbs.push({
				key: doc.id,
				date,
				highestDifficulty,
				time,
				total,
				singleClimbs,
			});
		});

		this.setState({
			climbs,
			isLoading: false,
		});

		// Update total climb count
		const user = await firestore
			.collection('users')
			.where('email', '==', this.userEmail)
			.get();
		if (!user.empty) {
			const snapshot = user.docs[0];
			const docId = snapshot.id;
			const doc = snapshot.data();
			console.log('totalClimbs :>> ', doc.totalClimbs);
			console.log('climbs.length :>> ', climbs.length);
			if (!doc.totalClimbs || doc.totalClimbs !== climbs.length) {
				await firestore.collection('users').doc(docId).update({
					totalClimbs: climbs.length,
				});
			}
		}
	}

	componentDidMount() {
		this.climbListener = this.ref.onSnapshot(
			this.onCollectionUpdate,
			(error) => {
				if (
					error
						.toString()
						.includes('Missing or insufficient permissions.')
				) {
					console.log('Detached climb listener!');
				} else {
					console.error('error :', error);
				}
			}
		);
	}

	toggleClimbList(status) {
		this.setState({
			hideList: status,
		});
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View style={styles.activity}>
					<ActivityIndicator size='large' color='#0000ff' />
				</View>
			);
		}
		return (
			<View>
				<StartingClimbToggle toggleClimbList={this.toggleClimbList} />
				{!this.state.hideList &&
					this.state.climbs.map((climb, index) => {
						return (
							<ClimbForm
								key={index}
								date={climb.date}
								total={climb.total}
								highestDiff={climb.highestDifficulty}
								time={climb.time}
								climbs={climb.singleClimbs}
								showSingleClimbView={
									this.props.showSingleClimbView
								}
							/>
						);
					})}
				{!this.state.climbs && (
					<View style={styles.noClimbs}>
						<Text style={styles.noClimbsText}>
							No climb sessions saved. Click above to start
							climbing!
						</Text>
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	activity: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	noClimbs: {
		flex: 1,
		justifyContent: 'center',
	},
	noClimbsText: {
		color: colors.textColors.paragraphText,
		fontSize: 30,
	},
});
