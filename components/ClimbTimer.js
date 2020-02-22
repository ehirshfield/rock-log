import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class ClimbTimer extends React.Component {
	render() {
		return (
			<View>
				<View>
					<Text>{this.props.hours}</Text>
				</View>
				<View>
					<Text>{this.props.minutes}</Text>
				</View>
				<View>
					<Text>{this.props.seconds}</Text>
				</View>
			</View>
		);
	}
}
