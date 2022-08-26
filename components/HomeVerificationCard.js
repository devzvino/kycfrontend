import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ColorTheme } from './ThemeFile';

const HomeVerificationCard = ({ item }) => {
	const info = item.item;

	let home;
	let work;

	console.log(info);

	if (info.title === 'home') {
		home = JSON.parse(info.homeLatLng);
	}

	if (info.title === 'work') {
		work = JSON.parse(info.workLatLng);
	}

	return (
		<View style={styles.homeCard} key={item._id}>
			<Text style={{ color: ColorTheme.main, fontSize: 24, fontWeight: '600' }}>
				{home ? info.address : info.workAddress}
			</Text>
			{/* coordinates */}
			<View style={{ flexDirection: 'row', marginTop: 10 }}>
				{home ? (
					<>
						<Text style={styles.textCoordinate}>{home?.lat} , </Text>
						<Text style={styles.textCoordinate}>{home?.lng}</Text>
					</>
				) : (
					<>
						<Text style={styles.textCoordinate}>{work?.lat} , </Text>
						<Text style={styles.textCoordinate}>{work?.lng}</Text>
					</>
				)}
			</View>
			{/* category */}
			<Text style={styles.textCoordinate}>Category: {info.title}</Text>

			{/* verification */}
			{home ? (
				<>
					{info.homeVerified === 'pending' && (
						<View style={styles.v_container}>
							<Image
								style={styles.verificationIcon}
								source={require('../assets/icons/verification_pending.png')}
							/>
							<Text style={{ fontWeight: '600', color: ColorTheme.orange }}>
								Pending Verification
							</Text>
						</View>
					)}
					{info.homeVerified === 'failed' && (
						<View style={styles.v_container}>
							<Image
								style={styles.verificationIcon}
								source={require('../assets/icons/verification_failed.png')}
							/>
							<Text style={{ fontWeight: '600', color: ColorTheme.red }}>
								Verification Failed
							</Text>
						</View>
					)}
					{info.homeVerified === 'success' && (
						<View style={styles.v_container}>
							<Image
								style={styles.verificationIcon}
								source={require('../assets/icons/verification_success.png')}
							/>
							<Text style={{ fontWeight: '600', color: ColorTheme.main }}>
								Verified
							</Text>
						</View>
					)}
				</>
			) : (
				<>
					{info.homeverified === 'pending' && (
						<View style={styles.v_container}>
							<Image
								style={styles.verificationIcon}
								source={require('../assets/icons/verification_pending.png')}
							/>
							<Text style={{ fontWeight: '600', color: ColorTheme.orange }}>
								Pending Verification
							</Text>
						</View>
					)}
					{info.homeverified === 'failed' && (
						<View style={styles.v_container}>
							<Image
								style={styles.verificationIcon}
								source={require('../assets/icons/verification_failed.png')}
							/>
							<Text style={{ fontWeight: '600', color: ColorTheme.red }}>
								Verification Failed
							</Text>
						</View>
					)}
					{info.homeverified === 'success' && (
						<View style={styles.v_container}>
							<Image
								style={styles.verificationIcon}
								source={require('../assets/icons/verification_success.png')}
							/>
							<Text style={{ fontWeight: '600', color: ColorTheme.main }}>
								Verified
							</Text>
						</View>
					)}
				</>
			)}
		</View>
	);
};

export default HomeVerificationCard;

const styles = StyleSheet.create({
	v_container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 8,
	},
	verificationIcon: {
		width: 18,
		height: 18,
		resizeMode: 'contain',
		marginRight: 5,
	},
	homeCard: {
		backgroundColor: '#F8F8F8',
		borderRadius: 10,
		paddingHorizontal: 15,
		paddingTop: 20,
		paddingBottom: 10,
		marginBottom: 15,
		height: 142,
	},
	textCoordinate: {
		color: ColorTheme.grey,
		fontWeight: '600',
	},
});
