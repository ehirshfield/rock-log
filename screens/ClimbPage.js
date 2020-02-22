import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';

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
		flex: 1
	},
	scrollContainer: {
		flexGrow: 1
	},
	pageView: {
		flex: 1
	}
});
