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
import { firebase } from '../config/firebase';
import { colors } from '../theme/index';
import TextInput from '../components/TextInput';

export default class LoginPage extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errorMessage: null,
		};
	}

	handleLogin = () => {
		const { email, password } = this.state;
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => this.props.navigation.navigate('MainApp'))
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
									placeholder='Email'
									onChangeText={(email) =>
										this.setState({ email })
									}
									value={this.state.email}
									title='Email'
									icon='email-outline'
								/>
								<TextInput
									placeholder='Password'
									onChangeText={(password) =>
										this.setState({ password })
									}
									value={this.state.password}
									title='Password'
									icon='lock-outline'
									secureTextEntry
								/>
							</View>
							<View style={styles.buttonContainer}>
								<Button
									title='Login'
									onPress={() => {
										this.handleLogin();
									}}
								/>
								<Button
									title="Don't have an account? Sign Up"
									onPress={() =>
										this.props.navigation.navigate(
											'SignUpPage'
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
	header: {
		color: colors.textColors.generalText,
		fontSize: 90,
	},
	logoContainer: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputContainer: {
		flex: 3,
	},
	buttonContainer: {
		flex: 2,
	},
});
