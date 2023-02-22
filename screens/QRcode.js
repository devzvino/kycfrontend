import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { QRCode } from "react-native-custom-qr-codes";
import { SafeAreaView } from "react-native-safe-area-context";
import { Touchable } from "react-native-web";
import { useEffect } from "react/cjs/react.production.min";
import GlobalHeader from "../components/GlobalHeader";
import MainButton from "../components/MainButton";
import { ColorTheme } from "../components/ThemeFile";
import kycLogo from "../assets/icon.png";
import { useNavigation } from "@react-navigation/native";

const QRcode = () => {
  // navigation process
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    // await AsyncStorage.removeItem("@user");
    AsyncStorage.clear();
    // navigation.
    setLoading(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#ffffff", flex: 1 }]}>
      <GlobalHeader title="Share Certificate" />
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          marginTop: 20,
          display: "flex",
        }}
      >
        <QRCode size={270} codeStyle="circle" logo={kycLogo} logoSize={40} content="https://kycafrica.com" />
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity
          style={{
            borderColor: ColorTheme.grey2,
            borderRightWidth: 3,
            borderBottomWidth: 3,
            borderLeftWidth: 1,
            borderTopWidth: 1,
            borderRadius: 5,
            marginBottom: 15,
            display: "flex",
            alignItems: "center",
            paddingBottom: "3%",
            paddingTop: "3%",

            width: width * 0.8,
          }}
        >
          <Text style={{ fontSize: 18, color: ColorTheme.main, fontFamily: 'Poppins-SemiBold' }}>Full KYC Certificate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderColor: ColorTheme.grey2,
            borderRightWidth: 3,
            borderBottomWidth: 3,
            borderLeftWidth: 1,
            borderTopWidth: 1,
            borderRadius: 5,
            marginBottom: 15,
            display: "flex",
            alignItems: "center",
            paddingBottom: "3%",
            paddingTop: "3%",
            width: width * 0.8,
          }}
        >
          <Text style={{ fontSize: 18, color: ColorTheme.main, fontFamily: 'Poppins-SemiBold' }}>Verified National ID</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderColor: ColorTheme.grey2,
            borderRightWidth: 3,
            borderBottomWidth: 3,
            borderLeftWidth: 1,
            borderTopWidth: 1,
            borderRadius: 5,
            marginBottom: 15,
            display: "flex",
            alignItems: "center",
            paddingBottom: "3%",
            paddingTop: "3%",
            width: width * 0.8,
          }}
        >
          <Text style={{ fontSize: 18, color: ColorTheme.main, fontFamily: 'Poppins-SemiBold', textTransform: "capitalize" }}>
            Verified Proof of Residence
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            backgroundColor: ColorTheme.main,
            flexDirection: "row",
            width: "80%",
            borderRadius: 5,
            alignItems: "center",
            paddingVertical: "3%",
            marginTop: "1%",
            alignContent: "center",
            justifyContent: "center",
            paddingRight: "5%",
          }}
          onPress={handleLogout}
        >
          {loading ? (
            <Text> Logging Out...</Text>
          ) : (
            <Text style={{ fontSize: 18, color: "#fff", textTransform: "capitalize", fontFamily: 'Poppins-SemiBold' }}>Log Out</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QRcode;

const styles = StyleSheet.create({
  flex: 1,
});
