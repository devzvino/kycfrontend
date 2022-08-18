import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import SignUpNavigationButton from './SignUpNavigationButton';
import SvgComponent from './SuccessSvg';

//App theme styles
import { useNavigation, useRoute } from '@react-navigation/native';
import {
	ButtonTheme,
	FontTheme,
	ImageBackgroundTheme,
	InputTheme,
	LogoTheme,
} from '../components/ThemeFile';

//Device Dimensions
const { width, height } = Dimensions.get('screen');

function RegConfirm({
	data,
	setData,
	setUserView,
	setIdUploadView,
	setOtpConfrimView,
	setRegConfrimView,
}) {
	const navigation = useNavigation();
	const route = useRoute();
	const { storeUser } = route.params;

	// submit function to api
	const handleSubmit = async () => {
		try {
			const response = await fetch(
				'https://frozen-badlands-79412.herokuapp.com/api/user/',
				{
					method: 'POST',
					headers: { 'content-type': 'application/json' },
					body: JSON.stringify({
						firstname: data.firstName,
						surname: data.surname,
						phone: data.phone,
						idNumber: data.id,
						otp: data.otp,
						idFrontImage: data.idFront.uri,
						idBackIamge: data.yourPhoto.uri,
					}),
				}
			);

			const json = await response.json();
			console.log(json);

			if (!response.ok) {
				alert('something when wrong please try again');
			}

			if (response.ok) {
				// save user to local storage
				storeUser(json);
				await AsyncStorage.setItem('@user', JSON.stringify(json));
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<View
			style={{
				width: width / 1.15,
				alignSelf: 'center',
				alignItems: 'center',
				flex: 1,
			}}
		>
			<SvgComponent />
			<Text style={FontTheme.footText}>
				You have successfully verified your national identity
			</Text>
			<Text style={FontTheme.footText}>
				Please Proceed to add your addresses to start the address verification
				prosess
			</Text>
			<View
				style={{
					width: width,
					height: '15%',
					alignItems: 'center',
					position: 'absolute',
					bottom: 0,
				}}
			>
				<SignUpNavigationButton onPress={handleSubmit} title={'Continue'} />
			</View>
		</View>
	);
}

export default RegConfirm;
