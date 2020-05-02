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
		backgroundColor: colors.textColors.generalText
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
