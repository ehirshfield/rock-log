import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { colors } from '../../theme';

import GenericButton from '../common/GenericButton';

export default class PreviousClimb extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View style={styles.previousClimbContainer}>
				<View style={styles.headerContainer}>
					<Text style={styles.previousClimbTitle}>
						Previous Climb
					</Text>
				</View>
				<View style={styles.titleContainer}>
					<View>
						<Text style={styles.titleText}>Rating</Text>
					</View>
					<View>
						<Text style={styles.titleText}>Send / Attempt</Text>
					</View>
					<View>
						<Text style={styles.titleText}>Time</Text>
					</View>
				</View>
				<View style={styles.climbsContainer}>
					<FlatList
						data={this.props.climbs}
						keyExtractor={(item, index) => 'key' + index}
						renderItem={({ item }) => (
							<View style={styles.rowContainer}>
								<View style={styles.difficulty}>
									<Text style={styles.rowText}>
										{item.difficulty}
									</Text>
								</View>
								<View style={styles.ratio}>
									<Text style={styles.rowText}>
										{item.success ? 1 : 0} / {item.attempts}
									</Text>
								</View>
								<View style={styles.time}>
									<Text style={styles.rowText}>
										{item.time}
									</Text>
								</View>
							</View>
						)}
					/>
				</View>
				<View style={styles.buttonsContainer}>
					<GenericButton
						title='Cancel'
						color='red'
						onPress={() => {
							this.props.hideSingleClimbView();
						}}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	previousClimbContainer: {
		flex: 1,
	},
	previousClimbTitle: {
		color: colors.textColors.generalText,
		fontSize: 30,
		paddingTop: 50,
	},
	headerContainer: {
		flex: 1,
	},
	titleContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		borderWidth: 1,
		borderColor: colors.textColors.paragraphText,
		padding: 5,
	},
	titleText: {
		color: colors.textColors.paragraphText,
		fontSize: 30,
	},
	buttonsContainer: {
		flex: 1,
	},
	climbsContainer: {
		flex: 3,
	},
	rowContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		borderWidth: 1,
		borderColor: colors.textColors.paragraphText,
		padding: 5,
	},
	rowText: {
		color: colors.textColors.paragraphText,
		fontSize: 20,
	},
	difficulty: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	ratio: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	time: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
