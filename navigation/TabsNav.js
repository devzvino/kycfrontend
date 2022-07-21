import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeIcon, PlusIcon, QrcodeIcon } from "react-native-heroicons/outline";

//import Screens
import Home from "../screens/Home";
import QRcode from "../screens/QRcode";
import AddAddress from "../screens/AddAddress";

const Tab = createBottomTabNavigator();

const TabsNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2FBF00",
        tabBarInactiveTintColor: "#808080",
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          elevation: 0,
          fontSize: 12,
          marginTop: -5,
          paddingBottom: 5,
        },
        tabBarStyle: {
          backgroundColor: "#ebebeb",
          height: 100,
          padding: 17,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <HomeIcon color={color} size={22} />
              <Text style={{ color: `${color}` }}> Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AddLocation"
        component={AddAddress}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={[
                styles.addLocation,
                {
                  marginTop: -70,
                  padding: 30,
                  borderWidth: 8,
                  borderColor: "white",
                  shadowColor: "white",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 0,
                },
                color ? { backgroundColor: color } : { backgroundColor: color },
              ]}
            >
              <PlusIcon color={"#fff"} size={22} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="QRcode"
        component={QRcode}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ flexDirection: "row" }}>
              <QrcodeIcon color={color} size={22} />
              <Text style={{ color: `${color}` }}> QR Code</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  addLocation: {
    padding: 15,
    borderRadius: 50,
  },
});

export default TabsNav;

//  //
//  tabBarStyle: {
//   position: "absolute",
//   flex: 1,
//   backgroundColor: "#F8F8F8",
//   elevation: 0,
//   bottom: 0,
//   height: 90,
//   right: 0,
//   left: 0,
//   alignItems: "center",
//   justifyContent: "center",
// },
// tabBarShowLabel: false,
// headerShown: false,
