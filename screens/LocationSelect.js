import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';
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
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { mapLocationLoading } from '../components/appMessages';
import FormInputWithLabel from '../components/FormInputWithLabel';
import GlobalHeader from '../components/GlobalHeader';
//import components
import MainButton from '../components/MainButton';
import { keys } from '../environmentVariables';
import { ColorTheme } from '../components/ThemeFile';

const { height, width } = Dimensions.get('screen');

const LocationSelect = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const { title, myId } = route.params;

	const [loading, setloading] = useState(false);
	const [confrimSnapPoint, setConfrimSnapPoint] = useState();
	const [coordinates, setCoordinates] = useState(null);
	const [currentLocation, setCurrentLocation] = useState();

	const [address, setAddress] = useState();
	const [surburb, setSurburb] = useState();
	const [companyName, setCompanyName] = useState();
	const [building, setBuilding] = useState();
	const [workingHours, setWorkingHours] = useState();
	const [errMsg, setErrMsg] = useState(null);
	const [city, setCity] = useState();

	//date and time
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState('date');
	const [showStart, setShowStart] = useState(false);
	const [showEnd, setShowEnd] = useState(false);
	const [endTime, setEndTime] = useState();
	const [startTime, setStartTime] = useState();

	// handling date
	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShowStart(Platform.OS === 'ios');

		let tempDate = new Date(currentDate);
		let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();

		setStartTime(fTime);
	};
	const onChangeEnd = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShowEnd(Platform.OS === 'ios');

		let tempDate = new Date(currentDate);
		let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();

		setEndTime(fTime);
	};

	const showModeStartTime = (currentMode) => {
		setShowStart(true);
		setMode(currentMode);
	};
	const showModeEndTime = (currentMode) => {
		setShowEnd(true);
		setMode(currentMode);
	};

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
		})();

		return () => {
			setCurrentLocation(null);
		};
	}, []);

	// getting new location when map movies
	const updateRegionCenter = async () => {
		const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${
			currentLocation.coords.latitude
		},${currentLocation.coords.longitude}&destinations=${
			coordinates?.latitude
				? coordinates.latitude
				: currentLocation.coords.latitude
		},${
			coordinates?.longitude
				? coordinates.longitude
				: currentLocation.coords.longitude
		}&key=${keys.GOOGLE_API}`;
		axios
			.get(url)
			.then((response) => {
				// console.log(response.data);
				setFeedback(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// handling the bottom sheet to appear
	const bottomSheetRef = useRef(<BottomSheet />, null);

	// variables
	const snapPoints = useMemo(() => ['10%', '60%'], []);
	const singleSnap = useMemo(() => ['10%', '25%'], []);

	const handleSheetChanges = useCallback((index) => {
		// console.log("handleSheetChanges", index);
	}, []);

	// handleAddAddress
	const handleAddAddress = () => {
		if (title === 'home') {
			if (!address || !surburb || !city) {
				alert('Please fill in the form');
				return;
			}
		}
		if (title === 'work') {
			if (!companyName || !building || !startTime || !endTime) {
				alert('Please fill in the form');
				return;
			}
		}

		setloading(true);
		setTimeout(() => {
			setConfrimSnapPoint(true);
			setloading(false);
		}, 2000);
	};

	const handleConfirm = async () => {
		// validation is all distance are avalable
		if (!feedback.rows[0].elements[0].status === 'OK') {
			setloading(true);
			alert('Please drag the pin to your location');
			setloading(false);
		}

		if (feedback.rows[0].elements[0].distance.value < 40) {
			setloading(true);
			if (title === 'home') {
				axios
					.post(`${keys.apiURL}api/home/create`, {
						title,
						user_id: myId,
						userInfo: myId,
						address: address,
						surburb: surburb,
						city: city,
						homeLatLng: JSON.stringify({
							lat: currentLocation.coords.latitude,
							lng: currentLocation.coords.longitude,
						}),
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
				setloading(false);
			} else {
				axios
					.post(`${keys.apiURL}api/work/create`, {
						title,
						user_id: myId,
						userInfo: myId,
						companyName: companyName,
						building: building,
						workingHours: JSON.stringify({
							startTime: startTime,
							endTime: endTime,
						}),
						workLatLng: JSON.stringify({
							lat: currentLocation.coords.latitude,
							lng: currentLocation.coords.longitude,
						}),
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
				setloading(false);
			}

			setloading(false);
		} else {
			setloading(true);
			alert(`you are not ${title}`);
			setloading(false);
		}
	};

	// end of functions
	// start of render

	return (
		<SafeAreaView style={styles.container}>
			{/* navigation section */}
			<View
				style={{
					position: 'absolute',
					zIndex: 10,
					paddingTop: 20,
					backgroundColor: 'white',
				}}
			>
				<GlobalHeader
					title={confrimSnapPoint ? 'Select Location ' : `Add ${title} Address`}
					backable={true}
				/>
			</View>

			{/* map section */}
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				{currentLocation ? (
					<>
						<MapView
							showsUserLocation
							onReady
							style={{ height: height, width: width }}
							provider={PROVIDER_GOOGLE}
							initialRegion={{
								latitude: currentLocation.coords.latitude,
								longitude: currentLocation.coords.longitude,
								latitudeDelta: 0.0922,
								longitudeDelta: 0.0421,
							}}
							onRegionChange={(x) => {
								setCoordinates({
									latitude: x.latitude,
									longitude: x.longitude,
								});
							}}
							onRegionChangeComplete={() => updateRegionCenter()}
						/>
						<Image
							style={styles.imageMarker}
							source={require('../assets/icons/map-marker-01.png')}
						/>
					</>
				) : (
					<Text>{mapLocationLoading}</Text>
				)}
			</View>

			{/* bottomsheet section */}
			<BottomSheet
				animateOnMount={true}
				// enablePanDownToClose={true}
				ref={bottomSheetRef}
				index={1}
				snapPoints={confrimSnapPoint ? singleSnap : snapPoints}
				onChange={handleSheetChanges}
			>
				<KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
					<View
						style={{
							flex: 1,
							paddingVertical: 10,
							paddingHorizontal: 25,
							alignItems: 'center',
						}}
					>
						{!confrimSnapPoint ? (
							<>
								{title === 'work' && (
									<>
										<FormInputWithLabel
											label="Company Name"
											keyboardType="default"
											value={companyName}
											onTextChange={setCompanyName}
										/>
										<FormInputWithLabel
											label="Building"
											keyboardType="default"
											value={building}
											onTextChange={setBuilding}
										/>
										<Text
											style={[
												{ textAlign: 'left', width: '100%' },
												styles.title,
											]}
										>
											What time do you start and end work
										</Text>
										<View
											style={{
												display: 'flex',
												flexDirection: 'row',
												width: '100%',
												borderRadius: 5,
												justifyContent: 'space-between',
												backgroundColor: '#EFF0F6',
											}}
										>
											<TouchableOpacity
												onPress={() => showModeStartTime('time')}
												style={[styles.inputContainer]}
											>
												<Text
													style={{ color: ColorTheme.main, fontWeight: 'bold' }}
												>
													{startTime ? startTime : 'Start Time'}
												</Text>
											</TouchableOpacity>
											<TouchableOpacity
												onPress={() => showModeEndTime('time')}
												style={[styles.inputContainer]}
											>
												<Text
													style={{ color: ColorTheme.main, fontWeight: 'bold' }}
												>
													{endTime ? endTime : 'End Time'}
												</Text>
											</TouchableOpacity>
										</View>
										{showStart && (
											<DateTimePicker
												testID="dateTimePicker"
												value={date}
												mode={mode}
												is24Hour={true}
												display="default"
												onChange={onChange}
											/>
										)}
										{showEnd && (
											<DateTimePicker
												testID="dateTimePicker"
												value={date}
												mode={mode}
												is24Hour={true}
												display="default"
												onChange={onChangeEnd}
											/>
										)}
									</>
								)}

								{title === 'home' && (
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
									</>
								)}

								<MainButton
									onPress={handleAddAddress}
									title={loading ? 'Please wait...' : 'Continue'}
								></MainButton>
							</>
						) : (
							<View style={{ width: '100%', alignItems: 'center' }}>
								<Text style={{ color: '#7D7D7D' }}>
									Drag the pin to your location and tap proceed
								</Text>

								<MainButton
									onPress={handleConfirm}
									title={loading ? 'Please wait...' : 'Confirm'}
								></MainButton>
							</View>
						)}
					</View>
				</KeyboardAwareScrollView>
			</BottomSheet>
		</SafeAreaView>
	);
};

export default LocationSelect;

const styles = StyleSheet.create({
	container: { flex: 1 },
	imageMarker: {
		position: 'absolute',
		width: 35,
		resizeMode: 'contain',
	},
	ccontainer: {
		flex: 1,
		padding: 10,
		paddingTop: 10,
		backgroundColor: '#ecf0f1',
	},
	inputContainer: {
		flex: 1,
		padding: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 16,
		marginHorizontal: 10,
		marginBottom: 8,
		textTransform: 'capitalize',
	},
});
