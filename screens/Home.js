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
			console.log(error);
			setLoading(false);
		}
	};

	// delete home verification card
	const handleDeleteProcess = async (id) => {};

	useEffect(() => {
		getMyVerifications();
		// clearing memory
		return () => {
			setMyVerifications();
		};
	}, []);

	// console.log(myVerifications);

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

			{myVerifications ? (
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
								onPress={() => handleDeleteProcess(item._id)}
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
					<Text>No Verification done yet</Text>
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
