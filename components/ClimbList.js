import React from 'react';
import { View } from 'react-native';

import ClimbForm from './ClimbForm';
import StartingClimbToggle from './StartingClimbToggle';

export default function ClimbList({}) {
	return (
		<View>
			<StartingClimbToggle />
			<ClimbForm />
			<ClimbForm />
		</View>
	);
}
