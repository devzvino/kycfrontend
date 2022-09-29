import React, { useEffect, useRef, useState } from "react";
import { Image, Keyboard, Text, TextInput, View } from "react-native";

// import PhoneInput from "react-native-phone-input";
import PhoneInput from "react-native-phone-number-input";

import { Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ColorTheme, FontTheme, InputTheme } from "../components/ThemeFile";
import { errorMsg1 } from "./appMessages";
import MainInput from "./MainInput";
import SignUpNavigationButton from "./SignUpNavigationButton";

//Device Dimenstions
const { width, height } = Dimensions.get("screen");

//Form validation Messages
const fillFieldError = "This field cannot be empty";

const UserDetails = ({
  cc,
  data,
  setData,
  setUserView,
  setIdUploadView,
  setOtpConfrimView,
  setRegConfrimView,
}) => {
  const [displayNumber, setDisplayNumber] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [phone, setPhone] = useState();
  const [firstName, setFirstName] = useState();
  const [surname, setSurname] = useState();
  const [id, setId] = useState();
  const phoneRef = useRef(undefined);

  const handleSubmit = () => {
    setLoading(true);
    if (!firstName || !surname || !phone || !id) {
      setError(errorMsg1);
      setLoading(false);
    } else {
      setTimeout(() => {
        // data = {
        // 	firstName,
        // 	surname,
        // 	phone,
        // 	id,
        // };
        setData({
          firstName,
          surname,
          phone:
            phoneRef.current?.getNumberAfterPossiblyEliminatingZero()
              .formattedNumber,
          id,
        });
        setUserView(false);
        setIdUploadView(true);
        setOtpConfrimView(false);
        setRegConfrimView(false);
        setLoading(false);
      }, 50);
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        viewIsInsideTabBar={false}
        // extraHeight={400}
        enableOnAndroid={true}
      >
        <View style={{ width: width, height: "65%", alignItems: "center" }}>
          <MainInput
            title={"First Name(s) (as on your ID)"}
            placeholder={"e.g. Phillip Joe"}
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
            placeholder={"e.g. Jones"}
            required
            onBlur={Keyboard.dismiss}
            onChange={(value) => {
              setSurname(value);
            }}
            info={surname ? null : error}
            textStyles={FontTheme.errortxt}
          />

          {/*  */}
          {/* {cc ? (
            <View style={{ marginBottom: 0 }}>
              <Text style={FontTheme.inputTitle}>Phone Number</Text>
              <PhoneInput
                style={InputTheme.signUpInput}
                ref={phoneRef}
                onSelectCountry={(e) => {
                  console.log(e);
                }}
                onChangePhoneNumber={(value) => {
                  setPhone(value);
                }}
                initialCountry={cc.toLowerCase()}
              />
              <Text style={FontTheme.errortxt}>{phone ? null : error}</Text>
            </View>
          ) : null} */}

          {/* ?======== */}
          <View style={{ marginBottom: 0 }}>
            <Text style={FontTheme.inputTitle}>Phone Number</Text>
            <PhoneInput
              containerStyle={[InputTheme.signUpInput, { paddingLeft: 0 }]}
              textContainerStyle={[InputTheme.signUpInput, { paddingLeft: 0 }]}
              codeTextStyle={{
                color: "#666",
                fontWeight: "400",
              }}
              placeholder={" "}
              disableArrowIcon={true}
              ref={phoneRef}
              value={phone}
              defaultValue={phone}
              defaultCode={cc}
              layout="first"
              onChangeFormattedText={(val) => {
                setDisplayNumber(val);
                let noZero =
                  phoneRef.current?.getNumberAfterPossiblyEliminatingZero();
                setPhone(noZero.formattedNumber);
              }}
            />
            <Text style={FontTheme.errortxt}>{phone ? null : error}</Text>
          </View>

          {/* ?======== */}

          {/*  */}
          <MainInput
            title={"ID Number"}
            placeholder={"e.g. 63111111X07"}
            required
            onBlur={Keyboard.dismiss}
            onChange={(value) => {
              setId(value);
            }}
            info={id ? null : error}
            textStyles={FontTheme.errortxt}
          />
          <View style={{ paddingVertical: 40 }}></View>
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
