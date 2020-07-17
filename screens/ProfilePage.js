import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	FlatList,
} from 'react-native';
import { firestore, firebase } from '../config/firebase';
import { colors } from '../theme';
import { Tile, Button, ListItem } from 'react-native-elements';

export default class ProfilePage extends React.Component {
	constructor() {
		super();
		this.userEmail = firebase.auth().currentUser.email || null;
		this.state = {
			user: {},
			isLoading: true,
			errorMessage: null,
		};
		this.handleSignOut = this.handleSignOut.bind(this);
	}

	handleSignOut() {
		firebase
			.auth()
			.signOut()
			.then(() => {
				console.log('signout successful!');
				this.props.navigation.reset({
					index: 0,
					routes: [{ name: 'StartUpPage' }],
				});
			})
			.catch((error) => {
				this.setState({ errorMessage: error.message });
				console.log('error :', error);
			});
	}

	componentDidMount() {
		firestore
			.collection('users')
			.where('email', '==', this.userEmail)
			.get()
			.then((snap) => {
				snap.forEach((doc) => {
					this.setState({
						user: doc.data(),
						isLoading: false,
					});
				});
			})
			.catch((error) => {
				this.setState({
					errorMessage: error.message,
				});
				console.log('error :', error);
			});
	}

	render() {
		const { name, email, nickname } = this.state.user;
		const numFriends = this.state.user.friends
			? this.state.user.friends.length
			: 0;
		const stringFriends = numFriends.toString();
		const winRecord = this.state.user.wins
			? this.state.user.wins.toString() +
			  ' - ' +
			  this.state.user.loses.toString()
			: '0 - 0';
		const totalClimbs = this.state.user.totalClimbs
			? this.state.user.totalClimbs.toString()
			: '-';

		const statList = [
			{
				title: 'Workouts',
				icon: 'av-timer',
				rightTitle: totalClimbs,
			},
			{
				title: 'Record',
				icon: 'counter',
				rightTitle: winRecord,
			},
			{
				title: 'Friends',
				icon: 'account-multiple',
				rightTitle: stringFriends,
			},
		];

		if (this.state.isLoading) {
			return (
				<View style={styles.activity}>
					<ActivityIndicator size='large' color='#0000ff' />
				</View>
			);
		}
		return (
			<View style={styles.container}>
				{this.state.errorMessage && (
					<Text style={{ color: 'red' }}>
						{this.state.errorMessage}
					</Text>
				)}
				<View style={styles.tileContainer}>
					<Tile
						imageSrc={require('../assets/profile.png')}
						title={name ? name : nickname}
						contentContainerStyle={{ height: 90 }}
						titleStyle={{ color: colors.textColors.generalText }}
					>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}
						>
							<Text
								style={{
									color: colors.textColors.generalText,
								}}
							>
								{email}
							</Text>
						</View>
					</Tile>
				</View>

				<View style={styles.statsContainer}>
					<FlatList
						contentContainerStyle={{ flexGrow: 1 }}
						data={statList}
						keyExtractor={(item) => item.title}
						renderItem={({ item }) => (
							<ListItem
								containerStyle={styles.statItem}
								title={item.title}
								titleStyle={{
									color: colors.textColors.generalText,
								}}
								leftIcon={{
									name: item.icon,
									type: 'material-community',
									color: colors.textColors.generalText,
								}}
								bottomDivider
								rightTitle={item.rightTitle}
								rightTitleStyle={{
									color: colors.textColors.generalText,
								}}
							/>
						)}
					/>
				</View>

				<View style={styles.signOutContainer}>
					<Button
						title='Sign Out'
						onPress={() => {
							this.handleSignOut();
						}}
						buttonStyle={styles.signOutBtn}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	activity: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.backgroundColors.generalBackground,
	},
	container: {
		flex: 1,
		backgroundColor: colors.backgroundColors.generalBackground,
		flexDirection: 'column',
	},
	tileContainer: {
		flex: 2,
		paddingBottom: 20,
	},
	statsContainer: {
		flex: 2,
		borderWidth: 2,
		borderRadius: 10,
		padding: 15,
		marginHorizontal: 15,
		borderColor: colors.backgroundColors.theme_dark_blue,
		backgroundColor: colors.backgroundColors.theme_dark_blue,
	},
	statItem: {
		flex: 1,
		backgroundColor: colors.backgroundColors.theme_dark_blue,
	},
	signOutContainer: {
		flex: 1,
		flexDirection: 'column-reverse',
		justifyContent: 'center',
		marginHorizontal: 15,
	},
	signOutBtn: {
		height: 80,
		backgroundColor: colors.startingClimbButton,
		borderWidth: 2,
		borderRadius: 10,
		borderColor: colors.startingClimbButton,
	},
});
