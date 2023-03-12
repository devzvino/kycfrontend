import React, { useState } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import "react-native-gesture-handler";
import StackNavigation from "./navigation/StackNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GlobalContainerRoot from "./components/GlobalContainerRoot";
import { LogBox } from "react-native";
import { UserContext } from "./context/UserContext";
import { HasLocationContext } from "./context/HasLocationContext";
import { TempContext } from "./context/TempContext";

LogBox.ignoreAllLogs(true);
// LogBox.ignoreAllLogs(true);

//import fonts
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export default function App() {
  const [user, setUser] = useState(null);
  const [hasLocation, sethasLocation] = useState(null);
  const [tempDisplay, setTempDisplay] = useState([]);
  let [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer theme={theme}>
      <UserContext.Provider value={{ user, setUser }}>
        <TempContext.Provider value={{ tempDisplay, setTempDisplay }}>
          <HasLocationContext.Provider value={{ hasLocation, sethasLocation }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <StackNavigation />
              <Toast />
            </GestureHandlerRootView>
          </HasLocationContext.Provider>
        </TempContext.Provider>
      </UserContext.Provider>
    </NavigationContainer>
  );
}
