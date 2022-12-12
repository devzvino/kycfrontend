import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import LocationSelect from "../screens/LocationSelect";
import SignUp from "../screens/SignUp";
import WelcomeScreen from "../screens/Welcome";
import TabsNav from "./TabsNav";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const [user, setUser] = useState();
  const [storageUser, setStorageUser] = useState();
  const isFocused = useIsFocused();

  const storeUser = async (value) => {
    const newUser = await AsyncStorage.setItem("@user", JSON.stringify(value));
    setStorageUser(newUser);
    setUser(value);
  };

  const checkingIfUserIsStored = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("@user");
      if (storedUser !== null) {
        setUser(storedUser);
      }
    } catch (error) {}
  };

  useEffect(() => {
    checkingIfUserIsStored();
    return () => setUser();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome"
    >
      {user ? (
        // Screens for registred in users
        <Stack.Group>
          <Stack.Screen name="TabsNav" component={TabsNav} />
          <Stack.Screen name="AddNewLocation" component={LocationSelect} />
        </Stack.Group>
      ) : (
        // Auth screens
        <Stack.Group>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            initialParams={{ storeUser: storeUser }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
