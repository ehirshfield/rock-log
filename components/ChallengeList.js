import { StyleSheet, Text, FlatList, View, SafeAreaView } from 'react-native';
import React from 'react';
import { colors } from '../theme';
import RemoveButton from './RemoveButton';
import { firestore } from '../config/firebase';
import moment from 'moment';

export default class ChallengeList extends React.Component {
	constructor() {
		super();
		this.handleAcceptChallenge = this.handleAcceptChallenge.bind(this);
	}

	async handleAcceptChallenge(challengeId) {
		const challengeRef = await firestore
			.collection('challenges')
			.doc(challengeId);

		try {
			await challengeRef.update({
				accepted: true,
				startTime: moment().unix(),
				endTime: moment().add(1, 'days').unix(),
			});
			console.log('Challenge Accepted!');
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.title}>{this.props.title}</Text>
				<FlatList
					data={this.props.challenges}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View style={styles.profileRow}>
							<Text style={styles.item}>
								{item.challengerName}
							</Text>
							{!item.accepted &&
								item.inviteeEmail === this.props.userEmail && (
									<View style={styles.btnRow}>
										<RemoveButton
											color={colors.buttonPrimaryBg}
											title='Accept'
											small={true}
											onPress={() => {
												this.handleAcceptChallenge(
													item.id
												);
											}}
										/>
										<RemoveButton
											color={colors.buttonPrimaryBg}
											title='Deny'
											small={true}
											onPress={() => {}}
										/>
									</View>
								)}
							{item.accepted && (
								<RemoveButton
									color={colors.buttonPrimaryBg}
									title='Details'
									small={true}
									onPress={() => {
										this.props.showCurrentChallenge(item);
									}}
								/>
							)}
							{!item.accepted &&
								item.challengerEmail ===
									this.props.userEmail && (
									<RemoveButton
										color={colors.buttonPrimaryBg}
										title='Cancel Challenge'
										small={true}
										onPress={() => {
											this.props.handleRemoveChallenge(
												item.id
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
		paddingTop: 20,
		fontSize: 18,
		height: 44,
		color: colors.textColors.paragraphText,
	},
	profileRow: {
		height: 65,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomColor: colors.textColors.paragraphText,
		borderBottomWidth: 1,
		paddingBottom: 10,
	},
	btnRow: {
		flexDirection: 'row',
	},
	title: {
		fontSize: 30,
		color: colors.textColors.paragraphText,
	},
});
