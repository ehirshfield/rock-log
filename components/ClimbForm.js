import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import ClimbButton from './ClimbButton';
import { colors } from '../theme';

export default function ClimbForm({
	date,
	total,
	time,
	highestDiff,
	showSingleClimbView,
	climbs,
}) {
	return (
		<View style={styles.formContainer}>
			<View style={styles.topRow}>
				<Text style={styles.normalText}>Top Climb</Text>

				<Text style={styles.normalText}>Total Climbs</Text>
			</View>
			<View style={styles.secondRow}>
				<Text style={styles.largeText}>V{highestDiff}</Text>
				<Text style={styles.largeText}>{total}</Text>
			</View>
			<View style={styles.thirdRow}>
				<Text style={styles.normalText}>Date: {date}</Text>
				<Text style={styles.normalText}>Time: {time}</Text>
			</View>
			<ClimbButton
				color='green'
				title='View Climbs'
				onPress={() => {
					showSingleClimbView(climbs);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		backgroundColor: colors.backgroundColors.generalBackground,
		borderColor: '#d6d7da',
		borderWidth: 2,
		borderRadius: 10,
		padding: 15,
		margin: 15,
		marginBottom: 0,
	},
	topRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 30,
	},
	thirdRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	secondRow: {
		flex: 1,
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
	},
	largeText: {
		fontSize: 100,
		color: colors.textColors.paragraphText,
	},
	normalText: {
		color: colors.textColors.paragraphText,
	},
});
