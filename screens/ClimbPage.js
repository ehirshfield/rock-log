import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	SafeAreaView,
	TouchableOpacity
} from 'react-native';
import { colors } from '../theme/index';

import ClimbList from '../components/ClimbList';

export default function ClimbPage({ navigation }) {
	return (
		<View style={styles.main}>
			<View style={styles.container}>
				<SafeAreaView style={styles.climbList}>
					<ScrollView>
						<ClimbList />
					</ScrollView>
				</SafeAreaView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	container: {
		flex: 1
	},
	main: {
		flex: 1,
		backgroundColor: colors.background
	},
	scrollContainer: {
		flexGrow: 1
	},
	climbList: {
		flex: 1
	}
});
