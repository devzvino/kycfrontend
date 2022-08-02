import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import SignUpNavigationButton from './SignUpNavigationButton';

import { Image, Text, View } from 'react-native';
import IconText from './iconText';
import ImageUpload from './ImageUpload';

import {
	ButtonTheme,
	FontTheme,
	ImageBackgroundTheme,
	InputTheme,
	LogoTheme,
} from '../components/ThemeFile';

//Device Dimenstions
const { width, height } = Dimensions.get('screen');

const uploadWarning =
	'To avoid delays when verifying account, Please make sure that:';

const IdUpload = ({
	setUserView,
	setIdUploadView,
	setOtpConfrimView,
	setRegConfrimView,
}) => {
	const [loading, setLoading] = useState(false);
	const [idFront, setIdFront] = useState();
	const [yourPhoto, setYourPhoto] = useState();

	// sumit function to api
	const handleSubmit = () => {
		setLoading(true);
		// if () {
		//   setError("Please fill this field");
		// setLoading(false);
		// } else {
		setTimeout(() => {
			setUserView(false);
			setIdUploadView(false);
			setOtpConfrimView(false);
			setRegConfrimView(true);
			setLoading(false);
		}, 2000);
		setLoading(false);
		// }
	};
	return (
		<View style={{ flex: 1 }}>
			<View style={{ width: width / 1.15, alignSelf: 'center' }}>
				<Text style={FontTheme.description}>{uploadWarning}</Text>
				<View style={{ marginTop: 5, marginBottom: 10 }}>
					<IconText
						paraText={'Document should be good condition and clearly visible.'}
					/>
					<IconText
						paraText={'Make sure that there is no light glare on the card.'}
					/>
				</View>
				<ImageUpload
					title={'Upload ID Front'}
					buttontext={'Upload Photo'}
					onPress={setIdFront}
					value={idFront}
				/>
				<ImageUpload
					title={'Upload Your Photo'}
					buttontext={'Upload Photo'}
					onPress={setYourPhoto}
					value={yourPhoto}
				/>
			</View>
			<View
				style={{
					width: width,
					height: '15%',
					alignItems: 'center',
					position: 'absolute',
					bottom: 0,
				}}
			>
				<SignUpNavigationButton
					title={'Continue'}
					loading={loading}
					onPress={handleSubmit}
				/>
			</View>
		</View>
	);
};

export default IdUpload;
