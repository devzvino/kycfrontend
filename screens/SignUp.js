import React, { useState } from 'react';
import { Image, View } from 'react-native';

import mainLogo from '../assets/images/kyc-logo.png';

import { Dimensions, ScrollView } from 'react-native';
import IdUpload from '../components/IdUpload';
import OTPConfirm from '../components/OTPConfirm';
import RegConfirm from '../components/Regconfirm';
import UserDetails from '../components/UserDetails';

import { LogoTheme } from '../components/ThemeFile';

//Device Dimenstions
const { width, height } = Dimensions.get('screen');

const SignUp = () => {
	// state randering

	const [userView, setUserView] = useState(true);
	const [idUploadView, setIdUploadView] = useState(false);
	const [otpConfrimView, setOtpConfrimView] = useState(false);
	const [regConfrimView, setRegConfrimView] = useState(false);

	let tempData;

	return (
		<ScrollView contentContainerStyle={{ width: width, height: height }}>
			<View
				style={{
					width: '100%',
					height: '20%',
					marginLeft: '8%',
					paddingTop: '10%',
				}}
			>
				<Image source={mainLogo} style={LogoTheme.miniLogo} />
			</View>
			{/* Render Form elements here */}

			{userView && (
				<UserDetails
					data={tempData}
					setUserView={setUserView}
					setIdUploadView={setIdUploadView}
					setOtpConfrimView={setOtpConfrimView}
					setRegConfrimView={setRegConfrimView}
				/>
			)}
			{idUploadView && (
				<IdUpload
					data={tempData}
					setUserView={setUserView}
					setIdUploadView={setIdUploadView}
					setOtpConfrimView={setOtpConfrimView}
					setRegConfrimView={setRegConfrimView}
				/>
			)}
			{otpConfrimView && (
				<OTPConfirm
					data={tempData}
					setUserView={setUserView}
					setIdUploadView={setIdUploadView}
					setOtpConfrimView={setOtpConfrimView}
					setRegConfrimView={setRegConfrimView}
				/>
			)}
			{regConfrimView && (
				<RegConfirm
					data={tempData}
					setUserView={setUserView}
					setIdUploadView={setIdUploadView}
					setOtpConfrimView={setOtpConfrimView}
					setRegConfrimView={setRegConfrimView}
				/>
			)}
		</ScrollView>
	);
};

export default SignUp;
