import React from 'react';
import { StyleSheet, View } from 'react-native';

import ClimbPage from './components/ClimbPage';

export default function App() {
	return (
		<View style={styles.container}>
			<ClimbPage />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
