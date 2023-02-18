import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { QRCode } from "react-native-custom-qr-codes";
import { BriefcaseIcon, HomeIcon, IdentificationIcon, BookOpenIcon, PlusIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalHeader from "../components/GlobalHeader";
import { ButtonTheme, ColorTheme } from "../components/ThemeFile";
import { useFetchAddresses } from "../hooks/useFetchAddresses";
import kycLogo from '../assets/icon.png';



const AddAddress = () => {

  const { height, width } = Dimensions.get("window");


  // navigation process
  const navigation = useNavigation();

  const [user, setUser] = useState();

  const checkingIfUserIsStored = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("@user");
      if (storedUser !== null) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) { }
  };
  // console.log(user);

  useEffect(() => {
    checkingIfUserIsStored();
  }, []);

  useFetchAddresses();

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1, height: height, display: 'flex', alignItems: 'center' }}>
      <GlobalHeader title="Home" />
      <View style={{ borderColor: ColorTheme.grey2, borderRightWidth: 3, borderBottomWidth: 3, borderLeftWidth: 1, borderTopWidth: 1, width: '90%', paddingHorizontal: 0, borderRadius: 10, alignItems: 'center', paddingVertical: '5%', marginBottom: '5%' }}>
        <View style={{ display: 'flex' }}>
          <Text>Full Name</Text>
          <Text> Benard Tafara Zvinokwazvo</Text>
        </View>


      </View>
      <TouchableOpacity style={{ borderColor: ColorTheme.grey2, borderRightWidth: 3, borderBottomWidth: 3, borderLeftWidth: 1, borderTopWidth: 1, width: '90%', paddingHorizontal: 0, borderRadius: 10, alignItems: 'center', paddingVertical: '2%' }}>
        <Text>Scan QR Code</Text>
      </TouchableOpacity>

    </SafeAreaView >
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
