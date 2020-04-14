import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FriendsList from '../components/FriendsList';
import { colors } from '../theme';
import { firestore, firebase } from '../config/firebase';
import ClimbButton from '../components/ClimbButton';

export default class FriendsPage extends React.Component {
	constructor() {
		super();
		this.userEmail = firebase.auth().currentUser.email || null;
		this.usersRef = firestore.collection('users');
		this.friendsListener = null;
		this.state = {
			friends: [],
			isLoading: true,
			errorMessage: null,
			userId: ''
		};
		this.onCollectionUpdate = this.onCollectionUpdate.bind(this);
	}

	onCollectionUpdate(querySnapshot) {
		querySnapshot.forEach(doc => {
			this.setState({
				friends: doc.data().friends,
				isLoading: false,
				userId: doc.id
			});
		});
	}

	async handleAddFriend(friendEmail, friends) {
		const friend = await this.usersRef
			.where('email', '==', friendEmail)
			.get();
		if (!friend.empty) {
			const snapshot = friend.docs[0];
			const friendId = snapshot.id;
			const { name } = snapshot.data();
			friends.push({ id: friendId, name });
			try {
				this.usersRef.doc(this.state.userId).update({
					friends
				});
			} catch (error) {
				console.error('Error updating friends list :', error);
			}
		} else {
			console.error('Could not find friend');
		}
	}

	componentDidMount() {
		this.friendsListener = this.usersRef
			.where('email', '==', this.userEmail)
			.onSnapshot(this.onCollectionUpdate, error => {
				if (
					error
						.toString()
						.includes('Missing or insufficient permissions.')
				) {
					console.log('Detached friends listener!');
				} else {
					console.error('error :', error);
				}
			});
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text>Friends Page!</Text>
					<ClimbButton
						title='Add Friend'
						onPress={() => {
							this.handleAddFriend(
								'rnfjkfrnw@yahool.com',
								this.state.friends
							);
						}}
						color='red'
					/>
				</View>

				<FriendsList
					friends={this.state.friends}
					userId={this.state.userId}
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
		paddingTop: 145,
		color: colors.paragraphText,
		flexDirection: 'row'
	}
});
