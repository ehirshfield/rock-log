import React from 'react';
import { View, StyleSheet } from 'react-native';

import ClimbButton from './ClimbButton';
import CurrentClimb from './CurrentClimb';

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
					<CurrentClimb onFormClose={this.handleFormClose} />
				) : (
					<ClimbButton
						color='red'
						title='+'
						onPress={this.handleCurrentClimbOpen}
					/>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	formContainer: {
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 10,
		margin: 5,
		marginBottom: 0
	}
});
