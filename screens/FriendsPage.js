import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FriendsList from '../components/FriendsList';
import { colors } from '../theme';

export default class FriendsPage extends React.Component {
	constructor() {
		super();
		this.state = {
			user: {}
		};
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.header}>Friends Page!</Text>
				<FriendsList
					friends={[
						{
							id: '123',
							name: 'Lola'
						},
						{
							id: '234',
							name: 'Dmitri'
						}
					]}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background
	},
	header: {
		color: colors.paragraphText
	}
});
