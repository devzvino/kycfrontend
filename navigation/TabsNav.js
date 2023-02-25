import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Support from '../screens/Support'
import { HomeIcon, FolderIcon, LocationMarkerIcon, QuestionMarkCircleIcon, InformationCircleIcon, DotsHorizontalIcon } from "react-native-heroicons/solid";

//import Screens
import Home from "../screens/Home";
import QRcode from "../screens/QRcode";
import AddAddress from "../screens/AddAddress";
import { useFetchAddresses } from "../hooks/useFetchAddresses";
import { ColorTheme } from "../components/ThemeFile";
import Documents from "../screens/Documents";

const Tab = createBottomTabNavigator();

const TabsNav = () => {
  // pull and fetch all addresses list

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2FBF00",
        tabBarInactiveTintColor: '#9f9f9f',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#F8F8F8',
          paddingVertical: "2%",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        },
      }}
    >

      <Tab.Screen
        name="Home"
        component={AddAddress}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HomeIcon color={color} size={25} />
              <Text style={{ color: `${color}`, fontSize: 12, fontFamily: 'Poppins-Regular', }}> Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Addreses"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",

              }}
            >
              <LocationMarkerIcon color={color} style={'solid'} size={25} />
              <Text style={{ color: `${color}`, fontSize: 12, fontFamily: 'Poppins-Regular', }}>Address</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Documents"
        component={Documents}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",

              }}
            >
              <FolderIcon color={color} style={'solid'} size={25} />
              <Text style={{ color: `${color}`, fontSize: 12, fontFamily: 'Poppins-Regular', }}>Documents</Text>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Account"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UserIcon color={color} size={25} />
              <Text style={{ color: `${color}`, fontSize: 14 }}>Account</Text>
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="Support"
        component={Support}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <QuestionMarkCircleIcon color={color} size={25} />
              <Text style={{ color: `${color}`, fontSize: 12, fontFamily: 'Poppins-Regular', }}>Support</Text>
            </View>
          ),
        }}
      />

      {/* <Tab.Screen
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
      /> */}
      <Tab.Screen
        name="More"
        component={QRcode}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DotsHorizontalIcon color={color} size={25} />
              <Text style={{ color: `${color}`, fontSize: 14, fontFamily: 'Poppins-Regular', }}>More</Text>
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
