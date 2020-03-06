import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { colors } from '../theme';

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
		backgroundColor: colors.ratingButtons,
		shadowColor: colors.ratingButtons,
		shadowOpacity: 0.3,
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
