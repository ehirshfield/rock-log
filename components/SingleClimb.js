import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ClimbTimer from './ClimbTimer';
import ClimbButton from './ClimbButton';
import { colors } from '../theme';
import { Button, Icon } from 'react-native-elements';

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
				<View style={styles.top}>
					<Text style={styles.currentClimbTitle}>
						Currently climbing {this.props.singleClimbRating}
					</Text>
					<Text style={styles.currentClimbTitle}>
						Attempts: {this.state.attempts}
					</Text>
					<ClimbTimer time={this.state.runningTime} />
				</View>

				<View style={styles.buttonContainer}>
					<View style={styles.middle}>
						<View>
							{!status ? (
								<Button
									icon={
										<Icon
											name='play'
											type='material-community'
											size={60}
											color={colors.iconColors.resumeIcon}
										/>
									}
									onPress={() => {
										this.handleClick();
										this.props.handleClimbTime();
									}}
									title='Resume'
									type='clear'
									containerStyle={{ height: 100, width: 100 }}
									titleStyle={{
										position: 'absolute',
										bottom: -15,
										color: colors.iconColors.resumeIcon,
									}}
								/>
							) : (
								<Button
									icon={
										<Icon
											name='pause'
											type='material'
											size={60}
											color={colors.iconColors.pauseIcon}
										/>
									}
									onPress={() => {
										this.handleClick();
										this.props.handleClimbTime();
									}}
									title='Pause'
									type='clear'
									containerStyle={{ height: 100, width: 100 }}
									titleStyle={{
										position: 'absolute',
										bottom: -15,
										color: colors.iconColors.pauseIcon,
									}}
								/>
							)}
						</View>

						<View>
							<Button
								icon={
									<Icon
										name='check-outline'
										type='material-community'
										size={60}
										color={colors.iconColors.sendIcon}
									/>
								}
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
								title='Send Route'
								containerStyle={{ height: 100, width: 100 }}
								titleStyle={{
									position: 'absolute',
									bottom: -15,
									color: colors.iconColors.sendIcon,
								}}
								type='clear'
							/>
						</View>
					</View>

					<View style={styles.bottom}>
						<View>
							<Button
								icon={
									<Icon
										name='redo'
										type='material-community'
										size={60}
										color={colors.iconColors.logAttemptIcon}
									/>
								}
								onPress={() => {
									this.handleAttempt();
								}}
								title='Log Attempt'
								type='clear'
								containerStyle={{ height: 100, width: 100 }}
								titleStyle={{
									position: 'absolute',
									bottom: -15,
									color: colors.iconColors.logAttemptIcon,
								}}
							/>
						</View>

						<View>
							<Button
								icon={
									<Icon
										name='exit-run'
										type='material-community'
										size={60}
										color={colors.iconColors.giveUpIcon}
									/>
								}
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
								title='Give Up'
								type='clear'
								containerStyle={{ height: 100, width: 100 }}
								titleStyle={{
									position: 'absolute',
									bottom: -15,
									color: colors.iconColors.giveUpIcon,
								}}
							/>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	singleClimbContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignContent: 'space-between',
	},
	top: {
		flex: 1,
		height: 300,
	},
	buttonContainer: {
		flex: 2,
		height: 300,
		borderRadius: 10,
		backgroundColor: colors.backgroundColors.generalBackgroundGrey,
		alignContent: 'center',
	},
	middle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: 200,
	},
	bottom: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: 200,
	},
	currentClimbTitle: {
		color: colors.textColors.generalText,
		fontSize: 30,
	},
});
