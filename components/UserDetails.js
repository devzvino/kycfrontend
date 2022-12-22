import React, { useEffect, useRef, useState, ScrollView } from "react";
import { Image, Keyboard, ScrollViewComponent, Text, TextInput, View } from "react-native";

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
  token,
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
  const [compareDate, setCompareDate] = useState();
  const [id, setId] = useState();
  const phoneRef = useRef(undefined);
  let fetcheddata;

  const handleSubmit = () => {
    setLoading(true);
    if (!firstName || !surname || !phone || !id) {
      setError(errorMsg1);
      setLoading(false);
    } else {
      // verify submission details
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`https://verify.kycafrica.com/api/verifyid/${id}`, requestOptions)
        .then((response) => {
          console.log(response.status);
          if (response.status === 500) {
            alert("Sorry Please try again later unable to connect to server");
          }
          response.text();
        })
        .then((result) => {
          fetcheddata = JSON.parse(result);

          if (fetcheddata.firstName === firstName.toUpperCase() && fetcheddata.surname === surname.toUpperCase()) {
            //  confirmation complete moving to next page
            setTimeout(() => {
              setData({
                firstName,
                surname,
                phone: phoneRef.current?.getNumberAfterPossiblyEliminatingZero().formattedNumber,
                id,
              });
              setUserView(false);
              setIdUploadView(true);
              setOtpConfrimView(false);
              setRegConfrimView(false);
              setLoading(false);
            }, 50);
          } else {
            alert("Invalid information provided");
          }
        })
        .catch((error) => console.log("error", error));

      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <ScrollView > */}
      <KeyboardAwareScrollView
        viewIsInsideTabBar={false}
        extraHeight={40}
        enableOnAndroid={true}
        keyboardShouldPersistTaps={"always"}
        keyboardOpeningTime={0}
        enableAutomaticScroll={true}
      >
        <View style={{ width: width, height: "65%", alignItems: "center" }}>
          <MainInput
            title={"First Name(s) (as on your ID)"}
            placeholder={"e.g. Phillip Joe"}
            required
            // onBlur={Keyboard.dismiss}
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
            // onBlur={Keyboard.dismiss}
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
                fontFamily: "Poppins-Regular",
                fontSize: 18,
                color: "black",
              }}
              textInputStyle={{
                fontFamily: "Poppins-Regular",
                fontSize: 18,
                color: "black",
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
                let noZero = phoneRef.current?.getNumberAfterPossiblyEliminatingZero();
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
            // onBlur={Keyboard.dismiss}
            onChange={(value) => {
              setId(value);
            }}
            info={id ? null : error}
            textStyles={FontTheme.errortxt}
          />
          <View style={{ paddingVertical: 80 }}></View>
        </View>
      </KeyboardAwareScrollView>
      {/* </ScrollView> */}
      <View
        style={{
          width: width,
          height: "15%",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
        }}
      >
        <SignUpNavigationButton title={"Continue"} loading={loading} onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default UserDetails;
