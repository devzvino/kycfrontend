import React from "react";
import { Text, View, TextInput, Image, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState, useRef } from "react";

import mainLogo from "../assets/images/kyc-logo.png";

import MainInput from "./MainInput";
import {
  FontTheme,
  ButtonTheme,
  ImageBackgroundTheme,
  LogoTheme,
  InputTheme,
} from "../components/ThemeFile";
import SignUpNavigationButton from "./SignUpNavigationButton";
import { Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PhoneInput from "./PhoneInput";

//Device Dimenstions
const { width, height } = Dimensions.get("screen");

const handleChange = (e) => {
  const userValue = e.target.value;
  console.log(userValue);
};

const UserDetails = ({
  setUserView,
  setIdUploadView,
  setOtpConfrimView,
  setRegConfrimView,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [phone, setPhone] = useState();
  const [firstName, setFirstName] = useState();
  const [surname, setSurname] = useState();
  const [id, setId] = useState();
  const phoneRef = useRef();

  const handleSubmit = () => {
    setLoading(true);
    if (!firstName || !surname || !phone || !id) {
      setError("Please fill this field");
      setLoading(false);
    } else {
      setTimeout(() => {
        setUserView(false);
        setIdUploadView(true);
        setOtpConfrimView(false);
        setRegConfrimView(false);
        setLoading(false);
      }, 2000);
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        // extraHeight={200}
        enableOnAndroid={true}
        // style={{flex:1}}
      >
        <View style={{ width: width, height: "65%", alignItems: "center" }}>
          <MainInput
            title={"Firstname(s) (as on your ID)"}
            placeholder={"e.g. Benard Tafara"}
            required
            onBlur={Keyboard.dismiss}
            onChange={(value) => {
              setFirstName(value);
            }}
            info={firstName ? null : error}
            textStyles={FontTheme.errortxt}
          />
          <MainInput
            title={"Surname (as on your ID)"}
            placeholder={"e.g. Zvinokwazvo"}
            required
            onBlur={Keyboard.dismiss}
            onChange={(value) => {
              setSurname(value);
            }}
            info={surname ? null : error}
            textStyles={FontTheme.errortxt}
          />
          <MainInput
            keyboardType="phone-pad"
            title={"Phone Number"}
            placeholder={"e.g. 263771234567"}
            required
            onBlur={Keyboard.dismiss}
            onChange={(value) => {
              setPhone(value);
            }}
            info={phone ? null : error}
            textStyles={FontTheme.errortxt}
          />
          <MainInput
            title={"ID Number"}
            placeholder={"e.g. 42 251109 S 07"}
            required
            onBlur={Keyboard.dismiss}
            onChange={(value) => {
              setId(value);
            }}
            info={id ? null : error}
            textStyles={FontTheme.errortxt}
          />
        </View>
      </KeyboardAwareScrollView>
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

export default UserDetails;
