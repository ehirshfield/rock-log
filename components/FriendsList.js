import { StyleSheet, Text, FlatList, View, SafeAreaView } from 'react-native';
import React from 'react';
import { colors } from '../theme';
import { firestore } from '../config/firebase';
import { Button, Icon } from 'react-native-elements';

export default class FriendsList extends React.Component {
	constructor() {
		super();
		this.handleRemoveUser = this.handleRemoveUser.bind(this);
		this.handleAcceptFriend = this.handleAcceptFriend.bind(this);
	}

	handleRemoveUser(deleteId, friends) {
		firestore
			.collection('users')
			.doc(this.props.userId)
			.update({
				friends: friends.filter((friend) => friend.id !== deleteId),
			})
			.then(() => {
				console.log('Removed friend!');
			})
			.catch((error) => {
				console.error(error);
			});
	}

	handleRemovePendingUser(deleteId, friends) {
		firestore
			.collection('users')
			.doc(this.props.userId)
			.update({
				pendingFriends: friends.filter(
					(friend) => friend.id !== deleteId
				),
			})
			.then(() => {
				console.log('Removed pending friend!');
			})
			.catch((error) => {
				console.error(error);
			});
	}

	async handleAcceptFriend(friendId, friendsList) {
		const friendDoc = friendsList.find((friend) => friend.id === friendId);

		const userRef = await firestore
			.collection('users')
			.doc(this.props.userId);

		try {
			await userRef.update({
				pendingFriends: friendsList.filter(
					(friend) => friend.id !== friendId
				),
			});
			console.log('Removed friend from pending list!');
		} catch (error) {
			console.error(error);
		}

		let userDoc, docId;
		try {
			const user = await userRef.get();
			const newFriends = user.data().friends;
			userDoc = user.data();
			docId = user.id;
			newFriends.push(friendDoc);
			await userRef.update({
				friends: newFriends,
			});
			console.log('Added friend!');
		} catch (error) {
			console.error(error);
		}

		// Add this friend to other user too
		const friendRef = await firestore.collection('users').doc(friendId);

		try {
			const user = await friendRef.get();
			const newFriendDoc = {
				id: docId,
				email: userDoc.email,
				name: userDoc.name,
			};
			const newFriends = user.data().friends;
			newFriends.push(newFriendDoc);
			await friendRef.update({
				friends: newFriends,
			});
			console.log('Added friend to other user!');
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.title}>{this.props.title}</Text>
				<FlatList
					data={this.props.friends}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View style={styles.profileRow}>
							<Text style={styles.item}>{item.name}</Text>
							{this.props.pendingFriendsList && (
								<View style={styles.pendingBtns}>
									<Button
										icon={
											<Icon
												name='check-outline'
												type='material-community'
												size={35}
												color={
													colors.iconColors.acceptIcon
												}
											/>
										}
										type='clear'
										onPress={() => {
											this.handleAcceptFriend(
												item.id,
												this.props.friends
											);
										}}
									/>
									<Button
										icon={
											<Icon
												name='trash-can-outline'
												type='material-community'
												size={35}
												color={
													colors.iconColors.deleteIcon
												}
											/>
										}
										type='clear'
										onPress={() => {
											this.handleRemovePendingUser(
												item.id,
												this.props.friends
											);
										}}
									/>
								</View>
							)}
							{!this.props.pendingFriendsList && (
								<Button
									icon={
										<Icon
											name='trash-can-outline'
											type='material-community'
											size={35}
											color={colors.iconColors.deleteIcon}
										/>
									}
									type='clear'
									onPress={() => {
										this.handleRemoveUser(
											item.id,
											this.props.friends
										);
									}}
								/>
							)}
						</View>
					)}
				/>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 22,
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
		color: colors.textColors.paragraphText,
	},
	profileRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderColor: colors.textColors.paragraphText,
		borderBottomWidth: 0.2,
		paddingBottom: 10,
	},
	title: {
		fontSize: 30,
		color: colors.textColors.paragraphText,
	},
	pendingBtns: {
		flex: 1,
		flexDirection: 'row-reverse',
	},
});
