import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { firebase } from '../config/firebase';
import { colors } from '../theme';

export default class StartUpPage extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			this.props.navigation.navigate(user ? 'MainApp' : 'LoginPage');
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Loading</Text>
				<ActivityIndicator size='large' />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.backgroundColors.generalBackground,
	},
});
