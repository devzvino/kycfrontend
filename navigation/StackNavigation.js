import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useFocusEffect, useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useEffect, useState } from "react";
import LocationSelect from "../screens/LocationSelect";
import Login from "../screens/Login";
import Onboarding1 from "../screens/Onboarding1";
import Onboarding2 from "../screens/Onboarding2";
import Onboarding3 from "../screens/Onboarding3";
import QRcode from "../screens/QRcode";
import SignUp from "../screens/SignUp";
import Support from "../screens/Support";
import WelcomeScreen from "../screens/Welcome";
import TabsNav from "./TabsNav";
import { UserContext } from "../context/UserContext";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const { user, setUser } = useContext(UserContext);
  const [storageUser, setStorageUser] = useState();
  const isFocused = useIsFocused();

  // const storeUser = async (value) => {
  //   const newUser = await AsyncStorage.setItem("@user", JSON.stringify(value));
  //   setStorageUser(newUser);
  //   setUser(value);
  // };

  const checkingIfUserIsStored = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("@user");
      if (storedUser !== null) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {}
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
        </Stack.Group>
      ) : (
        // Auth screens
        <Stack.Group>
          <Stack.Screen name="Onboarding1" component={Onboarding1} />
          <Stack.Screen name="Onboarding2" component={Onboarding2} />
          <Stack.Screen name="Onboarding3" component={Onboarding3} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="More" component={QRcode} />
          <Stack.Screen name="Support" component={Support} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
