import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
	Dimensions,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { ArrowLeftIcon, MenuAlt2Icon } from 'react-native-heroicons/outline';

const { height, width } = Dimensions.get('screen');

const GlobalHeader = ({ title, backable }) => {
	// navigation
	const navigation = useNavigation();

	return (
		<View
			style={{
				flexDirection: 'row',
				width: width,
				alignItems: 'center',
				height: height * 0.1,
				zIndex: 10,
				paddingHorizontal: 15,
				paddingTop: 10,
				paddingBottom: 0,
				backgroundColor: '#ffffff',
			}}
		>
			<StatusBar StatusBarStyle="dark-content" />
			{backable ? (
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<ArrowLeftIcon size={24} color="#14142A" />
				</TouchableOpacity>
			) : (
				<TouchableOpacity>
					<MenuAlt2Icon size={24} color="#14142A" />
				</TouchableOpacity>
			)}
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text
					style={{
						marginLeft: -34,
						color: '#14142A',
						fontWeight: 'bold',
						fontSize: 18,
					}}
				>
					{title}
				</Text>
			</View>
		</View>
	);
};

export default GlobalHeader;
