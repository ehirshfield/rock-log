import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import ClimbButton from './ClimbButton';

export default function ClimbForm({ date, total, time, highestDiff }) {
	return (
		<View style={styles.formContainer}>
			<View style={styles.topRow}>
				<Text>Date: {date}</Text>
				<Text>Total Climbs: {total}</Text>
			</View>
			<View style={styles.secondRow}>
				<Text>Time: {time}</Text>
				<Text>Highest Difficulty: {highestDiff}</Text>
			</View>
			<ClimbButton color='green' title='Edit Climb' />
		</View>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		backgroundColor: 'white',
		borderColor: '#d6d7da',
		borderWidth: 2,
		borderRadius: 10,
		padding: 15,
		margin: 15,
		marginBottom: 0
	},
	topRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	secondRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});
