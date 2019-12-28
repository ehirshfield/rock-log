import React from 'react';
import { View } from 'react-native';

import ClimbForm from './ClimbForm';
import StartingClimbToggle from './StartingClimbToggle';

export default function ClimbList({}) {
	return (
		<View>
			<StartingClimbToggle isOpen />
			<ClimbForm
				date='10/09/19'
				total={20}
				highestDiff='V5'
				time='1h14m50s'
			/>
			<ClimbForm
				date='12/12/19'
				total={10}
				highestDiff='V6'
				time='2h01m18s'
			/>
		</View>
	);
}
