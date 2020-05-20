import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	KeyboardAvoidingView,
	SafeAreaView,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { firestore, firebase } from '../config/firebase';
import { colors } from '../theme';
import TextInput from '../components/TextInput';

export default class SignUpPage extends React.Component {
	state = { email: '', password: '', errorMessage: null, name: '' };

	handleSignUp = () => {
		const { email, password, name } = this.state;
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				firestore.collection('users').add({
					email,
					name,
					friends: [],
					pendingFriends: [],
				});
				this.props.navigation.navigate('MainApp');
			})
			.catch((error) => this.setState({ errorMessage: error.message }));
	};

	render() {
		return (
			<KeyboardAvoidingView
				behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
				style={styles.container}
			>
				<SafeAreaView style={styles.container}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={styles.inner}>
							{this.state.errorMessage && (
								<Text style={{ color: 'red' }}>
									{this.state.errorMessage}
								</Text>
							)}
							<View style={styles.logoContainer}>
								<Text style={styles.header}>Rock Log</Text>
							</View>
							<View style={styles.inputContainer}>
								<TextInput
									placeholder='Name'
									autoCapitalize='none'
									onChangeText={(name) =>
										this.setState({ name })
									}
									value={this.state.name}
									icon='cow'
								/>
								<TextInput
									placeholder='Email'
									autoCapitalize='none'
									onChangeText={(email) =>
										this.setState({ email })
									}
									value={this.state.email}
									icon='email-outline'
								/>
								<TextInput
									secureTextEntry
									placeholder='Password'
									autoCapitalize='none'
									onChangeText={(password) =>
										this.setState({ password })
									}
									value={this.state.password}
									icon='lock-outline'
								/>
							</View>
							<View style={styles.buttonContainer}>
								<Button
									title='Sign Up'
									onPress={this.handleSignUp}
								/>
								<Button
									title='Already have an account? Login'
									onPress={() =>
										this.props.navigation.navigate(
											'LoginPage'
										)
									}
								/>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</SafeAreaView>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.backgroundColors.generalBackground,
	},
	inner: {
		padding: 24,
		flex: 1,
		justifyContent: 'flex-end',
	},
	inputContainer: {
		flex: 3,
	},
	buttonContainer: {
		flex: 2,
	},
	singleInputContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	logoContainer: {
		flex: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		color: colors.textColors.generalText,
		fontSize: 90,
	},
});
