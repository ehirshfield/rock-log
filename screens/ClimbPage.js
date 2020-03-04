import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	SafeAreaView,
	TouchableOpacity
} from 'react-native';

import ClimbList from '../components/ClimbList';

export default function ClimbPage({ navigation }) {
	return (
		<View style={styles.main}>
			<View style={styles.container}>
				<SafeAreaView style={styles.pageView}>
					<ScrollView>
						<ClimbList />
					</ScrollView>
				</SafeAreaView>
			</View>
			<View>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('ProfilePage');
					}}
				>
					<Text>To Profile</Text>
				</TouchableOpacity>
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
		flex: 1
	},
	scrollContainer: {
		flexGrow: 1
	},
	pageView: {
		flex: 1
	}
});
