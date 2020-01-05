import React from 'react';
import { View, StyleSheet } from 'react-native';
import RatingButton from './RatingButton';
import ClimbButton from './ClimbButton';

export default class CurrentClimb extends React.Component {
	state = {
		elapsedTime: 0
	};

	generateRatings(maxRating) {
		const ratings = [];
		for (let i = 0; i < parseInt(maxRating) + 1; i++) {
			ratings.push('V' + i);
		}
		return ratings.map((item, index) => {
			if (item.length > 2) {
				return <RatingButton key={index} title={item} largeRating />;
			} else {
				return <RatingButton key={index} title={item} />;
			}
		});
	}

	render() {
		const climbRatings = this.generateRatings(12);
		return (
			<View style={styles.currentClimbContainer}>
				<View style={styles.ratingContainer}>{climbRatings}</View>
				<View style={styles.endSessionButtonContainer}>
					<ClimbButton
						title='Finished Climbing'
						onPress={this.props.onFormClose}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	currentClimbContainer: {
		flexDirection: 'column',
		borderColor: '#d6d7da',
		borderWidth: 2,
		borderRadius: 10
	},
	ratingContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		alignContent: 'flex-start'
	},
	endSessionButtonContainer: {
		padding: 10,
		margin: 10
	}
});
