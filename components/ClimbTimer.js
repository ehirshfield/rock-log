import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';
import { convertTime } from '../utils/common';

export default class ClimbTimer extends React.Component {
	render() {
		return (
			<View style={styles.timerContainer}>
				<Text style={styles.timerText}>
					{convertTime(this.props.time)}
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	timerContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	timerText: {
		color: colors.textColors.generalText,
		fontSize: 40,
	},
});
