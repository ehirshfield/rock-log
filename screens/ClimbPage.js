import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Text } from 'react-native';
import { colors } from '../theme/index';

import ClimbList from '../components/ClimbList';
import PreviousClimb from '../components/climb/PreviousClimb';

export default class ClimbPage extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
			climbListView: false,
			singleClimbView: false,
			singleClimbs: [],
		};
		this.showSingleClimbView = this.showSingleClimbView.bind(this);
		this.hideSingleClimbView = this.hideSingleClimbView.bind(this);
	}

	showSingleClimbView(climbs) {
		this.setState({
			singleClimbView: true,
			singleClimbs: climbs,
		});
	}

	hideSingleClimbView() {
		this.setState({
			singleClimbView: false,
		});
	}

	render() {
		return (
			<View style={styles.main}>
				<View style={styles.container}>
					{!this.state.singleClimbView && (
						<SafeAreaView style={styles.climbList}>
							<ScrollView>
								<ClimbList
									showSingleClimbView={
										this.showSingleClimbView
									}
								/>
							</ScrollView>
						</SafeAreaView>
					)}
					{this.state.singleClimbView && (
						<View style={styles.singleClimbContainer}>
							<PreviousClimb
								hideSingleClimbView={this.hideSingleClimbView}
								climbs={this.state.singleClimbs}
							/>
						</View>
					)}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	container: {
		flex: 1,
	},
	main: {
		flex: 1,
		backgroundColor: colors.backgroundColors.generalBackground,
	},
	scrollContainer: {
		flexGrow: 1,
	},
	climbList: {
		flex: 1,
	},
	singleClimbContainer: {
		flex: 1,
	},
});
