import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const FormInputWithLabel = ({
	title,
	label,
	keyboardType,
	value,
	onTextChange,
}) => {
	return (
		<View style={styles.imputContainer}>
			<Text style={styles.title}>
				{title ? title : label} {title ? 'Address' : null}
			</Text>
			<TextInput
				keyboardType={keyboardType}
				style={styles.input}
				value={value}
				onChangeText={onTextChange}
			/>
		</View>
	);
};

export default FormInputWithLabel;

const styles = StyleSheet.create({
	imputContainer: {
		width: '100%',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 16,
		marginHorizontal: 10,
		marginBottom: 8,
		textTransform: 'capitalize',
	},
	input: {
		backgroundColor: '#EFF0F6',
		marginBottom: 15,
		borderRadius: 5,
		padding: 10,
		paddingVertical: 15,
	},
});
