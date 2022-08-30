import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';

import StackNavigation from './navigation/StackNavigation';
//import fonts
const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'transparent',
	},
};

const App = () => {
	let [fontsLoaded] = useFonts({
		'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
		'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
		'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
		'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
		'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<NavigationContainer theme={theme}>
			<StackNavigation />
			<Toast />
		</NavigationContainer>
	);
};

export default App;
