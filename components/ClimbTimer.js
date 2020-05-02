import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

export default class ClimbTimer extends React.Component {
	render() {
		const convertTime = (time) => {
			let milliseconds = parseInt((time % 1000) / 100);
			let seconds = Math.floor((time / 1000) % 60);
			let minutes = Math.floor((time / (1000 * 60)) % 60);
			let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

			hours = hours < 10 ? '0' + hours : hours;
			minutes = minutes < 10 ? '0' + minutes : minutes;
			seconds = seconds < 10 ? '0' + seconds : seconds;

			return hours + ':' + minutes + ':' + seconds + milliseconds;
		};

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
	hourContainer: {},
	minuteContainer: {},
	secondContainer: {},
	timerText: {
		color: colors.textColors.generalText,
		fontSize: 40,
	},
});
