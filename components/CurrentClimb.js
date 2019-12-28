import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RatingButton from './RatingButton';

export default class CurrentClimb extends React.Component {
	state = {
		elapsedTime: 0
	};

	render() {
		return (
			<View style={styles.currentClimbContainer}>
				<RatingButton title='V0' />
				<RatingButton title='V1' />
				<RatingButton title='V2' />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	currentClimbContainer: {
		padding: 15,
		margin: 15,
		marginBottom: 0,
		borderColor: '#d6d7da',
		borderWidth: 2,
		borderRadius: 10,
		flex: 1,
		height: 300
	}
});
