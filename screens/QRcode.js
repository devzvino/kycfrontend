import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { QRCode } from "react-native-custom-qr-codes";
import { SafeAreaView } from "react-native-safe-area-context";
import { Touchable } from "react-native-web";
import { useEffect, useState } from "react/cjs/react.production.min";
import GlobalHeader from "../components/GlobalHeader";
import MainButton from "../components/MainButton";
import { ColorTheme } from "../components/ThemeFile";
import kycLogo from '../assets/icon.png';


const QRcode = () => {
  const { width, height } = Dimensions.get("window");
  // const [userDetails, setuserDetails] = useState();

  // const getUserDetails= async()=>{
  //   const storedUser = await AsyncStorage.getItem("@user");
  //   user = JSON.parse(storedUser);
  //   setuserDetails(user);
  // }

  // useEffect(()=>{
  //   getUserDetails();
  // })

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#ffffff", flex: 1 }]}>
      <GlobalHeader title="Share Certificate" />
      <View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFFFFF', marginTop: 20, display: 'flex' }}>
        <QRCode
          size={270}
          codeStyle='circle'
          logo={kycLogo}
          logoSize={50}

          content='https://kycafrica.com' />


      </View>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity style={{
          borderColor: ColorTheme.grey2,
          borderWidth: 2,
          borderRadius: 10,
          marginBottom: 15,
          display: "flex",
          alignItems: "center",
          paddingBottom: '3%',
          paddingTop: '3%',

          width: width * 0.8

        }}>
          <Text style={{ fontSize: 18, color: ColorTheme.main, fontWeight: '600', }}>
            Full KYC Certificate
          </Text>

        </TouchableOpacity>
        <TouchableOpacity style={{
          borderColor: ColorTheme.grey2,
          borderWidth: 2,
          borderRadius: 10,
          marginBottom: 15,
          display: "flex",
          alignItems: "center",
          paddingBottom: '3%',
          paddingTop: '3%',
          width: width * 0.8,


        }}>
          <Text style={{ fontSize: 18, color: ColorTheme.main, fontWeight: '600', textTransform: 'capitalize' }}>
            Verified ID Certificate
          </Text>

        </TouchableOpacity>
        <TouchableOpacity style={{
          borderColor: ColorTheme.grey2,
          borderWidth: 2,
          borderRadius: 10,
          marginBottom: 15,
          display: "flex",
          alignItems: "center",
          paddingBottom: '3%',
          paddingTop: '3%',
          width: width * 0.8

        }}>
          <Text style={{ fontSize: 18, color: ColorTheme.main, fontWeight: '600', textTransform: 'capitalize' }}>
            Verified Address Certificate
          </Text>

        </TouchableOpacity>

      </View>


    </SafeAreaView>
  );
};

export default QRcode;

const styles = StyleSheet.create({
  flex: 1,
});
