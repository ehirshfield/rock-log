import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import ClimbButton from './ClimbButton';

export default function ClimbForm({ date, total, time, highestDiff }) {
	return (
		<View style={styles.formContainer}>
			<View style={styles.topRow}>
				<Text>Top Climb</Text>

				<Text>Total Climbs</Text>
			</View>
			<View style={styles.secondRow}>
				<Text style={styles.largeText}>{highestDiff}</Text>
				<Text style={styles.largeText}>{total}</Text>
			</View>
			<View style={styles.thirdRow}>
				<Text>Date: {date}</Text>
				<Text>Time: {time}</Text>
			</View>
			<ClimbButton color='green' title='View Climbs' />
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
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 30
	},
	thirdRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	secondRow: {
		flex: 1,
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 15
	},
	largeText: {
		fontSize: 100
	}
});
