import { StyleSheet, Text, FlatList, View, SafeAreaView } from 'react-native';
import React from 'react';
import { colors } from '../theme';

export default function FriendsList({ friends }) {
	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={friends}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<Text style={styles.item}>{item.name}</Text>
				)}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 22
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
		color: colors.paragraphText
	}
});
