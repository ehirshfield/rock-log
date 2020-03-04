import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class ChallengePage extends React.Component {
	constructor() {
		super();
		this.state = {
			user: {}
		};
	}

	render() {
		return (
			<View>
				<Text>Challenge Page!</Text>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate('ClimbPage');
					}}
				>
					<Text>To Climb</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate('ProfilePage');
					}}
				>
					<Text>To Profile</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
