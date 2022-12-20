import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import SignUpNavigationButton from "./SignUpNavigationButton";

import { Image, Text, View } from "react-native";
import IconText from "./iconText";
import ImageUpload from "./ImageUpload";

import {
  ButtonTheme,
  FontTheme,
  ImageBackgroundTheme,
  InputTheme,
  LogoTheme,
} from "../components/ThemeFile";
import { keys } from "../environmentVariables";

//Device Dimenstions
const { width, height } = Dimensions.get("screen");

const uploadWarning =
  "To avoid delays when verifying account, Please make sure that:";

const IdUpload = ({
  data,
  setData,
  setUserView,
  setIdUploadView,
  setOtpConfrimView,
  setRegConfrimView,
}) => {
  const [loading, setLoading] = useState(false);
  const [idFront, setIdFront] = useState();
  const [otp, setOtp] = useState(Math.floor(1000 + Math.random() * 9000));
  const [yourPhoto, setYourPhoto] = useState();

  console.log(data.phone);

  const handleOTPRequest = async () => {
    await fetch(`${keys.apiURL}api/user/confirm-otp`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        phone: data.phone,
        otp,
      }),
    });
  };

  // sumit function to api
  const handleSubmit = () => {
    setLoading(true);
    // if () {
    //   setError("Please fill this field");
    // setLoading(false);
    // } else {
    //
    handleOTPRequest();
    setTimeout(() => {
      setData({ ...data, otp, idFront, yourPhoto });
      setUserView(false);
      setIdUploadView(false);
      setOtpConfrimView(true);
      setRegConfrimView(false);
      setLoading(false);
    }, 50);
    setLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: width / 1.15, alignSelf: "center" }}>
        <Text style={FontTheme.description}>{uploadWarning}</Text>
        <View style={{ marginTop: 5 }}>
          <IconText
            paraText={"Document should be good condition and clearly visible."}
          />
          <IconText
            paraText={"Make sure that there is no light glare on the card."}
          />
        </View>
        <ImageUpload
          title={"Upload ID Front"}
          buttontext={"Upload Photo"}
          onPress={setIdFront}
          value={idFront}
        />
        <ImageUpload
          title={"Upload Your Photo"}
          buttontext={"Upload Photo"}
          onPress={setYourPhoto}
          value={yourPhoto}
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

export default IdUpload;
