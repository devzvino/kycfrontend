import React from "react";
import { View, Image } from "react-native";
import { useState } from "react";

import mainLogo from "../assets/images/kyc-logo.png";

import { Dimensions, ScrollView } from "react-native";
import IdUpload from "../components/IdUpload";
import UserDetails from "../components/UserDetails";
import OTPConfirm from "../components/OTPConfirm";
import RegConfirm from "../components/Regconfirm";

import { LogoTheme } from "../components/ThemeFile";

//Device Dimenstions
const { width, height } = Dimensions.get("screen");

const SignUp = () => {
  // state randering

  const [userView, setUserView] = useState(true);
  const [idUploadView, setIdUploadView] = useState(false);
  const [otpConfrimView, setOtpConfrimView] = useState(false);
  const [regConfrimView, setRegConfrimView] = useState(false);

  return (
    <ScrollView contentContainerStyle={{ width: width, height: height }}>
      <View
        style={{
          width: "100%",
          height: "20%",
          marginLeft: "8%",
          paddingTop: "10%",
        }}
      >
        <Image source={mainLogo} style={LogoTheme.miniLogo} />
      </View>
      {/* Render Form elements here */}

      {userView && (
        <UserDetails
          setUserView={setUserView}
          setIdUploadView={setIdUploadView}
          setOtpConfrimView={setOtpConfrimView}
          setRegConfrimView={setRegConfrimView}
        />
      )}
      {idUploadView && (
        <IdUpload
          setUserView={setUserView}
          setIdUploadView={setIdUploadView}
          setOtpConfrimView={setOtpConfrimView}
          setRegConfrimView={setRegConfrimView}
        />
      )}
      {otpConfrimView && (
        <OTPConfirm
          setUserView={setUserView}
          setIdUploadView={setIdUploadView}
          setOtpConfrimView={setOtpConfrimView}
          setRegConfrimView={setRegConfrimView}
        />
      )}
      {regConfrimView && (
        <RegConfirm
          setUserView={setUserView}
          setIdUploadView={setIdUploadView}
          setOtpConfrimView={setOtpConfrimView}
          setRegConfrimView={setRegConfrimView}
        />
      )}
    </ScrollView>
  );
};

export default SignUp;
