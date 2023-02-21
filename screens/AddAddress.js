import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { QRCode } from "react-native-custom-qr-codes";
import {
  BriefcaseIcon,
  HomeIcon,
  IdentificationIcon,
  BookOpenIcon,
  QrcodeIcon,
  PlusIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalHeader from "../components/GlobalHeader";
import { ButtonTheme, ColorTheme } from "../components/ThemeFile";
import { useFetchAddresses } from "../hooks/useFetchAddresses";
import kycLogo from "../assets/icon.png";
import InfoRow from "../components/InfoRow";
import moment from "moment";

const AddAddress = () => {
  const { height, width } = Dimensions.get("window");
  const [user, setUser] = useState();

  const checkingIfUserIsStored = async () => {
    const addresses = await AsyncStorage.getItem("@mergedAddresses");
    console.log(addresses);
    try {
      const storedUser = await AsyncStorage.getItem("@user");
      if (storedUser !== null) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {}
  };

  useEffect(() => {
    checkingIfUserIsStored();
  }, []);

  useFetchAddresses();

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1, height: height, display: "flex", alignItems: "center" }}>
      <GlobalHeader title="Home" />
      <View
        style={{
          borderColor: ColorTheme.grey2,
          borderRightWidth: 2,
          borderBottomWidth: 2,
          borderLeftWidth: 1,
          borderTopWidth: 1,
          width: "90%",
          paddingHorizontal: 0,
          borderRadius: 5,
          alignItems: "center",
          paddingVertical: "5%",
          marginBottom: "5%",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Text
          style={{
            fontSize: 10,
            width: "95%",
            fontWeight: "bold",
            marginBottom: "1%",
            textTransform: "uppercase",
            color: ColorTheme.grey4,
          }}
        >
          KYC Africa Verification Details
        </Text>
        <Text
          style={{
            fontSize: 20,
            width: "95%",
            fontWeight: "bold",
            marginBottom: "5%",
            color: "black",
            textTransform: "capitalize",
          }}
        >
          {user?.firstname + " " + user?.surname}
          {/* Constentino Guvheya Nyikadzino Chiwenga */}
        </Text>

        <InfoRow section={"Verified National ID"} dataInfo={user?.idNumber} />
        <InfoRow section={"Verified Phone No"} dataInfo={user?.phone} />
        <InfoRow section={"Registered On"} dataInfo={moment(user?.createdAt).format("lll")} />
      </View>
      <TouchableOpacity
        style={{
          display: "flex",
          backgroundColor: ColorTheme.main,
          flexDirection: "row",
          width: "90%",
          paddingHorizontal: "3%",
          borderRadius: 5,
          alignItems: "center",
          paddingVertical: "4%",
          alignContent: "center",
          justifyContent: "center",
          paddingRight: "5%",
        }}
      >
        <QrcodeIcon color={"#FFF"} size={18} />
        <Text style={{ marginLeft: "3%", fontWeight: "bold", color: "#FFF" }}>Scan QR Code</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddAddress;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  btnTitle: {
    color: ColorTheme.main,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  btnExt: {
    width: "100%",
    alignItems: "flex-start",
    paddingHorizontal: 15,
    flexDirection: "row",
  },
});
