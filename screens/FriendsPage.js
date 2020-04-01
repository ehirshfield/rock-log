import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FriendsList from '../components/FriendsList';
import { colors } from '../theme';
import { firestore, firebase } from '../config/firebase';

export default class FriendsPage extends React.Component {
	constructor() {
		super();
		this.userEmail = firebase.auth().currentUser.email || null;
		this.state = {
			friends: [],
			isLoading: true,
			errorMessage: null
		};
	}

	componentDidMount() {
		firestore
			.collection('users')
			.where('email', '==', this.userEmail)
			.get()
			.then(snap => {
				snap.forEach(doc => {
					this.setState({
						friends: doc.data().friends,
						isLoading: false
					});
				});
			})
			.catch(error => {
				this.setState({
					errorMessage: error.message
				});
				console.log('error :', error);
			});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.header}>Friends Page!</Text>
				<FriendsList friends={this.state.friends} />
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
