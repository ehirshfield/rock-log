import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';

export default function RatingButton({ color, title, onPress }) {
	return (
		<TouchableOpacity
			style={[styles.button, { borderColor: color }]}
			onPress={onPress}
		>
			<Text style={[styles.buttonText, { color }]}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		marginTop: 10,
		minWidth: 100,
		height: 100,
		width: 175,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2AC062',
		shadowColor: '#2AC062',
		shadowOpacity: 0.4,
		shadowOffset: { height: 10, width: 0 },
		shadowRadius: 20,
		flex: 1
	},
	buttonText: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 80,
		padding: 5
	}
});
