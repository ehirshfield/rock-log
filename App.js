import './utils/base64Polyfill';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Foundation } from '@expo/vector-icons';

import ClimbPage from './screens/ClimbPage';
import ProfilePage from './screens/ProfilePage';
import FriendsPage from './screens/FriendsPage';
import ChallengePage from './screens/ChallengePage';
import StartUpPage from './screens/StartUpPage';
import LoginPage from './screens/LoginPage';
import SignUpPage from './screens/SignUpPage';

import { colors } from './theme/index';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<NavigationContainer>
					<Stack.Navigator
						initialRouteName='StartUpPage'
						screenOptions={{
							headerStyle: {
								backgroundColor:
									colors.backgroundColors.generalBackground,
							},
							headerTintColor: colors.headingText,
							headerTitleStyle: {
								fontWeight: 'bold',
							},
							headerShown: false,
						}}
					>
						<Stack.Screen
							name='StartUpPage'
							component={StartUpPage}
						/>
						<Stack.Screen name='LoginPage' component={LoginPage} />
						<Stack.Screen
							name='SignUpPage'
							component={SignUpPage}
						/>
						<Stack.Screen name='MainApp' component={MainApp} />
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
		flex: 1,
		marginTop:
			Platform.OS === 'android' || platformVersion < 11
				? Constants.statusBarHeight
				: 0,
	},
});

function MainApp() {
	return (
		<Tab.Navigator
			initialRouteName='ClimbPage'
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === 'ProfilePage') {
						iconName = 'foot';
					} else if (route.name === 'ClimbPage') {
						iconName = 'mountains';
					} else if (route.name === 'FriendsPage') {
						iconName = 'arrows-in';
					} else if (route.name === 'ChallengePage') {
						iconName = 'target';
					}

					return (
						<Foundation
							name={iconName}
							size={size}
							color={color}
							style={{
								top: 5,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						/>
					);
				},
			})}
			tabBarOptions={{
				activeTintColor: colors.startingClimbButton,
				inactiveTintColor: 'gray',
				style: {
					backgroundColor: colors.backgroundColors.generalBackground,
					borderTopColor: 'transparent',
				},
			}}
		>
			<Tab.Screen
				name='ClimbPage'
				component={ClimbPage}
				options={{ title: 'Climbs' }}
			/>
			<Tab.Screen
				name='ChallengePage'
				component={ChallengePage}
				options={{ title: 'Challenge' }}
			/>
			<Tab.Screen
				name='FriendsPage'
				component={FriendsPage}
				options={{ title: 'Friends' }}
			/>
			<Tab.Screen
				name='ProfilePage'
				component={ProfilePage}
				options={{ title: 'Profile' }}
			/>
		</Tab.Navigator>
	);
}
