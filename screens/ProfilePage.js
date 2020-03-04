import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { getCurrentUser } from '../utils/user';

export default class ProfilePage extends React.Component {
	constructor() {
		super();
		this.state = {
			user: {}
		};
	}

	async componentDidMount() {
		const user = await getCurrentUser();
		this.setState({
			user
		});
	}

	render() {
		const { name, email } = this.state.user;
		return (
			<View>
				<Text>Profile Page!</Text>
				<Text>{name}</Text>
				<Text>{email}</Text>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate('ClimbPage');
					}}
				>
					<Text>To Climb</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate('FriendsPage');
					}}
				>
					<Text>To Friends</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
