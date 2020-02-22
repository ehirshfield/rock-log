import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import Constants from 'expo-constants';

import ClimbPage from './screens/ClimbPage';

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<ClimbPage style={styles.climbPage} />
			</View>
		);
	}
}

const platformVersion =
	Platform.OS === 'ios' ? parseInt(Platform.Version, 10) : Platform.Version;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	climbPage: {
		flex: 1,
		marginTop:
			Platform.OS === 'android' || platformVersion < 11
				? Constants.statusBarHeight
				: 0
	}
});
