import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import * as Location from 'expo-location';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { LocationMarkerIcon } from 'react-native-heroicons/outline';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { mapLocationLoading } from '../components/appMessages';
import FormInputWithLabel from '../components/FormInputWithLabel';
import GlobalHeader from '../components/GlobalHeader';
import { ColorTheme } from '../components/ThemeFile';

//import components
import MainButton from '../components/MainButton';
import { keys } from '../environmentVariables';

//Device Dimenstions
const { width, height } = Dimensions.get('screen');

const AddLocation = () => {
	// getting passed title from add address screen
	const route = useRoute();
	const navigation = useNavigation();
	const title = route.params.title;

	// inputs
	const [loading, setloading] = useState(false);
	const [confrimSnapPoint, setConfrimSnapPoint] = useState();
	const [address, setAddress] = useState();
	const [surburb, setSurburb] = useState();
	const [coroodinates, setCoroodinates] = useState(null);
	const [currentLocation, setCurrentLocation] = useState(null);
	const [errMsg, setErrMsg] = useState(null);
	const [city, setCity] = useState();

	// distance section
	const [feedback, setFeedback] = useState();

	// getting current user location
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrMsg('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setCurrentLocation(location);
			console.log(currentLocation);
		})();

		return () => {
			setCurrentLocation(null);
		};
	}, []);

	console.log(currentLocation);

	// handleAddAddress
	const handleAddAddress = () => {
		setloading(true);
		setTimeout(() => {
			setConfrimSnapPoint(true);
			setloading(false);
		}, 2000);
	};

	const handleConfirm = async () => {
		setloading(true);
		if (feedback.rows[0].elements[0].distance.value < 30) {
			if (title === 'home') {
				axios
					.post('http://10.70.12.222:4000/api/location/', {
						userInfo: '62cfecbaa948e3505d483f40',
						homeAddress: address,
						homeSurburb: surburb,
						homeCity: city,
						homeLocation: JSON.stringify({
							lat: currentLocation.coords.latitude,
							lng: currentLocation.coords.longitude,
						}),
						workLocation: [''],
					})
					.then((res) => {
						if (res.status === 200) {
							navigation.navigate('Home');
						} else {
							alert('Sorry could not verify you, please try again later');
						}
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				axios
					.post('http://10.70.12.222:4000/api/location/', {
						userInfo: '62cfecbaa948e3505d483f40',
						workAddress: address,
						workSurburb: surburb,
						workCity: city,
						workLocation: JSON.stringify({
							lat: currentLocation.coords.latitude,
							lng: currentLocation.coords.longitude,
						}),
						homeLocation: [''],
					})
					.then((res) => {
						if (res.status === 200) {
							navigation.navigate('Home');
						} else {
							alert('Sorry could not verify you, please try again later');
						}
					})
					.catch((error) => {
						console.log(error);
					});
			}

			setloading(false);
		} else {
			alert(`you are not ${title}`);
			setloading(false);
		}
	};

	// handling the bottom sheet to appear
	const bottomSheetRef = useRef(<BottomSheet />, null);

	// variables
	const snapPoints = useMemo(() => ['10%', '60%'], []);
	const singleSnap = useMemo(() => ['10%', '25%'], []);

	// callbacks
	const handleSheetChanges = useCallback((index) => {
		// console.log("handleSheetChanges", index);
	}, []);

	const updateRegionCenter = async () => {
		const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&destinations=${coroodinates?.latitude},${coroodinates?.longitude}&key=${keys.GOOGLE_API}`;
		axios
			.get(url)
			.then((response) => {
				console.log(response.data);
				setFeedback(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<View style={{ flex: 1 }}>
			<GlobalHeader
				title={confrimSnapPoint ? 'Select Location ' : `Add ${title} Address`}
				backable={true}
			/>

			<View style={{ position: 'relative' }}>
				{confrimSnapPoint && (
					<TouchableOpacity style={styles.locateBtn}>
						<LocationMarkerIcon color={ColorTheme.main} />
					</TouchableOpacity>
				)}

				{currentLocation ? (
					<MapView
						onReady
						style={{ height: height, width: width }}
						provider={PROVIDER_GOOGLE}
						showsUserLocation
						initialRegion={{
							latitude: currentLocation.coords.latitude,
							longitude: currentLocation.coords.longitude,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}
						onRegionChange={(x) => {
							setCoroodinates({
								latitude: x.latitude,
								longitude: x.longitude,
							});
						}}
						onRegionChangeComplete={() => updateRegionCenter()}
					>
						{currentLocation ? (
							<Marker
								position={'center'}
								draggable={false}
								centerOffset={{ x: 0, y: 0 }}
								coordinate={{
									latitude: !coroodinates
										? currentLocation.coords.latitude
										: coroodinates.latitude,
									longitude: !coroodinates
										? currentLocation.coords.longitude
										: coroodinates.longitude,
								}}
							>
								<Image
									source={require('../assets/icons/map-marker-01.png')}
									style={{ height: 50, width: 50, resizeMode: 'contain' }}
								/>
							</Marker>
						) : (
							<View></View>
						)}
					</MapView>
				) : (
					<View
						style={{
							alignItems: 'center',
							height: '100%',
							backgroundColor: 'white',
						}}
					>
						<Text style={{ marginTop: 40 }}>{mapLocationLoading}</Text>
					</View>
				)}
			</View>
			<BottomSheet
				animateOnMount={true}
				// enablePanDownToClose={true}
				ref={bottomSheetRef}
				index={1}
				snapPoints={confrimSnapPoint ? singleSnap : snapPoints}
				onChange={handleSheetChanges}
			>
				<KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
					<View style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 25 }}>
						{!confrimSnapPoint ? (
							<>
								<FormInputWithLabel
									title={title}
									keyboardType="default"
									value={address}
									onTextChange={setAddress}
								/>
								<FormInputWithLabel
									label="Surburb / Area"
									keyboardType="default"
									value={surburb}
									onTextChange={setSurburb}
								/>
								<FormInputWithLabel
									label="City"
									keyboardType="default"
									value={city}
									onTextChange={setCity}
								/>
								<View
									style={{
										alignItems: 'center',
										position: 'absolute',
										bottom: 30,
										width: '100%',
										alignSelf: 'center',
									}}
								>
									<MainButton
										onPress={handleAddAddress}
										title={loading ? 'Please wait...' : 'Continue'}
									></MainButton>
								</View>
							</>
						) : (
							<View style={{ alignItems: 'center' }}>
								<Text style={{ color: '#7D7D7D', paddingVertical: 20 }}>
									Drag the pin to your location and tap proceed
								</Text>

								<MainButton
									onPress={handleConfirm}
									title={loading ? 'Please wait...' : 'Confirm'}
								/>
							</View>
						)}
					</View>
				</KeyboardAwareScrollView>
			</BottomSheet>
		</View>
	);
};

export default AddLocation;

const styles = StyleSheet.create({
	locateBtn: {
		position: 'absolute',
		top: 10,
		zIndex: 2,
		right: 15,
		borderRadius: 5,
		backgroundColor: 'white',
		padding: 10,
	},
});
