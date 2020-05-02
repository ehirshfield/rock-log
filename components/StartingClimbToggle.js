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
					<CurrentClimb
						onFormClose={() => this.handleFormClose()}
						toggleClimbList={this.props.toggleClimbList}
					/>
				) : (
					<StartingClimbButton
						color={colors.startingClimbButton}
						title='Start Climbing Session'
						onPress={() => {
							this.handleCurrentClimbOpen();
							this.props.toggleClimbList(true);
						}}
					/>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	formContainer: {
		backgroundColor: colors.backgroundColors.generalBackground,
		borderColor: colors.backgroundColors.generalBackground,
		borderWidth: 2,
		borderRadius: 10,
		marginRight: 15,
		marginLeft: 15,
		marginTop: 10
	}
});
