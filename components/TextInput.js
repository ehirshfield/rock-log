import { StyleSheet, TextInput, Text, View, Icon } from 'react-native';
import React from 'react';
import { colors } from '../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TextInputs({
	placeholder,
	onChangeText,
	value,
	secureTextEntry,
	icon,
}) {
	return (
		<View style={styles.container}>
			<View style={styles.inputSection}>
				<MaterialCommunityIcons
					style={styles.inputIcon}
					name={icon}
					size={20}
					color={colors.textColors.generalText}
				/>
				<TextInput
					style={styles.textInput}
					autoCapitalize='none'
					placeholder={placeholder}
					placeholderTextColor={colors.textColors.generalText}
					onChangeText={onChangeText}
					value={value}
					secureTextEntry={secureTextEntry ? true : false}
					underlineColorAndroid='transparent'
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	inputSection: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: colors.backgroundColors.inputBackground,
		borderBottomWidth: 1,
		marginBottom: 60,
		marginHorizontal: 5,
		minHeight: 40,
	},
	inputIcon: {
		padding: 10,
	},
	textInput: {
		flex: 1,
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 0,
		borderWidth: 0,
		color: colors.textColors.generalText,
	},
});
