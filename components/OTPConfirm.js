import React, { useState } from 'react';
import { Text, View, Keyboard } from 'react-native';

import MainInput from './MainInput';
import SignUpNavigationButton from './SignUpNavigationButton';
import { Dimensions } from 'react-native';
import { errorMsg1 } from './appMessages';

import {
	FontTheme,

} from '../components/ThemeFile';

//Device Dimenstions
const { width } = Dimensions.get('screen');

const otpMessage =
	"Check your SMS for your security code. If you don't receive your security code, please contact support for further assistance.";

const OTPConfirm = ({
	data,
	setUserView,
	setIdUploadView,
	setOtpConfrimView,
	setRegConfrimView,
}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const [otpErrMessage, setOtpErrMessage] = useState();
	const [otpCon, setOtpCon] = useState();

	console.log(data);

	// submit function to api
	const handleSubmit = () => {
		setLoading(true);
		if (Number(otpCon) === Number(data.otp)) {
			setTimeout(() => {
				setUserView(false);
				setIdUploadView(false);
				setOtpConfrimView(false);
				setRegConfrimView(true);
				setLoading(false);
			}, 2000);
			//
			setLoading(false);
		} else {
			setError(errorMsg1);
			setOtpErrMessage('Your Otp does not match');
			setLoading(false);
			console.log(error);
			//
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<View style={{ width: width, height: '65%', alignItems: 'center' }}>
				<MainInput
					title={'OTP Confirmation Code'}
					textStyles={FontTheme.errortxt}
					required
					info={otpCon ? null : error}
					onBlur={Keyboard.dismiss}
					onChange={(value) => {
						setOtpCon(value);
					}}
				/>
				{otpCon === data.otp ? null : (
					<Text
						style={{ color: 'red', alignSelf: 'flex-start', paddingLeft: 25 }}
					>
						{otpErrMessage}
					</Text>
				)}

				<Text style={FontTheme.messagetxt}>{otpMessage}</Text>
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
					title={'Verify'}
					loading={loading}
					onPress={handleSubmit}
				/>
			</View>
		</View>
	);
};

export default OTPConfirm;
