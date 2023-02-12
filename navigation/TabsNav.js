import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeIcon, PlusIcon, ShareIcon } from "react-native-heroicons/outline";

//import Screens
import Home from "../screens/Home";
import QRcode from "../screens/QRcode";
import AddAddress from "../screens/AddAddress";
import { useFetchAddresses } from "../hooks/useFetchAddresses";

const Tab = createBottomTabNavigator();

const TabsNav = () => {
  // pull and fetch all addresses list

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2FBF00",
        tabBarInactiveTintColor: "#808080",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#ebebeb",
          height: 100,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HomeIcon color={color} size={30} />
              <Text style={{ color: `${color}`, fontSize: 18 }}> Home</Text>
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
                  top: -25,
                  overflow: "hidden",
                  padding: 20,
                  borderWidth: 8,
                  borderColor: "white",
                },
                color ? { backgroundColor: color } : { backgroundColor: color },
              ]}
            >
              <PlusIcon color={"#fff"} size={30} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="QRcode"
        component={QRcode}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShareIcon color={color} size={30} />
              <Text style={{ color: `${color}`, fontSize: 18 }}> Share</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  addLocation: {
    padding: 100,
    borderRadius: 50,
  },
});

export default TabsNav;
