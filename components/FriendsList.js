import { StyleSheet, Text, FlatList, View, SafeAreaView } from 'react-native';
import React from 'react';
import { colors } from '../theme';
import RemoveButton from './RemoveButton';
import { firestore } from '../config/firebase';

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

		try {
			const user = await userRef.get();
			const newFriends = user.data().friends;
			newFriends.push(friendDoc);
			await userRef.update({
				friends: newFriends,
			});
			console.log('Added friend!');
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
								<RemoveButton
									color={colors.buttonPrimaryBg}
									title='Add'
									small={true}
									onPress={() => {
										this.handleAcceptFriend(
											item.id,
											this.props.friends
										);
									}}
								/>
							)}
							<RemoveButton
								color={colors.buttonPrimaryBg}
								title='Remove'
								small={true}
								onPress={() => {
									this.handleRemoveUser(
										item.id,
										this.props.friends
									);
								}}
							/>
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
	},
	title: {
		fontSize: 30,
	},
});
