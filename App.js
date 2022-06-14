import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'react-native';

//import Screens
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import Welcome from './screens/Welcome'; 

//import fonts
import { useFonts } from "expo-font";



const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    background: 'transparent',
  }
}

const App = () => {
  let [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
  });

  if (!fontsLoaded) { 
    return <AppLoading/>;
  }

  return (
    <NavigationContainer theme={theme}>
      <StatusBar barStyle={theme == 'Light' ? 'light-content': 'dark-content' }/>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName= 'SignUp'>
      
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  }

export default App;

