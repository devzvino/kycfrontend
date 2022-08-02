import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StatusBar } from 'react-native';
import AddLocation from '../screens/AddLocation';
import LocationSelect from '../screens/LocationSelect';
import SignUp from '../screens/SignUp';
import WelcomeScreen from '../screens/Welcome';
import TabsNav from './TabsNav';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
	// checking if user is stored in async storage
	const [user, setUser] = useState(false);

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
