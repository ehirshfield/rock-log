import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';

export default function RatingButton({ color, title, onPress, largeRating }) {
	return (
		<TouchableOpacity
			style={[styles.button, { borderColor: color }]}
			onPress={onPress}
		>
			<Text
				style={[
					largeRating ? styles.largeRatingText : styles.buttonText,
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
		marginTop: 10,
		width: 135,
		borderRadius: 5,
		alignItems: 'center',
		backgroundColor: '#2AC099',
		shadowColor: '#2AC099',
		shadowOpacity: 0.4,
		shadowOffset: { height: 10, width: 0 },
		shadowRadius: 20
	},
	buttonText: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 80
	},
	largeRatingText: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 70
	}
});
