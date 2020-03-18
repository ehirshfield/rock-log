import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import firebase from '../config/firebase';
import { firestore } from '../config/firebase';

export default class SignUpPage extends React.Component {
	state = { email: '', password: '', errorMessage: null };

	handleSignUp = () => {
		const { email, password } = this.state;
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				firestore.collection('users').add({
					email
				});
				this.props.navigation.navigate('MainApp');
			})
			.catch(error => this.setState({ errorMessage: error.message }));
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>Sign Up</Text>
				{this.state.errorMessage && (
					<Text style={{ color: 'red' }}>
						{this.state.errorMessage}
					</Text>
				)}
				<TextInput
					placeholder='Email'
					autoCapitalize='none'
					style={styles.textInput}
					onChangeText={email => this.setState({ email })}
					value={this.state.email}
				/>
				<TextInput
					secureTextEntry
					placeholder='Password'
					autoCapitalize='none'
					style={styles.textInput}
					onChangeText={password => this.setState({ password })}
					value={this.state.password}
				/>
				<Button title='Sign Up' onPress={this.handleSignUp} />
				<Button
					title='Already have an account? Login'
					onPress={() => this.props.navigation.navigate('LoginPage')}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textInput: {
		height: 40,
		width: '90%',
		borderColor: 'gray',
		borderWidth: 1,
		marginTop: 8
	}
});
