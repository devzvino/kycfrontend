import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
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

const Home = () => {
	const isFocused = useIsFocused();
	const [loading, setLoading] = useState(false);
	const [myVerifications, setMyVerifications] = useState([]);

	const _id = '62cfecbaa948e3505d483f40';

	// get my verifications from backend
	const getMyVerifications = async () => {
		let myInfo;
		setLoading(true);
		try {
			const { data } = await axios.get(
				'http://10.70.12.222:4000/api/location/'
			);
			myInfo = data.filter((i) => i.userInfo._id === _id);
			setMyVerifications(myInfo);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	// delete home verification card
	const handleDeleteProcess = async (id) => {
		let newArray;
		await axios.delete(`http://10.70.12.222:4000/api/location/${id}`);
		newArray = myVerifications.filter((i) => i._id !== id);
		setMyVerifications(newArray);
	};

	useEffect(() => {
		getMyVerifications();
		// clearing memory
		return () => {
			setMyVerifications();
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

			{myVerifications.length > 0 ? (
				<SwipeListView
					contentContainerStyle={{ paddingHorizontal: 15 }}
					data={myVerifications}
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
								onPress={() => handleDeleteProcess(item.item._id)}
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
};

export default Home;

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
