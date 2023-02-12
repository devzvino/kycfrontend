import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { QRCode } from "react-native-custom-qr-codes";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react/cjs/react.production.min";
import GlobalHeader from "../components/GlobalHeader";
import MainButton from "../components/MainButton";


const QRcode = () => {
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
    <SafeAreaView style={styles.container}>
      <GlobalHeader title="Share Certificate" />
      <View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFFFFF', marginTop: 50 }}>
        <QRCode content='https://kycafrica.com' />


      </View>
      <View style={{ alignItems: 'center' }}>
        <MainButton
          title={'Full KYC Certificate'} />
        <MainButton
          title={'Id Verification'} />
        <MainButton
          title={'Address Verification'} />
      </View>


    </SafeAreaView>
  );
};

export default QRcode;

const styles = StyleSheet.create({
  flex: 1,
});
