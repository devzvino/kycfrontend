import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import AddLocation from "../screens/AddLocation";
import SignUp from "../screens/SignUp";
import WelcomeScreen from "../screens/Welcome";
import TabsNav from "./TabsNav";
import LocationSelect from "../screens/LocationSelect";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  // checking if user is stored in async storage
  const [user, setUser] = useState(true);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SignUp"
    >
     
      {!user ? (
        <Stack.Group>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
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

{
  /* <Stack.Screen name="home" component={Home} /> */
}
