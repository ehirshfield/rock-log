import { StyleSheet, Text, FlatList, View, SafeAreaView } from 'react-native';
import React from 'react';
import { colors } from '../theme';
import { firestore } from '../config/firebase';
import RemoveButton from './RemoveButton';

export default class CurrentChallenge extends React.Component {
	constructor() {
		super();
		this.state = {
			currentChallenge: {},
			categories: [
				'Flashes',
				'Attempts',
				'Sends',
				'S/A Ratio',
				'Workout Time',
			],
		};
		this.renderCategories = this.renderCategories.bind(this);
	}

	async renderCategories() {
		// call for todays climbs for each user and see if they can contribute to stats
		// OK if null

		// const user = await firestore
		// 	.collection('climbs')
		// 	.where('email', '==', this.props.userEmail)
		// 	.get();

		// if (!user.empty) {
		// 	const snapshot = user.docs[0];
		// 	const { friends } = snapshot.data();
		// 	await this.setState({
		// 		friends,
		// 	});
		// } else {
		// 	console.log('Could not find user');
		// }

		// Set object for state

		const challenge = {
			challenger: {
				Flashes: 4,
				Attempts: 30,
				Sends: 13,
				'S/A Ratio': 0.45,
				'Workout Time': 12645971,
			},
			invitee: {
				Flashes: 4,
				Attempts: 30,
				Sends: 13,
				'S/A Ratio': 0.45,
				'Workout Time': 12645971,
			},
		};
	}

	componentDidMount() {
		this.renderCategories();
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Current Challenge</Text>
				</View>
				<View style={styles.scoreAndCategoryContainer}>
					<View style={styles.scoreContainer}>
						<View style={styles.scoreLeft}>
							<Text style={styles.text}>USER ONE</Text>
							<Text style={styles.text}>150</Text>
						</View>
						<View style={styles.scoreVS}>
							<Text style={styles.text}>VS.</Text>
						</View>
						<View style={styles.scoreRight}>
							<Text style={styles.text}>USER TWO</Text>
							<Text style={styles.text}>550</Text>
						</View>
					</View>
					<View style={styles.categoriesContainer}>
						<FlatList
							style={styles.categoriesList}
							data={this.state.categories}
							keyExtractor={(item) => item}
							renderItem={({ item }) => (
								<View style={styles.categoryRow}>
									<View style={styles.categoryLeft}>
										<Text style={styles.listText}>
											Left
										</Text>
									</View>
									<View style={styles.categoryMiddle}>
										<Text style={styles.textMiddle}>
											{item}
										</Text>
									</View>
									<View style={styles.categoryRight}>
										<Text style={styles.listText}>
											Right
										</Text>
									</View>
								</View>
							)}
						/>
					</View>
				</View>

				<View style={styles.cancelButtonContainer}>
					<RemoveButton
						color={colors.buttonPrimaryBg}
						title='Cancel'
						onPress={() => {
							this.props.cancelChallenge();
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
	titleContainer: {
		flex: 1,
	},
	categoriesContainer: {
		flex: 5,
	},
	cancelButtonContainer: {
		flex: 1,
	},
	scoreAndCategoryContainer: {
		flex: 5,
		borderColor: colors.textColors.paragraphText,
		borderWidth: 2,
		borderRadius: 3,
		backgroundColor: colors.backgroundColors.generalBackgroundGreyLighter,
		marginHorizontal: 10,
	},
	scoreContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: colors.backgroundColors.generalBackgroundGrey,
	},
	scoreLeft: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	scoreVS: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	scoreRight: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: colors.textColors.paragraphText,
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
		color: colors.textColors.paragraphText,
	},
	profileRow: {
		flexDirection: 'row',
	},
	title: {
		padding: 20,
		fontSize: 30,
		color: colors.textColors.paragraphText,
	},
	categoriesList: {
		flex: 1,
	},
	categoryRow: {
		flex: 1,
		flexDirection: 'row',
		paddingVertical: 15,
		backgroundColor: colors.backgroundColors.generalBackgroundGreyLighter,
	},
	categoryLeft: {
		height: 60,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	categoryMiddle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRightWidth: 1,
		borderColor: 'white',
		borderLeftWidth: 1,
	},
	textMiddle: {
		color: 'white',
		fontSize: 25,
	},
	categoryRight: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	listText: {
		fontSize: 30,
	},
});
