import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';

export default function GenericButton({ color, title, small, onPress }) {
	return (
		<TouchableOpacity
			style={[styles.button, { borderColor: color }]}
			onPress={onPress}
		>
			<Text
				style={[
					styles.buttonText,
					small ? styles.small : styles.large,
					{ color },
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		height: 40,
		minWidth: 100,
		borderWidth: 2,
		borderRadius: 3,
		justifyContent: 'center',
	},
	buttonText: {
		textAlign: 'center',
		fontWeight: 'bold',
	},
	small: {
		fontSize: 14,
		padding: 5,
	},
	large: {
		fontSize: 16,
		padding: 10,
	},
});
