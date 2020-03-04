import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class FriendsPage extends React.Component {
	constructor() {
		super();
		this.state = {
			user: {}
		};
	}

	render() {
		return (
			<View>
				<Text>Friends Page!</Text>
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
