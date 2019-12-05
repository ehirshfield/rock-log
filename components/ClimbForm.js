import React from 'react';
import { View, StyleSheet } from 'react-native';

import ClimbButton from './ClimbButton';

export default function ClimbForm({}) {
	return (
		<View style={styles.formContainer}>
			<ClimbButton color='blue' title='CLIMB BUTTON!' />
		</View>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		backgroundColor: 'white',
		borderColor: '#d6d7da',
		borderWidth: 2,
		borderRadius: 10,
		padding: 15,
		margin: 15,
		marginBottom: 0
	}
});
