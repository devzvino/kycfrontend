import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import LocationSelect from '../screens/LocationSelect';
import SignUp from '../screens/SignUp';
import WelcomeScreen from '../screens/Welcome';
import TabsNav from './TabsNav';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
	// checking if user is stored in async storage
	const [user, setUser] = useState(false);

	const checkingIfUserIsStored = async () => {
		try {
			const storedUser = await AsyncStorage.getItem('@user');
			if (storedUser !== null) {
				setUser(storedUser);
			}
		} catch (error) {}
	};

	useEffect(() => {
		checkingIfUserIsStored();
	}, []);

	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="Welcome"
		>
			{!user ? (
				<Stack.Group>
					<Stack.Screen name="Welcome" component={WelcomeScreen} />
					<Stack.Screen name="SignUp" component={SignUp} />
				</Stack.Group>
			) : (
				<>
					<Stack.Screen name="TabsNav" component={TabsNav} />
					<Stack.Group>
						<Stack.Screen name="AddNewLocation" component={LocationSelect} />
					</Stack.Group>
				</>
			)}
		</Stack.Navigator>
	);
};

export default StackNavigation;
