import React, { useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
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

LogBox.ignoreAllLogs(true);

//import fonts
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function App() {
  const [user, setUser] = useState(null);
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
    <UserContext.Provider value={{ user, setUser }}>
      <GlobalContainerRoot>
        <NavigationContainer theme={theme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StackNavigation />
            <Toast />
          </GestureHandlerRootView>
        </NavigationContainer>
      </GlobalContainerRoot>
    </UserContext.Provider>
  );
}
