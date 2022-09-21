import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageBackground, Linking, Text, View } from 'react-native';
import MainLogo from '../components/MainLogo';
import welcomeBg from '../assets/images/splash-bg.jpg';

//import components
import MainButton from '../components/MainButton';

//import styles
import {
	ButtonTheme,
	FontTheme,
	InputTheme,
	LogoTheme,
	SectionTheme,
} from '../components/ThemeFile';

//Usable variables
const footerMessage = 'By continuing you agree to our';
const footerLink = 'terms and privacy policy';
const appMotto = 'Smart Know Your Customer Solutions in one Place';
const appDescription =
	'This app enables you to verify your Address & National Identity in just a few taps.';

const WelcomeScreen = () => {
	const navigation = useNavigation();
	//Handling buttonPress
	const handlePress = () => {
		navigation.navigate('SignUp');
	};

	return (
		<View>
			<ImageBackground style={SectionTheme.welcomeSection1} source={welcomeBg}>
				<View style={SectionTheme.welcomeSection1_inner}>
					<MainLogo style={LogoTheme.mainLogo}/>
					<Text style={FontTheme.motto}>{appMotto}</Text>
					<Text style={FontTheme.description}>{appDescription}</Text>
				</View>
			</ImageBackground>
			<View style={SectionTheme.welcomeSection2}>
				<View style={SectionTheme.welcomeSection3}>
					<MainButton title={'Get Started'} onPress={handlePress} />
					<Text style={FontTheme.footerText}>
						{footerMessage}{' '}
						{
							<Text
								onPress={() => Linking.openURL('http://google.com')}
								style={FontTheme.footerLink}
							>
								{footerLink}
							</Text>
						}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default WelcomeScreen;
