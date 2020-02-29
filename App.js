import './utils/base64Polyfill';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ClimbPage from './screens/ClimbPage';
import ProfilePage from './screens/ProfilePage';

const Stack = createStackNavigator();

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name='ClimbPage' component={ClimbPage} />
					</Stack.Navigator>
				</NavigationContainer>
			</View>
		);
	}
}

const platformVersion =
	Platform.OS === 'ios' ? parseInt(Platform.Version, 10) : Platform.Version;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	climbPage: {
		flex: 1,
		marginTop:
			Platform.OS === 'android' || platformVersion < 11
				? Constants.statusBarHeight
				: 0
	}
});

{
	/* <SafeAreaProvider>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name='ClimbPage'
							component={ClimbPage}
							options={{ title: 'Climb Page' }}
						/>
						<Stack.Screen
							name='ProfilePage'
							component={ProfilePage}
							options={{ title: 'Profile Page' }}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaProvider> */
}
