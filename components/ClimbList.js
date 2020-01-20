import React from 'react';
import { View } from 'react-native';

import ClimbForm from './ClimbForm';
import StartingClimbToggle from './StartingClimbToggle';

export default class ClimbList extends React.Component {
	state = {
		finishedClimbs: [
			{
				date: '10/09/19',
				total: 20,
				highestDiff: 'V5',
				time: 13209478275
			},
			{
				date: '12/12/19',
				total: 10,
				highestDiff: 'V7',
				time: 213243422
			}
		]
	};
	render() {
		return (
			<View>
				<StartingClimbToggle />
				{this.state.finishedClimbs.map((climb, index) => {
					return (
						<ClimbForm
							key={index}
							date={climb.date}
							total={climb.total}
							highestDiff={climb.highestDiff}
							time={climb.time}
						/>
					);
				})}
			</View>
		);
	}
}
