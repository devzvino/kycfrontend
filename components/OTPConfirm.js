import React, { useState } from "react";
import { Text, View, TextInput, Image, Keyboard } from "react-native";

import MainInput from "./MainInput";
import SignUpNavigationButton from "./SignUpNavigationButton";
import { Dimensions } from "react-native";
import { errorMsg1 } from "./appMessages";

import {
  FontTheme,
  ButtonTheme,
  ImageBackgroundTheme,
  LogoTheme,
  InputTheme,
} from "../components/ThemeFile";

//Device Dimenstions
const { width, height } = Dimensions.get("screen");

const otpMessage = "Check your SMS for your security code. If you don't receive your security code, please contact support for further assistance."


const OTPConfirm = ({
  setUserView,
  setIdUploadView,
  setOtpConfrimView,
  setRegConfrimView,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [otp, setOtp] = useState();

  // submit function to api
  const handleSubmit = () => {
    setLoading(true);
    if (!otp) {
      setError(errorMsg1);
      setLoading(false);
      console.log(error)
    } else {
      setTimeout(() => {
        setUserView(false);
        setIdUploadView(false);
        setOtpConfrimView(true);
        setRegConfrimView(false);
        setLoading(false);
      }, 2000);
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: width, height: "65%", alignItems: "center" }}>
        <MainInput
          title={"OTP Confirmation Code"}
          textStyles={FontTheme.errortxt}
          required 
          info={otp? null : error}
          onBlur={Keyboard.dismiss}
          onChange={(value) => {
            setOtp(value);
          }}
        
        />
        <Text style={FontTheme.messagetxt}>{otpMessage}</Text>
      </View>
      
      <View
        style={{
          width: width,
          height: "15%",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
        }}
      >
        <SignUpNavigationButton
          title={"Verify"}
          loading={loading}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default OTPConfirm;
