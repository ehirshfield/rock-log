import { StyleSheet, Text, FlatList, View, SafeAreaView } from 'react-native';
import React from 'react';
import { colors } from '../theme';
import RemoveButton from './RemoveButton';
import { firestore, firebase } from '../config/firebase';

export default class FriendsList extends React.Component {
	constructor() {
		super();
		this.handleRemoveUser = this.handleRemoveUser.bind(this);
	}

	handleRemoveUser(id, name) {
		const userRef = firestore
			.collection('users')
			.where('email', '==', this.userEmail);
		userRef
			.update({
				friends: firebase.firestore.FieldValue.arrayRemove({
					id,
					name
				})
			})
			.then(() => {
				console.log('Removed friend!');
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
			<SafeAreaView style={styles.container}>
				<FlatList
					data={this.props.friends}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<View style={styles.profileRow}>
							<Text style={styles.item}>{item.name}</Text>
							<RemoveButton
								color={colors.buttonPrimaryBg}
								title='Remove'
								small={true}
								onPress={this.handleRemoveUser(
									item.id,
									item.name
								)}
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
		paddingTop: 22
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
		color: colors.paragraphText
	},
	profileRow: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});
