import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddLocation from "../screens/AddLocation";
import SignUp from "../screens/SignUp";
import WelcomeScreen from "../screens/Welcome";
import TabsNav from "./TabsNav";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SignUp"
    >
      <Stack.Screen name="TabsNav" component={TabsNav} />
      <Stack.Group>
        <Stack.Screen name="AddNewLocation" component={AddLocation} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigation;

{
  /* <Stack.Screen name="home" component={Home} /> */
}
{
  /* <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} /> */
}
{
  /* add Location grouped screen */
}
