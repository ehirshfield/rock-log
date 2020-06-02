import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FriendsList from '../components/FriendsList';
import { colors } from '../theme';
import { firestore, firebase } from '../config/firebase';
import { Input, Button, Icon } from 'react-native-elements';

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
			name: '',
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
				name: doc.data().name,
				pendingFriends: doc.data().pendingFriends,
			});
		});
	}

	async handleAddFriend(friendEmail, currentFriendsList) {
		// Check to see if friend already has invite or is a friend
		if (currentFriendsList.find((user) => user.email === friendEmail)) {
			return this.setState({
				email: '',
				errorMessage: 'Friend already or already requested',
			});
		}

		if (this.userEmail === friendEmail) {
			return this.setState({
				email: '',
				errorMessage: "You can't be your own friend... I think",
			});
		}

		// Add user to pending friends list
		const friend = await this.usersRef
			.where('email', '==', friendEmail)
			.get();
		if (!friend.empty) {
			const snapshot = friend.docs[0];
			const friendId = snapshot.id;
			const { pendingFriends } = snapshot.data();
			if (pendingFriends.find((user) => user.email === friendEmail)) {
				return this.setState({
					email: '',
					errorMessage: 'Friend already or already requested',
				});
			} else {
				pendingFriends.push({
					id: this.state.userId,
					name: this.state.name,
					email: this.userEmail,
				});
				try {
					await this.usersRef.doc(friendId).update({
						pendingFriends: pendingFriends,
					});
					return this.setState({
						email: '',
						errorMessage: 'Friend Request Sent!',
					});
				} catch (error) {
					console.error('Error updating friends list :', error);
				}
			}
		} else {
			console.log('Could not find friend');
			this.setState({
				errorMessage:
					'Could not find friend. Please double check the spelling',
			});
		}
	}

	async componentDidMount() {
		this.friendsListener = await this.usersRef
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
					<Text style={styles.header}>Friends Page</Text>
				</View>
				<View style={styles.addFriendContainer}>
					<View style={styles.addFriendRow}>
						<Input
							autoCapitalize='none'
							placeholder="Add a Friend's Email"
							onChangeText={(email) => this.setState({ email })}
							value={this.state.email}
							containerStyle={styles.inputContainerStyle}
							inputStyle={styles.textInputStyle}
							placeholderTextColor={
								colors.textColors.paragraphText
							}
							errorStyle={{ color: 'red' }}
							errorMessage={this.state.errorMessage}
						/>
						<Button
							icon={
								<Icon
									name='account-plus-outline'
									type='material-community'
									size={35}
									color={colors.textColors.paragraphText}
								/>
							}
							type='clear'
							onPress={() => {
								this.handleAddFriend(
									this.state.email,
									this.state.friends
								);
							}}
						/>
					</View>
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
		paddingTop: 60,
		color: colors.headingText,
		textAlign: 'center',
		fontSize: 30,
	},
	addFriendContainer: {
		paddingHorizontal: 15,
		flex: 1,
	},
	addFriendRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	textInputStyle: {
		width: '40%',
		marginTop: 8,
		color: colors.textColors.paragraphText,
		fontSize: 15,
	},
	inputContainerStyle: {
		flex: 1,
		width: '65%',
	},
	pendingFriendList: {
		flex: 1,
	},
	friendList: {
		flex: 1,
	},
	friendsContainer: {
		flex: 5,
		paddingHorizontal: 15,
	},
});
