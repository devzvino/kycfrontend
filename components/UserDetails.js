import React, { useEffect, useRef, useState } from 'react';
import { Image, Keyboard, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import mainLogo from '../assets/images/kyc-logo.png';

import { Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
	ButtonTheme,
	FontTheme,
	ImageBackgroundTheme,
	InputTheme,
	LogoTheme,
} from '../components/ThemeFile';
import { errorMsg1 } from './appMessages';
import MainInput from './MainInput';
import SignUpNavigationButton from './SignUpNavigationButton';

//Device Dimenstions
const { width, height } = Dimensions.get('screen');

//Form validation Messages
const fillFieldError = 'This field cannot be empty';

const UserDetails = ({
	data,
	setData,
	setUserView,
	setIdUploadView,
	setOtpConfrimView,
	setRegConfrimView,
}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const [phone, setPhone] = useState();
	const [firstName, setFirstName] = useState();
	const [surname, setSurname] = useState();
	const [id, setId] = useState();
	const phoneRef = useRef();

	const handleSubmit = () => {
		setLoading(true);
		if (!firstName || !surname || !phone || !id) {
			setError(errorMsg1);
			setLoading(false);
		} else {
			setTimeout(() => {
				// data = {
				// 	firstName,
				// 	surname,
				// 	phone,
				// 	id,
				// };
				setData({ firstName, surname, phone, id });
				setUserView(false);
				setIdUploadView(true);
				setOtpConfrimView(false);
				setRegConfrimView(false);
				setLoading(false);
			}, 2000);
			setLoading(false);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<KeyboardAwareScrollView
				viewIsInsideTabBar={true}
				// extraHeight={200}
				enableOnAndroid={true}
				// style={{flex:1}}
			>
				<View style={{ width: width, height: '65%', alignItems: 'center' }}>
					<MainInput
						title={'Firstname(s) (as on your ID)'}
						placeholder={'e.g. Benard Tafara'}
						required
						onBlur={Keyboard.dismiss}
						onChange={(value) => {
							setFirstName(value);
						}}
						info={firstName ? null : error}
						textStyles={FontTheme.errortxt}
					/>
					<MainInput
						title={'Surname (as on your ID)'}
						placeholder={'e.g. Zvinokwazvo'}
						required
						onBlur={Keyboard.dismiss}
						onChange={(value) => {
							setSurname(value);
						}}
						info={surname ? null : error}
						textStyles={FontTheme.errortxt}
					/>
					<MainInput
						keyboardType="phone-pad"
						title={'Phone Number'}
						placeholder={'e.g. 263771234567'}
						required
						onBlur={Keyboard.dismiss}
						onChange={(value) => {
							setPhone(value);
						}}
						info={phone ? null : error}
						textStyles={FontTheme.errortxt}
					/>
					<MainInput
						title={'ID Number'}
						placeholder={'e.g. 42 251109 S 07'}
						required
						onBlur={Keyboard.dismiss}
						onChange={(value) => {
							setId(value);
						}}
						info={id ? null : error}
						textStyles={FontTheme.errortxt}
					/>
				</View>
			</KeyboardAwareScrollView>
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

export default UserDetails;
