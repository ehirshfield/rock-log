import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { firestore } from '../config/firebase';
import firebase from '../config/firebase';
import { colors } from '../theme';
import ClimbButton from '../components/ClimbButton';

export default class ProfilePage extends React.Component {
	constructor() {
		super();
		this.userEmail = firebase.auth().currentUser.email || null;
		this.state = {
			user: {},
			isLoading: true,
			errorMessage: null
		};
	}

	handleSignOut() {
		firebase
			.auth()
			.signOut()
			.then(() => {
				console.log('signout successful!');
				this.props.navigation.navigate('LoginPage');
			})
			.catch(error => {
				this.setState({ errorMessage: error.message });
				console.log('error :', error);
			});
	}

	componentDidMount() {
		firestore
			.collection('users')
			.where('email', '==', this.userEmail)
			.get()
			.then(snap => {
				snap.forEach(doc => {
					this.setState({
						user: doc.data(),
						isLoading: false
					});
				});
			})
			.catch(error => {
				this.setState({
					errorMessage: error.message
				});
				console.log('error :', error);
			});
	}

	render() {
		const { firstName, email, nickname } = this.state.user;
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
				{/* <Image
					source={require('../assets/profile.jpg')}
					style={{
						flex: 1,
						alignSelf: 'stretch',
						width: undefined,
						height: undefined
					}}
					resizeMode='contain'
				/> */}
				<Text>Profile Page!</Text>
				<Text>{firstName ? firstName : nickname}</Text>
				<Text>{email}</Text>
				<ClimbButton
					color={colors.signoutButton}
					title='Sign Out'
					onPress={this.handleSignOut}
				/>
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
		justifyContent: 'center'
	},
	container: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.background
	}
});
