import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class SingleClimb extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<TouchableOpacity
				style={[styles.button, { borderColor: 'red' }]}
				onPress='hello'
			>
				<Text style={styles.buttonText}>Log Climb</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		marginTop: 10,
		width: 135,
		borderRadius: 5,
		alignItems: 'center',
		backgroundColor: 'blue',
		shadowColor: 'blue',
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
