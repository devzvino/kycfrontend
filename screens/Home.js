import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import registerNNPushToken from 'native-notify';
import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeListView } from 'react-native-swipe-list-view';
import GlobalHeader from '../components/GlobalHeader';
import HomeVerificationCard from '../components/HomeVerificationCard';
import { keys } from '../environmentVariables';

export default function () {
	registerNNPushToken(3563, 'f4D4PHdqoUJMiTkDm4E1Uw');
	const isFocused = useIsFocused();
	const [loading, setLoading] = useState(false);
	const [myLocations, setMyLocations] = useState([]);
	const [user, setUser] = useState({});

	const _id = user._id;

	// get my verifications from backend
	const getMyLocations = async () => {
		let myInfo;
		setLoading(true);
		try {
			const { data } = await axios.get(`${keys.apiURL}api/home/my/${_id}`);
			setMyLocations(data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	console.log(myLocations);

	// delete home verification card
	const handleDeleteProcess = async (id, title) => {
		let newArray;
		await axios.delete(
			title === 'home'
				? `${keys.apiURL}api/home/${id}`
				: `${keys.apiURL}api/work/${id}`
		);
		newArray = myLocations.filter((i) => i._id !== id);
		setMyLocations(newArray);
	};

	// getting user from storage
	const checkingIfUserIsStored = async () => {
		try {
			const storedUser = await AsyncStorage.getItem('@user');
			if (storedUser !== null) {
				setUser(JSON.parse(storedUser));
			}
		} catch (error) {}
	};

	useEffect(() => {
		checkingIfUserIsStored();
		getMyLocations();
		// clearing memory
		return () => {
			setMyLocations([]);
		};
	}, [isFocused]);

	if (loading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text style={{ color: 'black', paddingBottom: 30 }}>
					Loading please wait...
				</Text>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<GlobalHeader title="Home" />
			<View style={{ paddingVertical: 20 }}></View>

			{myLocations?.length > 0 ? (
				<SwipeListView
					contentContainerStyle={{ paddingHorizontal: 15 }}
					data={myLocations}
					renderItem={(item) => <HomeVerificationCard item={item} />}
					disableRightSwipe={true}
					previewOpenDelay={3000}
					friction={1000}
					tension={40}
					leftOpenValue={75}
					stopLeftSwipe={75}
					rightOpenValue={-75}
					renderHiddenItem={(item) => (
						<View style={styles.hiddenContainer}>
							<TouchableOpacity
								onPress={() =>
									handleDeleteProcess(item.item._id, item.item.title)
								}
								style={styles.hiddenButton}
							>
								<Text style={{ color: 'white', fontWeight: 'bold' }}>
									Delete
								</Text>
							</TouchableOpacity>
						</View>
					)}
				/>
			) : (
				<View
					style={{
						paddingTop: 150,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text>You have not added your home or work address.</Text>
				</View>
			)}
		</SafeAreaView>
	);
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	hiddenContainer: {
		flex: 1,
		paddingTop: 1,
		overflow: 'hidden',
	},
	hiddenButton: {
		backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'flex-end',
		paddingRight: 25,
		borderRadius: 10,
		height: '100%',
		height: 140,
	},
});
