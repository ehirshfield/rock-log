import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import ClimbList from './ClimbList';

export default function ClimbPage({}) {
	return (
		<View>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Climb Page</Text>
			</View>
			<ScrollView>
				<ClimbList />
			</ScrollView>
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
	}
});
