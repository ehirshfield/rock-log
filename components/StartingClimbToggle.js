import React from 'react';
import { View, StyleSheet } from 'react-native';

import CurrentClimb from './CurrentClimb';
import StartingClimbButton from './StartingClimbButton';
import { colors } from '../theme';

export default class StartingClimbToggle extends React.Component {
	state = {
		isOpen: false
	};

	handleCurrentClimbOpen = () => {
		this.setState({
			isOpen: true
		});
	};

	handleFormClose = () => {
		this.setState({ isOpen: false });
	};

	render() {
		const { isOpen } = this.state;
		return (
			<View style={styles.formContainer}>
				{isOpen ? (
					<CurrentClimb onFormClose={() => this.handleFormClose()} />
				) : (
					<StartingClimbButton
						color={colors.startingClimbButton}
						title='Start Climbing Session'
						onPress={() => {
							this.handleCurrentClimbOpen();
						}}
					/>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	formContainer: {
		backgroundColor: colors.background,
		borderColor: colors.background,
		borderWidth: 2,
		borderRadius: 10,
		marginRight: 15,
		marginLeft: 15,
		marginTop: 10
	}
});
