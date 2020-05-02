import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';

import { colors } from '../theme/index';

export default function StartingClimbButton({ color, title, small, onPress }) {
	return (
		<TouchableOpacity
			style={[styles.button, { borderColor: color }]}
			onPress={onPress}
		>
			<Text
				style={[
					styles.buttonText,
					small ? styles.small : styles.large,
					{ color }
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		minWidth: 100,
		borderWidth: 2,
		borderRadius: 10,
		backgroundColor: colors.backgroundColors.generalBackground
	},
	buttonText: {
		textAlign: 'center',
		fontWeight: 'bold'
	},
	small: {
		fontSize: 14,
		padding: 5
	},
	large: {
		fontSize: 16,
		padding: 10
	}
});
