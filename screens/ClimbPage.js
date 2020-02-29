import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	SafeAreaView,
	Platform
} from 'react-native';
import Constants from 'expo-constants';

import ClimbList from '../components/ClimbList';

export default function ClimbPage({}) {
	return (
		<View style={styles.main}>
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Climb Page</Text>
				</View>
				<SafeAreaView style={styles.pageView}>
					<ScrollView>
						<ClimbList />
					</ScrollView>
				</SafeAreaView>
			</View>
		</View>
	);
}

const platformVersion =
	Platform.OS === 'ios' ? parseInt(Platform.Version, 10) : Platform.Version;

const styles = StyleSheet.create({
	titleContainer: {
		paddingTop: 50,
		paddingBottom: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#D6D7DA',
		backgroundColor: 'skyblue'
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	container: {
		flex: 1
	},
	main: {
		flex: 1,
		marginTop:
			Platform.OS === 'android' || platformVersion < 11
				? Constants.statusBarHeight
				: 0
	},
	scrollContainer: {
		flexGrow: 1
	},
	pageView: {
		flex: 1
	}
});
