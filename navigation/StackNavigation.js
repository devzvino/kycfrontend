import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useEffect } from "react";
import LocationSelect from "../screens/LocationSelect";
import Login from "../screens/Login";
import Onboarding1 from "../screens/Onboarding1";
import Onboarding2 from "../screens/Onboarding2";
import Onboarding3 from "../screens/Onboarding3";
import SignUp from "../screens/SignUp";
import WelcomeScreen from "../screens/Welcome";
import TabsNav from "./TabsNav";
import { UserContext } from "../context/UserContext";
import GetLocation from "../screens/GetLocation";
import Scanner from "../screens/Scanner";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const { user, setUser } = useContext(UserContext);

  const checkingIfUserIsStored = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("@user");
      if (storedUser !== null) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) { }
  };

  useEffect(() => {
    checkingIfUserIsStored();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={!user ? "Welcome" : "TabsNav"}
      swipeEnabled={true}
    >
      {user ? (
        // Screens for registered in users
        <Stack.Group>
          <Stack.Screen name="TabsNav" component={TabsNav} />
          <Stack.Screen name="AddNewLocation" component={LocationSelect} />
          <Stack.Screen name="GetLocation" component={GetLocation} />
          <Stack.Screen name="ScanCode" component={Scanner} />

        </Stack.Group>
      ) : (
        // Auth screens
        <Stack.Group>
          <Stack.Screen name="Onboarding1" component={Onboarding1} />
          <Stack.Screen name="Onboarding2" component={Onboarding2} />
          <Stack.Screen name="Onboarding3" component={Onboarding3} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />

        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
