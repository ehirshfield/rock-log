import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	KeyboardAvoidingView
} from 'react-native';
import { firebase } from '../config/firebase';
import { colors } from '../theme/index';
import TextInput from '../components/TextInput';

export default class LoginPage extends React.Component {
	state = { email: '', password: '', errorMessage: null };

	handleLogin = () => {
		const { email, password } = this.state;
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => this.props.navigation.navigate('MainApp'))
			.catch(error => this.setState({ errorMessage: error.message }));
	};

	render() {
		return (
			<View style={styles.container}>
				{this.state.errorMessage && (
					<Text style={{ color: 'red' }}>
						{this.state.errorMessage}
					</Text>
				)}
				<View style={styles.logoContainer}>
					<Text style={styles.header}>Rock Log</Text>
				</View>

				<KeyboardAvoidingView
					behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
					style={styles.inputContainer}
				>
					<TextInput
						placeholder='Email'
						onChangeText={email => this.setState({ email })}
						value={this.state.email}
						title='Email'
						icon='email-outline'
					/>
					<TextInput
						placeholder='Password'
						onChangeText={password => this.setState({ password })}
						value={this.state.password}
						title='Password'
						icon='lock-outline'
						secureTextEntry
					/>
				</KeyboardAvoidingView>

				<View style={styles.buttonContainer}>
					<Button title='Login' onPress={this.handleLogin} />
					<Button
						title="Don't have an account? Sign Up"
						onPress={() =>
							this.props.navigation.navigate('SignUpPage')
						}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.backgroundColors.generalBackground
	},
	header: {
		color: colors.textColors.generalText,
		fontSize: 100
	},
	textInput: {
		height: 50,
		width: '90%',
		borderColor: 'gray',
		borderWidth: 1,
		marginTop: 8,
		backgroundColor: colors.backgroundColors.inputBackground
	},
	logoContainer: {
		flex: 4,
		justifyContent: 'center',
		alignItems: 'center'
	},
	inputContainer: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonContainer: {
		flex: 2
	}
});
