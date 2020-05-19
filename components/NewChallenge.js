import { StyleSheet, Text, FlatList, View, SafeAreaView } from 'react-native';
import React from 'react';
import { colors } from '../theme';
import { firestore } from '../config/firebase';
import RemoveButton from './RemoveButton';

export default class NewChallenge extends React.Component {
	constructor() {
		super();
		this.state = {
			friends: [],
		};
		this.getFriends = this.getFriends.bind(this);
	}

	async getFriends() {
		const user = await firestore
			.collection('users')
			.where('email', '==', this.props.userEmail)
			.get();

		if (!user.empty) {
			const snapshot = user.docs[0];
			const { friends } = snapshot.data();
			await this.setState({
				friends,
			});
		} else {
			console.log('Could not find user');
		}
	}

	componentDidMount() {
		this.getFriends();
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.title}>Select A Friend To Challenge</Text>
				<FlatList
					data={this.state.friends}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View style={styles.profileRow}>
							<RemoveButton
								color={colors.buttonPrimaryBg}
								title={item.name}
								onPress={() => {
									this.props.challengeInvite(item);
									this.props.cancelNewChallengePage();
								}}
							/>
						</View>
					)}
				/>
				<View style={styles.cancelButtonContainer}>
					<RemoveButton
						color={colors.buttonPrimaryBg}
						title='Cancel'
						onPress={() => {
							this.props.cancelNewChallengePage();
						}}
					/>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 22,
		flexDirection: 'column',
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
		color: colors.textColors.paragraphText,
	},
	profileRow: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	title: {
		padding: 20,
		fontSize: 30,
		color: colors.textColors.paragraphText,
	},
	cancelButtonContainer: {
		flex: 1,
	},
});
