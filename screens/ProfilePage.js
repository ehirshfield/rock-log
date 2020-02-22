import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { getCurrentUser } from '../utils/user';

export default class ProfilePage extends React.Component {
	state = {
		user: {}
	};

	async componentDidMount() {
		const user = await getCurrentUser();

		this.setState({
			user
		});
	}

	render() {
		const { name, email, id } = this.state.user;
		return (
			<View>
				<Text>Profile Page!</Text>
			</View>
		);
	}
}
