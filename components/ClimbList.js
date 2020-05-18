import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import ClimbForm from './ClimbForm';
import StartingClimbToggle from './StartingClimbToggle';
import { firestore, firebase } from '../config/firebase';

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

	onCollectionUpdate(querySnapshot) {
		const climbs = [];
		querySnapshot.forEach((doc) => {
			const { date, highestDifficulty, time, total } = doc.data();
			climbs.push({
				key: doc.id,
				date,
				highestDifficulty,
				time,
				total,
			});
		});
		this.setState({
			climbs,
			isLoading: false,
		});
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
							/>
						);
					})}
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
});
