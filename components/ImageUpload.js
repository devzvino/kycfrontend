import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import CamSvg from './CamSvg';

import {
	ButtonTheme,
	FontTheme,
	ImageBackgroundTheme,
	ImageTheme,
	InputTheme,
	LogoTheme,
} from '../components/ThemeFile';

const { width, height } = Dimensions.get('screen');

function ImageUpload({ title, buttontext, onPress, value }) {
	const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

	useEffect(() => {
		async () => {
			const galleryStatus =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			setHasGalleryPermission(galleryStatus.status === 'granted');
		};
	}, []);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			onPress(result);
		}
	};

	// console.log(value);

	return (
		<View>
			<Text style={FontTheme.inputTitle}>{title}</Text>
			<TouchableOpacity
				onPress={pickImage}
				style={{
					width: '100%',
					backgroundColor: '#EFF0F6',
					padding: 30,
					alignItems: 'center',
					borderRadius: 5,
					marginTop: 3,
					marginBottom: 10,
				}}
			>
				{value ? (
					<Image
						source={{ uri: value.uri }}
						resizeMode="contain"
						style={{ width: 40, height: 40 }}
					/>
				) : (
					<CamSvg />
				)}
				<Text style={FontTheme.footerLink}>{buttontext}</Text>
			</TouchableOpacity>
		</View>
	);
}

export default ImageUpload;
