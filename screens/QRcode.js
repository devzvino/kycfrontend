import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { QRCode } from "react-native-custom-qr-codes";
import { SafeAreaView } from "react-native-safe-area-context";
import { Touchable } from "react-native-web";
import { useEffect, useState } from "react/cjs/react.production.min";
import GlobalHeader from "../components/GlobalHeader";
import MainButton from "../components/MainButton";


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
    <SafeAreaView style={[styles.container, { backgroundColor: "#ffffff" }]}>
      <GlobalHeader title="Share Certificate" />
      <View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFFFFF', marginTop: 20 }}>
        <QRCode

          content='https://kycafrica.com' />


      </View>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity style={{
          backgroundColor: "#2FBF00",
          borderRadius: 5,
          marginBottom: 15,
          display: "flex",
          alignItems: "center",
          paddingBottom: 20,
          paddingTop: 20,

          width: width * 0.8

        }}>
          <Text style={{ fontSize: 18, color: '#FFFFFF', fontWeight: '600', textTransform: 'uppercase' }}>
            Full KYC Certificate
          </Text>

        </TouchableOpacity>
        <TouchableOpacity style={{
          backgroundColor: "#2FBF00",
          borderRadius: 5,
          marginBottom: 15,
          display: "flex",
          alignItems: "center",
          paddingBottom: 20,
          paddingTop: 20,
          width: width * 0.8,


        }}>
          <Text style={{ fontSize: 18, color: '#FFFFFF', fontWeight: '600', textTransform: 'uppercase' }}>
            Verified ID Certificate
          </Text>

        </TouchableOpacity>
        <TouchableOpacity style={{
          backgroundColor: "#2FBF00",
          borderRadius: 5,
          marginBottom: 15,
          display: "flex",
          alignItems: "center",
          paddingBottom: 20,
          paddingTop: 20,
          width: width * 0.8

        }}>
          <Text style={{ fontSize: 18, color: '#FFFFFF', fontWeight: '600', textTransform: 'uppercase' }}>
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
