import React from 'react';
import { View, StyleSheet } from 'react-native';

import ClimbButton from './ClimbButton';
import CurrentClimb from './CurrentClimb';

export default function StartingClimbToggle({ isOpen }) {
	return (
		<View style={styles.formContainer}>
			{isOpen ? <CurrentClimb /> : <ClimbButton color='red' title='+' />}
		</View>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 10,
		margin: 5,
		marginBottom: 0
	}
});
