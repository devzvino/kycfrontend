import React, { useState } from "react";
import { Text, View, TextInput, Image, Keyboard } from "react-native";

import MainInput from "./MainInput";
import SignUpNavigationButton from "./SignUpNavigationButton";
import { Dimensions } from "react-native";

import {
  FontTheme,
  ButtonTheme,
  ImageBackgroundTheme,
  LogoTheme,
  InputTheme,
} from "../components/ThemeFile";

//Device Dimenstions
const { width, height } = Dimensions.get("screen");

const OTPConfirm = ({
  setUserView,
  setIdUploadView,
  setOtpConfrimView,
  setRegConfrimView,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [otp, setOtp] = useState();

  // sumit function to api
  const handleSubmit = () => {
    setLoading(true);
    if (!otp) {
      setError("Please fill this field");
      setLoading(false);
    } else {
      setTimeout(() => {
        setUserView(false);
        setIdUploadView(false);
        setOtpConfrimView(false);
        setRegConfrimView(true);
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
          required
          onBlur={Keyboard.dismiss}
          onChange={(value) => {
            setOtp(value);
          }}
          textStyles={FontTheme.messagetxt}
          info={otp ? null : error}
        />
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
          title={"Continue"}
          loading={loading}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default OTPConfirm;
