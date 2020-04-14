import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import ClimbForm from './ClimbForm';
import StartingClimbToggle from './StartingClimbToggle';
import { firestore, firebase } from '../config/firebase';

// Think about using Flatlist in the future for this list

export default class ClimbList extends React.Component {
	constructor() {
		super();
		this.userId = firebase.auth().currentUser.uid || null;
		this.ref = firestore
			.collection('climbs')
			.where('userId', '==', this.userId);
		this.climbListener = null;
		this.state = {
			isLoading: true,
			climbs: []
		};
		this.onCollectionUpdate = this.onCollectionUpdate.bind(this);
	}

	onCollectionUpdate(querySnapshot) {
		const climbs = [];
		querySnapshot.forEach(doc => {
			const {
				date,
				highestDifficulty,
				hours,
				minutes,
				seconds,
				total
			} = doc.data();
			climbs.push({
				key: doc.id,
				date,
				highestDifficulty,
				hours,
				minutes,
				seconds,
				total
			});
		});
		this.setState({
			climbs,
			isLoading: false
		});
	}

	componentDidMount() {
		this.climbListener = this.ref.onSnapshot(
			this.onCollectionUpdate,
			error => {
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
				<StartingClimbToggle />
				{this.state.climbs.map((climb, index) => {
					return (
						<ClimbForm
							key={index}
							date={climb.date}
							total={climb.total}
							highestDiff={climb.highestDifficulty}
							time={climb.minutes}
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
		justifyContent: 'center'
	}
});
