import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
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
					pendingFriends: []
				});
				this.props.navigation.navigate('MainApp');
			})
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
				<TextInput
					placeholder='Name'
					autoCapitalize='none'
					style={styles.textInput}
					onChangeText={name => this.setState({ name })}
					value={this.state.name}
					icon='cow'
				/>
				<TextInput
					placeholder='Email'
					autoCapitalize='none'
					style={styles.textInput}
					onChangeText={email => this.setState({ email })}
					value={this.state.email}
					icon='email-outline'
				/>
				<TextInput
					secureTextEntry
					placeholder='Password'
					autoCapitalize='none'
					style={styles.textInput}
					onChangeText={password => this.setState({ password })}
					value={this.state.password}
					icon='lock-outline'
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
		alignItems: 'center',
		backgroundColor: colors.backgroundColors.generalBackground
	},
	textInput: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginTop: 8
	}
});
