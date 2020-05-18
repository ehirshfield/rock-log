import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ClimbTimer from './ClimbTimer';
import ClimbButton from './ClimbButton';
import { colors } from '../theme';

export default class SingleClimb extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			runningTime: 0,
			status: false,
			attempts: 0,
		};
	}

	handleClick = () => {
		this.setState((state) => {
			if (state.status) {
				clearInterval(this.timer);
			} else {
				const startTime = Date.now() - this.state.runningTime;
				this.timer = setInterval(() => {
					this.setState({ runningTime: Date.now() - startTime });
				});
			}
			return { status: !state.status };
		});
	};

	handleReset = () => {
		clearInterval(this.timer);
		this.setState({ runningTime: 0, status: false });
	};

	handleAttempt = () => {
		this.setState({
			attempts: this.state.attempts + 1,
		});
	};

	componentDidMount() {
		this.handleClick();
	}

	componentWillUnmount() {
		clearInterval(this.timer);
		this.setState({
			attempts: 0,
		});
	}

	render() {
		const { status } = this.state;
		return (
			<View style={styles.singleClimbContainer}>
				<Text style={styles.currentClimbTitle}>
					Currently climbing {this.props.singleClimbRating}
				</Text>
				<Text style={styles.currentClimbTitle}>
					Attempts: {this.state.attempts}
				</Text>
				<ClimbTimer time={this.state.runningTime} />

				<View>
					{!status ? (
						<ClimbButton
							title='Resume Climbing'
							onPress={() => {
								this.handleClick();
								this.props.handleClimbTime();
							}}
							color='green'
						/>
					) : (
						<ClimbButton
							title='Pause Climbing'
							onPress={() => {
								this.handleClick();
								this.props.handleClimbTime();
							}}
							color='blue'
						/>
					)}
				</View>
				<View>
					<ClimbButton
						title='Send Route'
						onPress={() => {
							clearInterval(this.timer);
							this.props.logRating(
								this.props.singleClimbRating,
								this.state.runningTime,
								this.state.attempts + 1,
								true
							);
							this.setState({
								attempts: 0,
							});
							this.props.exitSingleClimb();
						}}
						color='purple'
					/>
				</View>
				<View>
					<ClimbButton
						title='Log Attempt'
						onPress={() => {
							this.handleAttempt();
						}}
						color='yellow'
					/>
				</View>
				<View>
					<ClimbButton
						title='Give Up'
						onPress={() => {
							clearInterval(this.timer);
							this.props.logRating(
								this.props.singleClimbRating,
								this.state.runningTime,
								this.state.attempts,
								false
							);
							this.setState({
								attempts: 0,
							});
							this.props.exitSingleClimb();
						}}
						color='red'
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	singleClimbContainer: {
		flex: 1,
	},
	currentClimbTitle: {
		color: colors.textColors.generalText,
		fontSize: 30,
	},
});
