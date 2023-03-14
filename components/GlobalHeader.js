import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { ArrowLeftIcon, MenuAlt2Icon } from "react-native-heroicons/solid";
import { StatusBar } from "expo-status-bar";
import MainLogo from "./MainLogo";
import { LogoTheme } from "./ThemeFile";

const { height, width } = Dimensions.get("screen");

const GlobalHeader = ({ title, backable }) => {
  // navigation
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        width: width,
        alignItems: "center",
        height: height * 0.1,
        zIndex: 10,
        paddingHorizontal: "5%",
        marginTop: "10%",
        paddingBottom: 0,
        backgroundColor: "#ffffff",
        marginBottom: 10,
      }}
    >
      <StatusBar style="dark" />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          paddingTop: 5,
        }}
      >
        <View style={[LogoTheme.miniLogo, { marginTop: 0 }]}>
          <MainLogo />
        </View>

        {backable ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}
          >
            <ArrowLeftIcon size={22} color="#9f9f9f" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default GlobalHeader;
