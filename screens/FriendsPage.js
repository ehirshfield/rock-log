import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FriendsList from '../components/FriendsList';
import { colors } from '../theme';
import { firestore, firebase } from '../config/firebase';
import ClimbButton from '../components/ClimbButton';
import TextInput from '../components/TextInput';

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
			userId: '',
			email: '',
			pendingFriends: [],
		};
		this.onCollectionUpdate = this.onCollectionUpdate.bind(this);
	}

	onCollectionUpdate(querySnapshot) {
		querySnapshot.forEach((doc) => {
			this.setState({
				friends: doc.data().friends,
				isLoading: false,
				userId: doc.id,
				pendingFriends: doc.data().pendingFriends,
			});
		});
	}

	async handleAddFriend(friendEmail, currentFriendsList) {
		// Check to see if friend already has invite or is a friend
		if (currentFriendsList.find((user) => user.email === friendEmail)) {
			console.log('Friend already or already requested');
			return this.setState({
				email: '',
			});
		}

		// Add user to pending friends list
		const friend = await this.usersRef
			.where('email', '==', friendEmail)
			.get();
		if (!friend.empty) {
			const snapshot = friend.docs[0];
			const friendId = snapshot.id;
			const { name, pendingFriends } = snapshot.data();

			if (pendingFriends.find((user) => user.email === friendEmail)) {
				console.log('Friend already or already requested');
				return this.setState({
					email: '',
				});
			} else {
				pendingFriends.push({ id: friendId, name });
				try {
					await this.usersRef.doc(friendId).update({
						pendingFriends: pendingFriends,
					});
					return this.setState({
						email: '',
					});
				} catch (error) {
					console.error('Error updating friends list :', error);
				}
			}
		} else {
			console.log('Could not find friend');
			// Maybe handle a message that says Sent! even if it fails
		}
	}

	componentDidMount() {
		this.friendsListener = this.usersRef
			.where('email', '==', this.userEmail)
			.onSnapshot(this.onCollectionUpdate, (error) => {
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
				<View stlyle={styles.headerContainer}>
					<Text style={styles.header}>Friends Page!</Text>
				</View>
				<View style={styles.addFriendRow}>
					<TextInput
						style={styles.textInput}
						autoCapitalize='none'
						placeholder='Email'
						onChangeText={(email) => this.setState({ email })}
						value={this.state.email}
					/>
					<ClimbButton
						title='Add Friend'
						onPress={() => {
							this.handleAddFriend(
								this.state.email,
								this.state.friends
							);
						}}
						color='red'
					/>
				</View>

				<View style={styles.friendsContainer}>
					{!this.state.pendingFriends && !this.state.friends && (
						<View>
							<Text>Add some friends to compete against!</Text>
						</View>
					)}
					{this.state.pendingFriends.length > 0 && (
						<View style={styles.pendingFriendList}>
							<FriendsList
								friends={this.state.pendingFriends}
								userId={this.state.userId}
								title='Pending Friends'
								pendingFriendsList
							/>
						</View>
					)}
					{this.state.friends.length > 0 && (
						<View style={styles.friendList}>
							<FriendsList
								friends={this.state.friends}
								userId={this.state.userId}
								title='Friends'
							/>
						</View>
					)}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.backgroundColors.generalBackground,
		flexDirection: 'column',
	},
	headerContainer: {
		flex: 1,
	},
	header: {
		paddingTop: 80,
		color: colors.headingText,
		textAlign: 'center',
		fontSize: 30,
	},
	addFriendRow: {
		paddingTop: 55,
		color: colors.textColors.paragraphText,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
		flex: 1,
	},
	textInput: {
		height: 40,
		width: '65%',
		borderColor: 'gray',
		borderWidth: 1,
		marginTop: 8,
		backgroundColor: colors.headingText,
	},
	pendingFriendList: {
		flex: 1,
	},
	friendList: {
		flex: 1,
	},
	friendsContainer: {
		flex: 3,
	},
});
